import React, { useEffect, useState } from "react";
import { View} from 'react-native';
import { AuthContext } from "./services/Auth";

import { ActivityIndicator, Colors } from 'react-native-paper';

import styles from './styles/StyleGeneral';

export default function Loader({ navigation}) {

  const { state, dispatch } = React.useContext(AuthContext);

    return (
      <View style={styles.loader}>
       <ActivityIndicator 
       animating={true} 
       color={Colors.red800}
       hidesWhenStopped={true} 
          />
      </View>
    );
  }
