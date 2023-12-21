import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { createAttachmentPresignedUrl } from '../../storageLayer/attachmentUtil.mjs'
import { httpResponse } from '../../auth/utils.mjs'

export const handler = middy()
  .use(httpErrorHandler())
  .use(cors({ credentials: true }))
  .handler(async (event) => {
    const todoId = event.pathParameters.todoId
    if (!todoId) {
      return httpResponse('Please provide todoId!', 400)
    }

    const uploadUrl = await createAttachmentPresignedUrl(todoId)

    return {
      statusCode: 200,
      body: JSON.stringify({
        uploadUrl
      })
    }
  })
