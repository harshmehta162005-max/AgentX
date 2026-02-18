import { Button } from '@/components/ui/button'
import { Agent } from '@/types/AgentType'
import { ChevronLeft, Code2, Play, X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
type Props = {
    agentDetail?: Agent | undefined,
    previewHeader?: boolean,
    onPublish?: () => void,
    onCode?: () => void
}
function Header({ agentDetail, previewHeader = false, onPublish, onCode }: Props) {
    const backHref = previewHeader
        ? `/agent-builder/${agentDetail?.agentId}`
        : "/dashboard/my-agents";

    return (
        <div className='w-full p-3 flex items-center justify-between  '>
            <div className='flex gap-2 items-center '>
                <Link href={backHref}>
                    <Button variant={'ghost'} size={'icon'} aria-label='Go back'>
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                </Link>
                <h2 className='text-xl '>{agentDetail?.name}</h2>
            </div>
            <div className='flex items-center gap-3 '>
                <Button
                    variant={'ghost'}
                    onClick={onCode ?? onPublish}
                    disabled={!onCode && !onPublish}
                >
                    <Code2 /> Code
                </Button>
                {!previewHeader ? <Link href={`/agent-builder/${agentDetail?.agentId}/preview`}>
                    <Button> <Play /> Preview </Button>
                </Link> :
                    <Link href={`/agent-builder/${agentDetail?.agentId}`}>
                        <Button variant={'outline'}> <X />Close Preview </Button>
                    </Link>}
                {onPublish && (
                    <Button onClick={onPublish} disabled={agentDetail?.published}>
                        {agentDetail?.published ? "Published" : "Publish"}
                    </Button>
                )}
            </div>
        </div>
    )
}

export default Header
