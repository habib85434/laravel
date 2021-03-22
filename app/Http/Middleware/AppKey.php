<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AppKey
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $appKey = $request->header('key');

        if (empty($appKey)) { return responseUnauthorized(); }
        $data =  \App\Models\AppKey::where('app_key','=', $appKey)->first();

        if (empty($data)) { return responseUnauthorized(); }

        return $next($request);
    }
}

