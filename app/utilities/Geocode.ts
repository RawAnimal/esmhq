import { fromAddress, setKey, setLanguage, setRegion } from 'react-geocode';

const defaultAddress = '4295 King Street East, Kitchener, Ontario N2P 0C6';

interface Props {
  address?: string | undefined;
}

export const GetCoordinates = async (props: Props) => {
  const address = props.address === undefined ? defaultAddress : props.address;
  if (process.env.REACT_APP_GOOGLE_GEO_API_KEY) {
    setKey(process.env.REACT_APP_GOOGLE_GEO_API_KEY);
  } else {
    throw new Error('No Google Maps API Key Found');
  }
  setLanguage('en');
  setRegion('ca');
  const response = await fromAddress(address);
  const { lat, lng } = response.results[0].geometry.location;
  return { lat, lng };
};
