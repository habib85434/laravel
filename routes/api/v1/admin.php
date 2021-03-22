<?php
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'product'], function (){
    Route::post('/', 'App\Http\Controllers\Api\V1\Product\Store')->name('product_store');
});
