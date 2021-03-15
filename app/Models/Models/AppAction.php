<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;

class AppAction extends Model
{
    protected $fillable = [
      'id',
      'user_id',
      'action_type',
      'action_at',
      'description',
    ];

    public function user ()
    {
        return $this->belongsTo(User::class,'user_id','id');
    }
}
