import {View, Text, StyleSheet, ToastAndroid} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card } from '@rneui/base';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';

export default function Notification({ route }) {
  const { userD } = route.params;
  const [data, setData] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const propertyRef = firestore()
          .collection('contract')
          .where('customerId', '==', userD.email)
          .or("contracterId","==",userD.email)
        const querySnapshot = await propertyRef.get();
        const dataArray = [];

        querySnapshot.forEach((doc) => {
          dataArray.push({ contractId: doc.id, ...doc.data() });
        });

        setData(dataArray);
      } catch (error) {
        console.error('Error getting documents: ', error);
      }
    };

    fetchData();
  }, []);

  const handleAccept = async (contractId) => {
    const bookingRef = firestore().collection('contract').doc(contractId);
    try {
      await bookingRef.update({ status: 'Accepted' });
      console.log('Booking status updated to accepted');
      ToastAndroid.show('Booking status updated to accepted', ToastAndroid.SHORT);
    } catch (error) {
      console.error('Error updating booking status: ', error);
    }
    setIsUpdated(true);
  };

  const handleDecline = async (contractId) => {
    const bookingRef = firestore().collection('contract').doc(contractId);
    try {
      await bookingRef.update({ status: 'Declined' });
      console.log('Booking status updated to declined');
      ToastAndroid.show('Booking status updated to declined', ToastAndroid.SHORT);
    } catch (error) {
      console.error('Error updating booking status: ', error);
    }
    setIsUpdated(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      {userD.userType === "user" ? (
        data.filter((item) => item.status === 'Requested') // Filter accepted contracts
        .map((item, index) => (
          <Card key={index} containerStyle={styles.cards}>
            <View style={styles.rows}>
              <Avatar
                source={require('../assets/profile.png')}
                size={50}
                containerStyle={{ marginRight: 10 }}
              />
              <Text style={styles.font1}>Contractor: </Text>
              <Text style={[styles.font1, { color: 'black' }]}>{item.contracterName}</Text>
            </View>
            <View style={styles.rows}>
              <Text style={styles.font2}>
                Requested to take the contract at the price
              </Text>
              <Text style={[styles.font2, { color: 'black' } ]}>
                : {item.contracterPrice}
              </Text>
            </View>
            <View style={[styles.rows, { justifyContent: 'space-around', marginTop: 10 }]}>
              <Button
                title="Decline"
                color="#000000"
                containerStyle={styles.button}
                titleStyle={{ fontSize: 18 }}
                onPress={() => handleDecline(item.contractId)}
              ></Button>
              <Button
                title="Accept"
                color="#52A9E3"
                containerStyle={styles.button}
                titleStyle={{ fontSize: 18 }}
                onPress={() => handleAccept(item.contractId)}
              ></Button>
            </View>
          </Card>
        ))
      ) : (
        data
          .filter((item) => item.status === 'Accepted') // Filter accepted contracts
          .map((item, index) => (
          // Display notifications for contractors
          <Card key={index} containerStyle={styles.cards}>
            <View style={styles.rows}>
              <Avatar
                source={require('../assets/profile.png')}
                size={50}
                containerStyle={{ marginRight: 10 }}
              />
              <Text style={styles.font1}>Customer: </Text>
              <Text style={[styles.font1, { color: 'black' }]}>{item.customerName}</Text>
            </View>
            <View style={styles.rows}>
              <Text style={styles.font2}>
                Accepted Your Request at the price
              </Text>
              <Text style={[styles.font2, { color: 'black' } ]}>
                : {item.contracterPrice}
              </Text>
            </View>
          </Card>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 25,
    color: 'black',
    marginLeft: 20,
    fontWeight: 'bold',
  },
  cards: {
    width: '95%',
    height: 160,
    borderRadius: 20,
    alignSelf: 'center',
  },
  font1: {
    textAlign: 'justify',
    fontSize: 20,
  },
  font2: {
    textAlign: 'justify',
    fontSize: 15,
    marginTop: 5,
  },
  rows: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 150,
    borderRadius: 10,
  },
});
