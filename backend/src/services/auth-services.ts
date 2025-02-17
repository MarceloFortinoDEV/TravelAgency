import * as jose from 'jose'
import jwt, { JwtPayload } from 'jsonwebtoken'

export async function openSessionToken(token: string) {
    const secret = new TextEncoder().encode(process.env.AUTH_PASS);
    const { payload } = await jose.jwtVerify(token, secret);
  
    return payload;
}

export async function createSessionToken(payload = {}) {
    const secret = new TextEncoder().encode(process.env.AUTH_PASS);
    const token = await new jose.SignJWT(payload)
      .setProtectedHeader({
        alg: 'HS256',
      })
      .setExpirationTime('1d')
      .sign(secret);
    
    return token
}

export async function decodeToken(token: string) {
  try {
    if (!process.env.AUTH_PASS) {
      return
    }

    const verifyToken = jwt.verify(token, process.env.AUTH_PASS) as JwtPayload
    
    return verifyToken;
  } catch(error) {
    throw error;
  }
}