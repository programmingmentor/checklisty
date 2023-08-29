'use server'

import { cookies } from 'next/headers'

import { getUserFromCookie } from '@/lib/auth'

export async function getCurrentUser() {
    const user = await getUserFromCookie(cookies())
    return user
}