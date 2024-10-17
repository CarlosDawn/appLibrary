import React, { SVGProps } from 'react';
import { Svg, Path } from 'react-native-svg'; // Assuming you're using react-native-svg

const BookmarkFilledIcon = () => {
  return (
    <Svg width={15} height={18} viewBox="0 0 15 18" >
      <Path
        d="M0.0606585 18V2C0.0606585 1.45 0.258868 0.979166 0.655286 0.5875C1.0517 0.195833 1.52825 -2.38419e-07 2.08492 -2.38419e-07H12.2062C12.7629 -2.38419e-07 13.2395 0.195833 13.6359 0.5875C14.0323 0.979166 14.2305 1.45 14.2305 2V18L7.14558 15L0.0606585 18Z"
        fill="#1D1B20"
      />
    </Svg>
  );
};

export default BookmarkFilledIcon; // No need for memoization in most React Native cases