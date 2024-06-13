<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;
    protected $fillable = [
        'customer_id',
        'subtotal',
        'taxes',
        'total',
        'description'
    ];

    // public function customer()
    // {
    //     return $this->belongsTo(Customer::class);
    // }

    // public function details()
    // {
    //     return $this->hasMany(InvoiceDetail::class);
    // }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function details()
    {
        return $this->hasMany(InvoiceDetail::class);
    }

    public function services()
    {
        return $this->hasMany(InvoiceService::class);
    }
}
