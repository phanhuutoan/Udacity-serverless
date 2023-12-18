import {getSignedUrl} from '@aws-sdk/s3-request-presigner'
import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3'
import {generateUUID} from '../businessLogic/todo.mjs'

const s3 = new S3Client()
const command = new PutObjectCommand({
  Bucket: 'images-bucket-tony-051299-uda',
  Key: `file-${generateUUID()}`,
  Body: 'Some body'
})

export async function getPresignedUrl() {
  const url = await getSignedUrl(s3, command, {expiresIn: 6000})
  console.log('GET PRE-SIGN URL...', url)

  return url
}