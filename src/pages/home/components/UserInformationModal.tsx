import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getUser } from "@/services/user/hooks";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"
import { UserIcon, Mail, Check, X } from 'lucide-react'
import { Badge } from "@/components/reui/badge"
import { Skeleton } from "@/components/ui/skeleton";

interface UseInformationModalProps {
    readonly open: boolean;
    readonly onOpenChange: (open: boolean) => void;
}
export function UseInformationModal({
    open,
    onOpenChange
}: UseInformationModalProps){
    const { data, isLoading, isError } = getUser();

    console.log('data', data)

    function EmptyState({ message }: { readonly message: string }) {
        return (
            <div className="text-center py-8 text-muted-foreground">{message}</div>
        );
    }

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="mx-auto w-full max-w-xs">
                    <div className="flex flex-col gap-6">
                        {[0, 1, 2].map(i => {
                            return (
                                <div key={i} className="flex flex-col gap-2">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }

        if (isError) {
            return <EmptyState message="Erro ao carregar informações." />;
        }

        if (!data) {
            return <EmptyState message="Nenhum histórico encontrado" />;
        }

        return (
            <div className="mx-auto flex w-full max-w-md flex-col">
                <ItemGroup className="gap-0">
                    <Item size={"sm"}>
                        <ItemMedia variant="icon">
                            <UserIcon />
                        </ItemMedia>
                        <ItemContent>
                            <ItemTitle>Profile</ItemTitle>
                            <ItemDescription>{data.full_name.toUpperCase() || ""}</ItemDescription>
                        </ItemContent>
                    </Item>
                    <ItemSeparator />
                    <Item size={"sm"}>
                        <ItemMedia variant="icon">
                            <Mail />
                        </ItemMedia>
                        <ItemContent>
                            <ItemTitle>E-mail</ItemTitle>
                            <ItemDescription>{data.email || ""}</ItemDescription>
                        </ItemContent>
                    </Item>
                    <ItemSeparator />
                    <Item size={"sm"}>
                        <ItemMedia variant="icon">
                            {data.disabled ? <X /> : <Check />}
                        </ItemMedia>
                        <ItemContent>
                            <ItemTitle>Action</ItemTitle>
                            <ItemDescription>{data.disabled || ""}</ItemDescription>
                            {data.disabled ? 
                                (
                                    <Badge variant="warning-light">Disabled</Badge>
                                ):(
                                    <Badge variant="success-light">Active</Badge>
                                )
                            }
                        </ItemContent>
                    </Item>
                </ItemGroup>
            </div>
        );
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="">
                <DialogHeader>
                <DialogTitle>Information User</DialogTitle>
                </DialogHeader>
                {renderContent()}
            </DialogContent>
        </Dialog>
    );
}