import { View } from 'react-native'
import React from 'react'
import HomeCss from '../Home/HomeCss'
import { renderLabel } from './Stepper';
import StepIndicator from 'react-native-step-indicator';

const firstIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 5,
  separatorFinishedColor: '#87CEEB',
  separatorUnFinishedColor: '#87CEEB',
  stepIndicatorFinishedColor: '#87CEEB',
  stepIndicatorUnFinishedColor: '#87CEEB',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#000000',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  labelColor: '#666666',
  labelSize: 12,
  currentStepLabelColor: '#87CEEB',
};

const StepperComponet = ({ currentPage }: any) => {
  const [currentPags, setCurrentPages] = React.useState<number>(0);
  const onStepPress = (position: number) => {
    setCurrentPages(position);
  };
  return (
    <View style={HomeCss.stepIndicator}>
      <StepIndicator
        customStyles={firstIndicatorStyles}
        currentPosition={currentPage}
        labels={[
          'Quote Requests',
          'Quote List',
          'Benefit Selection',
          'Quote Confirmation',
          'Finish',]}
        renderLabel={renderLabel}
      //onPress={onStepPress}
      />
    </View>
  )
}

export default StepperComponet