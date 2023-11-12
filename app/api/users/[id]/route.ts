import { userPatchSchema } from '@/app/utilities/validationSchemas';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
    select: {
      firstName: true,
      lastName: true,
      title: true,
      email: true,
      phone: true,
      role: true,
      image: true,
    },
  });

  if (!user)
    return NextResponse.json({ error: 'User not found' }, { status: 400 });

  return NextResponse.json(user);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const validation = userPatchSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!user)
    return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      title: body.title,
      email: body.email,
      phone: body.phone,
      role: body.role,
      image: body.image,
    },
  });
  return NextResponse.json({
    firstName: updatedUser.firstName,
    lastName: updatedUser.lastName,
    title: updatedUser.title,
    email: updatedUser.email,
    phone: updatedUser.phone,
    role: updatedUser.role,
    image: updatedUser.image,
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!user)
    return NextResponse.json({ error: 'User not found' }, { status: 404 });

  await prisma.user.delete({
    where: {
      id: user.id,
    },
  });

  return NextResponse.json({});
}
