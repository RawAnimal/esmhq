import prisma from '@/prisma/client';
import StatsCardTemplate from './StatsCardTemplate';

const StatsCardEstHours = async () => {
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
      title="Hours"
      data={numberFormatter.format(wEstHrsToNum)}
    />
  );
};

export default StatsCardEstHours;
