import { Button } from '@/components/ui/button';
import React from 'react';
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export default function LoginPage(){
    const { theme, setTheme } = useTheme();

    const handleThemeToggle = (checked: boolean) => {
        setTheme(checked ? "dark" : "light");
    };

    return (
        <div className='bg-red-500 p-6'>
            <h1 className='text-9xl bg-amber-500'>LOGIN</h1>
            {/* <div className="">
                <Button>Click me</Button>
            </div> */}
            <div className="relative w-14 h-7">
                <Switch
                    checked={theme === "dark"}
                    onCheckedChange={handleThemeToggle}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="absolute inset-0 rounded-full bg-secondary"></div>
                <div
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center transform transition-transform ${
                    theme === "dark" ? "translate-x-7" : "translate-x-0"
                }`}
                >
                {theme === "dark" ? (
                    <MoonIcon className="w-4 h-4 text-gray-700" />
                ) : (
                    <SunIcon className="w-4 h-4 text-yellow-500" />
                )}
                </div>
            </div>
        </div>
    );
}