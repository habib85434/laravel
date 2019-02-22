@extends('products.master')
@section('content')
    <div class="row">
        <div class="col-lg-12 margin-tb" style="margin-top: 20px;">
            <div class="pull-left">
                <h2>Add New Product</h2>
            </div>
            <div class="pull-right">
                <a href="{{route('products.index')}}" class="btn btn-primary">Back</a>
            </div>
        </div>
    </div>
    <form action="{{route('products.store')}}" method="post">
        <input type="hidden" name="_token" value="{{csrf_token()}}">
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group{{$errors->has('name')?' has-error':''}}">
                    <strong>Name:</strong>
                    <input type="text" name="name" class="form-control" placeholder="Name">
                    <span class="text-danger">{{$errors->first('name')}}</span>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group{{$errors->has('detail')?' has-error':''}}">
                    <strong>Detail:</strong>
                    <textarea name="detail" id="detail"  rows="10" placeholder="Detail" class="form-control"></textarea>
                    <span class="text-danger">{{$errors->first('detail')}}</span>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <button type="submit" class="btn btn-primary">Add New</button>
            </div>
        </div>
    </form>
@endsection