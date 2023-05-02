import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

import { comparePasswords, createJWT } from '@/lib/auth';
import prisma from '@/prisma/client';

export default async function signIn(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Missing email or password' });
    return;
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(401).json({ error: 'Invalid login' });
      return;
    }

    const isPasswordMatch = await comparePasswords(password, user.password);

    if (!isPasswordMatch) {
      res.status(401).json({ error: 'Invalid login' });
      return;
    }

    const jwtToken = await createJWT(user);
    const cookieName = process.env?.COOKIE_NAME || 'defaultCookieName';
    res.setHeader(
      'Set-Cookie',
      serialize(cookieName, jwtToken, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'strict', // Adds SameSite attribute as strict to the cookie
      })
    );
    console.log('signin success');
    res.status(200).json({ message: 'Login Successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
}
