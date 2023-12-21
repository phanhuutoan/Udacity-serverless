import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { updateItem } from '../../dataLayer/todo-access.mjs'
import { httpResponse, logger } from '../../auth/utils.mjs'
import { getUserId } from '../utils.mjs'

export const handler = middy()
  .use(httpErrorHandler())
  .use(cors({ credentials: true }))
  .handler(async (event) => {
    const body = event.body

    logger.info('Update with event body', body);

    const todoId = event.pathParameters['todoId']
    const userId = getUserId(event)

    await updateItem({
      todoId,
      userId,
      ...JSON.parse(body)
    })

    return httpResponse({
      message: 'Update success!'
    })
  })
