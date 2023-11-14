import { changePasswordSchema } from '@/app/utilities/validationSchemas';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const validation = changePasswordSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!user)
    return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      hashedPassword,
    },
  });
  return NextResponse.json({});
}
