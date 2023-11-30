import prisma from '@/prisma/client';
import StatsCardIndTemplate from './StatsCardIndTemplate';

interface managerProps {
  manager: string | undefined;
}

const StatsCardIndEstHours = async (props: managerProps) => {
  const resultArray = await prisma.site.groupBy({
    by: ['status'],
    where: {
      AND: [{ status: true }, { assignedToUserId: props.manager }],
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
    <StatsCardIndTemplate
      title="Hours"
      data={numberFormatter.format(wEstHrsToNum)}
    />
  );
};

export default StatsCardIndEstHours;
