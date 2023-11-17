import prisma from '@/prisma/client';
import StatsCardTemplate from './StatsCardTemplate';

const StatsCardSitesClosed = async () => {
  const today = new Date();
  const firstDay = new Date(today.setDate(today.getDate() - today.getDay()));
  const lastDay = new Date(
    today.setDate(today.getDate() - today.getDay() + 6)
  );

  const closedSites = await prisma.site.count({
    where: {
      endDate: {
        gte: firstDay,
        lte: lastDay,
      },
    },
  });
  return <StatsCardTemplate title="Closed" data={closedSites.toString()} />;
};

export default StatsCardSitesClosed;
