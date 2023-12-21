import { decode } from 'jsonwebtoken'
import { createLogger } from '../utils/logger.mjs'

export const logger = createLogger('utils')
/**
 * Parse a JWT token and return a user id
 * @param jwtToken JWT token to parse
 * @returns a user id from the JWT token
 */
export function parseUserId(jwtToken) {
  const decodedJwt = decode(jwtToken)
  return decodedJwt.sub
}

export const RESPONSE_STATUS = {
  SUCCESS: 200,
  BAD_REQUEST:400,
  SERVER_ERROR: 500,
}

export function httpResponse(data, status = RESPONSE_STATUS.SUCCESS) {
  return {
    statusCode: status,
    body: JSON.stringify(data)
  }
}