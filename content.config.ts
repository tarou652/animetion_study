import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    css: defineCollection({
      type: 'page',
      source: 'css/**',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
        tags: z.array(z.string()),
        order: z.number(),
        component: z.string(),
        code: z
          .object({
            html: z.string().optional(),
            css: z.string().optional(),
            js: z.string().optional(),
          })
          .optional(),
        tips: z.array(z.string()).optional(),
      }),
    }),
  },
})
