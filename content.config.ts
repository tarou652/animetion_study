import { defineCollection, z } from '@nuxt/content'

export const collections = {
  css: defineCollection({
    type: 'page',
    source: 'css/**',
    schema: z.object({
      title: z.string(),
      description: z.string(),
      slug: z.string(),
      difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
      tags: z.array(z.string()),
      order: z.number(),
      component: z.string(),
      code: z.object({
        css: z.string().optional(),
        html: z.string().optional(),
        js: z.string().optional(),
      }).optional(),
      tips: z.array(z.string()).optional(),
      related: z.array(z.string()).optional(),
    }),
  }),
}
