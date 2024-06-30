<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice</title>
    <style>
        body {
            font-family: Arial, sans-serif;
           
            color: #333;
            margin: 0;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
           
            padding: 10px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header, .section, .totals, .observations, .thank-you {
            margin-bottom: 30px;
        }
        .company-name {
            color: #4285F4;
            font-size: 36px;
            font-weight: bold;
        }
        .company-details, .invoice-details, .customer-info, .vehicle-info, .totals p, .observations p, .thank-you p {
            font-size: 16px;
            line-height: 1.5;
        }
        .invoice-title {
            text-align: right;
            font-size: 28px;
            font-weight: bold;
        }
        .section-title {
            font-weight: bold;
            font-size: 20px;
            margin-bottom: 10px;
        }
        .customer-info, .vehicle-info {
            display: inline-block;
            width: 48%;
            vertical-align: top;
        }
        .vehicle-info {
            text-align: right;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 12px;
        }
        th {
            background-color: #f2f2f2;
            font-weight: bold;
            text-align: left;
        }
        td {
            text-align: right;
        }
        td:first-child {
            text-align: left;
        }
        .totals {
            text-align: right;
        }
        .totals p {
            margin: 5px 0;
        }
        .totals .total-row {
            font-size: 18px;
            font-weight: bold;
        }
        .observations .section-title, .thank-you {
            text-align: center;
        }
        .thank-you p {
            font-style: italic;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div style="float: left; width: 50%;">
                <h1 class="company-name">LEFR.LLC</h1>
                <p class="company-details">Phone: (123) 456-7890</p>
                <p class="company-details">Email: info@lefr.com</p>
            </div>
            <div style="float: right; width: 50%; text-align: right;">
                <h2 class="invoice-title">Invoice # {{ $invoice->id }}</h2>
                <p class="invoice-details">Date: {{ $invoice->created_at->format('M d, Y') }}</p>
            </div>
            <div style="clear: both;"></div>
        </div>

        <div class="section">
            <div class="customer-info">
                <div class="section-title">Bill To:</div>
                <p><strong>Customer:</strong> {{ $customer->name }}</p>
                <p><strong>Phone:</strong> {{ $customer->phone_number }}</p>
            </div>
            <div class="vehicle-info">
                <div class="section-title">Vehicle Information:</div>
                @if(count($customer->trucks) > 0)
                    <p><strong>Make:</strong> {{ $customer->trucks[0]->truck }}</p>
                    <p><strong>Tag Number:</strong> {{ $customer->trucks[0]->tag_number }}</p>
                    <p><strong>VIN Number:</strong> {{ $customer->trucks[0]->bin_number }}</p>
                @else
                    <p>No vehicle information available</p>
                @endif
            </div>
            <div style="clear: both;"></div>
        </div>

        <h2 class="section-title">Service detail:</h2>
        
        <table>
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Parts</th>
                    <th>Labor</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($invoice->services as $service)
                <tr>
                    <td>{{ $service->description }}</td>
                    <td>${{ number_format($service->parts, 2) }}</td>
                    <td>${{ number_format($service->labor, 2) }}</td>
                    <td>${{ number_format($service->total, 2) }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>

        <div class="totals">
            <p><strong>Subtotal:</strong> ${{ number_format($invoice->subtotal, 2) }}</p>
            <p><strong>Taxes:</strong> ${{ number_format($invoice->taxes, 2) }}</p>
            <p class="total-row"><strong>Total:</strong> ${{ number_format($invoice->total, 2) }}</p>
        </div>

        <div class="observations">
            <h3 class="section-title">Observations:</h3>
            <p>{{ $invoice->observations }}</p>
        </div>

        <div class="thank-you">
            <p>Thank you for your business!</p>
        </div>
    </div>
</body>
</html>
