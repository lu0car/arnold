import React from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Button,
} from "@material-tailwind/react";
import { TruckIcon, PencilIcon, TrashIcon, PrinterIcon } from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";

export default function InvoiceCard({ customer, truck, services, total, invoiceId }) {

    const handlePrintPDF = () => {
        console.log(`Invoice ID: ${invoiceId}`);
    };

    return (
        <Card
            shadow={false}
            className="rounded-lg border border-gray-300 p-4"
        >
            <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className="border border-gray-200 p-2.5 rounded-lg">
                        <TruckIcon className="h-6 w-6 text-gray-900" />
                    </div>
                    <div>
                        <Typography variant="small" color="blue-gray" className="mb-1 font-bold">
                            {customer}
                        </Typography>
                        <Typography
                            className="!text-gray-600 text-xs font-normal"
                        >
                            {truck}
                        </Typography>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <a href={`/invoice/${invoiceId}/pdf`}>
                        <Button
                            size="sm"
                            variant="text"
                            color="red"
                            className="flex items-center gap-2"
                            onClick={handlePrintPDF}
                        >
                            <PrinterIcon className="h-4 w-4 text-gray-600" />
                            <Typography className="!font-semibold text-xs text-gray-600 md:block hidden">
                                PDF
                            </Typography>
                        </Button>
                    </a>
                    <Button
                        size="sm"
                        variant="text"
                        className="flex items-center gap-2"
                    >
                        <PencilIcon className="h-4 w-4 text-gray-600" />
                        <Typography className="!font-semibold text-xs text-gray-600 md:block hidden">
                            Edit
                        </Typography>
                    </Button>
                    <Button
                        size="sm"
                        variant="text"
                        color="red"
                        className="flex items-center gap-2"
                    >
                        <TrashIcon className="h-4 w-4 text-red-500" />
                        <Typography className="!font-semibold text-xs text-red-500 md:block hidden">
                            delete
                        </Typography>
                    </Button>
                </div>
            </div>
            <div>
                {services && services.map((service, index) => (
                    <div key={index} className="flex gap-1 mb-2">
                        <Typography className="text-xs !font-medium !text-gray-600">
                            {service.description}:
                        </Typography>
                        <Typography
                            className="text-xs !font-bold"
                            color="blue-gray"
                        >
                            {service.total}
                        </Typography>
                    </div>
                ))}
                <div className="flex gap-1 mt-2">
                    <Typography className="text-xs !font-medium !text-gray-600">
                        Total:
                    </Typography>
                    <Typography
                        className="text-xs !font-bold"
                        color="blue-gray"
                    >
                        {total}
                    </Typography>
                </div>
            </div>
        </Card>
    );
}