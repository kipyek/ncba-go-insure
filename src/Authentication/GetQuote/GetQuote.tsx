import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { renderLabel } from '../../Component/Stepper';
import QuoteList from './QuoteList';
import BenefitSelection from './BenefitSelection';
import QuoteConfirm from './QuoteConfirm';
import QuoteFinish from './QuoteFinish';
import QuoteRequest from './QuoteRequest';
import AuthCss from '../AuthCss';

const PAGES = ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5'];

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


export default function GetQuote() {
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


  return (
    <View style={AuthCss.container}>
      <View style={AuthCss.stepIndicator}>
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
              <BenefitSelection onNextStepPressSelection={() => handleNextStep()} onBackStep={() => handleBackStep()} />
              :
              currentPage === 3 ?
                <QuoteConfirm onNextStepPressConfirm={() => handleNextStep()} onBackStep={() => handleBackStep()} />
                :
                <QuoteFinish />
        }
      </View>
      {/* <Swiper
        style={{ flexGrow: 1 }}
        loop={false}
        index={currentPage}
        autoplay={false}
        showsButtons
        showsPagination={false}
        onIndexChanged={(page) => {
          setCurrentPage(page);
        }}
      >
        {PAGES.map((page) => renderViewPagerPage(page))}
      </Swiper> */}
    </View>
  );
}
