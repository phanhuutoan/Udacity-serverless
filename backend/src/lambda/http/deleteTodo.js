import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { getUserId } from '../utils.mjs'
import { deleteItem } from '../../dataLayer/todo-access.mjs'

export const handler = middy()
  .use(httpErrorHandler())
  .use(cors({ credentials: true }))
  .handler(async (event) => {
    const todoId = event.pathParameters['todoId']
    const userId = getUserId(event)

    await deleteItem(todoId, userId)

    return {
      statusCode: 200
    }
  })
