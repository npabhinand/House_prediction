import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
  ScrollView
} from 'react-native';
import React,{useState} from 'react';
import {Avatar} from '@rneui/base';
import {useNavigation, useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Property = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {userD, propertyData} = route.params;
  const [price, setPrice] = useState(propertyData.price.toString());
  const [isUpdated, setIsUpdated] = useState(false); 

  // console.log(PropertyData)
  const onSubmit = async () => {
    try {
      // Assuming 'user' is defined and you want to use user's UID as the document ID
      const user = {}; // Replace this with your user data
      await firestore()
        .collection('property') // Create a subcollection for properties
        .add(propertyData);
      ToastAndroid.show('Property added successfully', ToastAndroid.SHORT);
      navigation.navigate('Tabs', {userD});
    } catch (error) {
      console.error(error.message);
    }
  };


  const onRequest = async () => {
    try {
      const data = {
        contracterId: userD.email,
        contracterName:userD.name,
        contracterPrice: price,
        customerId:propertyData.userId,
        customerName:propertyData.userName,
        propertyId:propertyData.propertyId,
        status: 'Requested',
      // Use the updated price
      };

      // Update the property with the new price and status
      await firestore().collection('contract').doc().set(data, { merge: true });
      ToastAndroid.show('Property updated successfully', ToastAndroid.SHORT);
      navigation.navigate('ContracterPage', { userD });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/house.jpg')} style={styles.image} />
        <View style={styles.pricetag}>
          <Text style={styles.pricetagText}>₹{propertyData.price}</Text>
        </View>
      </View>
      <View style={styles.location}>
        <Avatar
          source={require('../assets/location.png')}
          containerStyle={{marginTop: 10}}
        />
        <Text style={{fontSize: 18, marginLeft: -10}}>
          {propertyData.place}
        </Text>
      </View>

      <View style={styles.containers}>
        <View style={styles.box}>
          <Image
            source={require('../assets/bedroom.png')}
            style={styles.boxImage}
          />
          <Text style={styles.boxText}>{propertyData.bedrooms} Bed</Text>
        </View>

        <View style={styles.box}>
          <Image
            source={require('../assets/bath.png')}
            style={styles.boxImage}
          />
          <Text style={styles.boxText}>{propertyData.bathrooms} Bath</Text>
        </View>

        <View style={styles.box}>
          <Image
            source={require('../assets/rooms.png')}
            style={styles.boxImage}
          />
          <Text style={styles.boxText}>7 Rooms</Text>
        </View>

        <View style={styles.box}>
          <Image
            source={require('../assets/directions.png')}
            style={styles.boxImage}
          />
          <Text style={styles.boxText}>{propertyData.propertySize}</Text>
        </View>
      </View>
      <Text style={{padding: 10, fontSize: 18, fontWeight: '500'}}>
        Description
      </Text>
      <View style={{justifyContent: 'center', marginLeft: 10, marginRight: 10}}>
        <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </Text>
      </View>
      {userD.userType === "user" ? (
  <TouchableOpacity style={styles.btnsubmit} onPress={onSubmit}>
    <Text style={[styles.pricetagText, { marginTop: 15, fontSize: 20 }]}>
      Publish
    </Text>
  </TouchableOpacity>
) : (
  <>
  <TextInput
  style={styles.priceInput}
  value={price} // Use the price state variable directly
  onChangeText={(text) => setPrice(text)}
/>
  <TouchableOpacity style={styles.btnsubmit} onPress={onRequest}> 
    <Text style={[styles.pricetagText, { marginTop: 15, fontSize: 20 }]}>
      Request
    </Text>
  </TouchableOpacity> 
  </>
)}</ScrollView>
    </View>
  
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
    marginTop: 10,
  },
  image: {
    width: '95%',
    height: 300,
    borderRadius: 10,
    alignSelf: 'center',
  },
  pricetag: {
    backgroundColor: '#ff8717',
    bottom: 10, // Adjust the position as needed
    width: 100, // Adjust the width as needed
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: -280,
    marginRight: 20,
    alignSelf: 'flex-end',
  },
  pricetagText: {
    color: 'white',
    textAlign: 'center',
  },
  location: {
    marginTop: 250,
    width: '95%',
    height: 50,
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: 'row',
  },
  containers: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    padding: 10,
    marginTop: 20,
  },
  box: {
    width: 75,
    height: 75,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 10,
  },
  boxImage: {
    width: 40,
    height: 40,
    marginTop: 5,
  },
  boxText: {
    fontSize: 15,
    marginTop: 5,
    fontWeight: '300',
  },
  btnsubmit: {
    backgroundColor: '#ff8717',
    height: 55,
    width: '95%',
    marginTop: 30,
    borderRadius: 30,
    alignSelf: 'center',
  },
  priceInput: {
    // backgroundColor: '#ff8717',
    textAlign:'center',
    height: 55,
    width: '95%',
    marginTop: 30,
    borderRadius: 30,
    alignSelf: 'center',
    borderWidth:1
  },
});

export default Property;
