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

### Example methods
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

