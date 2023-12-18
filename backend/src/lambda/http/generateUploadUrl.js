import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { getPresignedUrl } from '../../storageLayer/attachmentUtil.mjs'

export const handler = middy()
  .use(httpErrorHandler())
  .use(cors({ credentials: true }))
  .handler(async () => {
    const uploadUrl = await getPresignedUrl()

    return {
      statusCode: 200,
      body: JSON.stringify({
        uploadUrl
      })
    }
  })
