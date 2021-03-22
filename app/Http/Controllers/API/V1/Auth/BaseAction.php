<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use App\Models\AccessToken;
use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class BaseAction extends Controller
{
    /**
     * @var UserRepositoryInterface
     **/
    protected $repository;

    /**
     * @param $repository
     */
    public function __construct( UserRepositoryInterface $repository )
    {
        $this->repository = $repository;
    }

    public function tokenAuthUser ( $token )
    {
        $status = true;
        $tokenDetails = AccessToken::where('token', '=', $token)->first();
        $user = User::where('id', '=', $tokenDetails->user_id)->first();

        return $user;
    }

    /**
     * For validation
     *
     * @return Response
     */
    public function registrationValidation(Request $request)
    {
        //Validate input fields
        $validator = Validator::make($request->all(), [
            'email'                         =>'required|max:150|email|unique:users',
            'password'                      => 'required|max:255|min:8',
            'user_type'                     => 'required|in:USER,ADMIN',
        ]);

        return $validator;
    }
}

