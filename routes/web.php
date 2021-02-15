<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::resource('products', 'ProductController');

// for refreshing page from vue then it will refresh laravel url as well
//Route::get('{path}',"HomeController@index")->where( 'path', '([A-z\d-\/_.]+)?' );


Route::get('customers', 'CustomerController@index')->name('customers.index');
Route::get('customers/create', 'CustomerController@create')->name('customers.create');
Route::post('customers', 'CustomerController@store')->name('customers.store');
Route::get('customers/{customer}', 'CustomerController@show')->name('customers.show');
Route::get('customers/{customer}/edit', 'CustomerController@edit')->name('customers.edit');
Route::patch('customers/{customer}', 'CustomerController@update')->name('customers.update');
Route::delete('customers/{customer}', 'CustomerController@destroy')->name('customers.destroy');
