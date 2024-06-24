<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    // protected $fillable = [
    //     'name', 'cost',
    // ];

    protected $fillable = [
        'name',
        'description',
        'parts',
        'labor',
        'total',
        'image'
    ];

}
