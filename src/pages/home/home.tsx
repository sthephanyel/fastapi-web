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
import { Captions, ChevronDown, ChevronUp, Clapperboard, LayoutDashboard } from 'lucide-react';
import { UseInformationModal } from './components/UserInformationModal';
import { useAuth } from '@/store/auth';
import { useMediaQuery } from 'usehooks-ts';

export default function Home(){
    const { user } = useAuth();
    const [userModalOpen, setUserModalOpen] = useState(false);
    const smallScreen = useMediaQuery("(max-width: 768px)");
    console.log('smallScreen', smallScreen)
    return (
        <>
            <UseInformationModal
                open={userModalOpen}
                onOpenChange={setUserModalOpen}
            />
            <div className="flex w-screen h-screen justify-center p-5">
                <div className="flex w-full max-w-full flex-col gap-6">
                    <Tabs 
                        defaultValue="dashboard"
                        orientation={!smallScreen ? "vertical" : "horizontal"} 
                        className="md:h-full md:gap-5 max-md:flex-col"
                    >
                        <div className='flex-col h-full p-2 md:w-[20%]'>
                            <Card className='flex bg-background border-0 mb-3'>
                                <CardHeader className='flex p-0'>
                                    <Button
                                        className='bg-background w-full border-0 rounded-none justify-between text-foreground hover:bg-background/50'
                                        onClick={()=>setUserModalOpen(!userModalOpen)}
                                    >
                                        <div>{user?.full_name.toUpperCase() || "Usuário"}</div>
                                        {userModalOpen ? <ChevronUp/> : <ChevronDown/>}
                                    </Button>
                                </CardHeader>
                            </Card>
                            <TabsList variant="line" className="w-full shrink-0">
                                <TabsTrigger value="dashboard"><LayoutDashboard/> <span className='max-md:hidden'>Dashboard</span></TabsTrigger>
                                <TabsTrigger value="generate_video"><Clapperboard/> <span className='max-md:hidden'>Generate Vídeo</span></TabsTrigger>
                                <TabsTrigger value="add_caption"><Captions/> <span className='max-md:hidden'>Add Caption</span></TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="dashboard">
                            <Card>
                                <CardHeader className="pb-3">
                                <CardTitle className="text-base">dashboard</CardTitle>
                                <CardDescription className="text-sm">
                                    Update your dashboard information.
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
                        <TabsContent value="generate_video">
                            <Card>
                                <CardHeader className="pb-3">
                                <CardTitle className="text-base">generate_video</CardTitle>
                                <CardDescription className="text-sm">
                                    Change your generate_video here.
                                </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="underline-vertical-current" className="text-sm">
                                    Current generate_video
                                    </Label>
                                    <Input
                                    id="underline-vertical-current"
                                    type="generate_video"
                                    className="h-9"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="underline-vertical-new" className="text-sm">
                                    New generate_video
                                    </Label>
                                    <Input
                                    id="underline-vertical-new"
                                    type="generate_video"
                                    className="h-9"
                                    />
                                </div>
                                </CardContent>
                                <CardFooter className="pt-3">
                                <Button size="sm">Update generate_video</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                        <TabsContent value="add_caption">
                            <Card>
                                <CardHeader className="pb-3">
                                <CardTitle className="text-base">add_caption</CardTitle>
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
                                <Button size="sm">Save add_caption</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    );
};