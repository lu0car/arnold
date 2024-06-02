import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { usePage } from '@inertiajs/react'
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useRef, useState } from "react";
import { useForm } from "@inertiajs/react";
import { Alert } from "@material-tailwind/react";
import { Card, Typography, Tooltip, IconButton } from "@material-tailwind/react";
import ServiceDialog from "./Dialog";

export default function Dashboard({ auth, services }) {
    const { flash } = usePage().props
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [operation, setOperation] = useState(1);
    const NameInput = useRef();
    const CostInput = useRef();
    const {
        data,
        setData,
        delete: destroy,
        post,
        put,
        processing,
        reset,
        errors,
    } = useForm({
        id: "",
        name: "",
        cost: "",
    });

    const handleOpen = (op, id, name, cost) => {
        setOpen(true);
        setOperation(op);
        setData({ name: "", cost: "" });
        if (op === 1) {
            setTitle("Add new service");
        } else {
            setTitle("Edit Service");
            setData({ id: id, name: name, cost: cost });
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const save = (e) => {
        e.preventDefault();
        if (operation === 1) {
            post(route("service.store"), {
                onSuccess: () => { handleClose(); },
                onError: () => {
                    if (errors.make) {
                        reset("name");
                        NameInput.current.focus();
                    }
                    if (errors.model) {
                        reset("cost");
                        CostInput.current.focus();
                    }
                },
            });
        } else {
            put(route('service.update', data.id), {
                onSuccess: () => { handleClose(); },
                onError: () => {
                    if (errors.name) {
                        reset('name');
                        NameInput.current.focus();
                    }
                    if (errors.cost) {
                        reset('cost');
                        CostInput.current.focus();
                    }
                }
            });
        }
    };

    const eliminar = (id, name) => {
        destroy(route('service.destroy', id), { onSuccess: () => { ok('Service deleted') } })
    }

    const ok = (mensaje) => {
        reset();
        handleClose();
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Services
                </h2>
            }
        >
            <Head title="Services" />

            {flash.message && (
                <Alert className="mt-3">{flash.message}</Alert>
            )}

            <div className="">
                <Button
                    onClick={() => handleOpen(1)}
                    className="rounded-full mx-6 my-3"
                >
                    Create
                </Button>

                <Card className="mx-6 mb-10">
                    <table className="text-left">
                        <thead>
                            <tr>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        Name of service
                                    </Typography>
                                </th>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    Cost
                                </th>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service) => (
                                <tr
                                    key={service.id}
                                    className="even:bg-blue-gray-50/50"
                                >
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {service.name}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {service.cost}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <button onClick={() => handleOpen(2, service.id, service.name, service.cost,)}>
                                            <Tooltip content="Edit Service">
                                                <IconButton variant="text">
                                                    <PencilIcon className="h-4 w-4" />
                                                </IconButton>
                                            </Tooltip>
                                        </button>
                                        <button onClick={() => eliminar(service.id)}>
                                            <Tooltip content="Remove Service">
                                                <IconButton variant="text">
                                                    <TrashIcon className="h-4 w-4" />
                                                </IconButton>
                                            </Tooltip>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </div>

            <ServiceDialog
                open={open}
                onClose={handleClose}
                onSubmit={save}
                title={title}
                data={{ data, setData }}
                errors={errors}
                processing={processing}
            />
        </AuthenticatedLayout>
    );
}
