import { UserPublic } from "@/types/user";
import apiSlice from "../api/apiSlice";
import { authActions } from "../auth/authSlice";
import profileApiSlice from "../profile/profileApiSlice";

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

    updateUser: builder.mutation<
      ApiResponse<UserPublic>,
      { username: string; body: FormData }
    >({
      query: ({ body }) => ({
        url: "/user/update",
        method: "PATCH",
        body,
      }),
      onQueryStarted: async ({ username }, { queryFulfilled, dispatch }) => {
        try {
          const res = await queryFulfilled;

          dispatch(
            profileApiSlice.util.updateQueryData(
              "profileLinks",
              { username },
              (draft) => {
                draft.payload.profile = res.data.payload;
              },
            ),
          );
        } catch {}
      },
    }),
  }),
  overrideExisting: false,
});

export const { useMeQuery, useUpdateUserMutation } = userApiSlice;
export default userApiSlice;
