import { api } from "./api";
import { ApiProject } from "@/types";

export const projectApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Admin: get all projects including drafts
    getAdminProjects: builder.query<ApiProject[], void>({
      query: () => "/projects/admin/all",
      transformResponse: (res: { data: ApiProject[] }) => res.data,
      providesTags: ["Projects"],
    }),
    // Admin: create project
    createProject: builder.mutation({
      query: (body) => ({
        url: "/projects",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Projects"],
    }),
    // Admin: update project
    updateProject: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/projects/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Projects"],
    }),
    // Admin: delete project
    deleteProject: builder.mutation({
      query: (id: string) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Projects"],
    }),
  }),
});

export const {
  useGetAdminProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
