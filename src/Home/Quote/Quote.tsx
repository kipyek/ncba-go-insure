import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { renderLabel } from '../../Component/Stepper';
import QuoteList from './QuoteList';
import BenefitSelection from './BenefitSelection';
import QuoteConfirm from './QuoteConfirm';
import QuoteFinish from './QuoteFinish';
import QuoteRequest from './QuoteRequest';
import { Header } from '../../Component/Header';
import HomeCss from '../HomeCss';
import { StatusBar } from 'expo-status-bar';

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


export default function Quote() {
  const [currentPage, setCurrentPage] = React.useState<number>(0);

  const onStepPress = (position: number) => {
    setCurrentPage(position);
    console.log(currentPage)
  };

  const handleNextStep = () => {
    setCurrentPage((i) => i + 1)
  }

  const handleBackStep = () => {
    setCurrentPage((i) => i - 1)
  }

  const handleNewQuote = () => {
    setCurrentPage(0);
  };



  return (
    <View className='flex-1 bg-white'>
      <StatusBar backgroundColor='#87CEEB' />
      <Header
        label={"Get Quote"}
      />
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
          onPress={onStepPress}
        />
      </View>

      <View>
        {currentPage === 0 ?
          <QuoteRequest onNextStepPress={() => handleNextStep()} />
          :
          currentPage === 1 ?
            <QuoteList onNextStepPressList={() => handleNextStep()} />
            :
            currentPage === 2 ?
              <BenefitSelection onNextStepPressSelection={() => handleNextStep()} handleBackStep={() => handleBackStep()} />
              :
              currentPage === 3 ?
                <QuoteConfirm onNextStepPressConfirm={() => handleNextStep()} handleBackStep={() => handleBackStep()} />
                :
                <QuoteFinish onNewQuote={handleNewQuote} />
        }
      </View>
    </View>
  );
}