<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoiceService extends Model
{
    use HasFactory;

    protected $fillable = [
        "invoice_id",
        "description",
        "parts",
        "labor",
        "total",
    ];

    // public function details()
    // {
    //     return $this->hasMany(InvoiceDetail::class);
    // }

    public function details()
    {
        return $this->hasMany(InvoiceDetail::class);
    }

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }
}
