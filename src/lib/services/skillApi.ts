import { api } from "./api";
import { ApiSkill } from "@/types";

export const skillApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Admin: get all skills
    getAdminSkills: builder.query<ApiSkill[], void>({
      query: () => "/skills",
      transformResponse: (res: { data: ApiSkill[] }) => res.data,
      providesTags: ["Skills"],
    }),
    // Admin: create skill
    createSkill: builder.mutation({
      query: (body) => ({
        url: "/skills",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Skills"],
    }),
    // Admin: bulk create
    bulkCreateSkills: builder.mutation({
      query: (skills) => ({
        url: "/skills/bulk",
        method: "POST",
        body: { skills },
      }),
      invalidatesTags: ["Skills"],
    }),
    // Admin: update skill
    updateSkill: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/skills/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Skills"],
    }),
    // Admin: delete skill
    deleteSkill: builder.mutation({
      query: (id: string) => ({
        url: `/skills/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Skills"],
    }),
  }),
});

export const {
  useGetAdminSkillsQuery,
  useCreateSkillMutation,
  useBulkCreateSkillsMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} = skillApi;
