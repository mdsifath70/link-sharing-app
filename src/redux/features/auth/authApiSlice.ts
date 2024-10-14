import apiSlice from "../api/apiSlice";

// create api
const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<
      ApiResponse,
      { email: string; password: string; confirmPassword: string }
    >({
      query: (body) => ({
        url: "/user/signup",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useSignupMutation } = authApiSlice;
export default authApiSlice;
