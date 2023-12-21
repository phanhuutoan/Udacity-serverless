import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { createItem } from '../../dataLayer/todo-access.mjs'
import { getUserId } from '../utils.mjs'
import { httpResponse, logger } from '../../auth/utils.mjs'

export const handler = middy()
  .use(httpErrorHandler())
  .use(cors({ credentials: true }))
  .handler(async (event) => {
    const newTodo = JSON.parse(event.body)   
    if (!newTodo.name || !newTodo.dueDate) {
      return httpResponse('Please provide name or dueDate', 400)
    }

    // Check validation on body
    if (!newTodo.name || !newTodo.dueDate) {
      return httpResponse(
        { message: 'Please provide correct data!' },
        RESPONSE_STATUS.BAD_REQUEST
      )
    }

    const userId = getUserId(event)

    logger.info('CREATING TODO PAYLOAD...', newTodo)
    const item = await createItem(newTodo, userId)

    return httpResponse({item})
  })
