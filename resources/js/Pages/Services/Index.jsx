import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { usePage } from '@inertiajs/react'
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import { useForm } from "@inertiajs/react";
import { Alert } from "@material-tailwind/react";
import { Card, Typography, Tooltip, IconButton } from "@material-tailwind/react";
import ServiceDialog from "./Dialog";
import { PlusIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";
import DialogConfirm from "./DialogConfirm";

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
        id: '',
        name: '',
        description: '',
        parts: '',
        labor: '',
        total: '',
        image: null,
    });

    console.log("Errors", errors);  

    const handleOpen = (op, id, name, description, parts, labor, total, image) => {
        setOpen(true);
        setOperation(op);
        setData({ 
            name: '',
            description: '',
            parts: '',
            labor: '',
            total: '',
            image: null,
        });
        if (op === 1) {
            setTitle("Add new service");
        } else {
            setTitle("Edit Service");
            setData({
                id: id, 
                name: name,
                description: description,
                parts: parts,
                labor: labor,
                total: total,
                image: image,
            });
        }
    };

    useEffect(() => {
        // Mostrar mensajes flash solo una vez cuando cambian
        if (flash.message) {
            toast.success('Success', {
                description: flash.message,
            });
        }
    }, [flash.message]);

    const handleClose = () => {
        setOpen(false);
    };

    const save = (e) => {
        e.preventDefault(); 
        console.log("Datos", data);
        if (operation === 1) {
            post(route("service.store"), {
                onSuccess: () => { success(); },
                onError: () => { error(); },
                forceFormData: true
            });
        } else {
            put(route('service.update', data.id), data, {
                onSuccess: () => { success(); },
                onError: () => { error(); },
                forceFormData: true
            });
        }
    };

    const success = () => {
        setOpen(false);
    };

    const error = () => {
        // if (errors.name) {
        //     reset('name');
        //     NameInput.current.focus();
        // }
        // if (errors.cost) {
        //     reset('cost');
        //     CostInput.current.focus();
        // }
        toast.error('Error', {
            description: 'Failed to create the service.'
        });
    };

    const ok = () => {
        setOpen1(false);
        setServiceSelected(null);
    }

    const [open1, setOpen1] = useState(false)
    const handleDelete = () => {
        destroy(route('service.destroy', serviceSelected.id), { 
            onSuccess: () => { ok(); } 
        })
        setOpen(false)
    };

    const [serviceSelected, setServiceSelected] = useState(null);

    const handleSelect = (srv) => {
        setOpen1(true);
        setServiceSelected(srv);
        console.log(serviceSelected);
    };

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

            {/* {flash.message && (
                <Alert className="mt-3">{flash.message}</Alert>
            )} */}
            
            <Button
                size="sm"
                variant="outlined"
                color="gray"
                className="flex justify-center gap-3 md:max-w-fit w-full ml-6 mt-12 mb-6"
                onClick={() => handleOpen(1)}
                >
                <PlusIcon strokeWidth={3} className="h-4 w-4" />
                Create
            </Button>

            <div className="">


                <Card className="mx-6 mb-10">
                    <table className="text-left">
                        <thead>
                            <tr>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 rounded-tl-xl">
                                    Service
                                </th>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    Parts
                                </th>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    Labor
                                </th>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    Total
                                </th>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 rounded-tr-xl">
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
                                            {service.parts}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {service.labor}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {service.total}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        {/* <Tooltip content="Edit Service">
                                            <IconButton 
                                                variant="text"
                                                onClick={() => handleOpen(2, service.id, service.description, service.parts, service.labor, service.total, service.image)}
                                            >
                                                <PencilIcon className="h-4 w-4" />
                                            </IconButton>
                                        </Tooltip> */}
                                        <Tooltip content="Remove Service">
                                            <IconButton 
                                                variant="text"
                                                onClick={() => handleSelect(service)}
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                            </IconButton>
                                        </Tooltip>
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
                save={save}
                title={title}
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
            />

            {serviceSelected && (
                <DialogConfirm 
                    open={open1} 
                    setOpen={setOpen1} 
                    service={serviceSelected}
                    handleDelete={handleDelete}
                />
            )}

        </AuthenticatedLayout>
    );
}
