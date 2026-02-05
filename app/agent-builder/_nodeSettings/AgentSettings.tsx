import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { FileJson } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

function AgentSettings({ selectedNode, updateFormData }: any) {
    const [formData, setFormData] = useState({
        name: '',
        instruction: '',
        includeHistory: true,
        model: 'gemini-flash-1.5',
        output: 'Text',
        schema: ''
    });
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

    return (
        <div>
            <h2 className='font-bold'>Agent</h2>
            <p className='text-gray-500 mt-1'>Call the AI model with your instructions</p>
            <div className='mt-3 space-y-1 '>
                <Label>Name</Label>
                <Input placeholder='Agent Name' value={formData?.name} onChange={(event) => handleChange('name', event.target.value)} />
            </div>
            <div className='mt-3 space-y-1 '>
                <Label>Instructions</Label>
                <Textarea placeholder='Agent Instructions' value={formData?.instruction} onChange={(event) => handleChange('instruction', event.target.value)} />
                <h2 className='text-sm p-1 flex gap-2 items-center '>Add Context <FileJson className='h-3 w-3 ' /></h2>
            </div>
            <div className='mt-3 flex items-center justify-between '>
                <Label>Include Chat History</Label>
                <Switch checked={formData?.includeHistory} onCheckedChange={(checked)  => handleChange('includeHistory', checked)} />
            </div>
            <div className='mt-3 flex justify-between items-center '>
                <Label>Model</Label>
                <Select value={formData?.model} onValueChange={(value) => handleChange('model', value)}>
                    <SelectTrigger>
                        <SelectValue placeholder='gemini flash 1.5'></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="gemini-flash-1.5">Gemini Flash 1.5</SelectItem>
                        <SelectItem value="gemini-flash-1.5">Gemini Flash 1.5</SelectItem>
                        <SelectItem value="gemini-flash-1.5">Gemini Flash 1.5</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className='mt-3 space-y-2 '>
                <Label>Output Format</Label>
                <Tabs defaultValue="Text" className="w-100" value={formData?.output} onValueChange={(value) => handleChange('output', value)}>
                    <TabsList>
                        <TabsTrigger value="Text">Text</TabsTrigger>
                        <TabsTrigger value="Json">Json</TabsTrigger>
                    </TabsList>
                    <TabsContent value="Text"><h2 className='text-sm text-gray-500 '>Output in text format</h2></TabsContent>
                    <TabsContent value="Json">
                        <Label className='text-sm text-gray-500 '>Enter Json Schema</Label>
                        <Textarea placeholder='{"name":"string","age":"number"}' className=' max-w-75 mt-1' value={formData?.schema} onChange={(event) => handleChange('schema', event.target.value)} />
                    </TabsContent>
                </Tabs>

            </div>
            <Button className='w-full mt-5  ' onClick={onSave}>Save</Button>
        </div>
    )
}

export default AgentSettings
