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
  const [nextPosition, setNextPosition] = React.useState<number>(currentPage + 1);

  const onStepPress = (position: number) => {
    setCurrentPage(position);
    console.log(currentPage)
  };

  const onNextStepPress = () => {
    setCurrentPage(1);
  };
  const onNextStepPressList = () => {
    setCurrentPage(2);
  };
  const onNextStepPressSelection = () => {
    setCurrentPage(3);
  };
  const onNextStepPressConfirm = () => {
    setCurrentPage(4);
  };
  const renderViewPagerPage = (data: any) => {
    return (
      <View key={data} style={styles.page}>
        <Text>{data}</Text>
      </View>
    );
  };




  return (
    <View style={styles.container}>
      <Header
        label={"Get Quote"}
      />
      <View style={styles.stepIndicator}>
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
          <QuoteRequest onNextStepPress={() => onNextStepPress()} />
          :
          currentPage === 1 ?
            <QuoteList onNextStepPressList={() => onNextStepPressList()} />
            :
            currentPage === 2 ?
              <BenefitSelection onNextStepPressSelection={() => onNextStepPressSelection()} />
              :
              currentPage === 3 ?
                <QuoteConfirm onNextStepPressConfirm={() => onNextStepPressConfirm()} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  stepIndicator: {
    marginTop: 10,
    marginBottom: 20
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});