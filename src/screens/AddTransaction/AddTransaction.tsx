import React, {useEffect, useState} from 'react';
import {
  Colors,
  RFValue,
  Text,
  View,
  FONT_FAMILY,
  SH,
  SW,
  TextInput,
  TouchableOpacity,
  VectorIcons,
  Button,
  closeModal,
  openModal,
} from '../../UI';
import {useLanguage} from '../../lang/useLanguage';
import {
  Alert,
  I18nManager,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import AppHeader from '../../models/UI/AppHeader';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import * as Screens from '../../screens';

let id = -1;
let value = new Date();
const AddTransaction = () => {
  const {t, locale} = useLanguage();
  const Navigation = useNavigation<any>();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [type_id, setType_id] = useState('');

  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [showError, setShowError] = useState(false);
  const [showTypes, setShowTypes] = useState(false);
  const [transactions, setTransactions] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState({
    title: t('Add.date'),
    placeHolder: t('Add.date'),
    value: '',
  });

  useEffect(() => {
    const unsubscribe = Navigation.addListener('focus', () => {
      loadTransactions();
    });
    return unsubscribe;
  }, [Navigation]);

  const loadTransactions = async () => {
    const data = await AsyncStorage.getItem('Transactions');
    if (data) setTransactions(JSON.parse(data));
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    setDate({
      ...date,
      value: moment(date).format('YYYY-MM-DD'),
      title: t('Add.date'),
    });
    hideDatePicker();
  };

  const onSave = () => {
    if (type_id && amount && category && date.value) {
      setLoading(true);
      const obj = {
        id: new Date().getTime(),
        type: type_id,
        amount: amount,
        category: category,
        date: date.value,
        description: description,
      };
      const updated = [...transactions, obj];
      setTransactions(updated);
      saveTransactions(updated);
    }
  };

  const saveTransactions = async (data: any) => {
    await AsyncStorage.setItem('Transactions', JSON.stringify(data));
    setTimeout(() => {
      setLoading(false);
    }, 500);
    openModal({
      modalStyle: {justifyContent: 'center'},
      children: <ModalSuccessCreate />,
    });
  };
  const DateTimeCompnent = ({item}: {item: any}) => {
    return (
      <View style={{width: '100%'}}>
        <Text style={styles.labelStyle}>
          {item.title} <Text style={styles.isRequire}>{'*'}</Text>
        </Text>

        <TouchableOpacity
          onPress={() => {
            id = item.id;
            value = item.value;
            setDatePickerVisibility(true);
          }}
          style={[
            styles.dateTimeCompnentContainer,
            {
              flexDirection: locale == 'ar' ? 'row' : 'row-reverse',
              borderColor:
                showError && !item.value
                  ? Colors().App.RED
                  : Colors().App.LIGHT_GREY,
              height: RFValue(50),
            },
          ]}>
          <Text
            style={[
              styles.timeText,
              item?.value
                ? {color: Colors().App.DARK}
                : {color: Colors().Text.LIGHT_GREY},
              {flex: 1},
            ]}>
            {!!item?.value
              ? moment(item.value).format('YYYY-MM-DD')
              : item.placeHolder}
          </Text>

          <VectorIcons
            onPress={item.clearInput}
            icon="Entypo"
            name="calendar"
            color={Colors().Text.LIGHT_GREY}
            size={RFValue(20)}
            style={{marginHorizontal: SW * 0.02}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const ModalSuccessCreate = () => {
    return (
      <View
        style={{
          width: '80%',
          borderRadius: RFValue(20),
          paddingHorizontal: RFValue(10),
          paddingVertical: RFValue(20),
          backgroundColor: Colors().App.GREY,
          elevation: 5,
          shadowOpacity: 0.4,
          shadowOffset: {width: 2, height: 2},
        }}>
        <Text
          style={{
            color: Colors().Text.DARK,
            fontSize: RFValue(19),
            textAlign: 'center',
            marginTop: Platform.OS == 'ios' ? 10 : 0,
          }}
          numberOfLines={5}>
          {t('Add.addedSuccessfully')}
        </Text>
        <View style={styles.success}>
          <VectorIcons
            icon="Entypo"
            name={'check'}
            size={RFValue(50)}
            color={Colors().Text.GREEN}
          />
        </View>
        <Button
          style={{width: '40%', backgroundColor: Colors().Text.GREEN}}
          onPress={() => {
            setType('');
            setType_id('');
            setAmount('');
            setCategory('');
            setDescription('');
            setDate({
              ...date,
              value: '',
              title: t('Add.date'),
            });
            closeModal();
            Navigation.navigate(Screens.TransactionsList.name);
          }}>
          {t('UI.ok')}
        </Button>
      </View>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <AppHeader title={t('Navigation.addTransaction')} />
      <View style={styles.container}>
        <ScrollView
          style={{width: '100%'}}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.labelStyle}>
            {t('Add.type')} <Text style={styles.isRequire}>{'*'}</Text>
          </Text>
          <TouchableOpacity
            onPress={() => setShowTypes(!showTypes)}
            style={[
              styles.picker,
              {
                borderColor:
                  showError && !type_id
                    ? Colors().App.RED
                    : Colors().App.LIGHT_GREY,
                height: RFValue(50),
              },
            ]}>
            <Text
              style={{
                marginHorizontal: SW * 0.02,
                color: type ? Colors().Text.DARK : Colors().Text.LIGHT_GREY,
              }}>
              {type ? type : t('Add.type')}
            </Text>
            <VectorIcons
              icon="MaterialIcons"
              name={showTypes ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              color={Colors().Text.LIGHT_GREY}
              size={RFValue(25)}
            />
          </TouchableOpacity>
          {showTypes && (
            <View
              style={{
                width: '100%',
                borderRadius: 8,
                borderWidth: 1,
                borderColor: Colors().Text.GREEN,
                paddingVertical: 6,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setType(t('Add.income'));
                  setType_id('income');
                  setShowTypes(false);
                }}>
                <Text
                  style={[
                    styles.typeItem,
                    {
                      color:
                        type_id == 'income'
                          ? Colors().Text.GREEN
                          : Colors().App.DARK,
                    },
                  ]}>
                  {t('Add.income')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setType(t('Add.expense'));
                  setType_id('expense');
                  setShowTypes(false);
                }}>
                <Text
                  style={[
                    styles.typeItem,
                    {
                      color:
                        type_id == 'expense'
                          ? Colors().Text.GREEN
                          : Colors().App.DARK,
                    },
                  ]}>
                  {t('Add.expense')}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <TextInput
            isRequired
            labelStyle={{marginTop: SH * 0.01}}
            label={t('Add.amount')}
            hasError={showError && !amount}
            placeholder={t('Add.amount')}
            value={amount}
            keyboardType="numeric"
            onChangeText={setAmount}
          />
          <TextInput
            isRequired
            labelStyle={{marginTop: SH * 0.01}}
            label={t('Add.category')}
            hasError={showError && !category}
            placeholder={t('Add.category')}
            value={category}
            onChangeText={setCategory}
          />
          <DateTimeCompnent item={date} />
          <TextInput
            style={{height: SH * 0.2}}
            textInputStyle={{textAlignVertical: 'top', height: '93%'}}
            labelStyle={{marginTop: SH * 0.02}}
            label={t('Add.description')}
            hasError={false}
            placeholder={t('Add.writeHere')}
            value={description}
            onChangeText={setDescription}
            multiline
            maxLength={500}
          />
          <Button
            loading={loading}
            style={{width: '60%', marginTop: SH * 0.03, alignSelf: 'center'}}
            onPress={() => {
              setShowError(true);
              onSave();
            }}>
            {t('Add.save')}
          </Button>
        </ScrollView>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={value ? new Date(value) : new Date()}
        onConfirm={handleConfirm}
        // minimumDate={new Date(new Date())}
        // maximumDate={
        //   id === 0 || id == -1
        //     ? undefined
        //     : new Date(
        //       moment(biddingStart.value).add(1, 'week').format('YYYY-MM-DD'),
        //     )
        // }
        onCancel={hideDatePicker}
        locale={I18nManager.isRTL ? 'en' : 'en'}
        // display={'compact'}
      />
    </View>
  );
};

export {AddTransaction};
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    backgroundColor: Colors().App.WHITE,
  },
  container: {
    width: '96%',
    height: SH * 0.7,
    marginTop: SH * 0.03,
    backgroundColor: Colors().App.WHITE,
    elevation: 2,
    shadowOpacity: 0.2,
    borderRadius: 10,
    paddingBottom: 8,
    marginBottom: 2,
    paddingHorizontal: SW * 0.02,
  },
  dateTimeCompnentContainer: {
    borderWidth: 1,
    borderRadius: RFValue(12),
    marginBottom: RFValue(10),
  },
  timeText: {
    color: Colors().App.DARK,
    marginHorizontal: SW * 0.01,
  },
  labelStyle: {marginTop: SH * 0.01, width: '100%', marginBottom: 2},
  titleStyle: {color: Colors().App.DARK, marginHorizontal: 8},
  typeItem: {fontSize: SW * 0.03, marginVertical: SH * 0.01},
  isRequire: {
    fontSize: SW * 0.03,
    marginBottom: RFValue(3),
    marginHorizontal: RFValue(5),
    color: Colors().App.RED,
  },
  picker: {
    width: '100%',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: RFValue(12),
    marginBottom: RFValue(10),
    justifyContent: 'space-between',
    paddingHorizontal: SW * 0.02,
  },
  success: {
    width: SW * 0.2,
    height: SW * 0.2,
    borderRadius: (SW * 0.2) / 2,
    backgroundColor: `rgba(225, 255, 252, 1)`,
    elevation: 5,
    shadowOpacity: 0.3,
    justifyContent: 'center',
    marginVertical: 8,
  },
});
