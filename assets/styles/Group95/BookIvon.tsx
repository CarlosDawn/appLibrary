import React, { SVGProps } from 'react';
import { Svg, Path } from 'react-native-svg'; // Assuming you're using react-native-svg

const BookIcon = () => {
  return (
    <Svg width={17} height={23} viewBox="0 0 17 23">
      <Path
        d="M0.0485268 19.9375C0.0485268 19.1916 0.315114 18.4762 0.789643 17.9488C1.26417 17.4213 1.90777 17.125 2.57886 17.125H16.2426M0.0485268 19.9375C0.0485268 20.6834 0.315114 21.3988 0.789643 21.9262C1.26417 22.4537 1.90777 22.75 2.57886 22.75H16.2426V0.25H2.57886C1.90777 0.25 1.26417 0.546316 0.789643 1.07376C0.315114 1.60121 0.0485268 2.31658 0.0485268 3.0625V19.9375Z"
        stroke="#1E1E1E"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default BookIcon; 