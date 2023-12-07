<?php

namespace Tests\Unit;

use App\Models\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class BaseTest extends TestCase
{
    use RefreshDatabase;

    /**
     * API base URL.
     */
    protected $baseURL = 'http://localhost:8080/api';

    /**
     * Seeding demo data to the user table
     */
    protected function store_demo_user(): void {
        User::factory()->create([
            'name' => 'Test user',
            'email' => 'admin@admin.com',
            'password' => bcrypt(12345678),
        ]);
    }

    /**
     * Validation response
     */
    protected function validationErrorResponse($response): mixed {
        return $response->assertStatus(422)
            ->assertJson([
                "message" => "Validation errors",

            ]);
    }

    /**
     * A basic test example.
     */
    public function test_that_true_is_true(): void
    {
        $this->assertTrue(true);
    }


}
