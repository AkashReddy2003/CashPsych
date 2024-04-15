import React from 'react';
import { Path, Skia } from '@shopify/react-native-skia';
import {
  useDerivedValue,
  withTiming,
  SharedValue,
} from 'react-native-reanimated';

const BarPath = ({
  x,
  y,
  barWidth,
  graphHeight,
 progress,
 label,
 selectedBar
}) => {
  
  const color = useDerivedValue(() => {
    if (selectedBar.value === label) {
      return withTiming('#FFAF45');
    } else if (selectedBar.value === null) {
      return withTiming('#FFAF45');
    } else {
      return withTiming('#d1d0c5');
    }
  });
  const path = useDerivedValue(() => {
    const barPath = Skia.Path.Make();

    barPath.addRRect({
      rect: {
        x: x-barWidth/2 ,
        y: graphHeight,
        width: barWidth,
        height: y*-1*progress.value,
      },
      rx: 8,
      ry: 8,
    });

    return barPath;
  });

  return <Path color={color} path={path}/>
};

export default BarPath;