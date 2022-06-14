import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform, Linking } from 'react-native';

import { NavigationContainer } from "@react-navigation/native";

import GlobalState from "./app/store/GlobalState";
import AppNavigator from "./app/navigation/AppNavigator";
import { StoreContainer } from "./app/store/store";
import { RechercheContainer } from "./app/store/storeRecherche";
import {FavorisContainer} from './app/store/storeFavoris';
import { CartesAbonnementContainer } from "./app/store/storeCartesAbonnement";
import { RootSiblingParent } from 'react-native-root-siblings';
import PushService from './app/services/PushService';

/*
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
*/

function App() {


//call PushService only 1 time

  



  




/*
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);

  const [notificationUrl, setNotificationUrl] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
      setNotificationUrl(notification.request.content.data.url);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    //Linking.openUrl(url);
    if(notificationUrl !== ''){
      //Linking.openURL(notificationUrl);
      //console.log(noticationUrl);
    }

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [notificationUrl]);

*/

  return (
    <StoreContainer>
      <GlobalState>
        <NavigationContainer>
         <RechercheContainer>
         <FavorisContainer>
           <CartesAbonnementContainer>
           <RootSiblingParent>
            
              <AppNavigator />
              <PushService />
             
          </RootSiblingParent>
          </CartesAbonnementContainer>
         </FavorisContainer>
          </RechercheContainer>
        </NavigationContainer>
      </GlobalState>
    </StoreContainer>
  );
}

/*
// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }


    token = (await Notifications.getExpoPushTokenAsync()).data;
   
    //https://off.appli.ovh/register.php?ExponentPushToken=rENqnHGdPS_oHCwUkM60_n
    if(token !== ''){
      console.log('ExponentPushToken='+token);
    
        const response = await fetch('https://off.appli.ovh/register.php?ExponentPushToken='+token);

    }

  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
*/

//test

export default App;
