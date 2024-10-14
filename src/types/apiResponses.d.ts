interface ApiResponse<T = null> {
  success: boolean;
  message: string;
  payload: T;
}

interface PaginateMeta {
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
}

interface ApiResponsePayloadPaginate<T, M = PaginateMeta> {
  data: T;
  meta: M;
}

interface ApiResponsePaginate<T, M = PaginateMeta> {
  success: boolean;
  message: string;
  payload: ApiResponsePayloadPaginate<T, M>;
}

interface ApiResponseError {
  success: boolean;
  message: string;
  payload: object | null;
  data?: ApiResponseError;
}
