import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany({
    where: {
      role: { in: ['WEBUSER', 'WEBADMIN'] },
    },
    orderBy: { lastName: 'asc' },
  });
  return NextResponse.json(users);
}
