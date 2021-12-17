import React from 'react';
import style from './IconSVG.module.scss';

type IconSVGProp = {
  name: string;
  width: string;
  height: string;
  fill?: string;
  className: string;
};

export enum IconNameEnum {
  BASKET = 'basket',
  PLUS = 'plus',
  EDIT = 'edit',
  CLOSE = 'close',
  ARROW_TOP = 'arrow_top',
  ARROW_BOTTOM = 'arrow_bottom',
  CHOICE = 'choice',
}

const IconSVG: React.FC<IconSVGProp> = ({
  name,
  width,
  height,
  fill,
  className,
}) => {
  const handleCurrentSVG = () => {
    switch (name) {
      case IconNameEnum.BASKET: {
        return (
          <svg
            role="img"
            viewBox="0 0 2024 2024"
            className={style[className]}
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
      case IconNameEnum.PLUS: {
        return (
          <svg
            role="img"
            viewBox="0 0 512 512"
            className={style[className]}
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
      case IconNameEnum.EDIT: {
        return (
          <svg
            role="img"
            viewBox="0 0 91 91"
            className={style[className]}
            fill={fill}
            width={width}
            height={height}
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path
                d="M36.682,45.397l-0.002,0.001c-0.002,0.002-0.002,0.004-0.002,0.004c-0.137,0.139-0.24,0.307-0.324,0.486
c-0.023,0.045-0.039,0.086-0.057,0.133c-0.018,0.046-0.043,0.088-0.057,0.137l-4.008,14.826c-0.158,0.588,0.01,1.215,0.439,1.646
c0.324,0.323,0.758,0.498,1.201,0.498c0.148,0,0.299-0.019,0.443-0.06l14.256-3.853c0.094,0.016,0.184,0.055,0.279,0.055
c0.436,0,0.871-0.166,1.203-0.498l23.086-23.088c1.23-1.231,1.91-2.868,1.91-4.609c0-1.741-0.68-3.378-1.91-4.609l-4.154-4.154
c-2.461-2.463-6.76-2.459-9.217,0L36.682,45.397L36.682,45.397z M62.174,24.715c1.174-1.177,3.23-1.176,4.408,0.001l4.154,4.153
c0.59,0.589,0.914,1.372,0.914,2.206s-0.324,1.616-0.914,2.206l-1.25,1.25l-8.564-8.563L62.174,24.715z M58.518,28.372l8.564,8.563
l-18.23,18.231l-8.566-8.564L58.518,28.372z M39.285,50.407l6.137,6.138l-9.135,2.471l2.469-9.136L39.285,50.407z"
              />
              <rect
                height="15.087"
                transform="matrix(0.7072 0.707 -0.707 0.7072 45.0547 -26.2009)"
                width="3.4"
                x="52.459"
                y="33.749"
              />
              <path
                d="M20.961,74.166h45.74c3.596,0,6.518-2.925,6.518-6.52V44.628H69.82v23.019c0,1.721-1.398,3.119-3.119,3.119H22.662V25.662
h29.012v-3.4H20.961c-0.939,0-1.699,0.761-1.699,1.7v48.503C19.262,73.404,20.021,74.166,20.961,74.166z"
              />
            </g>
          </svg>
        );
      }
      case IconNameEnum.CLOSE: {
        return (
          <svg
            role="img"
            viewBox="0 0 28 28"
            className={style[className]}
            fill={fill}
            width={width}
            height={height}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0,24l4,4l10-10l10,10l4-4L18,14L28,4l-4-4L14,10L4,0L0,4l10,10L0,24z" />
          </svg>
        );
      }
      case IconNameEnum.CHOICE: {
        return (
          <svg
            role="img"
            viewBox="0 0 459 459"
            className={style[className]}
            fill={fill}
            width={width}
            height={height}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M178.5,140.25v-102L0,216.75l178.5,178.5V290.7c127.5,0,216.75,40.8,280.5,130.05C433.5,293.25,357,165.75,178.5,140.25z" />
          </svg>
        );
      }
      case IconNameEnum.ARROW_BOTTOM: {
        return (
          <svg
            role="img"
            viewBox="0 0 307.053 307.053"
            className={style[className]}
            fill={fill}
            width={width}
            height={height}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M302.445,80.796l-11.101-11.103c-6.123-6.131-16.074-6.131-22.209,0L153.67,183.707L37.907,67.959
				c-6.134-6.13-16.08-6.13-22.209,0L4.597,79.06c-6.129,6.133-6.129,16.067,0,22.201l137.83,137.829
				c6.129,6.136,16.067,6.136,22.203,0l137.815-136.096C308.589,96.864,308.589,86.926,302.445,80.796z"
            />
          </svg>
        );
      }
      case IconNameEnum.ARROW_TOP: {
        return (
          <svg
            role="img"
            viewBox="0 0 307.053 307.053"
            className={style[className]}
            fill={fill}
            width={width}
            height={height}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M282.082,195.285L149.028,62.24c-1.901-1.903-4.088-2.856-6.562-2.856s-4.665,0.953-6.567,2.856L2.856,195.285
		C0.95,197.191,0,199.378,0,201.853c0,2.474,0.953,4.664,2.856,6.566l14.272,14.271c1.903,1.903,4.093,2.854,6.567,2.854
		c2.474,0,4.664-0.951,6.567-2.854l112.204-112.202l112.208,112.209c1.902,1.903,4.093,2.848,6.563,2.848
		c2.478,0,4.668-0.951,6.57-2.848l14.274-14.277c1.902-1.902,2.847-4.093,2.847-6.566
		C284.929,199.378,283.984,197.188,282.082,195.285z"
            />
          </svg>
        );
      }
    }
  };
  return <>{handleCurrentSVG()}</>;
};

export default IconSVG;
