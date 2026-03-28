import { ChevronsLeft, ChevronsRight } from 'lucide-react';

import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PaginationProps {
  pageIndex: number;
  totalCount: number;
  perPage: number;
  onPageChange: (pageIndex: number) => Promise<void> | void;
  onPerPageChange?: (perPage: number) => Promise<void> | void;
  itemsPerPage?: boolean;
  perPageOptions?: number[];
}

const defaultPerPageOptions = [5, 10, 20, 50, -1];

export function Pagination({
  pageIndex,
  totalCount,
  perPage,
  onPageChange,
  onPerPageChange,
  itemsPerPage = false,
  perPageOptions = defaultPerPageOptions,
}: PaginationProps) {
  const pages = perPage === -1 ? 1 : Math.ceil(totalCount / perPage) || 1;

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-3">
      <div className="flex items-center gap-2 order-2 md:order-1">
        <span className="text-sm text-muted-foreground">
          Total de {totalCount} item(s)
        </span>
        {itemsPerPage && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Itens por página:
            </span>
            <Select
              value={perPage.toString()}
              onValueChange={(value) => onPerPageChange?.(Number(value))}
            >
              <SelectTrigger className="h-8 w-17.5">
                <SelectValue placeholder={perPage} />
              </SelectTrigger>
              <SelectContent>
                {perPageOptions.map((option) => (
                  <SelectItem key={option} value={option.toString()}>
                    {option === -1 ? "Todos" : option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <PaginationRoot className="order-1 md:order-2">
        <PaginationContent>
          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden md:flex w-30 items-center justify-center text-sm font-medium">
              Página {pageIndex + 1} de {pages}
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <PaginationLink
                onClick={() => onPageChange(0)}
                // disabled={pageIndex === 0}
                className={`${
                  pageIndex === 0 ? "pointer-events-none opacity-50" : ""
                }`}
              >
                <span className="sr-only">Primeira página</span>
                <ChevronsLeft className="h-4 w-4" />
              </PaginationLink>
              <PaginationPrevious
                onClick={() => onPageChange(pageIndex - 1)}
                // disabled={pageIndex === 0}
                className={`${
                  pageIndex === 0 ? "pointer-events-none opacity-50" : ""
                }`}
              />
              <div className="flex md:hidden items-center justify-center min-w-15 text-sm font-medium">
                {pageIndex + 1}/{pages}
              </div>
              <PaginationNext
                onClick={() => onPageChange(pageIndex + 1)}
                // disabled={pages <= pageIndex + 1}
                className={`${
                  pages <= pageIndex + 1 ? "pointer-events-none opacity-50" : ""
                }`}
              />
              <PaginationLink
                onClick={() => onPageChange(pages - 1)}
                // disabled={pages <= pageIndex + 1}
                className={`${
                  pages <= pageIndex + 1 ? "pointer-events-none opacity-50" : ""
                }`}
              >
                <span className="sr-only">Última página</span>
                <ChevronsRight className="h-4 w-4" />
              </PaginationLink>
            </div>
          </div>
        </PaginationContent>
      </PaginationRoot>
    </div>
  );
}
