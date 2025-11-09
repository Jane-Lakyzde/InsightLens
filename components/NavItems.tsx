'use client'


import React from 'react'
import {NAV_ITEMS} from "@/lib/constants";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import { useEffect } from "react";

const NavItems = () => {
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => {
            try {
                NAV_ITEMS.forEach(({ href }) => {
                    // 预取常用页面，减小首次跳转等待
                    router.prefetch(href)
                })
            } catch {}
        }, 0)
        return () => clearTimeout(timer)
    }, [router])

    const isActive = (path: string) => {
        if (path ==='/') return pathname === '/'

        return  pathname.startsWith(path);
    }
    return (
        <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
            {NAV_ITEMS.map(({href, label}) => {
                return <li key={href}>
                    <Link prefetch href={href} className={`hover:text-teal-500 transition-colors ${isActive(href) ? 'text-gray-100' : ''}`}>
                        {label}
                    </Link>
                </li>
            })}
        </ul>
    )
}
export default NavItems
