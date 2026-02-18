import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import React from 'react'
import ThemeToggle from '@/components/theme-toggle'

function AppHeader() {
    return (
        <div className='flex justify-between items-center w-full p-4 shadow bg-sidebar'>
            <SidebarTrigger />
            <div className='flex items-center gap-3'>
                <ThemeToggle className='h-9 rounded-lg' />
                <UserButton />
            </div>
        </div>
    )
}

export default AppHeader
