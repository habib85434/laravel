<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\Auth\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//TODO:: Later Need to make group as I worked before.
Route::controller(UserController::class)->group(function() {
   Route::post('/login', 'loginUser');
});

Route::controller(UserController::class)->group(function() {
   Route::get('user', 'getUserDetails');
   Route::get('logout', 'userLogOut');
})->middleware('auth:api');

//Route::group(['prefix' => 'auth'], function (){
//    Route::post('/login', 'App\Http\Controllers\API\Auth\UserController\loginUser')->name('login');
//});
