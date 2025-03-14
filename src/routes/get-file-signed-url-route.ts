import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { File } from '../drizzle/models/file'
import { env } from '../env'
import { r2 } from '../lib/cloudflare'

export const getFileSignedUrlRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/uploads/:id',
    {
      schema: {
        summary: 'Get signed URL for file',
        tags: ['uploads'],
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: z.object({
            signedUrl: z.string(),
          }),
          500: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const fileTry = await File.findById(id)

      if (fileTry.isFail) {
        return reply.status(500).send({ message: 'Failed to find file' })
      }

      const { file } = fileTry.unwrap()

      const signedUrl = await getSignedUrl(
        r2,
        new GetObjectCommand({
          Bucket: env.CLOUDFLARE_BUCKET_NAME,
          Key: file.key,
        }),
        { expiresIn: 600 }
      )

      return { signedUrl }
    }
  )
}
