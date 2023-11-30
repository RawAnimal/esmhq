import prisma from '@/prisma/client';
import StatsCardIndTemplate from './StatsCardIndTemplate';

interface managerProps {
  manager: string | undefined;
}

const StatsCardIndAvgHours = async (props: managerProps) => {
  const active = await prisma.site.count({
    where: {
      AND: [{ status: true }, { assignedToUserId: props.manager }],
    },
  });
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
      title="Avg Hrs"
      data={numberFormatter.format(wEstHrsToNum / active)}
    />
  );
};

export default StatsCardIndAvgHours;
