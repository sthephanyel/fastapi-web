import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { useAuthStore } from '@/store/auth';
import React from 'react';
import { Outlet } from 'react-router-dom';

export default function AuthLayout (){
    const { clearAuth } = useAuthStore();
    return (
        <Card className='border-0 rounded-none'>
            <CardHeader>
                Header
                <Button 
                    // mode='default'
                    variant="inverse"
                    // className="!bg-background"
                    onClick={clearAuth}
                >
                    Logout
                </Button>
            </CardHeader>
            <Outlet />
        </Card>
    );
}