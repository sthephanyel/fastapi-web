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
import { UserIcon, ChevronRightIcon, ShieldIcon, CreditCardIcon } from "lucide-react"

export function Pattern() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col">
      <ItemGroup className="gap-0">
        <Item asChild size="xs">
          <a href="#">
            <ItemMedia variant="icon">
              <UserIcon
              />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Profile</ItemTitle>
              <ItemDescription>Manage your account details</ItemDescription>
            </ItemContent>
            <ItemActions>
              <ChevronRightIcon className="text-muted-foreground size-4" />
            </ItemActions>
          </a>
        </Item>
        <ItemSeparator />
        <Item asChild size="xs">
          <a href="#">
            <ItemMedia variant="icon">
              <ShieldIcon
              />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Security</ItemTitle>
              <ItemDescription>Password and two-factor auth</ItemDescription>
            </ItemContent>
            <ItemActions>
              <ChevronRightIcon className="text-muted-foreground size-4" />
            </ItemActions>
          </a>
        </Item>
        <ItemSeparator />
        <Item asChild size="xs">
          <a href="#">
            <ItemMedia variant="icon">
              <CreditCardIcon
              />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Billing</ItemTitle>
              <ItemDescription>Plans, invoices, and payment</ItemDescription>
            </ItemContent>
            <ItemActions>
              <ChevronRightIcon className="text-muted-foreground size-4" />
            </ItemActions>
          </a>
        </Item>
      </ItemGroup>
    </div>
  )
}