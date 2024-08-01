'use client';

import Link from "next/link";
import { Button } from "../ui/button";

// link
const links = [
    {
        name: "註冊",
        url: "/register",
    },
    {
        name: "登入",
        url: "/login",
    }
]

export const Navbar = () => {
    
    
    return (
        <div className="fixed w-full bg-slate-900">
            <div className="flex justify-end p-5 gap-5">
                {links.map((ele, index) => (
                    <Button key={index} asChild>
                        <Link href={ele.url}>
                        {ele.name}
                        </Link>
                    </Button>
                ))}
                
            </div>
        </div>
    )
}