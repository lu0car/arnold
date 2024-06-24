import React, { useEffect, useState } from 'react';
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button, Card, IconButton, Input, Tab, TabPanel, Tabs, TabsBody, TabsHeader, Textarea, Tooltip, Typography } from '@material-tailwind/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Cog6ToothIcon, Square3Stack3DIcon, TruckIcon, UserCircleIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/solid';
import { toast } from 'sonner';
import TextArea from '@/Components/TextArea';

export default function Edit({ auth, invoice }) {
    const { data, setData, patch, processing, errors, onSuccess, onError } = useForm({
        customerName: invoice.customer.name,
        phoneNumber: invoice.customer.phone_number,
        observations: invoice.observations,
        services: invoice.services.map(service => ({
            description: service.description,
            parts: service.parts,
            labor: service.labor,
            total: service.total
        })),
        truck: {
            tagNumber: invoice.customer.trucks[0]?.tag_number || '',
            binNumber: invoice.customer.trucks[0]?.bin_number || '',
            truck: invoice.customer.trucks[0]?.truck || ''
        },
        total: {
            subtotal: invoice.subtotal,
            taxes: invoice.taxes,
            total: invoice.total
        }
    });


    const [totalAmount, setTotalAmount] = useState(0);
    const taxRate = 6; //

    const handleChange = (e, index, field) => {
        const newServices = [...data.services];
        newServices[index][field] = e.target.value;
        // Calcula el total de la fila
        const parts = parseFloat(newServices[index].parts) || 0;
        const labor = parseFloat(newServices[index].labor) || 0;
        newServices[index].total = parts + labor;
        setData('services', newServices);
    };

    const addRow = () => {
        setData('services', [
            ...data.services,
            {
                description: '',
                parts: '',
                labor: '',
                total: ''
            }
        ]);
    };

    const removeRow = (index) => {
        const newServices = [...data.services];
        newServices.splice(index, 1);
        setData('services', newServices);
    };

    useEffect(() => {
        // Calcula el subtotal
        const subtotal = data.services.reduce((acc, service) => acc + parseFloat(service.total || 0), 0);
        // Calcula los impuestos
        const taxes = subtotal * (taxRate / 100);
        // Calcula el total general
        const total = subtotal + taxes;

        // Actualiza el estado del total
        setTotalAmount(total);

        // Actualiza el objeto de datos con la información total
        setData({
            ...data,
            total: {
                subtotal: subtotal.toFixed(2),
                taxes: taxes.toFixed(2),
                total: total.toFixed(2)
            }
        });
    }, [data.services]);

    const renderTotal = () => {
        if (!data.total) return null;
        return (
            <div className="w-52">
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                        <p className="font-semibold">Subtotal:</p>
                        <p>{data.total.subtotal}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-semibold">Taxes ({taxRate}%):</p>
                        <p>{data.total.taxes}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-semibold">Total:</p>
                        <p>{data.total.total}</p>
                    </div>
                </div>
            </div>
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(`/invoice/${invoice.id}`, {
            onSuccess: () => { ok(); },
            onError: () => { error(); },
        });
    };

    const ok = () => {
        toast.success('Success', {
            description: 'Invoice has been updated successfully',
        });
    };

    const error = () => {
        toast.error('Error', {
            description: 'Failed to update invoice. Please check the form and try again.',
        });
    };

    const tabs = [
        {
            label: "Customer",
            value: "customer",
            icon: UserCircleIcon,
        },
        {
            label: "Truck",
            value: "truck",
            icon: TruckIcon,
        },
        {
            label: "Services",
            value: "services",
            icon: WrenchScrewdriverIcon,
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create invoice
                </h2>
            }
        >

            <Head title="Billing" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl">
                        <div className="p-6 text-gray-900">
                            <Tabs value="customer">
                                <TabsHeader>
                                    {tabs.map(({ label, value, icon }) => (
                                        <Tab key={value} value={value}>
                                            <div className="flex items-center gap-2">
                                                {React.createElement(icon, { className: "w-5 h-5" })}
                                                {label}
                                            </div>
                                        </Tab>
                                    ))}
                                </TabsHeader>
                                <TabsBody>
                                    <TabPanel key='customer' value='customer'>
                                        {/* <Typography variant="h5">Customer Information</Typography> */}
                                        <div className="my-6 flex gap-4">
                                            <div className="">
                                                <InputLabel htmlFor="customerName" className="block font-medium mb-2">
                                                    Customer
                                                </InputLabel>
                                                <TextInput
                                                    type="text"
                                                    id="customerName"
                                                    value={data.customerName}
                                                    onChange={(e) => setData('customerName', e.target.value)}
                                                />
                                                {errors.customerName && <p className="text-red-500">{errors.customerName}</p>}
                                            </div>
                                            <div className="">
                                                <InputLabel htmlFor="phoneNumber" className="block font-medium mb-2">
                                                    Phone number
                                                </InputLabel>
                                                <TextInput
                                                    type="text"
                                                    id="phoneNumber"
                                                    value={data.phoneNumber}
                                                    onChange={(e) => setData('phoneNumber', e.target.value)}
                                                />
                                                {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel key='truck' value='truck'>
                                        <div className="my-6 flex gap-4">
                                            <div className="">
                                                <InputLabel htmlFor="truck" className="block font-medium mb-2">
                                                    Truck
                                                </InputLabel>
                                                <TextInput
                                                    type="text"
                                                    id="truck"
                                                    value={data.truck.truck}
                                                    onChange={(e) => setData('truck', { ...data.truck, truck: e.target.value })}
                                                />
                                                {errors['truck.truck'] && <p className="text-red-500">{errors['truck.truck']}</p>}
                                            </div>
                                            <div className="">
                                                <InputLabel htmlFor="tagNumber" className="block font-medium mb-2">
                                                    Tag number
                                                </InputLabel>
                                                <TextInput
                                                    type="text"
                                                    id="tagNumber"
                                                    value={data.truck.tagNumber}
                                                    onChange={(e) => setData('truck', { ...data.truck, tagNumber: e.target.value })}
                                                />
                                                {errors['truck.tagNumber'] && <p className="text-red-500">{errors['truck.tagNumber']}</p>}
                                            </div>
                                            <div className="">
                                                <InputLabel htmlFor="binNumber" className="block font-medium mb-2">
                                                    VIN number
                                                </InputLabel>
                                                <TextInput
                                                    type="text"
                                                    id="binNumber"
                                                    value={data.truck.binNumber}
                                                    onChange={(e) => setData('truck', { ...data.truck, binNumber: e.target.value })}
                                                />
                                                {errors['truck.binNumber'] && <p className="text-red-500">{errors['truck.binNumber']}</p>}
                                            </div>

                                        </div>
                                    </TabPanel>
                                    <TabPanel key='services' value='services'>
                                        <div>
                                            <form onSubmit={handleSubmit}>
                                                <InputLabel htmlFor="observations" className="block font-medium mb-2">
                                                    Observations
                                                </InputLabel>
                                                <TextArea 
                                                    type="text"
                                                    id="observations"
                                                    value={data.observations}
                                                    onChange={(e) => setData('observations', e.target.value)}
                                                />
                                                {data.services.map((service, index) => (
                                                    <div className="flex items-center mb-2 gap-8 my-8" key={index}>
                                                        <div className="flex-1">
                                                            <InputLabel htmlFor="description" className="block font-medium mb-2">
                                                                Service description
                                                            </InputLabel>
                                                            <TextInput
                                                                type="text"
                                                                value={service.description}
                                                                onChange={(e) => handleChange(e, index, 'description')}
                                                                className="w-full"
                                                            />
                                                            {errors[`services.${index}.description`] && (
                                                                <p className="text-red-500">{errors[`services.${index}.description`]}</p>
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <InputLabel htmlFor="parts" className="block font-medium mb-2">
                                                                Parts
                                                            </InputLabel>
                                                            <TextInput
                                                                type="number"
                                                                value={service.parts}
                                                                onChange={(e) => handleChange(e, index, 'parts')}
                                                                className="w-full"
                                                            />
                                                            {errors[`services.${index}.parts`] && (
                                                                <p className="text-red-500">{errors[`services.${index}.parts`]}</p>
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <InputLabel htmlFor="parts" className="block font-medium mb-2">
                                                                Labor
                                                            </InputLabel>
                                                            <TextInput
                                                                type="number"
                                                                value={service.labor}
                                                                onChange={(e) => handleChange(e, index, 'labor')}
                                                                className="w-full"
                                                            />
                                                            {errors[`services.${index}.labor`] && (
                                                                <p className="text-red-500">{errors[`services.${index}.labor`]}</p>
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <InputLabel htmlFor="" className="block font-medium mb-2">
                                                                Total
                                                            </InputLabel>
                                                            <TextInput
                                                                disabled
                                                                type="number"
                                                                value={service.total}
                                                                className="w-full"
                                                            />
                                                            {errors[`services.${index}.total`] && (
                                                                <p className="text-red-500">{errors[`services.${index}.total`]}</p>
                                                            )}
                                                        </div>
                                                        <div className="mt-6">
                                                            <Button
                                                                size="sm"
                                                                variant="text"
                                                                color="red"
                                                                className="flex items-center gap-2"
                                                                onClick={() => removeRow(index)}
                                                            >
                                                                <Tooltip content="Remove">
                                                                    <TrashIcon className="h-4 w-4 text-red-500" />
                                                                </Tooltip>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className="justify-start inline-flex gap-4 mt-12">
                                                    <div>
                                                        <Button
                                                            size="sm"
                                                            variant="outlined"
                                                            color="gray"
                                                            className="flex justify-center gap-3 md:max-w-fit w-full ml-auto"
                                                            onClick={addRow}
                                                        >
                                                            <PlusIcon strokeWidth={3} className="h-4 w-4" />
                                                            Add service
                                                        </Button>
                                                    </div>
                                                </div>

                                            </form>
                                        </div>
                                    </TabPanel>
                                </TabsBody>
                            </Tabs>

                            <div className="flex mb-4 justify-end">
                                {renderTotal()}
                            </div>

                        </div>
                    </div>
                    <div className="mt-7 flex justify-end">
                        <Button

                            size="md"
                            variant="filled"
                            color="gray"

                            type='submit'
                            onClick={handleSubmit}
                        >
                            Update
                        </Button>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout >
    );
};