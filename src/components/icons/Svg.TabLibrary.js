import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../constants';

const SvgTabLibrary = ({ active, size }) => {
  const fill = active ? colors.white : colors.greyInactive;
  const dPath = active
    ?  'M16 6c0 0-4-4-16-4v24c12.125 0 16 4 16 4s3.875-4 16-4v-24c-12 0-16 4-16 4zM4 6c5.084 0.426 8.203 1.602 10 2.555v16.109c-1.797-0.949-4.916-2.125-10-2.555v-16.109zM28 22.109c-5.086 0.43-8.203 1.604-10 2.555v-16.109c1.797-0.953 4.914-2.129 10-2.555v16.109z'
    : 'm144 400h280c8.837 0 16-7.164 16-16v-368c0-8.836-7.163-16-16-16h-286c-36.393 0-66 29.607-66 66v374c0 39.701 32.299 72 72 72h280c8.837 0 16-7.164 16-16s-7.163-16-16-16h-280c-22.056 0-40-17.944-40-40s17.944-40 40-40zm264-32h-232v-336h232zm-304-302c0-18.748 15.252-34 34-34h6v336c-14.791 0-28.551 4.488-40 12.167z'
    ;
  const aViewBox = active 
    ? "0 0 32 32"
    : "0 0 512 512"
    ;
  return (
    <Svg height={size} width={size} viewBox={aViewBox}>
      <Path d={dPath} fill={fill} />
    </Svg>
  );
};

SvgTabLibrary.defaultProps = {
  active: false,
  size: 24
};

SvgTabLibrary.propTypes = {
  // optional
  active: PropTypes.bool,
  size: PropTypes.number
};

export default SvgTabLibrary;
