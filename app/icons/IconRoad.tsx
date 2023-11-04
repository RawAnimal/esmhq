import SvgIcon from '@mui/material/SvgIcon';

const IconRoad = ({
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
        id="iconRoad"
        viewBox="0 0 24 24"
        fill={bgFill}
      >
        <path d="M18.1,4.8C18,4.3 17.6,4 17.1,4H13L13.2,7H10.8L11,4H6.8C6.3,4 5.9,4.4 5.8,4.8L3.1,18.8C3,19.4 3.5,20 4.1,20H10L10.3,15H13.7L14,20H19.8C20.4,20 20.9,19.4 20.8,18.8L18.1,4.8M10.4,13L10.6,9H13.2L13.4,13H10.4Z" />
      </svg>
    </SvgIcon>
  );
};

export default IconRoad;
