import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import { generateUUID } from '../businessLogic/todo.mjs'

const TABLE_NAME = 'Todos-dev'
const BUCKET_NAME = 'images-bucket-tony-051299-uda'

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
  const bucketName = BUCKET_NAME
  const { name, dueDate } = payload
  const uuid = generateUUID()
  const item = {
    userId,
    todoId: uuid,
    name,
    dueDate,
    attachmentUrl: `https://${bucketName}.s3.amazonaws.com/${uuid}`,
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

export const getItem = async (userId, todoId) => {
  var params = {
    TableName : TABLE_NAME,
    Key: {
      todoId,
      userId,
    }
  };
  
  const res = await documentClient.get(params)
  return res.Item
}

export const updateItem = async (payload) => {
  const {done, userId, name, todoId, dueDate} = payload;
  const existingItem = await getItem(userId, todoId)

  const item = {
    ...existingItem,
    name,
    dueDate,
    done
  }

  var params = {
    TableName: TABLE_NAME,
    Item: item
  }

  await documentClient.put(params)
}

export const deleteItem = async (todoId, userId) => {
  var params = {
    TableName : TABLE_NAME,
    Key: {
      todoId,
      userId
    }
  };
  
  await documentClient.delete(params)
}