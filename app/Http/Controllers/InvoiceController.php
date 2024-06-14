<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Invoice;
use App\Models\InvoiceDetail;
use App\Models\InvoiceItem;
use App\Models\InvoiceService;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\LaravelPdf\Facades\Pdf;

class InvoiceController extends Controller
{
    public function index()
    {
        // Recuperar todos los clientes con sus facturas
        $invoices = Customer::with('invoices.services')->get();

        // Devolver la vista con los datos de los clientes y sus facturas
        return Inertia::render('Billing/Index', ['invoices' => $invoices]);
    }

    public function create()
    {
        return Inertia::render('Billing/Create');
    }

    public function store(Request $request)
    {

        // dd($request);
        $request->validate([
            'customerName' => 'required|max:50',
            'services' => 'required|array',
            'services.*.description' => 'required|string|max:255',
            'services.*.parts' => 'required|numeric|min:0',
            'services.*.labor' => 'required|numeric|min:0',
            'services.*.total' => 'required|numeric|min:0',
            'total.subtotal' => 'required|numeric|min:0',
            'total.taxes' => 'required|numeric|min:0',
            'total.total' => 'required|numeric|min:0',
        ]);

        $customer = new Customer(
            [
                'name' => $request->input('customerName'),
                'phone_number' => 123456789,
                'address' => '123 Main St'
            ]
        );

        $customer->save();

        // dd($customer);


        $invoice = Invoice::create([
            'customer_id' => $customer->id,
            'subtotal' => $request->input('total.subtotal'),
            'taxes' => $request->input('total.taxes'),
            'total' => $request->input('total.total'),
            'description' => 'Some description',
        ]);

        $customer->invoices()->save($invoice);

        foreach ($request->input('services') as $service) {
            $invoiceService = new InvoiceService(
                [
                    'invoice_id' => $invoice->id,
                    'description' => $service['description'],
                    'parts' => $service['parts'],
                    'labor' => $service['labor'],
                    'total' => $service['total'],
                ]
            );

            $invoice->services()->save($invoiceService);

        }

        return redirect()->route('services.index')
            ->with("message", "The invoice {$invoice->id} was created successfull");
    }

    public function generatePdf($id)
    {
        $invoice = Invoice::with('services')->findOrFail($id);
        $customer = $invoice->customer;

        return Pdf::view('pdf.invoice', compact('invoice', 'customer'))
            ->name('invoice.pdf')
            ->download();
    }
}
