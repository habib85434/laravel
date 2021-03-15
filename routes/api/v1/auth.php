<?php
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => ''], function (){

//    Route::post('/login', 'Api\V1\Auth\LoginApi@checkLogin')->name('auth_login');
//    Route::post('/logout', 'Api\V1\Auth\LogoutApi@logout')->name('auth_logout');
//    Route::patch('/rest-password', 'Api\V1\Auth\ResetPasswordApi@restPassword')->name('auth_reset_password');
//    Route::post('/forget-password/email-confirm', 'Api\V1\Auth\Registration\ForgetPasswordEmailConfirmationApi@confirmEmail')->name('auth_registration_forget_password_email_confirm');
//    Route::patch('/forget-password', 'Api\V1\Auth\Registration\ForgetPasswordApi@setPassword')->name('auth_registration_forget_password');
//
//    Route::get('/forget-password/user/{token}', 'Api\V1\Auth\ForgetPasswordInfoApi@userInfo')->name('auth_forget_password_user_info');

    Route::get('/test', 'App\Http\Controllers\Api\V1\Auth\AuthController@test')->name('test');
});
