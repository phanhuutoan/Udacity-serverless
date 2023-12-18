import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { listItems } from '../../dataLayer/todo-access.mjs'
import { httpResponse } from '../../auth/utils.mjs'
import {getUserId} from '../utils.mjs'

export const handler = middy()
  .use(httpErrorHandler())
  .use(cors({ credentials: true }))
  .handler(async (event) => {
    console.log('GET TODOS EVENT...', event);
    const userId = getUserId(event)
    const items = await listItems(userId)

    return httpResponse({ items })
  })
