import TemplateCloseSite from '@/emails/TemplateCloseSite';
import { NextResponse, NextRequest } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const {
    endDate,
    fileNumber,
    streetNumberName,
    cityTown,
    province,
    postal,
    assignedToFirstName,
    assignedToLastName,
  } = await request.json();
  try {
    const data = await resend.emails.send({
      from: 'webadmin@email.esmhq.com',
      to: ['skjsweeney@gmail.com'],
      subject: 'ESM :: Close Site',
      react: TemplateCloseSite({
        endDate,
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
