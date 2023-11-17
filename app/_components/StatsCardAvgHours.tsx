import prisma from '@/prisma/client';
import StatsCardTemplate from './StatsCardTemplate';

const StatsCardAvgHours = async () => {
  const active = await prisma.site.count({
    where: { status: true },
  });
  const resultArray = await prisma.site.groupBy({
    by: ['status'],
    where: {
      status: true,
    },
    _sum: {
      estHours: true,
    },
  });
  const wEstHrs = resultArray.shift();
  const wEstHrsToNum = Number(wEstHrs?._sum.estHours);
  const numberFormatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return (
    <StatsCardTemplate
      title="Avg Hrs"
      data={numberFormatter.format(wEstHrsToNum / active)}
    />
  );
};

export default StatsCardAvgHours;
