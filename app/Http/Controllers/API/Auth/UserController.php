<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Auth;
use App\Http\Requests\AuthRequest;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    /**
     * Check login
     */
    public function loginUser(AuthRequest $request): Response
    {
        try {
            $input = $request->all();
            Auth::attempt($input);
            $user = Auth::user();
            $token = $user->createToken('example')->accessToken;

            return Response(['status' => 200,'token' => $token],200);
        } catch (\Throwable $throwable) {
            Log::error($throwable->getMessage().'. Location : '.$throwable->getFile() .' at line : '.$throwable->getLine());

            return Response(['status' => 500, 'message' => $throwable->getMessage()], 500);
        }

    }

    /**
     * Display the specified resource.
     */
    public function getUserDetails(): Response
    {
        try {
            if(Auth::guard('api')->check()){
                $user = Auth::guard('api')->user();

                return Response(['status'=> 200, 'data' => $user],200);
            }
            return Response(['status'=> 401,'data' => 'Unauthorized'],401);
        } catch (\Throwable $throwable) {
            Log::error($throwable->getMessage().'. Location : '.$throwable->getFile() .' at line : '.$throwable->getLine());

            return Response(['status' => 500, 'message' => $throwable->getMessage()], 500);
        }
    }

    /**
     * Logout
     */
    public function userLogOut(): Response
    {
        try {
            if(Auth::guard('api')->check()){
                $accessToken = Auth::guard('api')->user()->token();
                \DB::table('oauth_refresh_tokens')
                    ->where('access_token_id', $accessToken->id)
                    ->update(['revoked' => true]);
                $accessToken->revoke();

                return Response(['status' => 200, 'data' => 'Unauthorized','message' => 'User logout successfully.'],200);
            }
            return Response(['status' => 401,'data' => 'Unauthorized'],401);
        } catch (\Throwable $throwable) {
            Log::error($throwable->getMessage().'. Location : '.$throwable->getFile() .' at line : '.$throwable->getLine());

            return Response(['status' => 500, 'message' => $throwable->getMessage()], 500);
        }
    }
}
