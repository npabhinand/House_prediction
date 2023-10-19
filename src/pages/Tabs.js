import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../components/Profile';
import Home from '../components/Home';
import Notification from '../components/Notification';

import { Avatar } from '@rneui/base';
const Tab = createBottomTabNavigator();

const Tabs = ({navigation,route}) => {
  const {userD }=route.params;
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} 
      initialParams={{ userD: userD }}
        options={{
          headerShown:false,
          tabBarLabel: '', // Set tabBarLabel to an empty string to hide the tab name
          tabBarIcon: ({ color }) => (
            <Avatar
              size={30}
              source={require(`../assets/home.png`)}
              color={color}
              containerStyle={{marginTop:5}}
            />
          ),
        }}
      />
  
      <Tab.Screen name="Notification" component={Notification} 
      initialParams={{ userD: userD }}
        options={{
          headerShown:false,
          tabBarLabel: '', // Set tabBarLabel to an empty string to hide the tab name
          tabBarIcon: ({ color }) => (
            <Avatar
              size={28}
              source={require(`../assets/bell.png`)}
              color={color}
            />
          ),
        }}
      />
      
      <Tab.Screen name="Profile" component={Profile}
      initialParams={{ userD: userD }}
        options={{
          headerShown:false,
          tabBarLabel: '', // Set tabBarLabel to an empty string to hide the tab name
          tabBarIcon: ({ color }) => (
            <Avatar
              size={30}
              source={require(`../assets/person.png`)}
              color={color}
            />
          ),
        }}
      />
    
    </Tab.Navigator>
  )
}

export default Tabs;
