'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

/** active-link helper */
function NavLink({ href, children }: { href: string; children: string }) {
    const pathname = usePathname()
    const isActive = pathname === href
    return (
        <Link
        href={href}
        className={`
            mx-2 block px-3 py-2 rounded-4xl
            ${isActive ? 'text-white bg-gray-600' : 'hover:text-gray-400'}
        `}
        >
        {children}
        </Link>
    )
}

export default function Navbar() {
    const [open, setOpen] = useState(false)

    return (
        <nav className="sticky z-50 flex justify-center pointer-events-none top-4">
        {/* floating navbar wrapper */}
        <div
            className="flex items-center justify-between w-full max-w-5xl px-6 py-3 mx-4 shadow-md pointer-events-auto rounded-4xl bg-white/70 backdrop-blur"
        >
            {/* Brand */}
            <Link href="/" className="text-2xl font-semibold text-gray-800">
            FawasSabil
            </Link>

            {/* Desktop links */}
            <div className="hidden space-x-6 sm:flex">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/projects">Projects</NavLink>
            <NavLink href="/about">About</NavLink>
            </div>

            {/* Mobile burger */}
            <button
            onClick={() => setOpen(!open)}
            className="inline-flex items-center justify-center p-2 rounded-md sm:hidden hover:bg-gray-100"
            aria-label="Toggle menu"
            >
            <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
            >
                {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18M3 18h18" />
                )}
            </svg>
            </button>
        </div>

        {/* Mobile dropdown */}
        {open && (
            <div
            className="
                sm:hidden absolute top-[72px] w-full max-w-5xl mx-4
                rounded-3xl bg-white/90 backdrop-blur shadow-md
                pointer-events-auto               /* enable clicks inside */
            "
            >
            <div className="flex flex-col py-3">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/projects">Projects</NavLink>
                <NavLink href="/about">About</NavLink>
            </div>
            </div>
        )}
        </nav>
    )
}
