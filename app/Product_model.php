<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product_model extends Model
{
    protected $table='products';

    protected $primaryKey='id';
    protected $fillable=['name','detail'];
}
