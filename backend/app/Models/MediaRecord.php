<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MediaRecord extends Model
{
    use HasFactory;
    protected $fillable = [
        'reporting_month',
        'sales_month',
        'platform',
        'country',
        'label_name',
        'artiest_names',
        'release_title',
        'track_title',
        'upc',
        'isrc',
        'release_catalog',
        'release_type',
        'sales_type',
        'quantity',
        'client_payment_currency',
        'mechanical_fee',
        'gross_revenue',
        'client_share_rate',
        'net_revenue',
    ];
}

