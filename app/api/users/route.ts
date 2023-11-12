import { NextRequest, NextResponse } from 'next/server';
import { userSchema } from '@/app/utilities/validationSchemas';
import prisma from '@/prisma/client';
import bcrypt from 'bcrypt';

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany({
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
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = userSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 }); //bad request

  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (user)
    return NextResponse.json(
      { error: 'User already exists' },
      { status: 400 }
    );

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const newUser = await prisma.user.create({
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      title: body.title,
      email: body.email,
      phone: body.phone,
      role: body.role,
      hashedPassword,
    },
  });

  return NextResponse.json({
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    title: newUser.title,
    email: newUser.email,
    phone: newUser.phone,
    role: newUser.role,
  });
}
