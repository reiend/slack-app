import React from "react";

const ChatCloudSignup = (props) => {
  return (
    <svg
      width="139"
      height="136"
      viewBox="0 0 139 136"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_d_2_224)">
        <path d="M2 93H40L23.2353 111.717L2 134V93Z" fill="#3BCF93" />
        <path
          d="M2 4C2 2.89543 2.89543 2 4 2H135C136.105 2 137 2.89543 137 4V102C137 103.105 136.105 104 135 104H2V4Z"
          fill="#3BCF93"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_2_224"
          x="0"
          y="0"
          width="139"
          height="136"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2_224"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2_224"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default ChatCloudSignup;
