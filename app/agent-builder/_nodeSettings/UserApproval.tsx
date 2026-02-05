import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

function UserApproval({ selectedNode, updateFormData }: any) {
    useEffect(() => {
        selectedNode && setFormData(selectedNode?.data?.settings)
    }, [selectedNode]);
    const handleChange = (key: string, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value
        }))
    }
    const onSave = () => {

        console.log('Saved Data:', formData);
        updateFormData(formData);
        toast.success('Agent settings saved successfully!');

    }
    const [formData, setFormData] = useState({ name: '', message: ' ' })
    return (
        <div>
            <h2 className='font-bold'>User Approval</h2>
            <p className='text-gray-500 mt-1'>Approve or Reject the workflow</p>
            <div className='mt-3 space-y-1 '>
                <Label>Name</Label>
                <Input placeholder='Name' value={formData?.name} onChange={(event) => handleChange('name', event.target.value)} />
            </div>
            <div className='mt-3 space-y-1 '>
                <Label>Message</Label>
                <Textarea placeholder='Describe the message to show to the user' value={formData?.message} onChange={(event) => handleChange('message', event.target.value)} />
            </div>
            <Button className='w-full mt-5  ' onClick={onSave}>Save</Button>
        </div>
    )
}

export default UserApproval
