<?php

namespace Tests\Unit;

use App\Models\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;

class ExampleTest extends BaseTest
{

    /**
     * A basic test example.
     */
    public function test_that_true_is_true(): void
    {
        $this->assertTrue(true);
    }

//    /**
//     * Email should be required of auth API
//     */
//    public function test_auth_api_email_is_required(): void
//    {
//        $response = $this->postJson($this->baseURL.'/login', ['password' => '123546']);
//
//        $this->validationErrorResponse($response);
//    }
//
//    /**
//     * Email should be an email format
//     */
//    public function test_auth_api_email_should_be_email_format(): void
//    {
//        $response = $this->postJson($this->baseURL.'/login', ['password' => '123546', 'email' => 'hello world']);
//
//        $this->validationErrorResponse($response);
//    }
//
//    /**
//     * Password should be required of auth API
//     */
//    public function test_auth_api_password_is_required(): void
//    {
//        $response = $this->postJson($this->baseURL.'/login', ['email' => 'email@email.com']);
//
//        $this->validationErrorResponse($response);
//    }
//
//    /**
//     * Password should be minimum 8 characters of auth API
//     */
//    public function test_auth_api_password_should_be_minimum_eight_chars(): void
//    {
//        $response = $this->postJson($this->baseURL.'/login', ['password' => '123546', 'email' => 'hello world']);
//
//        $this->validationErrorResponse($response);
//    }

}
