import prisma from '@/prisma/client';
import StatsCardIndTemplate from './StatsCardIndTemplate';

interface managerProps {
  manager: string | undefined;
}

const StatsCardIndSitesClosed = async (props: managerProps) => {
  const today = new Date();
  const firstDay = new Date(today.setDate(today.getDate() - today.getDay()));
  const lastDay = new Date(
    today.setDate(today.getDate() - today.getDay() + 6)
  );

  const closedSites = await prisma.site.count({
    where: {
      AND: [
        {
          assignedToUserId: props.manager,
        },
        {
          endDate: {
            gte: firstDay,
            lte: lastDay,
          },
        },
      ],
    },
  });
  return <StatsCardIndTemplate title="Closed" data={closedSites.toString()} />;
};

export default StatsCardIndSitesClosed;
