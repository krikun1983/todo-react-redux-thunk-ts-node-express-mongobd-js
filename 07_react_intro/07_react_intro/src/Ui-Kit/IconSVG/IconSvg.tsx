import React from 'react';
import './stylesSVG.scss';

type IconSVGProp = {
  name: string;
  width: string;
  height: string;
  fill?: string;
  className?: string;
};

export enum IconNameEnum {
  BASKET = 'basket',
  PLUS = 'plus',
}

const IconSVG: React.FC<IconSVGProp> = ({name, width, height, fill, className}) => {
  const handleCurrentSVG = () => {
    switch (name) {
      case 'basket': {
        return (
          <svg
            role="img"
            viewBox="0 0 2024 2024"
            className={className}
            fill={fill}
            width={width}
            height={height}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M832 864v576q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-576q0-14 9-23t23-9h64q14 0 23 9t9 23zm256 0v576q0
              14-9 23t-23 9h-64q-14 0-23-9t-9-23v-576q0-14 9-23t23-9h64q14 0 23 9t9 23zm256 0v576q0 14-9 23t-23 9h-64q-14
              0-23-9t-9-23v-576q0-14 9-23t23-9h64q14 0 23 9t9 23zm128 724v-948h-896v948q0 22 7 40.5t14.5 27 10.5 8.5h832q3
              0 10.5-8.5t14.5-27 7-40.5zm-672-1076h448l-48-117q-7-9-17-11h-317q-10 2-17 11zm928 32v64q0 14-9 23t-23 9h-96v948q0
              83-47 143.5t-113 60.5h-832q-66 0-113-58.5t-47-141.5v-952h-96q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h309l70-167q15-37
              54-63t79-26h320q40 0 79 26t54 63l70 167h309q14 0 23 9t9 23z"
            />
          </svg>
        );
      }
      case 'plus': {
        return (
          <svg
            role="img"
            viewBox="0 0 512 512"
            className={className}
            fill={fill}
            width={width}
            height={height}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M381,236H276V131c0-11-9-20-20-20s-20,9-20,20v105H131c-11,0-20,
              9-20,20s9,20,20,20h105v105c0,11,9,20,20,20  s20-9,20-20V276h105c11,0,
              20-9,20-20S392,236,381,236z"
            />
          </svg>
        );
      }
    }
  };
  return <>{handleCurrentSVG()}</>;
};

export default IconSVG;
