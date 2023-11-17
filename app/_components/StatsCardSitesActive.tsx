import prisma from '@/prisma/client';
import StatsCardTemplate from './StatsCardTemplate';

const StatsCardSitesActive = async () => {
  const activeSites = await prisma.site.count({
    where: { status: true },
  });
  return <StatsCardTemplate title="Active" data={activeSites.toString()} />;
};

export default StatsCardSitesActive;
