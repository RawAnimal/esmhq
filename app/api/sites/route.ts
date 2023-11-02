import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
//import { siteSchema } from '@/app/validationSchemas';
//import { getServerSession } from "next-auth";
//import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: NextRequest) {
  const sites = await prisma.site.findMany({
    include: {
      assignedToUser: true,
    },
  });
  return NextResponse.json(sites);
}

export async function POST(request: NextRequest) {
  // uncomment to secure API endpoint
  // const session = await getServerSession(authOptions);
  // if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();
  //   const validation = siteSchema.safeParse(body);
  //   if (!validation.success)
  //     return NextResponse.json(validation.error.format(), { status: 400 });

  const newSite = await prisma.site.create({
    data: {
      startDate: body.startDate,
      streetNumberName: body.streetNumberName,
      cityTown: body.cityTown,
      province: body.province,
      postal: body.postal,
      assignment: body.assignment,
      assignmentType: body.assignmentType,
      withVehicle: body.withVehicle,
      details: body.details,
      estHours: body.estHours,
      endDate: body.endDate,
      fileNumber: body.fileNumber,
      schedulerURL: body.schedulerURL,
      clName: body.clName,
      clCompany: body.clCompany,
      clPhone: body.clPhone,
      clEmail: body.clEmail,
      clAddress: body.clAddress,
      clSSFNs: body.clSSFNs,
      prName: body.prName,
      prCompany: body.prCompany,
      prPhone: body.prPhone,
      prEmail: body.prEmail,
      prAddress: body.prAddress,
      prSSFNs: body.prSSFNs,
      assignedToUserId: body.assignedToUserId,
    },
  });
  return NextResponse.json(newSite, { status: 201 });
}
