@extends('products.master');

@section('content');
    <div class="row">
        <div class="col-sm-12 margin-tab" style="margin-top: 20px">
            <div class="pull-left">
                <h2>Laravel 5.7 CRUD OPERATION</h2>
            </div>
            <div class="pull-right">
                <a href="{{route('products.create')}}" class="btn btn-success">Create new </a>
            </div>

        </div>
    </div>

    @if($message =Session::get('success'))
        <div class="alert alert-success">
            <p>{{$message}}</p>
        </div>
    @endif

    <div class="table-responsive">
        <table class="table table-hover">
            <thead>
            <tr>
                <th>No</th>
                <th>Name</th>
                <th>Details</th>
                <th width="280px">Action</th>
            </tr>
            </thead>
            <tbody>
            @foreach($products as $key=> $product)
                <tr>
                    <td>{{$product->id}}</td>
                    <td>{{$product->name}}</td>
                    <td>{{$product->detail}}</td>
                    <td>
                        <form action="{{route('products.destroy', $product->id)}}" method="post" role="form">
                            <a href="{{route('products.show', $product->id)}}" class="btn btn-info">View</a>
                            <a href="{{route('products.edit', $product->id)}}" class="btn btn-primary">Edit</a>
                            <input type="hidden" name="_token" value="{{csrf_token()}}" />
                            <input type="hidden" name="_method" value="DELETE" />
                            <button type="submit" class="btn btn-danger">Delete</button>
                        </form>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
@endsection