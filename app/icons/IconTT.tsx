import SvgIcon from '@mui/material/SvgIcon';

const IconTT = ({
  fSize,
  bgFill,
}: {
  fSize: 'small' | 'medium' | 'large';
  bgFill: string;
}) => {
  return (
    <SvgIcon fontSize={fSize}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={bgFill}
        viewBox="0 0 24 24"
      >
        <path
          d="M19.1,0H4.9C2.2,0,0,2.2,0,4.9v14.2C0,21.8,2.2,24,4.9,24h14.2c2.7,0,4.9-2.2,4.9-4.9V4.9C24,2.2,21.8,0,19.1,0z
		 M14.3,16.9v1H9.8v-7.4h1v6.4h2.5V8.6H6.6v-1h10.8v1h-3.1L14.3,16.9L14.3,16.9z M18.6,7v3.2h-4.1v-1h3V7H6.3v2.2h6.2v7.4h-1v-6.4
		H5.3V6h13.3L18.6,7C18.6,7,18.6,7,18.6,7z"
        />
      </svg>
    </SvgIcon>
  );
};

export default IconTT;
