import { Fail, Ok, type Result, ResultUtils } from '@eicode/result-pattern'
import { eq } from 'drizzle-orm'
import { db } from '../client'
import { type SelectFilesType, files } from '../schema/files-schema'

interface FileCreateSchema {
  name: string
  key: string
  contentType: string
}

export class File {
  private constructor(public readonly file: SelectFilesType) {}

  static async create(data: FileCreateSchema): Promise<Result<File, string>> {
    const fileTry = await ResultUtils.trySync(async () => {
      return await db.insert(files).values(data).returning()
    })

    if (fileTry.isFail) {
      return new Fail('Failed to create file')
    }

    const fileData = fileTry.unwrap()

    return new Ok(new File(fileData[0]))
  }

  static async findById(id: string): Promise<Result<File, string>> {
    const fileTry = await ResultUtils.trySync(async () => {
      return await db.query.files.findFirst({
        where: eq(files.id, id),
      })
    })

    if (fileTry.isFail) {
      return new Fail('Failed to find file')
    }

    const fileData = fileTry.unwrap()

    if (!fileData?.id) {
      return new Fail('No file data returned')
    }

    return new Ok(new File(fileData))
  }
}
