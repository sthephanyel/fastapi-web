import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ChevronDown } from 'lucide-react';
import { UseInformationModal } from './components/UserInformationModal';
import { useAuth } from '@/store/auth';

export default function Home(){
    const { user } = useAuth();
    const [userModalOpen, setUserModalOpen] = useState(false);

    return (
        <>
            <UseInformationModal
                open={userModalOpen}
                onOpenChange={setUserModalOpen}
            />
            <div className="flex w-screen h-screen justify-center p-5">
                <div className="flex w-full max-w-full flex-col gap-6">
                    <Tabs defaultValue="account" orientation="vertical" className="h-full gap-5">
                        <div className='flex-col w-[20%] h-full p-2'>
                            <Card className='flex bg-background border-0'>
                                <CardHeader className='flex p-0'>
                                    <Button
                                        className='bg-background w-full border-0 rounded-none justify-between text-foreground'
                                        onClick={()=>setUserModalOpen(!userModalOpen)}
                                    >
                                        <div>{user?.full_name.toUpperCase() || "Usuário"}</div>
                                        <ChevronDown/>
                                    </Button>
                                </CardHeader>
                            </Card>
                            <TabsList variant="line" className="w-full shrink-0">
                                <TabsTrigger value="account">Account</TabsTrigger>
                                <TabsTrigger value="password">Password</TabsTrigger>
                                <TabsTrigger value="settings">Settings</TabsTrigger>
                            </TabsList>
                        </div>
                        <TabsContent value="account">
                            <Card>
                                <CardHeader className="pb-3">
                                <CardTitle className="text-base">Account</CardTitle>
                                <CardDescription className="text-sm">
                                    Update your account information.
                                </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="underline-vertical-name" className="text-sm">
                                    Name
                                    </Label>
                                    <Input
                                    id="underline-vertical-name"
                                    defaultValue="Michael Brown"
                                    className="h-9"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="underline-vertical-email" className="text-sm">
                                    Email
                                    </Label>
                                    <Input
                                    id="underline-vertical-email"
                                    type="email"
                                    defaultValue="michael.brown@example.com"
                                    className="h-9"
                                    />
                                </div>
                                </CardContent>
                                <CardFooter className="pt-3">
                                <Button size="sm">Save changes</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                        <TabsContent value="password">
                            <Card>
                                <CardHeader className="pb-3">
                                <CardTitle className="text-base">Password</CardTitle>
                                <CardDescription className="text-sm">
                                    Change your password here.
                                </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="underline-vertical-current" className="text-sm">
                                    Current password
                                    </Label>
                                    <Input
                                    id="underline-vertical-current"
                                    type="password"
                                    className="h-9"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="underline-vertical-new" className="text-sm">
                                    New password
                                    </Label>
                                    <Input
                                    id="underline-vertical-new"
                                    type="password"
                                    className="h-9"
                                    />
                                </div>
                                </CardContent>
                                <CardFooter className="pt-3">
                                <Button size="sm">Update password</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                        <TabsContent value="settings">
                            <Card>
                                <CardHeader className="pb-3">
                                <CardTitle className="text-base">Settings</CardTitle>
                                <CardDescription className="text-sm">
                                    Manage your preferences.
                                </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="underline-vertical-theme" className="text-sm">
                                    Theme
                                    </Label>
                                    <Input
                                    id="underline-vertical-theme"
                                    defaultValue="Light"
                                    className="h-9"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label
                                    htmlFor="underline-vertical-language"
                                    className="text-sm"
                                    >
                                    Language
                                    </Label>
                                    <Input
                                    id="underline-vertical-language"
                                    defaultValue="English"
                                    className="h-9"
                                    />
                                </div>
                                </CardContent>
                                <CardFooter className="pt-3">
                                <Button size="sm">Save settings</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    );
};