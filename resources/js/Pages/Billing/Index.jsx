import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Billing3 from '@/Components/Billing/BillingCard'
import { Typography } from '@material-tailwind/react'
import React from 'react'
import { Head } from "@inertiajs/react";

export default function Index({ auth, services }) {
  return (
    <div>
      <AuthenticatedLayout
        user={auth.user}
        header={
          <Typography variant="h4">Billing</Typography>
        }
      >
        <Head title="Billing" />
        <Billing3 />
      </AuthenticatedLayout>
    </div>
  )
}
