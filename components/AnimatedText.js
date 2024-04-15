import React, { useContext } from 'react';
import { View } from 'react-native';
import { SharedValue, useDerivedValue } from 'react-native-reanimated';
import { Canvas, Text, useFont } from '@shopify/react-native-skia';
import AuthContext from '../context/AuthContext';

const AnimatedText = ({ selectedValue }) => {
  const {col}=useContext(AuthContext);
  const font = useFont(require('../assets/fonts/Roboto-Bold.ttf'), 70);

  const animatedText = useDerivedValue(() => {
    return "₹"+`${Math.round(selectedValue.value)}`;
  });

  if (!font) {
    return <View />;
  }

  const fontSize = font.measureText('0');

  return (
    <Canvas style={{ height: fontSize.height + 40 }}>
      <Text
        text={animatedText}
        font={font}
        color={col}
        y={fontSize.height + 20}
      />
    </Canvas>
  );
};

export default AnimatedText;
