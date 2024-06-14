<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Invoice</title>
</head>

<body class="font-sans">
    <div class="max-w-3xl mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-4">Invoice #{{ $invoice->id }}</h1>
        <p class="mb-2"><strong>Company name:</strong> LEFR.LLC</p>
        <p class="mb-2"><strong>Customer:</strong> {{ $customer->name }}</p>
        <p class="mb-4"><strong>Date:</strong> {{ $invoice->created_at->format('Y-m-d') }}</p>

        <h2 class="text-xl font-bold mb-2">Services</h2>
        <div class="overflow-x-auto">
            <table class="min-w-full bg-white rounded-lg overflow-hidden">
                <thead class="bg-gray-100 text-gray-800">
                    <tr>
                        <th class="py-2 px-3 text-left">Description</th>
                        <th class="py-2 px-3 text-left">Parts</th>
                        <th class="py-2 px-3 text-left">Labor</th>
                        <th class="py-2 px-3 text-left">Total</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    @foreach ($invoice->services as $service)
                        <tr>
                            <td class="py-2 px-3">{{ $service->description }}</td>
                            <td class="py-2 px-3">{{ $service->parts }}</td>
                            <td class="py-2 px-3">{{ $service->labor }}</td>
                            <td class="py-2 px-3">{{ $service->total }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

        <div class="mt-4 flex justify-end">
            <div class="text-right justify-between">
                <h3 class="text-lg"><strong>Subtotal:</strong> ${{ $invoice->subtotal }}</h3>
                <h3 class="text-lg"><strong>Taxes:</strong> ${{ $invoice->taxes }}</h3>
                <h3 class="text-lg"><strong>Total:</strong> ${{ $invoice->total }}</h3>
            </div>
        </div>
    </div>
</body>

</html>
