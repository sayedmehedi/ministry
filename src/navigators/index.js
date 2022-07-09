import {View, Text,TouchableNativeFeedback} from 'react-native';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';
import NewsFeedScreen from '../screens/NewsFeedScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ChatScreen from '../screens/ChatScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient';
import { useAuth } from '../providers/AuthProvider';

const Auth = createStackNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Profile = createStackNavigator();

const ProfileStack = () => {
  return(
    <Profile.Navigator
    screenOptions={{
      headerShown:false
    }}
    >
      <Profile.Screen
      name='profile'
      component={ProfileScreen}
      />
      <Profile.Screen
      name='editProfile'
      component={EditProfileScreen}
      />
    </Profile.Navigator>
  )
}



const AuthStack = () => {
  return (
    <Auth.Navigator screenOptions={{
      headerShown:false
    }}>
      <Auth.Screen name="signIn" component={SigninScreen} />
      <Auth.Screen name="signUp" component={SignupScreen} />
    </Auth.Navigator>
  );
};

const buttonNativeFeedback = ({children, style, ...props}) => (
    <TouchableNativeFeedback
      {...props}
      background={TouchableNativeFeedback.Ripple('red', true)}>
      <View style={style}>{children}</View>
    </TouchableNativeFeedback>
  );

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarButton:buttonNativeFeedback
      }}>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <LinearGradient
              colors={['#11998E', '#0077B6']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={{
                  width: 70,
                  borderRadius: 20,
                  backgroundColor: 'green',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Entypo name="home" size={26} color={'#FFFFFF'} />
              </LinearGradient>
            ) : (
              <Entypo name="home" size={26} color={'#0077B6'} />
            ),
        }}
      />

      <Tab.Screen name="newsFeed" component={NewsFeedScreen}
      options={{
        tabBarIcon: ({focused}) =>
          focused ? (
            <LinearGradient
            colors={['#11998E', '#0077B6']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={{
                width: 70,
                borderRadius: 20,
                backgroundColor: 'green',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <FontAwesome name="feed" size={26} color={'#FFFFFF'} />
            </LinearGradient>
          ) : (
            <FontAwesome name="feed" size={26} color={'#0077B6'} />
          ),
      }}
      />

      <Tab.Screen name="chat" component={ChatScreen} 
      options={{
        tabBarIcon: ({focused}) =>
          focused ? (
            <LinearGradient
            colors={['#11998E', '#0077B6']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={{
                width: 70,
                borderRadius: 20,
                backgroundColor: 'green',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <Ionicons name="chatbox-ellipses-sharp" size={26} color={'#FFFFFF'} />
            </LinearGradient>
          ) : (
            <Ionicons name="chatbox-ellipses-sharp" size={26} color={'#0077B6'} />
          ),
      }}
      />

      <Tab.Screen name="Profile" component={ProfileStack}
       options={{
        tabBarIcon: ({focused}) =>
          focused ? (
            <LinearGradient
            colors={['#11998E', '#0077B6']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={{
                width: 70,
                borderRadius: 20,
                backgroundColor: 'green',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <FontAwesome5 name="user-alt" size={26} color={'#FFFFFF'} />
            </LinearGradient>
          ) : (
            <FontAwesome5 name="user-alt" size={26} color={'#0077B6'} />
          ),
      }}
      />
    </Tab.Navigator>
  );
};

const Navigators = () => {
  const {isAuthenticated, } = useAuth();
  console.log("isAuth?", isAuthenticated)
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          isAuthenticated ?
           <Stack.Screen name="main" component={MainTabs} options={{headerShown:false}} />
           :
           <Stack.Screen name="auth" component={AuthStack} options={{headerShown:false}}/>
        }
        
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigators;
