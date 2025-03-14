import { randomUUID } from 'node:crypto'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { File } from '../drizzle/models/file'
import { env } from '../env'
import { r2 } from '../lib/cloudflare'

export const getSingedUrlRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/uploads',
    {
      schema: {
        summary: 'Get a signed URL for uploading a file',
        tags: ['uploads'],
        body: z.object({
          name: z.string().min(1),
          contentType: z.string().regex(/\w+\/[-+.\w]+/),
        }),
        response: {
          200: z.object({
            signedUrl: z.string(),
            fileId: z.string().uuid(),
          }),
          500: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, contentType } = request.body

      const fileKey = randomUUID().concat('-').concat(name)

      const signedUrl = await getSignedUrl(
        r2,
        new PutObjectCommand({
          Bucket: env.CLOUDFLARE_BUCKET_NAME,
          Key: fileKey,
          ContentType: contentType,
        }),
        { expiresIn: 600 }
      )

      const fileTry = await File.create({
        name,
        contentType,
        key: fileKey,
      })

      if (fileTry.isFail) {
        return reply.status(500).send({ message: 'Failed to create file' })
      }

      const { file } = fileTry.unwrap()

      return {
        signedUrl,
        fileId: file.id,
      }
    }
  )
}
