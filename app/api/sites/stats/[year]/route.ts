import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

interface Stats {
  f0: number; // yearnumber
  f1: number; // weeknumber
  f2: string; // site_started
  f3: string; // site_ended
  f4: string; // active_sites
  f5: string; // total_est_hours
}

// BigInt.prototype.toJSON = function () {
//   return this.toString();
// };

export async function GET(
  request: NextRequest,
  { params }: { params: { year: string } }
) {
  if (params.year === 'ALL') {
    const stats = await prisma.$queryRaw<Stats[]>`call getSitesData(null)`;
    const newStats = stats.map((obj) =>
      Object.fromEntries(
        Object.entries(obj).map(([key, val]) => [
          key,
          typeof val === 'bigint' ? Number(val) : val,
        ])
      )
    );
    return NextResponse.json(newStats);
  } else if (+params.year) {
    // +num returns the numeric value of the string, or NaN
    // if the string isn't purely numeric characters
    const passYear = parseInt(params.year);
    const stats = await prisma.$queryRaw<
      Stats[]
    >`call getSitesData(${passYear})`;
    if (stats.length == 0) {
      return NextResponse.json({ message: 'No results' });
    }
    const newStats = stats.map((obj) =>
      Object.fromEntries(
        Object.entries(obj).map(([key, val]) => [
          key,
          typeof val === 'bigint' ? Number(val) : val,
        ])
      )
    );
    return NextResponse.json(newStats);
  } else {
    return NextResponse.json({ error: 'Invalid year' }, { status: 400 });
  }
}
