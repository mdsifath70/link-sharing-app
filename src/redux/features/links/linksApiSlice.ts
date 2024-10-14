import apiSlice from "../api/apiSlice";
import profileApiSlice from "../profile/profileApiSlice";

// type
interface LinkItemTypeRes extends LinkItemType {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

// create api
const linksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    links: builder.query<ApiResponse<LinkItemTypeRes[]>, void>({
      query: () => "/links/all",
    }),

    saveLinks: builder.mutation<
      ApiResponse<LinkItemTypeRes[]>,
      { username: string; links: LinkItemType[] }
    >({
      query: (body) => ({
        url: "/links/save",
        method: "POST",
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
                draft.payload.links = res.data.payload;
              },
            ),
          );
        } catch {}
      },
    }),
  }),
  overrideExisting: false,
});

export const { useLinksQuery, useSaveLinksMutation } = linksApiSlice;
export default linksApiSlice;
