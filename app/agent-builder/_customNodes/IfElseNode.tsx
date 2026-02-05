import { Input } from '@/components/ui/input'
import { Handle, Position } from '@xyflow/react'
const handleStyle = { top: 110 };
import { Merge } from 'lucide-react'
import React from 'react'

function IfElseNode({ data }: any) {
    return (
        <div className='bg-white rounded-2xl p-2 px-3 border'>
            <div className='flex gap-2 items-center '>
                <Merge className='p-2 rounded-lg h-8 w-8 '

                    style={{ backgroundColor: data?.bgColor || '#FFF3CD' }}
                />
                <h2>IfElse</h2>
            </div>
            <div className='max-w-35 flex flex-col gap-2 mt-2'>
                <Input placeholder='If Condition' className='text-sm bg-white ' disabled={true}/>
                <Input placeholder='Else Condition' className='text-sm bg-white ' disabled={true}/>
            </div>
            <Handle type='target' position={Position.Left} />
            <Handle type='source' position={Position.Right} id={'if'}/>
            <Handle type='source' position={Position.Right} id={'else'}
            style={handleStyle}
            />

        </div>
    )
}

export default IfElseNode
