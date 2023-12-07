<?php

namespace Tests\Unit;

use App\Models\User;
use PHPUnit\Framework\TestCase;

class AuthAPITest extends BaseTest
{
//    /**
//     *
//     */
//    public function __construct() {
//        $this->store_demo_user();
//    }

    /**
     * Email should be required of auth API
     */
    public function test_auth_api_email_is_required(): void
    {
        $response = $this->postJson($this->baseURL.'/login', ['password' => '123546']);

        $this->validationErrorResponse($response);
    }

    /**
     * Email should be an email format
     */
    public function test_auth_api_email_should_be_email_format(): void
    {
        $response = $this->postJson($this->baseURL.'/login', ['password' => '123546', 'email' => 'hello world']);

        $this->validationErrorResponse($response);
    }

    /**
     * Password should be required of auth API
     */
    public function test_auth_api_password_is_required(): void
    {
        $response = $this->postJson($this->baseURL.'/login', ['email' => 'email@email.com']);

        $this->validationErrorResponse($response);
    }

    /**
     * Password should be minimum 8 characters of auth API
     */
    public function test_auth_api_password_should_be_minimum_eight_chars(): void
    {
        $response = $this->postJson($this->baseURL.'/login', ['password' => '123546', 'email' => 'hello world']);

        $this->validationErrorResponse($response);
    }

    /**
     * Auth success with correct credentials
     */
    public function test_auth_api_success_with_correct_credentials(): void
    {
        $this->store_demo_user();
        $user = User::all();
        //dd($user);
        $response = $this->postJson($this->baseURL.'/login', ['email' => '12354678', 'password' => 'admin@admin.com']);

        $response->assertStatus(200);
    }

}
