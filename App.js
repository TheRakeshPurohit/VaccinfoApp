/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [pinCode, setPinCode] = React.useState('');
  const [JSONData, setJSONData] = React.useState();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  function formatDate() {
    //pass date object
    return `${new Date().getDate()}-${
      new Date().getMonth() + 1
    }-${new Date().getFullYear()}`;
  }

  const APICall = pincode => {
    fetch(`https://api.postalpincode.in/pincode/${Number(pincode)}`)
      .then(resp => resp.json())
      .then(respJSON => {
        if (respJSON[0].Message === 'No records found') {
          ToastAndroid.show(
            `${respJSON[0].Message}. Pincode Invalid!`,
            ToastAndroid.SHORT,
          );
          // googleo
        } else if (respJSON[0].Status === 'Success') {
          ToastAndroid.show('Fetching..Please wait', ToastAndroid.SHORT);

          fetch(
            `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pinCode}&date=${formatDate()}`,
            {
              headers: {
                accept: 'application/json, text/plain, */*',
                'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
                'cache-control': 'no-cache',
              },
              referrer: 'https://www.cowin.gov.in/',
              referrerPolicy: 'strict-origin-when-cross-origin',
              body: null,
              method: 'GET',
              mode: 'cors',
              credentials: 'omit',
            },
          )
            .then(response => response.json())
            .then(slots => {
              let validSlots = slots.centers.filter(
                session => session.sessions.available_capacity > 0,
              );
              setJSONData(slots.centers);
              if (validSlots.length > 0) {
                ToastAndroid.show(`${{validSlots}}`, ToastAndroid.LONG);
              } else {
                ToastAndroid.show('No Slots Available', ToastAndroid.LONG);
              }
            })
            .catch(error => {
              ToastAndroid.show(`${error} Server is Busy!`, ToastAndroid.LONG);
            });
        } else {
          ToastAndroid.show('Try Again', ToastAndroid.LONG);
        }
      });
  };

  const onPinCodeChange = e => {
    if (['.', ',', ' ', '-'].includes(e)) {
      return;
    }
    setPinCode(e);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text style={{textAlign: 'center'}}>Welcome to Vaccinfo App. </Text>
      <Text style={{textAlign: 'center'}}>INDIA ONLY</Text>
      <TextInput
        style={styles.input}
        onChangeText={onPinCodeChange}
        value={pinCode}
        autoFocus
        maxLength={6}
        placeholder="Enter 6 Digits Pin-code"
        keyboardType="numeric"
      />
      <Button
        title="Check Slots"
        onPress={() => APICall(pinCode)}
        disabled={pinCode.length < 6}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{marginBottom: '35%'}}>
        {JSONData &&
          JSONData.length > 0 &&
          JSONData.map(a => (
            <View style={{padding: '1%'}}>
              <Text>Center ID : {a.center_id}</Text>
              <Text>State Name : {a.state_name}</Text>
              <Text>District Name : {a.district_name}</Text>
              <Text>Block Name : {a.block_name}</Text>
              <Text>Name : {a.name}</Text>
              <Text>Pincode : {a.pincode}</Text>
              <Text>Fee Type : {a.fee_type}</Text>
              {a.sessions &&
                a.sessions.length > 0 &&
                a.sessions.map(data => (
                  <View>
                    <Text>Date : {data.date}</Text>
                    <Text>Available Capacity : {data.available_capacity}</Text>
                    <Text>Age Limit : {data.min_age_limit}+</Text>
                    <Text>Vaccine : {data.vaccine || 'Not Mentioned'}</Text>
                  </View>
                ))}
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});

export default App;
