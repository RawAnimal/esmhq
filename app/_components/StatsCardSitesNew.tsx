import prisma from '@/prisma/client';
import StatsCardTemplate from './StatsCardTemplate';

const StatsCardSitesNew = async () => {
  const today = new Date();
  const firstDay = new Date(today.setDate(today.getDate() - today.getDay()));
  const lastDay = new Date(
    today.setDate(today.getDate() - today.getDay() + 6)
  );

  const newSites = await prisma.site.count({
    where: {
      startDate: {
        gte: firstDay,
        lte: lastDay,
      },
    },
  });
  return <StatsCardTemplate title="New" data={newSites.toString()} />;
};

export default StatsCardSitesNew;
