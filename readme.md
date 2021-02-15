<p align="center">Image resizing </p>

# [Intervention Image with Laravel](http://image.intervention.io/getting_started/installation).

### Installation
$ php composer.phar require intervention/image

### Usage
```sh
    // create instance
    $img = Image::make('public/foo.jpg');
    

    // resize image to fixed size
    $img->resize(300, 200);
    

    // resize only the width of the image
    $img->resize(300, null);
    

    // resize only the height of the image
    $img->resize(null, 200);
    

    // resize the image to a width of 300 and constrain aspect ratio (auto height)
    $img->resize(300, null, function ($constraint) {
        $constraint->aspectRatio();
    });
    

    // resize the image to a height of 200 and constrain aspect ratio (auto width)
    $img->resize(null, 200, function ($constraint) {
        $constraint->aspectRatio();
    });
    

    // prevent possible upsizing
    $img->resize(null, 400, function ($constraint) {
        $constraint->aspectRatio();
        $constraint->upsize();
    });
    

    // resize the image so that the largest side fits within the limit; the smaller
    // side will be scaled to maintain the original aspect ratio
    $img->resize(400, 400, function ($constraint) {
        $constraint->aspectRatio();
        $constraint->upsize();
    });
```
[more..](http://image.intervention.io/api/resize).

### Example

##### Route
```sh
    Route::get('customers', 'CustomerController@index')->name('customers.index');
    Route::get('customers/create', 'CustomerController@create')->name('customers.create');
    Route::post('customers', 'CustomerController@store')->name('customers.store');
    Route::get('customers/{customer}', 'CustomerController@show')->name('customers.show');
    Route::get('customers/{customer}/edit', 'CustomerController@edit')->name('customers.edit');
    Route::patch('customers/{customer}', 'CustomerController@update')->name('customers.update');
    Route::delete('customers/{customer}', 'CustomerController@destroy')->name('customers.destroy');
```

##### Controller
```sh
    namespace App\Http\Controllers;

    use Illuminate\Http\Request;
    use App\Models\Customer;
    use App\Models\Company;
    //use App\Events\NewCustomerHasRegisteredEvent;
    //use App\Mail\WelcomeNewUserMail;
    use Illuminate\Support\Facades\Mail;
    use Intervention\Image\Facades\Image;

    class CustomerController extends Controller
    {
        public function index()
        {
            $customers = Customer::with('company')->paginate(25);

            return view('customers.index', compact('customers'));
        }

        public function create()
        {
            $companies = Company::all();
            $customer = new Customer();

            return view('customers.create', compact('companies', 'customer'));
        }

        public function store()
        {
    //        $this->authorize('create', Customer::class);

            $customer = Customer::create($this->validateRequest());

            $this->storeImage($customer);

    //        event(new NewCustomerHasRegisteredEvent($customer));

            return redirect('customers');
        }

        public function show(Customer $customer)
        {
            return view('customers.show', compact('customer'));
        }

        public function edit(Customer $customer)
        {
            $companies = Company::all();

            return view('customers.edit', compact('customer', 'companies'));
        }

        public function update(Customer $customer)
        {
            $customer->update($this->validateRequest());

            $this->storeImage($customer);

            return redirect('customers/' . $customer->id);
        }

        public function destroy(Customer $customer)
        {
            $this->authorize('delete', $customer);

            $customer->delete();

            return redirect('customers');
        }

        private function validateRequest()
        {
            return request()->validate([
                'name' => 'required|min:3',
                'email' => 'required|email',
                'active' => 'required',
                'company_id' => 'required',
                'image' => 'sometimes|file|image|max:5000',
            ]);
        }

        private function storeImage($customer)
        {
            if (request()->has('image')) {
                $customer->update([
                    'image' => request()->image->store('uploads', 'public'),
                ]);

                // resize the image so that the largest side fits within the limit; the smaller
                // side will be scaled to maintain the original aspect ratio

                $image = Image::make(public_path('storage/' . $customer->image))->resize(400, 400, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                });

                $image->save();
            }
        }
    }
```

##### Views
```sh
customers/index.blade.php
@extends('layouts.app')
@section('title', 'Customer List')

@section('content')

    <div class="row">
        <div class="col-12">
            <h1>Customer List</h1>
        </div>
    </div>

    <div class="row">
        <div class="col-12">
            <p><a href="{{ route('customers.create') }}">Add New Customer</a></p>
        </div>
    </div>

    @foreach($customers as $customer)
        <div class="row">
            <div class="col-2">
                {{ $customer->id }}
            </div>
            <div class="col-4">
                <a href="{{ route('customers.show', ['customer' => $customer]) }}">
                    {{ $customer->name }}
                </a>

                @cannot('view', $customer)
                    {{ $customer->name }}
                @endcannot
            </div>
            <div class="col-4">{{ $customer->company->name }}</div>
            <div class="col-2">{{ $customer->active }}</div>
        </div>
    @endforeach

    <div class="row">
        <div class="col-12 d-flex justify-content-center pt-4">
            {{ $customers->links() }}
        </div>
    </div>
@endsection


customers/create.blade.php
@extends('layouts.app')

@section('title', 'Add New Customer')

@section('content')
    <div class="row">
        <div class="col-12">
            <h1>Add New Customer</h1>
        </div>
    </div>

    <div class="row">
        <div class="col-12">
            <form action="{{ route('customers.store') }}" method="POST" enctype="multipart/form-data">
                @include('customers.form')

                <button type="submit" class="btn btn-primary">Add Customer</button>
            </form>
        </div>
    </div>
@endsection


customers/form.blade.php
<div class="form-group">
    <label for="name">Name</label>
    <input type="text" name="name" value="{{ old('name') ?? $customer->name }}" class="form-control">
    <div>{{ $errors->first('name') }}</div>
</div>

<div class="form-group">
    <label for="email">Email</label>
    <input type="text" name="email" value="{{ old('email') ?? $customer->email }}" class="form-control">
    <div>{{ $errors->first('email') }}</div>
</div>

<div class="form-group">
    <label for="active">Status</label>
    <select name="active" id="active" class="form-control">
        <option value="" disabled>Select customer status</option>

        @foreach($customer->activeOptions() as $activeOptionKey => $activeOptionValue)
            <option value="{{ $activeOptionKey }}" {{ $customer->active == $activeOptionValue ? 'selected' : '' }}>{{ $activeOptionValue }}</option>
        @endforeach
    </select>
</div>

<div class="form-group">
    <label for="company_id">Company</label>
    <select name="company_id" id="company_id" class="form-control">
        @foreach ($companies as $company)
            <option value="{{ $company->id }}" {{ $company->id == $customer->company_id ? 'selected' : '' }}>{{ $company->name }}</option>
        @endforeach
    </select>
</div>

<div class="form-group d-flex flex-column">
    <label for="image">Profile Image</label>
    <input type="file" name="image" class="py-2">
    <div>{{ $errors->first('image') }}</div>
</div>
@csrf


customers/edit.blade.php
@extends('layouts.app')

@section('title', 'Edit Details for ' . $customer->name)

@section('content')
    <div class="row">
        <div class="col-12">
            <h1>Edit Details for {{ $customer->name }}</h1>
        </div>
    </div>

    <div class="row">
        <div class="col-12">
            <form action="{{ route('customers.update', ['customer' => $customer]) }}" method="POST" enctype="multipart/form-data">
                @method('PATCH')
                @include('customers.form')

                <button type="submit" class="btn btn-primary">Save Customer</button>
            </form>
        </div>
    </div>
@endsection



customers/show.blade.php
@extends('layouts.app')

@section('title', 'Details for ' . $customer->name)

@section('content')
    <div class="row">
        <div class="col-12">
            <h1>Details for {{ $customer->name }}</h1>
            <p><a href="{{ route('customers.edit', ['customer' => $customer]) }}">Edit</a></p>

            <form action="{{ route('customers.destroy', ['customer' => $customer]) }}" method="POST">
                @method('DELETE')
                @csrf

                <button class="btn btn-danger" type="submit">Delete</button>
            </form>
        </div>
    </div>

    <div class="row">
        <div class="col-12">
            <p><strong>Name</strong> {{ $customer->name }}</p>
            <p><strong>Email</strong> {{ $customer->email }}</p>
            <p><strong>Company</strong> {{ $customer->company->name }}</p>
        </div>
    </div>

    @if($customer->image)
        <div class="row">
            <div class="col-12">
                <img src="{{ asset('storage/' . $customer->image) }}" alt="" class="img-thumbnail">
            </div>
        </div>
    @endif
@endsection

```

