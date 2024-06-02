<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class BillingController extends Controller
{
    public function index()
    {
        return Inertia::render('Billing/Index');
    }

    public function create()
    {
        return Inertia::render('Billing/Create');
    }
}
