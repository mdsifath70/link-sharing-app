import apiSlice from "../api/apiSlice";

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

    saveLinks: builder.mutation<ApiResponse, { links: LinkItemType[] }>({
      query: (body) => ({
        url: "/links/save",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLinksQuery, useSaveLinksMutation } = linksApiSlice;
export default linksApiSlice;
