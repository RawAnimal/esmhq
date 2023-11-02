import { faker } from '@faker-js/faker/locale/en_CA';

export type Site = {
  streetNumberName: string;
  cityTown: string;
  province:
    | 'AB'
    | 'BC'
    | 'MB'
    | 'NB'
    | 'NL'
    | 'NT'
    | 'NS'
    | 'NU'
    | 'ON'
    | 'PE'
    | 'QC'
    | 'SK'
    | 'YT';
  clName: string;
  clCompany: string;
  estHours: number;
  startDate: Date;
  status: boolean;
  schedulerURL: string;
  fullAddress: string;
  subRows?: Site[];
};

const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newSite = (): Site => {
  return {
    streetNumberName: faker.location.streetAddress(),
    cityTown: faker.location.city(),
    province: faker.helpers.shuffle<Site['province']>([
      'AB',
      'BC',
      'MB',
      'NB',
      'NL',
      'NT',
      'NS',
      'NU',
      'ON',
      'PE',
      'QC',
      'SK',
      'YT',
    ])[0]!,
    clName: faker.person.fullName(),
    clCompany: faker.company.name(),
    estHours: faker.number.int({ min: 4, max: 2000 }),
    startDate: faker.date.between({
      from: '2022-01-01T00:00:00.000Z',
      to: '2023-10-30T00:00:00.000Z',
    }),
    status: faker.datatype.boolean({ probability: 0.1 }),
    schedulerURL: faker.internet.url({ protocol: 'http', appendSlash: false }),
    fullAddress: '',
  };
};

export function makeSiteData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Site[] => {
    const len = lens[depth]!;
    return range(len).map((d): Site => {
      return {
        ...newSite(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
