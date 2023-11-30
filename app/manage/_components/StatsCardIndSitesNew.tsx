import prisma from '@/prisma/client';
import StatsCardIndTemplate from './StatsCardIndTemplate';

interface managerProps {
  manager: string | undefined;
}

const StatsCardIndSitesNew = async (props: managerProps) => {
  const today = new Date();
  const firstDay = new Date(today.setDate(today.getDate() - today.getDay()));
  const lastDay = new Date(
    today.setDate(today.getDate() - today.getDay() + 6)
  );

  const newSites = await prisma.site.count({
    where: {
      AND: [
        {
          assignedToUserId: props.manager,
        },
        {
          startDate: {
            gte: firstDay,
            lte: lastDay,
          },
        },
      ],
    },
  });
  return <StatsCardIndTemplate title="New" data={newSites.toString()} />;
};

export default StatsCardIndSitesNew;
