import React, { useContext } from 'react';
import { Text, useFont } from '@shopify/react-native-skia';
import {
  useDerivedValue,
  withTiming,
  SharedValue,
} from 'react-native-reanimated';
import AuthContext from '../context/AuthContext';

const XAxisText = ({ x, y, text,selectedBar }) => {
  
  const font = useFont(require('../assets/fonts/Roboto-Bold.ttf'), 12);
  const color = useDerivedValue(() => {
    if (selectedBar.value === text) {
      return withTiming("#FFAF45");
    } else if (selectedBar.value === null) {
      return withTiming("#FFAF45");
    } else {
      return withTiming("grey");
    }
  });
  

  if (!font) {
    return null;
  }

  const fontSize = font.measureText(text);

  return <Text font={font} x={x-fontSize.width/2} y={y} text={text} color={color} />
};

export default XAxisText;
