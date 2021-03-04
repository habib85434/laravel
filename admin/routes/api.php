<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//Route::get('products', array(\App\Http\Controllers\ProductController::class, 'index'));
//Route::get('products/{id}', array(\App\Http\Controllers\ProductController::class, 'show'));
//Route::post('products', array(\App\Http\Controllers\ProductController::class, 'store'));
//Route::put('products/{id}', array(\App\Http\Controllers\ProductController::class, 'update'));
//Route::delete('products/{id}', array(\App\Http\Controllers\ProductController::class, 'destroy'));

Route::apiResource('products', \App\Http\Controllers\ProductController::class);
