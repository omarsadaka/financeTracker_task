import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Colors,
  RFValue,
  Text,
  View,
  FONT_FAMILY,
  SW,
  VectorIcons,
  SH,
  Alert,
  TouchableOpacity,
  Image,
} from '../../UI';
import {useLanguage} from '../../lang/useLanguage';
import {FlatList, Platform, RefreshControl, StyleSheet} from 'react-native';
import AppHeader from '../../models/UI/AppHeader';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';

const TransactionsList = () => {
  const {t} = useLanguage();
  const FlatListRef = useRef<any>();
  const Navigation = useNavigation<any>();
  const [transactions, setTransactions] = useState<any>([]);
  const [isSort, setIsSort] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [sort_id, setSort_id] = useState('');
  const [sort_value, setSort_value] = useState('');
  const [filter_id, setFilter_id] = useState('all');
  const [filter_value, setFilter_value] = useState('');
  const [loading_refresh, setLoading_refresh] = useState(false);

  useEffect(() => {
    const unsubscribe = Navigation.addListener('focus', () => {
      loadTransactions();
    });
    return unsubscribe;
  }, [Navigation]);

  useEffect(() => {
    loadTransactions();
  }, [filter_id, sort_id]);

  const loadTransactions = async () => {
    const data = await AsyncStorage.getItem('Transactions');
    if (data) {
      const list = JSON.parse(data);
      // setTransactions(list);
      setTransactions(
        list.filter((el: any) => filter_id === 'all' || el.type === filter_id),
      );
      setLoading_refresh(false);
    } else {
      setLoading_refresh(false);
    }
  };

  const onDelete = async (id: number) => {
    const data = transactions?.filter((el: any) => el.id !== id);
    await AsyncStorage.setItem('Transactions', JSON.stringify(data));
    setTransactions(data);
  };

  const onClear = async () => {
    await AsyncStorage.setItem('Transactions', '');
    setTransactions([]);
  };
  const renderItem = useCallback((item: any) => {
    return (
      <View style={styles.item}>
        <View
          style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1.3, alignItems: 'flex-start'}}>
            <View style={styles.row}>
              <VectorIcons
                icon="MaterialCommunityIcons"
                name={'bank-transfer'}
                size={RFValue(25)}
                color={Colors().Text.DARK}
              />
              <Text
                style={{
                  fontSize: RFValue(13),
                  marginHorizontal: SW * 0.01,
                  color: Colors().Text.DARK,
                }}>
                {item.type == 'expense' ? t('Add.expense') : t('Add.income')}
              </Text>
            </View>
            <View style={styles.row}>
              <VectorIcons
                icon="MaterialIcons"
                name={'category'}
                size={RFValue(25)}
                color={Colors().Text.DARK}
              />
              <Text
                style={{
                  fontSize: RFValue(13),
                  marginHorizontal: SW * 0.01,
                  color: Colors().Text.DARK,
                }}>
                {item.category}
              </Text>
            </View>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <View style={styles.row}>
              <VectorIcons
                icon="MaterialIcons"
                name={'price-check'}
                size={RFValue(25)}
                color={Colors().Text.DARK}
              />
              <Text
                style={{
                  fontSize: RFValue(13),
                  marginHorizontal: SW * 0.01,
                  color: Colors().Text.DARK,
                }}>
                {item.amount} {'  '} {t('UI.unit')}
              </Text>
            </View>
            <View style={styles.row}>
              <VectorIcons
                icon="Fontisto"
                name={'date'}
                size={RFValue(22)}
                color={Colors().Text.DARK}
              />
              <Text
                style={{
                  fontSize: RFValue(13),
                  marginHorizontal: SW * 0.01,
                  color: Colors().Text.DARK,
                }}>
                {item.date}
              </Text>
            </View>
          </View>
          <VectorIcons
            icon="AntDesign"
            name={'delete'}
            size={RFValue(25)}
            color={Colors().Text.RED}
            onPress={() => {
              Alert({
                title: t('UI.Confirmation'),
                body: t('UI.SureToDelete'),
                onPress: () => onDelete(item.id),
              });
            }}
          />
        </View>
        {item.description && (
          <View style={[styles.row, {width: '100%'}]}>
            <Text
              style={{
                flex: 1,
                fontSize: RFValue(13),
                marginHorizontal: SW * 0.01,
                color: Colors().Text.DARK,
              }}>
              {item.description}
            </Text>
          </View>
        )}
      </View>
    );
  }, []);

  const RenserTopActions = () => {
    return (
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingHorizontal: 1,
          marginTop: 6,
        }}>
        <View
          style={{
            flex: 1,
            alignSelf: 'flex-start',
          }}>
          <TouchableOpacity
            onPress={() => setIsFilter(!isFilter)}
            style={styles.picker}>
            <Text
              style={{
                fontSize: SW * 0.033,
                marginHorizontal: SW * 0.02,
                color:
                  filter_id && filter_value
                    ? Colors().Text.GREEN
                    : Colors().Text.LIGHT_GREY,
              }}>
              {filter_id && filter_value ? filter_value : t('UI.filterBy')}
            </Text>
            <VectorIcons
              icon="MaterialIcons"
              name={isFilter ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              color={Colors().Text.LIGHT_GREY}
              size={RFValue(25)}
            />
          </TouchableOpacity>
          {isFilter && (
            <View
              style={{
                width: '100%',
                borderRadius: 8,
                borderWidth: 1,
                borderColor: Colors().App.LIGHT_GREY,
                paddingVertical: 6,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setFilter_id('income');
                  setFilter_value(t('Add.income'));
                  setIsFilter(false);
                }}>
                <Text
                  style={[
                    styles.typeItem,
                    {
                      color:
                        filter_id == 'income'
                          ? Colors().Text.GREEN
                          : Colors().App.DARK,
                    },
                  ]}>
                  {t('Add.income')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setFilter_id('expense');
                  setFilter_value(t('Add.expense'));
                  setIsFilter(false);
                }}>
                <Text
                  style={[
                    styles.typeItem,
                    {
                      color:
                        filter_id == 'expense'
                          ? Colors().Text.GREEN
                          : Colors().App.DARK,
                    },
                  ]}>
                  {t('Add.expense')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setFilter_id('all');
                  setFilter_value(t('UI.all'));
                  setIsFilter(false);
                }}>
                <Text
                  style={[
                    styles.typeItem,
                    {
                      color:
                        filter_id == 'all'
                          ? Colors().Text.GREEN
                          : Colors().App.DARK,
                    },
                  ]}>
                  {t('UI.all')}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={{flex: 1, alignSelf: 'flex-start', marginHorizontal: 3}}>
          <TouchableOpacity
            onPress={() => setIsSort(!isSort)}
            style={styles.picker}>
            <Text
              style={{
                fontSize: SW * 0.033,
                marginHorizontal: SW * 0.02,
                color: sort_id ? Colors().Text.GREEN : Colors().Text.LIGHT_GREY,
              }}>
              {sort_id ? sort_value : t('UI.sortBy')}
            </Text>
            <VectorIcons
              icon="MaterialIcons"
              name={isSort ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              color={Colors().Text.LIGHT_GREY}
              size={RFValue(25)}
            />
          </TouchableOpacity>
          {isSort && (
            <View
              style={{
                width: '100%',
                borderRadius: 8,
                borderWidth: 1,
                borderColor: Colors().App.LIGHT_GREY,
                paddingVertical: 6,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setSort_id('asc');
                  setSort_value(t('UI.dateAscending'));
                  setIsSort(false);
                }}>
                <Text
                  style={[
                    styles.typeItem,
                    {
                      color:
                        sort_id == 'asc'
                          ? Colors().Text.GREEN
                          : Colors().App.DARK,
                    },
                  ]}>
                  {t('UI.dateAscending')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSort_id('des');
                  setSort_value(t('UI.dateDescending'));
                  setIsSort(false);
                }}>
                <Text
                  style={[
                    styles.typeItem,
                    {
                      color:
                        sort_id == 'des'
                          ? Colors().Text.GREEN
                          : Colors().App.DARK,
                    },
                  ]}>
                  {t('UI.dateDescending')}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={{alignSelf: 'flex-start'}}>
          <TouchableOpacity
            style={styles.picker}
            onPress={() => {
              Alert({
                title: t('UI.Confirmation'),
                body: t('UI.SureToClear'),
                onPress: () => onClear(),
              });
            }}>
            <Text
              style={{
                fontSize: SW * 0.033,
                color: Colors().App.BLUE_90,
                textDecorationLine: 'underline',
              }}>
              {t('UI.clearAll')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <AppHeader title={t('Navigation.transactions')} />
      <View style={{width: '100%', flex: 1, paddingHorizontal: SW * 0.02}}>
        {RenserTopActions()}
        <FlatList
          keyExtractor={({item}) => item?.id}
          showsVerticalScrollIndicator={false}
          ref={FlatListRef}
          data={
            sort_id == 'asc'
              ? transactions.sort(
                  (a: any, b: any) => new Date(a.date) - new Date(b.date),
                )
              : sort_id == 'des'
              ? transactions.sort(
                  (a: any, b: any) => new Date(b.date) - new Date(a.date),
                )
              : transactions
          }
          refreshControl={
            <RefreshControl
              colors={[Colors().Text.GREEN]}
              refreshing={loading_refresh}
              onRefresh={() => {
                setLoading_refresh(true);
                loadTransactions();
              }}
            />
          }
          renderItem={({item, index}) => renderItem(item)}
          style={{width: '100%', marginBottom: SH * 0.1}}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  marginTop: SH * 0.2,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: RFValue(17),
                    marginHorizontal: SW * 0.01,
                    color: Colors().App.BLUE_90,
                    fontWeight: Platform.OS == 'android' ? 'normal' : '800',
                  }}>
                  {t('UI.noData')}
                </Text>
                <Image
                  source={require('../../assets/images/noData.png')}
                  style={{
                    width: SW * 0.8,
                    height: SH * 0.3,
                    marginTop: SH * 0.02,
                  }}
                />
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export {TransactionsList};
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    backgroundColor: Colors().App.WHITE,
  },
  item: {
    width: '99%',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 4,
    borderRadius: 8,
    borderWidth: 0.7,
    padding: 4,
    borderColor: Colors().Text.LIGHT_GREY,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors().App.GREY,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginTop: 3,
  },
  picker: {
    width: '100%',
    height: SH * 0.05,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: RFValue(12),
    marginBottom: RFValue(4),
    justifyContent: 'space-between',
    paddingHorizontal: SW * 0.01,
    borderColor: Colors().App.LIGHT_GREY,
  },
  typeItem: {fontSize: SW * 0.03, marginVertical: 5},
});
