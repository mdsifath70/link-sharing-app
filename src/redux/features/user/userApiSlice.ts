import { UserPublic } from "@/types/user";
import apiSlice from "../api/apiSlice";
import { authActions } from "../auth/authSlice";

// create api
const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<ApiResponse<UserPublic>, void>({
      query: () => "/user/me",
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch {
          dispatch(authActions.logout());
        }
      },
    }),

    updateUser: builder.mutation<ApiResponse, FormData>({
      query: (body) => ({
        url: "/user/update",
        method: "PATCH",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useMeQuery, useUpdateUserMutation } = userApiSlice;
export default userApiSlice;
