"use client"
import { FileClock, Home, Settings, WalletCards } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import UsageTrack from './UsageTrack'

const SideNav = () => {

    const MenuList=[
        {
            name:"Home",
            icon:Home,
            path:'/dashboard'
        },
        {
            name:"History",
            icon:FileClock,
            path:'/dashboard/History'
        },
        {
            name:"Billing",
            icon:WalletCards,
            path:'/dashboard/billing'
        },
        {
            name:"Setting",
            icon:Settings,
            path:'/dashboard/setting'
        },
       
    ]

    const path=usePathname();
    useEffect(()=>{
        console.log(path);
    })

  return (
    <div className="h-screen p-5 shadow-sm border">
        <div className='flex justify-center'>

            <Image src={'/logo.svg'} alt='logo' width={120} height={100}/>
        </div>

        <hr className='my-6 border'/>
        <div className='mt-3'>
            {MenuList.map((menu, index) => (
                <div className={`flex gap-2 mb-2 p-3 hover:bg-primary hover:text-white rounder-lg cursor-pointer items-center ${path==menu.path && 'bg-primary text-white'}`}>
                    <menu.icon className='h-6 w-6'/>
                    <h2 className='text-lg'>{menu.name}</h2>
                </div>
            ))}
        </div>

        <UsageTrack/>
    </div>
  )
}

export default SideNav
