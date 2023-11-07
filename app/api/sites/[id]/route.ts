import { patchSiteSchema } from '@/app/utilities/validationSchemas';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../auth/[...nextauth]/route";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // uncomment to secure API endpoint
  // const session = await getServerSession(authOptions);
  // if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();
  const validation = patchSiteSchema.safeParse(body);
  console.log(validation);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const {
    startDate,
    streetNumberName,
    cityTown,
    province,
    postal,
    assignment,
    assignmentType,
    withVehicle,
    details,
    estHours,
    endDate,
    fileNumber,
    schedulerURL,
    clName,
    clCompany,
    clPhone,
    clEmail,
    clAddress,
    clSSFNs,
    prName,
    prCompany,
    prPhone,
    prEmail,
    prAddress,
    prSSFNs,
    assignedToUserId,
    status,
  } = body;

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: {
        id: assignedToUserId,
      },
    });
    if (!user)
      return NextResponse.json({ error: 'Invalid user' }, { status: 400 });
  }

  const site = await prisma.site.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!site)
    return NextResponse.json({ error: 'Invalid site' }, { status: 404 });

  const updatedSite = await prisma.site.update({
    where: { id: site.id },
    data: {
      startDate,
      streetNumberName,
      cityTown,
      province,
      postal,
      assignment,
      assignmentType,
      withVehicle,
      details,
      estHours,
      endDate,
      fileNumber,
      schedulerURL,
      clName,
      clCompany,
      clPhone,
      clEmail,
      clAddress,
      clSSFNs,
      prName,
      prCompany,
      prPhone,
      prEmail,
      prAddress,
      prSSFNs,
      assignedToUserId,
      status,
    },
  });

  return NextResponse.json(updatedSite);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // uncomment to secure API endpoint
  // const session = await getServerSession(authOptions);
  // if (!session) return NextResponse.json({}, { status: 401 });
  const site = await prisma.site.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!site)
    return NextResponse.json({ error: 'Invalid site' }, { status: 404 });

  await prisma.site.delete({
    where: { id: site.id },
  });

  return NextResponse.json({});
}
