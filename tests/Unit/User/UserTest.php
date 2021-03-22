<?php

namespace Tests\Unit\User;

use App\Models\AccessToken;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
//use PHPUnit\Framework\TestCase;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\Unit\BaseTest;

class UserTest extends BaseTest
{
    use RefreshDatabase;

    /**
     * @test
     */
    public function user_email_field_is_required()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
        ])->post('api/v1/auth/user/create',array_merge($this->store_data(), ['name' => '']), ['key' => $this->key]);

        $response->assertJsonMissingValidationErrors('name');
    }

    /**
     * A basic unit test example.
     * @test
     */
    public function user_can_be_added_through_the_form()
    {
        //$this->withoutExceptionHandling();
        Log::alert(database_path());

        $this->seed();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
        ])->post('api/v1/auth/user/create',$this->store_data(), ['key' => $this->key]);

        $response->assertStatus(201);
    }

    private function store_data()
    {
        return [
            'name' => 'Test start',
            'email' => 'test@user.com',
            'password' => 'test@user.com',
            'user_type' => 'USER',
        ];
    }
}

