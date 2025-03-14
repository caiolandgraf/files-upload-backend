import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  CLOUDFLARE_ENDPOINT: z.string().url(),
  CLOUDFLARE_ACCESS_KEY_ID: z.string(),
  CLOUDFLARE_SECRET_ACCESS_KEY: z.string(),
  CLOUDFLARE_BUCKET_NAME: z.string(),
  POSTGRES_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)
