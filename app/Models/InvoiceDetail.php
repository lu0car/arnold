<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoiceDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_service_id',
        'invoice_id',
        'truck_id',
    ];

    // public function invoice()
    // {
    //     return $this->belongsTo(Invoice::class);
    // }

    // public function service()
    // {
    //     return $this->belongsTo(InvoiceService::class);
    // }

    // public function truck()
    // {
    //     return $this->belongsTo(Truck::class);
    // }
    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }

    public function service()
    {
        return $this->belongsTo(InvoiceService::class);
    }

    public function truck()
    {
        return $this->belongsTo(Truck::class);
    }
}
