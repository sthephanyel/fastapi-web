import { useCallback, useMemo, useState } from "react"
import { Badge } from "@/components/reui/badge"
import {
  DataGrid,
  DataGridContainer
} from "@/components/reui/data-grid/data-grid"
import { DataGridColumnHeader } from "@/components/reui/data-grid/data-grid-column-header"
import { DataGridTable } from "@/components/reui/data-grid/data-grid-table"
import {
  ColumnDef,
  getCoreRowModel,
  OnChangeFn,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"

import { useMovesHistory } from "@/services/moves/hooks"
import { useSearchParams, useNavigate as useRouter } from "react-router"
import z from "zod"
import { MovesListItem } from "@/services/moves/types"
import { Skeleton } from "@/components/ui/skeleton"
import { Pagination } from "@/components/pagination"
import { DataGridScrollArea } from "@/components/reui/data-grid/data-grid-scroll-area"
import { Card, CardContent } from "@/components/ui/card"

const COLUMN_INDEX_TO_ID: Record<number, string> = {
  0: "criado",
  1: "title",
  2: "text",
  3: "time",
  4: "status",
};

const COLUMN_ID_TO_INDEX: Record<string, number> = {
  id: 0,
  title: 1,
  text: 2,
  time: 3,
  status: 4,
};

export function GenerateVideoHistoryList() {
    const router = useRouter();
    const [searchParams] = useSearchParams();

    const pageIndex = z.coerce
        .number()
        .transform((page) => page - 1)
        .parse(searchParams.get("page") ?? "1");

    const perPage = z.coerce.number().parse(searchParams.get("perPage") ?? "5");

    const orderColumn = z.coerce
        .number()
        .parse(searchParams.get("orderColumn") ?? "0");

    const orderDir = (searchParams.get("orderDir") ?? "asc") as "asc" | "desc";

    // const search = searchParams.get("search") ?? "";

    
    const { data: moveHistory, isLoading } = useMovesHistory({
      search: '',
      offset: pageIndex,
      limit: perPage,
      orderColumn: orderColumn,
      orderDir: orderDir,
    });
    
    const moves = moveHistory?.items ?? [];
    const totalCount = moveHistory?.totalCount ?? 0;
    
    console.log('useMovesHistory', moveHistory)
    
    const updateSearchParams = useCallback(
      (params: Record<string, string | number | null>) => {
        const newParams = new URLSearchParams(searchParams.toString());
        
        for (const [key, value] of Object.entries(params)) {
          if (value === null || value === "") {
            newParams.delete(key);
          } else {
            newParams.set(key, String(value));
          }
        }
        
        router(`?${newParams.toString()}`);
      },
      [searchParams, router],
    );
    
    const handlePaginate = (newPageIndex: number) => {
      let page = 0 ;
      if (newPageIndex <= 0) {
        page = 1;
      } else {
        page = newPageIndex + 1
        
        const pages = perPage === -1 ? 1 : Math.ceil(totalCount / perPage) || 1;
        if (pages <= pageIndex + 1) {
          page = newPageIndex
        }
      }
      
      updateSearchParams({ page: page });
    };
    
    const handlePerPageChange = (newPerPage: number) => {
      let perPage = 0;
      if (newPerPage >= totalCount){
        perPage = totalCount
      } else {
        perPage = newPerPage
      }
      updateSearchParams({ perPage: newPerPage, page: 1 });
    };
    
    const sorting = useMemo<SortingState>(() => {
      const columnId = COLUMN_INDEX_TO_ID[orderColumn] || "criado";
      return [{ id: columnId, desc: orderDir === "desc" }];
    }, [orderColumn, orderDir]);

    const handleSortingChange = useCallback<OnChangeFn<SortingState>>(
      (updaterOrValue) => {
        const newSorting =
          typeof updaterOrValue === "function"
            ? updaterOrValue(sorting)
            : updaterOrValue;

        if (newSorting.length > 0) {
          const sort = newSorting[0];
          const columnIndex = COLUMN_ID_TO_INDEX[sort.id] ?? 0;
          const direction = sort.desc ? "desc" : "asc";

          updateSearchParams({
            orderColumn: columnIndex,
            orderDir: direction,
            page: 1,
          });
        }
      },
      [sorting, updateSearchParams],
    );

    // useEffect(() => {
    //   const timer = setTimeout(() => {
    //     if (searchInput !== search) {
    //       const newParams = new URLSearchParams(searchParams.toString());
    //       if (searchInput) {
    //         newParams.set("search", searchInput);
    //       } else {
    //         newParams.delete("search");
    //       }
    //       newParams.set("page", "1");
    //       router(`?${newParams.toString()}`);
    //     }
    //   }, 500);

    //   return () => clearTimeout(timer);
    // }, [searchInput, search, searchParams, router]);

  function skeletonMetaDefault() {
      return {
              headerClassName: "",
              cellClassName: "text-left",
              skeleton: <Skeleton className="h-7 w-20" />,
          }
  }
  const columns = useMemo<ColumnDef<MovesListItem>[]>(
  () => [
      {
          accessorKey: "criado",
          id: "criado",
          header: ({ column }) => (
          <DataGridColumnHeader className="font-bold" title="Criado" column={column} />
          ),
          cell: ({ row }) => {
              return (
                  <div className="flex items-center">
                  <h1 className="opacity-75">{row.original.criado}</h1>
                  </div>
              )
          },
          meta: skeletonMetaDefault(),
          size: 100,
          enableSorting: true,
          enableHiding: false,
      },
      {
          accessorKey: "title",
          id: "title",
          header: ({ column }) => (
          <DataGridColumnHeader className="font-bold" title="Title" column={column} />
          ),
          cell: ({ row }) => {
              return (
                  <div className="flex items-center">
                  <h1 className="opacity-75">{row.original.title}</h1>
                  </div>
              )
          },
          meta: skeletonMetaDefault(),
          size: 200,
          enableSorting: true,
          enableHiding: false,
      },
      {
          accessorKey: "text",
          id: "text",
          header: ({ column }) => (
          <DataGridColumnHeader className="font-bold" title="Text" column={column} />
          ),
          cell: ({ row }) => {
              return (
                  <div className="flex items-center">
                  <h1 className="opacity-75">{row.original.text}</h1>
                  </div>
              )
          },
          meta: skeletonMetaDefault(),
          size: 200,
          enableSorting: true,
          enableHiding: false,
      },
      {
          accessorKey: "time",
          id: "time",
          header: ({ column }) => (
          <DataGridColumnHeader className="font-bold" title="Time" column={column} />
          ),
          cell: ({ row }) => {
              return (
                  <div className="flex items-center">
                  <h1 className="opacity-75">{row.original.time_request}</h1>
                  </div>
              )
          },
          meta: skeletonMetaDefault(),
          size: 100,
          enableSorting: true,
          enableHiding: false,
      },
      {
          accessorKey: "status",
          id: "status",
          header: ({ column }) => (
          <DataGridColumnHeader className="font-bold" title="Status" column={column} />
          ),
          cell: ({ row }) => {
          //   const status = row.original.status
              return <Badge variant="success-light">{row.original.status}</Badge>
          //   if (status == "active") {
          //     return <Badge variant="success-light">Approved</Badge>
          //   } else {
          //     return <Badge variant="warning-light">Pending</Badge>
          //   }
          },
          meta: skeletonMetaDefault(),
          size: 100,
          enableSorting: true,
          enableHiding: false,
      },
  ],
  []
  )

  const pagination = useMemo<PaginationState>(
    () => ({
      pageIndex: 0,
      pageSize: moves.length || 10,
    }),
    [moves.length],
  );

  const [columnOrder, setColumnOrder] = useState<string[]>(
    columns.map((column) => column.id as string)
  )

  const table = useReactTable({
    columns,
    data: moves,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    state: {
      pagination,
      sorting: sorting,
      columnOrder,
    },
    onColumnOrderChange: setColumnOrder,
    // onPaginationChange: setPagination,
    onSortingChange: handleSortingChange,
    // getCoreRowModel: getCoreRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    // getSortedRowModel: getSortedRowModel(),
  })


  return (
    <Card>
      <CardContent>
        <DataGrid
          table={table}
          recordCount={moves?.length || 0}
          isLoading={isLoading}
          tableLayout={{
            columnsMovable: true,
            rowBorder: true,
            headerBackground: false,
            headerBorder: true,
            cellBorder: false,
            columnsPinnable: false
          }}
        >
          {/* <DataGridTable /> */}
          <div className="w-full space-y-2.5">
            <DataGridContainer border={false}>
              <DataGridScrollArea>
                <DataGridTable />
              </DataGridScrollArea>
            </DataGridContainer>
          </div>
        </DataGrid>
        <div className="p-4 sm:p-5 border-t">
          <Pagination
            pageIndex={pageIndex}
            totalCount={totalCount}
            perPage={perPage}
            onPageChange={handlePaginate}
            onPerPageChange={handlePerPageChange}
            itemsPerPage
          />
        </div>

      </CardContent>
    </Card>
  )
}
