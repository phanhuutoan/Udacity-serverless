import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import { generateUUID } from '../businessLogic/todo.mjs'

const TABLE_NAME = 'Todos-dev'
const client = new DynamoDBClient({
  region: process.env.AWS_REGION
})

const documentClient = DynamoDBDocument.from(client)

export const listItems = async (userId) => {
  const params = {
    TableName: TABLE_NAME,
    IndexName: 'CreatedAtIndex',
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId
    }
  }
  const listData = await documentClient.query(params)

  return listData.Items
}

export const createItem = async (payload, userId) => {
  const { name, dueDate } = payload
  const uuid = generateUUID()
  const defaultImage =
    'https://imgupscaler.com/images/samples/animal-after.webp'
  const item = {
    userId,
    todoId: uuid,
    name,
    dueDate,
    attachmentUrl: defaultImage,
    done: false,
    createdAt: new Date().toISOString()
  }

  var params = {
    TableName: TABLE_NAME,
    Item: item
  }

  await documentClient.put(params)
  return item
}

export const updateItem = async (payload) => {
  const {done, attachmentUrl, userId, todoId} = payload;
  const item = {
    userId,
    todoId,
  }

  if (done !== undefined) {
    item.done = done
  }

  if (attachmentUrl !== undefined) {
    item.attachmentUrl = attachmentUrl
  }

  var params = {
    TableName: TABLE_NAME,
    Item: item
  }

  await documentClient.put(params)
}
