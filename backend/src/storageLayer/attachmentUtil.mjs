import AWS from 'aws-sdk';
import AWSXRay from 'aws-xray-sdk';

const _XAWS = AWSXRay.captureAWS(AWS);
const s3 = new AWS.S3({
  signatureVersion: 'v4'
});

export async function createAttachmentPresignedUrl(todoId) {
    return s3.getSignedUrl('putObject', {
        Bucket: 'images-bucket-tony-051299-uda',
        Key: todoId,
        Expires: 3600,
    })
}
