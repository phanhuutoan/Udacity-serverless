import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { createItem } from '../../dataLayer/todo-access.mjs'
import { httpResponse, RESPONSE_STATUS } from '../../auth/utils.mjs'

export const handler = middy()
  .use(httpErrorHandler())
  .use(cors({ credentials: true }))
  .handler(async (event) => {
    const newTodo = JSON.parse(event.body)

    console.log('UPDATE TODO PAYLOAD', newTodo)
    const item = await createItem(newTodo)

    return httpResponse({
      item
    })
  })
