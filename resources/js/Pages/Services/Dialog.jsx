import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextArea from '@/Components/TextArea';

const ServiceDialog = ({ open, onClose, save, title, data, setData, errors, processing }) => {
    const nameInput = useRef();
    const descriptionInput = useRef();
    const partsInput = useRef();
    const laborInput = useRef();
    const imageInput = useRef();

    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        // reset();
        setFile(null);
        setPreviewUrl(null);
    }, [onClose])


    // const save = (e) => {
    //     e.preventDefault();
    //     onSubmit();
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));

        // Calcular el total automáticamente
        if (name === 'parts' || name === 'labor') {
            const parts = parseFloat(name === 'parts' ? value : data.parts) || 0;
            const labor = parseFloat(name === 'labor' ? value : data.labor) || 0;
            setData(prevData => ({
                ...prevData,
                total: (parts + labor).toFixed(2)
            }));
        }
    };

    const handleFileChange = (event) => {
        if (!event.target.files) return;

        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        setData(prevData => ({
            ...prevData,
            image: selectedFile
        }));

        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    setPreviewUrl(reader.result);
                }
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setPreviewUrl(null);
        }
    };

    return (
        <Dialog open={open} handler={onClose}>
            <DialogHeader>{title}</DialogHeader>
            <DialogBody>
                <form onSubmit={save} className="p-6">
                    <div className="mt-6">
                        <InputLabel htmlFor="name" value="Name of service" />
                        <TextInput
                            id="name"
                            name="name"
                            ref={nameInput}
                            value={data.name}
                            onChange={handleChange}
                            className="mt-1 block w-full"
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="mt-6">
                        <InputLabel htmlFor="description" value="Service description" />
                        <TextArea
                            id="description"
                            name="description"
                            ref={descriptionInput}
                            value={data.description}
                            onChange={handleChange}
                            className="mt-1 block w-full"
                            required
                        />
                        <InputError message={errors.description} className="mt-2" />
                    </div>

                    <div className='flex gap-2 my-4'>
                        <div className="w-1/2">
                            <InputLabel htmlFor="parts" value="Parts Cost" />
                            <TextInput
                                id="parts"
                                name="parts"
                                type="number"
                                step="0.01"
                                ref={partsInput}
                                value={data.parts}
                                onChange={handleChange}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors.parts} className="mt-2" />
                        </div>

                        <div className="w-1/2">
                            <InputLabel htmlFor="labor" value="Labor Cost" />
                            <TextInput
                                id="labor"
                                name="labor"
                                type="number"
                                step="0.01"
                                ref={laborInput}
                                value={data.labor}
                                onChange={handleChange}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors.labor} className="mt-2" />
                        </div>
                    </div>

                    {/* <div className="mt-6">
                        <InputLabel htmlFor="total" value="Total" />
                        <TextInput
                            id="total"
                            name="total"
                            type="number"
                            step="0.01"
                            value={data.total}
                            className="mt-1 block w-full"
                            disabled
                        />
                    </div> */}

                    {/* <div className="mt-6">
                        <InputLabel htmlFor="image" value="Image" />
                        <input
                            id="image"
                            name="image"
                            type="file"
                            onChange={(e) => setData('image', e.target.files[0])}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.image} className="mt-2" />
                    </div> */}
                    <section className="container w-full mx-auto items-center py-2">
                            <div className="">
                                <div className="px-4 py-6">
                                    <div
                                        className="w-full p-6 mb-4 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer"
                                        onClick={() => document.getElementById('image')?.click()}
                                    >
                                        <input
                                            id="image"
                                            type="file"
                                            name="image"
                                            ref={imageInput}
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                        {previewUrl ? (
                                            <img src={previewUrl} className="max-h-48 rounded-lg mx-auto" alt="Image preview" />
                                        ) : (
                                            <>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="w-8 h-8 text-gray-700 mx-auto mb-4"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                                                    />
                                                </svg>
                                                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700">Upload picture</h5>
                                                <p className="font-normal text-sm text-gray-400 md:px-6">
                                                    Choose photo size should be less than <b className="text-gray-600">2mb</b>
                                                </p>
                                                <p className="font-normal text-sm text-gray-400 md:px-6">
                                                    and should be in <b className="text-gray-600">JPG, PNG, or GIF</b> format.
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <InputError message={errors.image} className="mt-2" />
                        </section>
                </form>
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="outlined"
                    color="red"
                    onClick={onClose}
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
                <Button 

                    processing={processing}
                    onClick={save}
                >
                    <i className="fa-solid fa-save"></i> Save
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default ServiceDialog;