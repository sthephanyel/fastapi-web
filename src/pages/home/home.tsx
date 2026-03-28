import { useState } from 'react';
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
import { GenerateVideoHistoryList } from './components/GenerateVideoHistoryList';
import { DashboardVideo } from './components/DashboardVideo';

export default function Home(){
    const { user } = useAuth();
    const [userModalOpen, setUserModalOpen] = useState(false);
    const smallScreen = useMediaQuery("(max-width: 768px)");
    // console.log('smallScreen', smallScreen)

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
                                <TabsTrigger value="generate_video_history"><Clapperboard/> <span className='max-md:hidden'>History Vídeo</span></TabsTrigger>
                                {/* <TabsTrigger value="add_caption"><Captions/> <span className='max-md:hidden'>Add Caption</span></TabsTrigger> */}
                            </TabsList>
                        </div>

                        <TabsContent value="dashboard">
                            <DashboardVideo/>
                        </TabsContent>
                        <TabsContent value="generate_video_history">
                            <GenerateVideoHistoryList/>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    );
};