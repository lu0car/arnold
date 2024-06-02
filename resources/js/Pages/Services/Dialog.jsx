// ServiceDialog.jsx
import React from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

const ServiceDialog = ({ open, onClose, onSubmit, title, data, errors, processing }) => {
    const NameInput = React.useRef();
    const CostInput = React.useRef();

    const save = (e) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <Dialog open={open} handler={onClose}>
            <DialogHeader>{title}</DialogHeader>
            <DialogBody>
                <form onSubmit={save} className="p-6">
                    <div className="mt-6">
                        <InputLabel htmlFor="name" value="Name of service"></InputLabel>
                        <TextInput
                            id="name"
                            name="name"
                            ref={NameInput}
                            value={data.name}
                            required="required"
                            onChange={(e) => data.setData('name', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                        ></TextInput>
                        <InputError message={errors.name} className="mt-2"></InputError>
                    </div>
                    <div className="mt-6">
                        <InputLabel htmlFor="cost" value="Cost"></InputLabel>
                        <TextInput
                            id="cost"
                            name="cost"
                            ref={CostInput}
                            value={data.cost}
                            required="required"
                            onChange={(e) => data.setData('cost', e.target.value)}
                            className="mt-1 block w-3/4"
                        ></TextInput>
                        <InputError message={errors.cost} className="mt-2"></InputError>
                    </div>
                </form>
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={onClose}
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
                <PrimaryButton processing={processing} onClick={save}>
                    <i className="fa-solid fa-save"></i>Save
                </PrimaryButton>
            </DialogFooter>
        </Dialog>
    );
};

export default ServiceDialog;