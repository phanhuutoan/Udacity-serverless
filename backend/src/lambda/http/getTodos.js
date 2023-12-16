import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'

export const handler = middy()
  .use(httpErrorHandler())
  .use(cors({ credentials: true }))
  .handler(async (event) => {

    console.log('GET TODOS...', event)

    return {
      statusCode: 200,
      body: JSON.stringify({
        item: []
      })
    }
  })
