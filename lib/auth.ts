import bcrypt from 'bcrypt'
import { jwtVerify, SignJWT } from 'jose'

import prisma from '../prisma/client'

export const hashPassword = async (password) => await bcrypt.hash(password, 10)
export const comparePasswords = async (plainTextPassword, hashPassword) => await bcrypt.compare(plainTextPassword, hashPassword)

export const createJWT = (user) => {
    try {
        const iat = Math.floor(Date.now() / 1000)
        const exp = iat + 60 * 60 * 24 * 7

        const payload = { id: user.id, email: user.email };
        const protectedHeader = { alg: 'HS256', typ: 'JWT' };
        const privateKey = new TextEncoder().encode(process.env.JWT_SECRET);
        const jwt = new SignJWT({ payload })
            .setProtectedHeader(protectedHeader)
            .setExpirationTime(exp)
            .setIssuedAt(iat)
            .setNotBefore(iat)
            .sign(privateKey);

        return jwt;
    } catch (error) {
        throw new Error(`Error creating JWT: ${error.message}`);
    }
}

export const validateJWT = async (jwt) => {
    try {
        const privateKey = new TextEncoder().encode(process.env.JWT_SECRET)
        const { payload } = await jwtVerify(jwt, privateKey)

        return payload.payload;
    } catch (error) {
        throw new Error(`Error validating JWT: ${error.message}`);
    }
}

export const getUserFromCookie = async (cookies) => {
    try {
        const jwt = cookies?.[process.env.COOKIE_NAME]?.value;
        if (!jwt) throw new Error('No JWT found in cookie');

        const { id } = await validateJWT(jwt);
        if (!id) throw new Error('Invalid JWT: no user ID found');

        const user = await prisma.user.findUnique({
            where: { id },
        });
        console.log('user', user);
        return user;
    } catch (error) {
        throw new Error(`Error getting user from cookie: ${error.message}`);
    }
}
