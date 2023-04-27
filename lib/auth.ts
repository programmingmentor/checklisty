import bcrypt from 'bcrypt'
import { jwtVerify, SignJWT } from 'jose'

import prisma from '../prisma/client'

export const hashPassword = (password) => bcrypt.hash(password, 10)
export const comparePasswords = (plainTextPassword, hashPassword) => bcrypt.compare(plainTextPassword, hashPassword)

export const createJWT = (user) => {
    // return jwt.sign({ id: user.id }, 'cookies')
    const iat = Math.floor(Date.now() / 1000)
    const exp = iat + 60 * 60 * 24 * 7

    return new SignJWT({ payload: { id: user.id, email: user.email } })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(process.env.JWT_SECRET))
}

export const validateJWT = async (jwt) => {
    const { payload } = await jwtVerify(jwt, new TextEncoder().encode(process.env.JWT_SECRET))

    return payload.payload as any
}

export const getUserFromCookie = async (cookies) => {
    const jwt = cookies.get(process.env.COOKIE_NAME)

    const { id } = await validateJWT(jwt.value)

    const user = await prisma.user.findUnique({
        where: {
            id: id as string,
        },
    })

    return user
}