import TemplateReopenSite from '@/emails/TemplateReopenSite';
import { NextResponse, NextRequest } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const {
    startDate,
    fileNumber,
    streetNumberName,
    cityTown,
    province,
    postal,
    assignedToFirstName,
    assignedToLastName,
    assignedToEmail,
  } = await request.json();
  try {
    const data = await resend.emails.send({
      from: 'webadmin@email.esmhq.com',
      to: ['skjsweeney@gmail.com', `${assignedToEmail}`],
      subject: 'ESM :: Reopen Site',
      react: TemplateReopenSite({
        startDate,
        fileNumber,
        streetNumberName,
        cityTown,
        province,
        postal,
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
