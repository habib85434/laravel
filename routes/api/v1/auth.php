<?php
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => ''], function (){
    Route::post('/login', 'App\Http\Controllers\Api\V1\Auth\AuthController@login')->name('auth_login');
    Route::post('/logout', 'App\Http\Controllers\Api\V1\Auth\AuthController@logout')->name('auth_logout');
});

Route::group(['prefix' => 'user'], function (){
    Route::post('/create', 'App\Http\Controllers\Api\V1\Auth\UserRegisterController@store')->name('user_create');
});


