<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UserRegisterController extends BaseAction
{
    public function store(Request $request)
    {
        try {

            $validation = $this->registrationValidation($request);
            if ( $validation->fails() ) {
                return validationWithDetailsError($validation->errors());
            }
            $pData = $request->all();
            $response['user'] = $this->repository->store($pData);

            return responseCreated($response);
        } catch ( \Throwable $throwable ) {
            return serverError($throwable->getMessage());
            Log::error($throwable->getMessage().'. Location : '.$throwable->getFile() .' at line : '.$throwable->getLine());
        }
    }
}

