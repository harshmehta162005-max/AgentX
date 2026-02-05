import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

function WhileSettings({ selectedNode, updateFormData }: any) {
    useEffect(() => {
        selectedNode && setFormData(selectedNode?.data?.settings)
    }, [selectedNode]);
    const [formData, setFormData] = useState({ whileCondition: '' })
    return (
        <div>
            <h2 className='font-bold'>While</h2>
            <p className='text-gray-500 mt-1'>Define a while loop condition for your workflow</p>
            <div className='mt-3 '>
                <Label>Condition</Label>
                <Input placeholder='Enter condition e.g output=="any condition"'
                    value={formData?.whileCondition}
                    className='mt-2 ' onChange={(e) => setFormData({ whileCondition: e.target.value })} />
            </div>
            <Button className='w-full mt-5 ' onClick={() => { updateFormData(formData); toast.success("Settings saved successfully!") }}>Save</Button>
        </div>
    )
}

export default WhileSettings
