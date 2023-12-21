import AWS from 'aws-sdk'
import AWSXRay from 'aws-xray-sdk'
import { logger } from '../auth/utils.mjs'

const _XAWS = AWSXRay.captureAWS(AWS)
const s3 = new AWS.S3({
  signatureVersion: 'v4'
})

const BUCKET_NAME = 'images-bucket-tony-051299-uda'

export async function createAttachmentPresignedUrl(todoId) {
  const url = s3.getSignedUrl('putObject', {
    Bucket: BUCKET_NAME,
    Key: todoId,
    Expires: 3600
  })

  logger.info(`PresignedURL of todoId ${todoId} = ${url}`)

  return url
}
