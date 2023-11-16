import TemplateNewSite from '@/emails/TemplateNewSite';
import { NextResponse, NextRequest } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
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
    assignedToFirstName,
    assignedToLastName,
  } = await request.json();
  try {
    const data = await resend.emails.send({
      from: 'webadmin@email.esmhq.com',
      to: ['skjsweeney@gmail.com', 'hamza.desai@esmsolutions.ca'],
      subject: 'ESM :: New Site',
      react: TemplateNewSite({
        startDate,
        streetNumberName,
        cityTown,
        province,
        postal,
        assignment,
        assignmentType,
        withVehicle,
        details,
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
        assignedToFirstName,
        assignedToLastName,
      }),
    });

    return NextResponse.json({
      status: 'OK',
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
