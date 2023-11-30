import prisma from '@/prisma/client';
import StatsCardIndTemplate from './StatsCardIndTemplate';

interface managerProps {
  manager: string | undefined;
}

const StatsCardIndSitesActive = async (props: managerProps) => {
  const activeSites = await prisma.site.count({
    where: {
      AND: [{ assignedToUserId: props.manager }, { status: true }],
    },
  });
  return <StatsCardIndTemplate title="Active" data={activeSites.toString()} />;
};

export default StatsCardIndSitesActive;
