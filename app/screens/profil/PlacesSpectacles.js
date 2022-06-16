import React, { useCallback, useEffect, useState } from "react";
import {
  useIsFocused,
  ToastAndroid,
  Image,
  Text,
  TextInput,
  DrawerContentScrollView,
  View,
  StyleSheet,
  ScrollViewButton,
  ScrollView,
  Button,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import RNPickerSelect from "react-native-picker-select";
import { CartesAbonnementContext } from "../../store/storeCartesAbonnement";

import styles from "../../config/styles/StyleGeneral";
import { useDispatch, useSelector } from "react-redux";


export default function PlacesSpectacles({ navigation }) {
  const user = useSelector((state) => state.user);

  const [Places, setPlaces] = useState();
  const [isLoading, setIsLoading] = useState(false);
  // var axios = require('axios');

  const getFactures = async () => {



    var data = "{\r\n    fes_id : 22\r\n}";

    var config = {
      method: "post",
      url: "https://api.festivaloffavignon.com/tickets",
      headers: {
        "api-key": "8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8",
        token: user.token,
        "Content-Type": "text/plain",
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
      //  console.log(response.data.orders);
        // console.log(JSON.stringify(response.data.orders));
        if (response.data.orders != null) {

          setPlaces(response.data.orders);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(async () => {
    await getFactures();
  }, [Places]);

  const _listEmptyComponent = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <Text>Aucune place disponible pour le moment</Text>
      </View>
    );
  };

  const renderItem = ({ item, i }) => {
    // console.log(item.photo);
  
/*
Object {
        "sh_date": "/Date(1658408700000+0200)/",
        "sh_date_id": 2183971,
        "sh_date_string": "2022-07-21T15:05:00.0000000",
        "sh_id": 31680,
        "sh_name": "Un crime, ça ne s'improvise pas   \"Alea jacta est\"",
        "ticket_barcode": "51CC3A392D",
        "ticket_card": Object {
          "card_key": "W02753TQWW",
          "card_name": "Thomas Hauguel",
        },
        "ticket_key": "JEU21-1505-UNCR-51CC3-A392D-TA-0005",
        "ticket_location": Object {
          "th_address": "149, rue de la carreterie",
          "th_city": "Avignon",
          "th_id": 4771,
          "th_name": "HUMANUM",
          "th_postal_code": "84000",
        },
        "ticket_price": 1000,
        "ticket_type": 2,
        "tkto_id": 633456,
      },

      
*/

console.log(item.tko_tickets[0].sh_name);


    return (
      <View style={styles.carteAbonnement} key={item.sh_id}>
        <View style={styles.carteAbonnement_header}>
          <Text style={styles.carteAbonnement_header_text}>
            Places de spectacles
          </Text>
        </View>
        <View style={styles.carteAbonnement_body}>
          <View style={styles.carteAbonnement_body_left}>
            <Pressable
              onPress={() => {
                voirPlace(item.id);
              }}
            >
              <Text>Voir {item.sh_id}</Text>
            </Pressable>
          </View>
          <View style={styles.carteAbonnement_body_right}>
            <Text style={styles.carteAbonnement_header_text}>
              {item.sh_name} 
            </Text>

            <Image
              source={{ uri: item.sh_id }}
              style={{ width: 100, height: 100 }}
            />
          </View>
        </View>
      </View>
    );
  };


  //console.log(Places);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        top: "10%",
      }}
    >
      <FlatList
        data={Places}
        // extraData={newCartes}
        ListEmptyComponent={_listEmptyComponent}
        renderItem={(item) => renderItem(item)}
        keyExtractor={(item) => item.sh_id}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: "black" }} />
        )}
        style={{ width: "100%", height: "100%" }}
        /* onEndReached={() => {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }
        , 2000);
      }
    }*/

        onEndReachedThreshold={0.5}
        refreshing={isLoading}
        onRefresh={() => {
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
          }, 2000);
        }}
      />
    </View>
  );
}
