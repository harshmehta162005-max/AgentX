"use client"
import React, { useContext, useEffect, useState } from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import Image from 'next/image'
import { title } from 'process'
import { url } from 'inspector'
import { Database, Headphones, LayoutDashboard, WalletCards, User, User2Icon, Gem } from 'lucide-react'
import Link from 'next/link'
import { UserDetailContext } from '@/context/UserDetailContext'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { useConvex } from 'convex/react'
import { api } from '@/convex/_generated/api'


const MenuOptions = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutDashboard,
    }, {
        title: 'AI Agents',
        url: '/dashboard/my-agents',
        icon: Headphones,
    },
    {
        title: 'Data',
        url: '#',
        icon: Database,
    },
    {
        title: 'Pricing',
        url: '/dashboard/pricing',
        icon: WalletCards,
    },
    {
        title: 'Profile',
        url: '/dashboard/profile',
        icon: User2Icon,
    },
]

function AppSidebar() {

    const { open } = useSidebar();
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const path = usePathname();
    const { has } = useAuth();
    const isPaidUser = has && has({ plan: 'unlimited_plan' })
    const convex = useConvex();
    const [totalRemainingCredits, setTotalRemainingCredits] = useState<number>(0);
    useEffect(() => {
        if (!isPaidUser && userDetail) {
            GetUserAgents();
        }
    }, [isPaidUser])
    const GetUserAgents = async () => {
        const result = await convex.query(api.agent.GetUserAgents, {
            userId: userDetail?._id
        })
        setUserDetail((prev: any) => ({ ...prev, totalRemainingCredits: 2 - Number(result?.length || 0) }))
        setTotalRemainingCredits(2 - Number(result?.length || 0));
    }
    return (
        <Sidebar collapsible='icon'>
            <SidebarHeader>
                <div className='flex gap-2 items-center '>
                    <Image src={'/logo.svg'} alt="Logo" width={35} height={35} />
                    {open && <h2 className='font-bold text-lg'>AgentX</h2>}
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroupLabel>
                    Application
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {MenuOptions.map((menu, index) => (
                            <SidebarMenuItem key={index}>
                                <SidebarMenuButton asChild size={open ? 'lg' : 'default'}
                                    isActive={path == menu.url}
                                >
                                    <Link href={menu.url}>
                                        <menu.icon />
                                        <span>{menu.title}</span>

                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter className='mb-10' >
                {isPaidUser ?
                    <div>
                        <div className=' flex gap-2 items-center'>
                            <Gem />
                            {open && <h2>Remaining Credits: <span className='font-bold'>{totalRemainingCredits}/2</span></h2>}
                        </div>
                        {open && <Button className='mt-2 '>Upgrade to Unlimited</Button>}
                    </div>
                    :
                    <div>
                        <h2>You can create unlimited agents.</h2>
                    </div>
                }
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar
