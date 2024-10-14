import apiSlice from "../api/apiSlice";

// create api
const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    profileLinks: builder.query<
      ApiResponse<ProfileLinks>,
      { username: string }
    >({
      query: (params) => ({
        url: "/profileLinks",
        params,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useProfileLinksQuery } = profileApiSlice;
export default profileApiSlice;
