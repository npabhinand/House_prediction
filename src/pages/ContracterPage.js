import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Avatar, Button, Card} from '@rneui/base';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';

export default function ContracterPage({navigation, route}) {
  const {userD} = route.params;
  const [selectedItem, setSelectedItem] = useState('All');

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const propertyRef = firestore().collection('property');
        const querySnapshot = await propertyRef.get();
        const dataArray = [];
        let docIndex = 0;

        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          dataArray.push({propertyId: doc.id, ...doc.data()});
          docIndex++;
        });

        setData(dataArray);
      } catch (error) {
        console.error('Error getting documents: ', error);
      }
    };

    fetchData(); // Call the asynchronous function here
  }, []);

  const handleItemClick = itemName => {
    setSelectedItem(itemName);
  };
  return (
    <View style={styles.container}>
      <View style={styles.s1}>
        <Text style={styles.mainText}>Hello {userD.name}</Text>
        <Avatar
          source={require('../assets/bell.png')}
          onPress={() => navigation.navigate('Notification', {userD})}
        />
        <Avatar
          source={require('../assets/person.png')}
          containerStyle={{marginRight: 10}}
          onPress={() => navigation.navigate('Profile', {userD})}
        />
      </View>
      <ScrollView>
      <Text style={[styles.mainText, {marginTop: 20, padding: 10}]}>
        Contracter
      </Text>

      <View style={[styles.s1, {justifyContent: 'flex-start'}]}>
        <TouchableOpacity
          style={[
            styles.panel,
            {backgroundColor: selectedItem === 'All' ? '#e1e3da' : 'white'},
          ]}
          onPress={() => handleItemClick('All')}>
          <Text style={styles.panelText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.panel,
            {
              backgroundColor:
                selectedItem === 'Accepted' ? '#e1e3da' : 'white',
            },
          ]}
          onPress={() => handleItemClick('Accepted')}>
          <Text style={styles.panelText}>Accepted</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.panel,
            {
              backgroundColor:
                selectedItem === 'Declined' ? '#e1e3da' : 'white',
            },
          ]}
          onPress={() => handleItemClick('Declined')}>
          <Text style={styles.panelText}>Declined</Text>
        </TouchableOpacity>
      </View>

     
        <View style={{marginBottom:70}}>
          {data &&
            data.map((propertyData, index) => (
              <Card key={index} containerStyle={styles.cards}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Property', {userD, propertyData})
                  }>
                  <View style={styles.cardContent}>
                    <Avatar source={require('../assets/user.png')} size={30} />
                    <Text style={styles.cardText}>{propertyData.userName}</Text>
                  </View>
                  <View style={styles.cardContent}>
                    <TouchableOpacity style={styles.btn1}>
                      <Text style={styles.btnText}>10 jun</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn1}>
                      <Text style={styles.btnText}>10 jun</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.textContent}>
                    <Text style={{textAlign: 'justify',color:'black'}} >
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book.
                    </Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={[
                    styles.cardBottomContent,
                    {justifyContent: 'space-between'},
                  ]}>
                  <Text style={styles.cardText}>Posted 17 days ago</Text>
                  <Text style={styles.cardText}>₹{propertyData.price}</Text>
                </View>
              </Card>
            ))}
        </View>
      </ScrollView>
    </View>
  );
}

styles = StyleSheet.create({
  container: {
    // backgroundColor:'black'
  },
  s1: {
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
  },
  mainText: {
    fontSize: 25,
    color: 'black',
    fontWeight: '500',
  },
  panel: {
    width: 110,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 10,
    alignItems: 'center', // Center horizontally
    justifyContent: 'center',
  },
  panelText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
  cards: {
    width: '95%',
    height: 250,
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: '#aedbeb',
    marginBottom: 10,
  },
  cardContent: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  cardText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    padding: 5,
    marginLeft: 10,
  },
  btn1: {
    backgroundColor: '#f6f0c1',
    width: 80,
    height: 39,
    borderRadius: 20,
    alignItems: 'center', // Center horizontally
    justifyContent: 'center',
    marginRight: 10,
  },
  btnText: {
    fontWeight: '500',
    color:'white'
  },
  textContent: {
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  cardBottomContent: {
    marginTop: 20,
    backgroundColor: 'black',
    width: '108%',
    height: 50,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    alignSelf: 'center',
    flexDirection: 'row',
  },
});
