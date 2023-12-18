import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { createItem } from '../../dataLayer/todo-access.mjs'

export const handler = middy()
  .use(httpErrorHandler())
  .use(cors({ credentials: true }))
  .handler(async (event) => {
    const newTodo = JSON.parse(event.body)

    console.log('DELETE', newTodo)
    const item = await createItem(newTodo)

    return {
      statusCode: 200,
      body: JSON.stringify({
        item
      })
    }
  })
