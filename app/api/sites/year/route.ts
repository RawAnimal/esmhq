import prisma from '@/prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
  const years = await prisma.$queryRaw`call getSiteYears()`;

  return NextResponse.json(years);
}
