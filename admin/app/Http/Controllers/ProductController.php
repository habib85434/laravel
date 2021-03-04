<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ProductController extends Controller
{
    public function index()
    {
        try {
            return Product::all();
        } catch (\Throwable $throwable) {
            Log::error($throwable->getMessage().'. Location : '.$throwable->getFile() .' at line : '.$throwable->getLine());
            return response($throwable->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

     public function show($id)
    {
        try {
            return Product::find($id);
        } catch (\Throwable $throwable) {
            Log::error($throwable->getMessage().'. Location : '.$throwable->getFile() .' at line : '.$throwable->getLine());
            return response($throwable->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(Request $request)
    {
        try {
            $product = Product::create($request->only('title', 'image'));

            return response($product, Response::HTTP_CREATED);
        } catch (\Throwable $throwable) {
            Log::error($throwable->getMessage().'. Location : '.$throwable->getFile() .' at line : '.$throwable->getLine());
            return response($throwable->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update($id, Request $request)
    {
        try {
            $product = Product::find($id);
            $product->update($request->only('title', 'image'));

            return response($product, Response::HTTP_ACCEPTED);
        } catch (\Throwable $throwable) {
            Log::error($throwable->getMessage().'. Location : '.$throwable->getFile() .' at line : '.$throwable->getLine());
            return response($throwable->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy($id)
    {
        try {
            Product::destroy($id);

            return response(null, Response::HTTP_NO_CONTENT);
        } catch (\Throwable $throwable) {
            Log::error($throwable->getMessage().'. Location : '.$throwable->getFile() .' at line : '.$throwable->getLine());
            return response($throwable->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }






}

