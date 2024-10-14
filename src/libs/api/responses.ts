import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import toast from "react-hot-toast";

// types::Start
type ResInitPayload = ResponseInit;
interface SuccessPayload<T> {
  message?: string;
  payload?: T | null;
}

interface ErrorPayload {
  message?: string;
  payload?: object | null;
}

interface PaginatePayload<T, M = PaginateMeta> {
  message?: string;
  payload?: {
    data: T;
    meta: M;
  };
}
// types::End

class Responses {
  exceptions: {
    unauthorized: (message?: string) => NextResponse<ApiResponseError>;
    notFound: (message?: string) => NextResponse<ApiResponseError>;
  };

  constructor() {
    this.exceptions = {
      unauthorized: (message = "Unauthorized User") =>
        this.errorNext({ message }, { status: 401 }),
      notFound: (message = "Not Found") =>
        this.errorNext({ message }, { status: 404 }),
    };
  }

  success<T>({ message = "Success", payload = null }: SuccessPayload<T>) {
    return {
      success: true,
      message,
      payload,
    };
  }
  successNext<T>(args: SuccessPayload<T> = {}, resInit?: ResInitPayload) {
    const { status, ...resInitRest } = resInit || {};
    return NextResponse.json(this.success(args), {
      status: status || 200,
      ...resInitRest,
    });
  }

  error({ message = "Error", payload = null }: ErrorPayload) {
    return {
      success: false,
      message,
      payload,
    };
  }
  errorNext(args: ErrorPayload, resInit?: ResInitPayload) {
    const { status, ...resInitRest } = resInit || {};
    return NextResponse.json(this.error(args), {
      status: status || 500,
      ...resInitRest,
    });
  }

  paginate<T, M>({ message = "Success", payload }: PaginatePayload<T, M>) {
    const { data, meta } = payload || {};
    return {
      success: true,
      message,
      payload: { data, meta },
    };
  }

  paginateNext<T, M>(args: PaginatePayload<T, M>, resInit?: ResInitPayload) {
    const { status, ...resInitRest } = resInit || {};
    return NextResponse.json(this.paginate(args), {
      status: status || 200,
      ...resInitRest,
    });
  }

  catchError(error: unknown, options?: { toastId: string }) {
    if (error) {
      const { toastId } = options || {};

      if (global.window && typeof window !== "undefined") {
        const err = error as ApiResponseError;
        toast.error(
          err?.message ||
            err.data?.message ||
            "Something went wrong, try again",
          {
            ...(toastId && { id: toastId }),
          },
        );
      }
    }
  }
  catchErrorNext(error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const { code } = error;
      if (code === "P2025") {
        return this.errorNext({ message: "Not found" });
      }
      return this.errorNext({ message: "Something went wrong db" });
    }

    const err = error as ApiResponse;
    if (err?.message) return this.errorNext(err, { status: 400 });
    return this.errorNext({ message: "Something went wrong" });
  }
}

export const responses = new Responses();
