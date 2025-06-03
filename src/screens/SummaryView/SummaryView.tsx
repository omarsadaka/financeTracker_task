import React, {useEffect, useState} from 'react';
import {
  Colors,
  RFValue,
  Text,
  View,
  FONT_FAMILY,
  SW,
  SH,
  Image,
} from '../../UI';
import {useLanguage} from '../../lang/useLanguage';
import {Platform, StyleSheet} from 'react-native';
import AppHeader from '../../models/UI/AppHeader';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {PieChart} from 'react-native-chart-kit';

const SummaryView = () => {
  const {t} = useLanguage();
  const Navigation = useNavigation<any>();
  const [transactions, setTransactions] = useState<any>([]);
  const currentMonth = new Date().getMonth();

  useEffect(() => {
    const unsubscribe = Navigation.addListener('focus', () => {
      loadTransactions();
    });
    return unsubscribe;
  }, [Navigation]);

  const loadTransactions = async () => {
    const data = await AsyncStorage.getItem('Transactions');
    if (data) {
      setTransactions(JSON.parse(data));
    }
  };

  const summary = transactions?.reduce(
    (acc: any, item: any) => {
      const itemDate = new Date(item.date);
      if (itemDate.getMonth() === currentMonth) {
        acc[item.type] += Number(item.amount);
        if (item.type === 'expense') {
          acc.categories[item.category] =
            (acc.categories[item.category] || 0) + item.amount;
        }
      }
      return acc;
    },
    {income: 0, expense: 0, categories: {}},
  );

  const chartData = Object.keys(summary.categories).map((key, i) => ({
    name: key,
    amount: Number(summary?.categories[key]),
    color: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0'][i % 4],
    legendFontColor: Colors().App.BLUE_90,
    legendFontSize: SW * 0.035,
  }));

  return (
    <View style={styles.mainContainer}>
      <AppHeader title={t('Navigation.summaryView')} />
      <Text
        style={{
          width: '95%',
          fontSize: RFValue(18),
          color: Colors().Text.DARK,
          marginTop: SH * 0.02,
          fontWeight: Platform.OS == 'android' ? 'normal' : '600',
        }}
        numberOfLines={5}>
        {t('UI.summaryForMonth')}
      </Text>
      {transactions?.length > 0 ? (
        <View
          style={{
            width: '100%',
            paddingHorizontal: SW * 0.02,
            marginTop: SH * 0.03,
            alignItems: 'flex-start',
          }}>
          <Text style={styles.title}>
            {t('UI.totalIncome')} {summary?.income?.toFixed(2)} {t('UI.unit')}
          </Text>
          <Text style={styles.title}>
            {t('UI.totalExpense')} {summary?.expense?.toFixed(2)} {t('UI.unit')}
          </Text>
          {chartData?.length > 0 && (
            <PieChart
              style={{marginTop: SH * 0.03}}
              data={chartData.map(c => ({
                name: c.name,
                population: c.amount,
                color: c.color,
                legendFontColor: c.legendFontColor,
                legendFontSize: c.legendFontSize,
              }))}
              width={SW}
              height={SH * 0.25}
              chartConfig={{
                color: () => `#000`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="0"
              absolute
            />
          )}
        </View>
      ) : (
        <View style={{width: '100%', marginTop: SH * 0.2}}>
          <Text style={styles.noData}>{t('UI.noData')}</Text>
          <Image
            source={require('../../assets/images/noData.png')}
            style={{width: SW * 0.8, height: SH * 0.3, marginTop: SH * 0.02}}
          />
        </View>
      )}
    </View>
  );
};

export {SummaryView};
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    backgroundColor: Colors().App.WHITE,
  },
  title: {
    fontSize: RFValue(16),
    color: Colors().Text.BLUE_70,
    marginTop: 5,
  },
  noData: {
    fontSize: RFValue(18),
    color: Colors().Text.BLUE_70,
    fontWeight: Platform.OS == 'android' ? 'normal' : '800',
  },
});
