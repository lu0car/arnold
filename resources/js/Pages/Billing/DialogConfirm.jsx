import React from 'react'
import Modal from '@/Components/Modal'
import { Button, Typography } from '@material-tailwind/react'

export default function DialogConfirm({ open, setOpen, id, handleDelete }) {
  return (
    <div>
      <Modal show={open} onClose={() => setOpen(false)}>
        <div className='p-6'>
          <Typography variant='h5'>Alert!</Typography>
          <p className='py-6'>
            Are sure you want to delete invoice with id: <strong>{id}</strong>?
          </p>
          <div className='flex gap-2 justify-end'>
            <Button variant='outlined' size='sm' onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleDelete} size='sm'>Confirm</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
