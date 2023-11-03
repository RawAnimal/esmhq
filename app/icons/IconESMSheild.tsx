import SvgIcon from '@mui/material/SvgIcon';

const IconESMSheild = ({ fSize }: { fSize: 'small' | 'medium' | 'large' }) => {
  return (
    <SvgIcon fontSize={fSize}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          id="Sheild"
          className="fill-orange-500"
          d="M14.5,0.5c0,0-1-0.4-4.2-0.4S0,1.8,0,1.8s-0.3,10.6,1.9,14s3.4,4.8,8.5,8.2l0,0
	c5.1-3.4,6.3-4.8,8.5-8.2c0.2-0.3,0.4-0.7,0.5-1.2h-3.1c0,0-0.6,2.6-5.9,6.1V2.9c0,0,2.1-0.4,4.2,0.2L14.5,0.5L14.5,0.5z"
        />
        <polygon
          id="Plus"
          className="fill-stone-500"
          points="16.4,0.5 19.6,0.5 19.6,4.8 24,4.8 24,8.1 19.6,8.1 19.6,12.4 16.4,12.4 16.4,8.1 11.9,8.1 
	11.9,4.9 16.4,4.9 "
        />
      </svg>
    </SvgIcon>
  );
};

export default IconESMSheild;
