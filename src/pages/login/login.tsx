import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Card, CardHeader, CardTable, CardToolbar } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from '@/lib/utils';
import { useLogin } from '@/services/login/hooks';
import { toast } from "sonner";
import { useAuthStore } from '@/store/auth';

const schema = z.object({
    username: z.string().min(3, { message: "Required" }),
    email: z.string().email(),
    password: z.string().min(6, "Password needs 6 charakters")
});

type LoginFormData = z.infer<typeof schema>;

export default function LoginPage(){
    const { theme, setTheme } = useTheme();
    const loginAccess = useLogin();
    // const [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(false);
    const { token, refreshToken } = useAuthStore();

    console.log('token', token);
    console.log('refreshToken', refreshToken);

    const handleThemeToggle = (checked: boolean) => {
        setTheme(checked ? "dark" : "light");
    };

    const form = useForm<LoginFormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        setLoading(true);
        try {
            await loginAccess.mutateAsync({
                email: data.email, 
                password: data.password, 
                username: data.username
            });
            toast.success("Login realizado com sucesso!");
            setLoading(false);
        } catch (error: unknown) {
        const axiosError = error as {
            response?: { data?: { message?: string } };
        };
        const errorMessage = axiosError?.response?.data?.message || "Erro ao realizar login. 2";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex w-screen min-h-screen bg-amber-400 max-md:flex-col max-md:justify-center max-md:items-center">
            <div className='flex w-full bg-red-200'>...</div>
            <div className='flex w-full justify-center items-center bg-blue-200'>
                <Card className='flex w-5/6 p-10'>
                    <CardHeader className="flex pb-8 justify-between mb-3">
                        <div>
                            <span className='text-3xl font-bold'>Sign In</span>
                        </div>
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
                    </CardHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Username
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                            placeholder=""
                                            {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            E-mail
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                            placeholder=""
                                            {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password" 
                                                placeholder=""
                                            {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='flex w-full justify-center items-center'>
                                <Button 
                                    type="submit"
                                    // mode='default'
                                    variant="login"
                                    // className="!bg-background"
                                    disabled={loading}
                                >Salvar</Button>
                            </div>
                        </form>
                    </Form>
                </Card>
                {/* <Card>
                    <CardHeader className="flex-col items-start gap-2.5 border-b border-border p-4 sm:p-5">
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
                    </CardHeader>
                    <CardTable>
                        <Field className="max-w-xs">
                            <FieldLabel htmlFor="input-demo-username">Username</FieldLabel>
                            <Input
                                id="input-demo-username"
                                type="text"
                                // placeholder="Enter your username"
                            />
                        </Field>
                        <Field className="max-w-xs">
                            <FieldLabel htmlFor="input-demo-password">Password</FieldLabel>
                            <Input 
                                id="input-demo-password" 
                                type="password" 
                                // placeholder="Password" 
                            />
                        </Field>
                    </CardTable>
                </Card> */}
            </div>
        </div>
    );
}