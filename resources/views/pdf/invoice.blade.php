<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Invoice</title>
</head>
<body class="font-sans ">
    <div class="max-w-4xl mx-auto bg-white my-8 p-8">
        <div class="flex justify-between items-start mb-8">
            <div>
                <h1 class="text-4xl font-bold text-blue-600">LEFR.LLC</h1>
                <p class="text-gray-600">Phone: +1 (301) 204-5424</p>
                <p class="text-gray-600">Email: allrenold91@gmail.com</p>
            </div>
            <div class="text-right">
                <h2 class="text-2xl font-bold mb-2">Invoice</h2>
                <p><strong>Invoice #:</strong> {{ $invoice->id }}</p>
                <p><strong>Date:</strong> {{ $invoice->created_at->format('M d, Y') }}</p>
            </div>
        </div>

        <div class="flex justify-between mb-8">
            <div>
                <h3 class="font-bold mb-2">Bill To:</h3>
                <p>{{ $customer->name }}</p>
                <!-- <p>{{ $customer->address }}</p> -->
                <p>Phone: {{ $customer->phone_number }}</p>
            </div>
            <div>
                <h3 class="font-bold mb-2">Vehicle Information:</h3>
                @if(count($customer->trucks) > 0)
                    <p><strong>Make:</strong> {{ $customer->trucks[0]->truck }}</p>
                    <p><strong>Tag Number:</strong> {{ $customer->trucks[0]->tag_number }}</p>
                    <p><strong>VIN Number:</strong> {{ $customer->trucks[0]->bin_number }}</p>
                @else
                    <p>No vehicle information available</p>
                @endif
            </div>
        </div>

        <h2 class="font-bold my-2">Service detail:</h2>
        
        <div className="border">
            <table class="w-full mb-8 border rounded-xl">
                <thead>
                    <tr class="bg-gray-200">
                        <th class="py-2 px-4 text-left">Description</th>
                        <th class="py-2 px-4 text-right">Parts</th>
                        <th class="py-2 px-4 text-right">Labor</th>
                        <th class="py-2 px-4 text-right">Total</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($invoice->services as $service)
                    <tr class="">
                        <td class="py-2 px-4">{{ $service->description }}</td>
                        <td class="py-2 px-4 text-right">${{ number_format($service->parts, 2) }}</td>
                        <td class="py-2 px-4 text-right">${{ number_format($service->labor, 2) }}</td>
                        <td class="py-2 px-4 text-right">${{ number_format($service->total, 2) }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>


        <div class="flex justify-end mb-8">
                <div class="text-right">
                    <p class="mb-2"><span class="font-semibold">Subtotal:</span> ${{ number_format($invoice->subtotal, 2) }}</p>
                    <p class="mb-2"><span class="font-semibold">Taxes:</span> ${{ number_format($invoice->taxes, 2) }}</p>
                    <p class="text-xl font-bold"><span class="font-semibold">Total:</span> ${{ number_format($invoice->total, 2) }}</p>
                </div>
            </div>

            <div class="border-t pt-4">
                <h3 class="text-xl font-bold mb-2">Observations:</h3>
                <p class="text-gray-600">{{ $invoice->observations }}</p>
            </div>

            <div class="mt-8 text-center text-gray-500">
                <p>Thank you for your business!</p>
            </div>
    </div>
</body>
</html>