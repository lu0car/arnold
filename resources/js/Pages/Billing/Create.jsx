import React, { useState } from 'react';
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button, Card, IconButton, Input, Textarea, Tooltip, Typography } from '@material-tailwind/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const TABLE_HEAD = ["Description", "Rate", "Total", ""];

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        billingTo: '',
        items: [{ description: '', rate: '', total: '' }],
    });


    const [totalAmount, setTotalAmount] = useState(0);

    const handleChange = (e, index, field) => {
        const newItems = [...data.items];
        newItems[index][field] = e.target.value;
        setData('items', newItems);
        calculateTotal();
    };

    const addRow = () => {
        setData('items', [...data.items, { description: '', rate: '', total: '' }]);
    };

    const removeRow = (index) => {
        const newItems = [...data.items];
        newItems.splice(index, 1);
        setData('items', newItems);
        calculateTotal();
    };

    const calculateTotal = () => {
        const total = data.items.reduce((acc, item) => acc + parseFloat(item.total || 0), 0);
        setTotalAmount(total);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        // post('/invoice', data);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Billing
                </h2>
            }
        >

            <Head title="Billing" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl">
                        <div className="p-6 text-gray-900">
                            <div className="my-6 flex gap-4">
                                <div className="">
                                    <InputLabel htmlFor="billingTo" className="block font-medium mb-2">
                                        Customer:
                                    </InputLabel>
                                    <TextInput
                                        type="text"
                                        id="billingTo"
                                        value={data.billingTo}
                                        onChange={(e) => setData('billingTo', e.target.value)}
                                    // className="border border-gray-300 rounded px-3 py-2 w-1/2"
                                    />
                                    {errors.billingTo && <p className="text-red-500">{errors.billingTo}</p>}
                                </div>
                                <div className="mt-7 flex justify-end">
                                    <Button

                                        size="md"
                                        variant="filled"
                                        color="gray"

                                        type='submit'
                                    // onClick={handleSubmit}
                                    >
                                        Create
                                    </Button>
                                </div>

                            </div>

                            <label className="block font-medium mb-2">Detail:</label>
                            <>
                                <form onSubmit={handleSubmit}>
                                    {data.items.map((item, index) => (
                                        <div className="flex items-center mb-2 gap-8 my-4" key={index}>
                                            <div className="flex-1">
                                                <InputLabel htmlFor="description" className="block font-medium mb-2">
                                                    Service description
                                                </InputLabel>
                                                <TextInput
                                                    type="text"
                                                    value={item.description}
                                                    onChange={(e) => handleChange(e, index, 'description')}
                                                    className="w-full"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <InputLabel htmlFor="rate" className="block font-medium mb-2">
                                                    Rate
                                                </InputLabel>
                                                <TextInput
                                                    type="number"
                                                    value={item.rate}
                                                    onChange={(e) => handleChange(e, index, 'rate')}
                                                    className="w-full"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <InputLabel htmlFor="billingTo" className="block font-medium mb-2">
                                                    Total
                                                </InputLabel>
                                                <TextInput
                                                    type="number"
                                                    value={item.total}
                                                    onChange={(e) => handleChange(e, index, 'total')}
                                                    className="w-full"
                                                />
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
                                                Add
                                            </Button>
                                        </div>
                                    </div>

                                </form>
                            </>
                            <div className="flex mb-4 justify-end">
                                <div>
                                    <InputLabel className="block font-semibold mb-2">Grand total</InputLabel>
                                    <TextInput
                                        className="w-28"
                                        type="text"
                                        value={totalAmount.toFixed(2)}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout >
    );
};