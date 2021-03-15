<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;

class AccessToken extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'token',
        'user_id',
        'validity',
    ];

    public function prefecture ()
    {
        return $this->belongsTo(User::class,'user_id','id');
    }
}
