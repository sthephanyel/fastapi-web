import api from "@/lib/axios";
import type { FetchMovesParams, MovesListItem, MovesListResponse } from "./types";
import { useAuthStore } from "@/store/auth";

export async function fetchMoves(
  params: FetchMovesParams = {},
): Promise<MovesListResponse> {
  const {
    search = "",
    offset = 0,
    limit = 10,
    orderColumn = 0,
    orderDir = "asc",
  } = params;
  // TODO: concertar o envio dos parametros...já esta sendo enviado
  // const queryParams = new URLSearchParams({
  //   draw: "1",
  //   limit: String(limit),
  //   offset: String(offset)
  //   // start: String(offset * limit),
  //   // length: String(limit),
  //   // "search[value]": search,
  //   // "order[0][column]": String(orderColumn),
  //   // "order[0][dir]": orderDir,
  // });

  const queryParams = new URLSearchParams();

  queryParams.append("draw", "1");
  queryParams.append("limit", String(limit));
  queryParams.append("offset", String(offset));
  queryParams.append("orderColumn", String(orderColumn));
  queryParams.append("orderDir", String(orderDir));

  const { data } = await api.get(`/video/user/?${queryParams.toString()}`);

  return { 
    items: data?.items,
    totalCount: data?.totalCount
  };
}
