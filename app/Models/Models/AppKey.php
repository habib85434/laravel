<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AppKey extends Model
{
    protected $fillable = [
        'id',
        'app_name',
        'app_key',
    ];
}
