<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Truck extends Model
{
    use HasFactory;

    protected $fillable = [
        "truck",
        "tag_number",
        "bin_number",
    ];

    public function invoiceDetails()
    {
        return $this->hasMany(InvoiceDetail::class);
    }
}
