<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Invoice;
use App\Models\InvoiceDetail;
use App\Models\InvoiceItem;
use App\Models\InvoiceService;
use App\Models\Service;
use App\Models\Truck;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\LaravelPdf\Facades\Pdf;

class InvoiceController extends Controller
{
    public function index()
    {
        // Recuperar todos los clientes con sus facturas
        $invoices = Customer::with('invoices.services', 'trucks')->get();

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
            'customerName' => 'required|max:50|unique:customers',
            'phoneNumber' => 'string|max:15|unique:customers',
            'observations' => 'max:255',
            'services' => 'required|array',
            'services.*.description' => 'required|string|max:255',
            'services.*.parts' => 'required|numeric|min:0',
            'services.*.labor' => 'required|numeric|min:0',
            'services.*.total' => 'required|numeric|min:0',
            'truck.tagNumber' => 'required|string|max:20',
            'truck.binNumber' => 'required|string|max:20',
            'truck.truck' => 'required|string|max:50',
            'total.subtotal' => 'required|numeric|min:0',
            'total.taxes' => 'required|numeric|min:0',
            'total.total' => 'required|numeric|min:0',
        ]);

        $customer = new Customer(
            [
                'name' => $request->input('customerName'),
                'phone_number' => $request->input('phoneNumber'),
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
            $request->input('observations') ?: 'No observations'
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

        $truck = new Truck([
            'truck' => $request->input('truck.truck'),
            'tag_number' => $request->input('truck.tagNumber'),
            'bin_number' => $request->input('truck.binNumber'),
        ]);

        $customer->trucks()->save($truck);

        return redirect()->route('invoice.index')
            ->with("message", "The invoice {$invoice->id} was created successfull");
    }

    public function edit($id)
    {
        $invoice = Invoice::with(['customer', 'services', 'customer.trucks'])->findOrFail($id);
        return Inertia::render('Billing/Edit', ['invoice' => $invoice]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'customerName' => 'required|max:50',
            'phoneNumber' => 'string|max:15',
            'observations' => 'max:255',
            'services' => 'required|array',
            'services.*.description' => 'required|string|max:255',
            'services.*.parts' => 'required|numeric|min:0',
            'services.*.labor' => 'required|numeric|min:0',
            'services.*.total' => 'required|numeric|min:0',
            'truck.tagNumber' => 'required|string|max:20',
            'truck.binNumber' => 'required|string|max:20',
            'truck.truck' => 'required|string|max:50',
            'total.subtotal' => 'required|numeric|min:0',
            'total.taxes' => 'required|numeric|min:0',
            'total.total' => 'required|numeric|min:0',
        ]);

        $invoice = Invoice::findOrFail($id);
        $customer = $invoice->customer;

        $customer->update([
            'name' => $request->input('customerName'),
            'phone_number' => $request->input('phoneNumber'),
        ]);

        $invoice->update([
            'subtotal' => $request->input('total.subtotal'),
            'taxes' => $request->input('total.taxes'),
            'total' => $request->input('total.total'),
            'observations' => $request->input('observations') ?: 'No observations',
        ]);

        // Eliminar servicios existentes y crear nuevos
        $invoice->services()->delete();
        foreach ($request->input('services') as $service) {
            $invoiceService = new InvoiceService([
                'description' => $service['description'],
                'parts' => $service['parts'],
                'labor' => $service['labor'],
                'total' => $service['total'],
            ]);
            $invoice->services()->save($invoiceService);
        }

        // Actualizar o crear el camión
        $truck = $customer->trucks()->first();
        if ($truck) {
            $truck->update([
                'truck' => $request->input('truck.truck'),
                'tag_number' => $request->input('truck.tagNumber'),
                'bin_number' => $request->input('truck.binNumber'),
            ]);
        } else {
            $truck = new Truck([
                'truck' => $request->input('truck.truck'),
                'tag_number' => $request->input('truck.tagNumber'),
                'bin_number' => $request->input('truck.binNumber'),
            ]);
            $customer->trucks()->save($truck);
        }

        return redirect()->route('invoice.index')
            ->with("message", "The invoice {$invoice->id} was updated successfully");
    }

    public function destroy($id)
    {
        $invoice = Invoice::findOrFail($id);
        $invoice->delete();

        $customer = $invoice->customer;
        $customer->delete();

        $serials = $invoice->services();
        foreach ($serials as $service) {
            $service->delete();
        }

        return redirect()->route('invoice.index')
            ->with('message', 'The invoice was deleted successfully');
    }


    public function generatePdf($id)
    {
        $invoice = Invoice::with('services')->findOrFail($id);
        $customer = $invoice->customer;

        return Pdf::view('pdf.invoice', compact('invoice', 'customer'))
            ->name('invoice.pdf');
    }
}
