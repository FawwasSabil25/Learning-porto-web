'use client'

import Link from 'next/link'

export default function Navbar() {
    return (
        <nav 
            className="
                sticky top-4 z-50 flex justify-center
                pointer-events-none "
        > 
            <div 
                className="
                    pointer-events-auto
                    flex items-center justify-between
                    w-full max-w-5xl px-6 py-3
                    mx-4
                    rounded-4xl
                    bg-white
                    backdrop-blur
                    shadow-md"
            >
                <Link href="/" className="text-2xl text-gray-800">FawasSabil</Link>
                <div className="space-x-6">
                    <Link href="/" className="hover:text-blue-600">Home</Link>
                    <Link href="/projects" className="hover:text-blue-600">Projects</Link>
                    <Link href="/about" className="hover:text-blue-600">About</Link>
                </div>
            </div>
        </nav>
    )
}
