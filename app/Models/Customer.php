<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "phone_number",
        "address",
    ];

    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }

    public function trucks()
    {
        return $this->hasMany(Truck::class);
    }

}
