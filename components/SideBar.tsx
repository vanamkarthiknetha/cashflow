"use client"
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import Footer from './Footer'
import PlaidLink from '@/components/PlaidLink'

const SideBar = ({ user }: SiderbarProps) => {
    const pathname = usePathname()
    return (
        <section className='sidebar'>
            <nav className="flex flex-col gap-4">
                <Link href={'/'} className='flex items-center cursor-pointer mb-12 gap-2'>
                    <Image
                        src={'/icons/logo.svg'}
                        width={34}
                        height={34}
                        alt='CashFlow logo'
                        className='size-[24px] max-xl:size-14'
                    />
                    <h1 className="sidebar-logo">CashFlow</h1>
                </Link>

                {sidebarLinks.map((item) => {
                    const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)
                    return (<Link key={item.label} href={item.route} className={cn('sidebar-link',{'bg-bank-gradient':isActive})}>
                        <div className="relative size-6">
                            <Image
                                src={item.imgURL}
                                alt={item.label}
                                fill
                                className={cn({
                                    'brightness-[3] invert-0':isActive
                                })}
                            />
                        </div>
                        <p className={cn("sidebar-label",{"!text-white":isActive})}>{item.label}</p>
                    </Link>)
                })}

               {user && <PlaidLink user={user} />} {/*To avoid client side err on createLinkToken without login */}
               
            </nav>
            <Footer user={user}/>
        </section>
    )
}

export default SideBar
