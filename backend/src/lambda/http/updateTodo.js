import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { updateItem } from '../../dataLayer/todo-access.mjs'
import { httpResponse, RESPONSE_STATUS } from '../../auth/utils.mjs'
import { getUserId } from '../utils.mjs'

export const handler = middy()
  .use(httpErrorHandler())
  .use(cors({ credentials: true }))
  .handler(async (event) => {
    const body = event.body

    console.log('BODY', body);

    const todoId = event.pathParameters['todoId']
    const userId = getUserId(event)

    await updateItem({
      todoId,
      userId,
      ...body
    })

    return httpResponse({
      message: 'Update success!'
    })
  })
