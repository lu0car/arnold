import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { usePage } from '@inertiajs/react'
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import { Button } from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useRef, useState } from "react";
import { useForm } from "@inertiajs/react";
import { Alert } from "@material-tailwind/react";
import {
    Card,
    Typography,
    Tooltip,
    IconButton,
} from "@material-tailwind/react";

export default function Dashboard({ auth, services }) {
    const { flash } = usePage().props
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState("");
    const [operation,setOperation] = useState(1);
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
    const openModal = (op,id,name,cost) => {
        setModal(true);
        setOperation(op);
        setData({ name: "", cost: "" });
        if (op === 1) {
            setTitle("Add new service");
        } else {
            setTitle("Edit Service");
            setData({ id: id, name: name, cost: cost });
        }
    };
    const closeModal = () => {
        setModal(false);
    };
    const save = (e) => {
        e.preventDefault();
        if (operation === 1) {
            post(route("service.store"), {
                onSuccess: () => { closeModal()},
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
        }
        else{
            put(route('service.update',data.id),{
                onSuccess: () => { closeModal()},
                onError: () => {
                    if(errors.name){
                        reset('name');
                        NameInput.current.focus();
                    }
                    if(errors.cost){
                        reset('cost');
                        CostInput.current.focus();
                    }
                }
            });
        }
    };
    const eliminar = (id, name) =>{
        // const alerta = Swal.mixin({ buttonsStyling:true});
        // alerta.fire({
        //     title:'Seguro de eliminar el auto '+name,
        //     text:'Se perderá el auto',
        //     icon:'question', showCancelButton:true,
        //     confirmButtonText: '<i class="fa-solid fa-check"></i> Si, eliminar',
        //     cancelButtonText:'<i class="fa-solid fa-ban"></i> Cancelr'
        // }).then((result) => {
        //     if(result.isConfirmed){
        //         destroy(route('cars.destroy',id),
        //         {onSuccess: () =>{ok('Auto eliminado')}});
        //     }
        // });
        destroy(route('service.destroy',id),
            {onSuccess: () =>{ok('Auto eliminado')}
        })
    }
    const ok = (mensaje) =>{
        reset();
        closeModal();
        // Swal.fire({title:mensaje,icon:'success'});
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
                {/* <Link href="/"> */}
                <Button
                    onClick={() => openModal(1)}
                    className="rounded-full mx-6 my-3"
                >
                    Create
                </Button>
                {/* </Link>  */}

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
                                        <button onClick={() =>openModal(2,service.id,service.name,service.cost,)}>
                                            <Tooltip content="Edit Service">
                                                <IconButton variant="text">
                                                    <PencilIcon className="h-4 w-4" />
                                                </IconButton>
                                            </Tooltip>
                                        </button>
                                        <button onClick={() =>eliminar(service.id)}>
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
            <Modal show={modal} onClose={closeModal}>
                <h2 className="p-3 text-lg font-medium text-gray-900">
                    {title}
                </h2>
                <form onSubmit={save} className="p-6">
                    <div className="mt-6">
                        <InputLabel for="name" value="Name of service"></InputLabel>
                        <TextInput
                            id="name"
                            name="name"
                            ref={NameInput}
                            value={data.name}
                            required="required"
                            onChange={(e) =>
                                setData('name', e.target.value)
                            }
                            className="mt-1 block w-3/4"
                            isFocused
                        ></TextInput>
                        <InputError
                            message={errors.name}
                            classNamemt-2
                        ></InputError>
                    </div>
                    <div className='mt-6'>
                        <InputLabel for="cost" value="Cost"></InputLabel>
                        <TextInput id="cost" name="cost" ref={CostInput}
                        value={data.cost} required='required'
                        onChange={(e) => setData('cost',e.target.value)}
                        className="mt-1 block w-3/4"></TextInput>
                        <InputError message={errors.model} classNamemt-2></InputError>
                    </div>
                    {/* <div className='mt-6'>
                        <InputLabel for="color" value="Color"></InputLabel>
                        <Select id="color" name="color" ref={ColorInput}
                        value={data.color} required='required'
                        handleChange={(e) => setData('color',e.target.value)}
                        className="mt-1 block w-3/4"
                        options={['gray','red','yellow','green','purple']}></Select>
                        <InputError message={errors.model} classNamemt-2></InputError>
                    </div> */}
                    <div className="mt-6">
                        <PrimaryButton processing={processing} className="mt-2">
                            <i className="fa-solid fa-save"></i>Save
                        </PrimaryButton>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <PrimaryButton onClick={closeModal}>
                            Cancel
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
