import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Billing3 from '@/Components/Invoice/InvoiceCard'
import React from 'react'
import { Head } from "@inertiajs/react";
import InvoiceCard from "@/Components/Invoice/InvoiceCard";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
} from "@material-tailwind/react";

import { PlusIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";

export default function Index({ auth, invoices }) {
  console.log(invoices)
  return (
    <div>
      <AuthenticatedLayout
        user={auth.user}
        header={
          <Typography variant="h4">Invoices</Typography>
        }
      >
        <Head title="Billing" />

        <section className="max-w-4xl !mx-auto px-8 py-20 w-full">
          <Card shadow={false}>
            <CardHeader
              floated={false}
              shadow={false}
              className="rounded-none flex gap-2 flex-col md:flex-row items-start !justify-between"
            >
              <div className="w-full mb-2">
                <Typography className="!font-bold" color="blue-gray">
                  Billing Information
                </Typography>
                <Typography
                  className="mt-1 !font-normal !text-gray-600"
                  variant="small"
                >
                  View and update your billing details quickly and easily.
                </Typography>
              </div>
              <div className="w-full">
                <Link href="/invoice/create">
                  <Button
                    size="sm"
                    variant="outlined"
                    color="gray"
                    className="flex justify-center gap-3 md:max-w-fit w-full ml-auto"
                  >
                    <PlusIcon strokeWidth={3} className="h-4 w-4" />
                    Create
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardBody className="flex flex-col gap-4 !p-4">
              {invoices.map((customer) => (
                customer.invoices.map((invoice) => (
                  <InvoiceCard
                    key={invoice.id}
                    customer={customer.name}
                    truck={customer.trucks[0].truck}
                    services={invoice.services.map(service => ({
                      description: service.description,
                      total: service.total
                    }))}
                    total={invoice.total}
                    invoiceId={invoice.id}
                  />
                ))
              ))}
            </CardBody>
          </Card>
        </section>

      </AuthenticatedLayout>
    </div>
  )
}
