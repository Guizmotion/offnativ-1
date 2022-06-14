import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import { useDispatch, useSelector } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import { connect } from "react-redux";

import { FontAwesome } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import moment from "moment";
import "moment/min/locales";
import Loader from "./Loader";
moment.locale("fr");

const ShoppingCart = ({ navigation }) => {
  const dispatch = useDispatch();
  const programmes = useSelector((state) => state.listings);
  const user = useSelector((state) => state.user);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [cart, setCart] = useState("");

  useEffect(() => {
    getTotal();
    console.log(programmes.tko_id);
  }, []);

  const getTotal = () => {
    const total = programmes.cartItems.reduce((accumulator, object) => {
      return (
        accumulator +
        object.price.reduce((accumulator, object) => {
          return accumulator + object.quantity * object.price;
        }, 0)
      );
    }, 0);

    return total;
  };
  const getPlaces = () => {
    const places = programmes.cartItems.reduce((accumulator, object) => {
      return (
        accumulator +
        object.price.reduce((accumulator, object) => {
          return accumulator + object.quantity;
        }, 0)
      );
    }, 0);

    return places;
  };

  //remove data from Cart

  const removeItemFromCart = async (id) => {
    dispatch({ type: "removeCart", payload: id });

    programmes.tko_id
      ? await axios
          .delete(
            "https://api.festivaloffavignon.com/basket",
            {
              tko_id: programmes.tko_id,
            },
            {
              headers: {
                "api-key": "8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8",
                token: user.token,
              },
            }
          )
          .then((user) => {
            console.log("supprimé");
          })

          .catch((error) => {
            console.log("connect nok");
          })
      : null;
  };

  const populateDate = async (id) => {
    await axios
      .post(
        "https://api.festivaloffavignon.com/tickets/availability",
        {
          sh_id: id,//28447,
        },
        {
          headers: {
            "api-key": "8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8",
          },
        }
      )
      .then((user) => {
        setDate(user.data);
      })

      .catch((error) => {
        console.log("connect nok");
      });
  };
  const test = (data) => {
    console.log("hi");
    dispatch({ type: "decreaseCart", payload: data });
    console.log("bi");
  };

  const validateCart = async () => {
    setLoading(true);
    let tko_id = "";
    await axios
      .post(
        "https://api.festivaloffavignon.com/basket/tickets",
        {
          sh_date_id: programmes.cartItems[0].date,
          tickets_tn: programmes.cartItems[0].price[0].quantity,
          tickets_ta: programmes.cartItems[0].price[1].quantity,
          tickets_te: programmes.cartItems[0].price[2].quantity,
          tickets_tja: programmes.cartItems[0].price[3].quantity,
        },
        {
          headers: {
            "api-key": "8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8",
            token: user.token,
          },
        }
      )
      .then(async (result) => {
        tko_id = result.data.basket.tko_id;
        console.log("resultaado", result.data);
        //data.tko_id = result.data.basket.tko_id;
        dispatch({ type: "addTkoId", payload: result.data.basket.tko_id });
        setCart(result.data);
        await axios
          .post(
            "https://api.festivaloffavignon.com/basket/validate",
            {
              sh_date_id: programmes.cartItems[0].date,
              tickets_tn: programmes.cartItems[0].price[0].quantity,
              tickets_ta: programmes.cartItems[0].price[1].quantity,
              tickets_te: programmes.cartItems[0].price[2].quantity,
              tickets_tja: programmes.cartItems[0].price[3].quantity,
            },
            {
              headers: {
                "api-key": "8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8",
                token: user.token,
              },
            }
          )
          .then((result) => {
            console.log("success", result.data);
          })

          .catch((error) => {
            console.log(error);
            console.log("NOK");
            setLoading(false);
          });
        await axios
          .post(
            "https://api.festivaloffavignon.com/basket/contact",
            {
              tko_id: tko_id,
              tko_firstname: user.user.prenom,
              tko_lastname: user.user.nom,
              tko_phone: "0606060606",
              tko_email: user.user.email,
            },
            {
              headers: {
                "api-key": "8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8",
                token: user.token,
              },
            }
          )
          .then((user) => {
            console.log("success 2");
          })

          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
        await axios
          .get("https://api.festivaloffavignon.com/cms/login", {
            headers: {
              "api-key": "8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8",
              token: user.token,
            },
          })
          .then((user) => {
            console.log("success 2");
            setLoading(false);
            navigation.navigate("CartPay");
          })

          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      })

      .catch((error) => {
        console.log(error);
        console.log("her");
        setLoading(false);
      });
  };
  const renderProducts = (data, index) => {
    populateDate(data.id);
    return (
      <View key={index}>
        <View
          style={{
            width: "25%",
            height: 100,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F0F0F3",
            borderRadius: 10,
            marginRight: 22,
            overflow: "hidden",
            alignSelf: "center",
            marginBottom: 20,
          }}
        >
          <Image
            source={{ uri: data.image }}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
            }}
          />
        </View>
        <View
          key={data.key}
          style={{
            width: "100%",
            height: 260,
            marginVertical: 6,
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 60,
          }}
        >
          <View
            style={{
              flex: 1,
              height: "100%",
              justifyContent: "space-around",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 30,
              }}
            >
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                }}
                onPress={() => removeItemFromCart(data)}
              >
                <FontAwesome
                  name="trash-o"
                  style={{
                    fontSize: 16,
                    color: "#777777",
                    backgroundColor: "#F0F0F3",
                    padding: 8,
                    borderRadius: 100,
                  }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 14,
                  maxWidth: "100%",
                  color: "#000000",
                  fontWeight: "600",
                  letterSpacing: 1,
                  fontWeight: "bold",
                  alignSelf: "flex-start",
                  position: "absolute",
                }}
              >
                {data.title}
              </Text>
            </View>

            <View style={{ marginBottom: 15, marginTop: 15 }}>
              <Text style={{ marginTop: 10, fontWeight: "bold" }}>
                1/ Choisir Date et heure :
              </Text>
              <Picker
                selectedValue={data.date}
                onValueChange={(itemValue, itemIndex) => {
                  // setSelectedLanguage(itemValue);
                  let newData = data;
                  newData.date = itemValue;
                  dispatch({ type: "addDateToCart", payload: newData });
                }}
              >
                <Picker.Item label="Date et heure" value="" />

                {date ? (
                  date.availability.map((item) => (
                    <Picker.Item
                      label={moment(item.sh_date_string).format("LLLL")}
                      value={item.sh_date_id}
                      key={item.sh_id}
                    />
                  ))
                ) : (
                  <Picker.Item label="Loading..." value="0" />
                )}
              </Picker>
            </View>
            <View style={{ marginBottom: 30 }}>
              <Text style={{ fontWeight: "bold" }}>2/ Choisir Tickets:</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 25,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => test(data)}
                  style={{
                    borderRadius: 100,
                    marginRight: 20,
                    padding: 4,
                    borderWidth: 1,
                    borderColor: "#B9B9B9",
                    opacity: 0.5,
                  }}
                >
                  <MaterialCommunityIcons
                    name="minus"
                    style={{
                      fontSize: 16,
                      color: "#777777",
                    }}
                  />
                </TouchableOpacity>
                <Text>{data.price[0].quantity}</Text>
                <TouchableOpacity
                  onPress={() => dispatch({ type: "cart", payload: data })}
                  style={{
                    borderRadius: 100,
                    marginLeft: 20,
                    padding: 4,
                    borderWidth: 1,
                    borderColor: "#B9B9B9",
                    opacity: 0.5,
                  }}
                >
                  <MaterialCommunityIcons
                    name="plus"
                    style={{
                      fontSize: 16,
                      color: "#777777",
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginTop: 4,
                  flexDirection: "row",
                  alignItems: "center",
                  alignSelf: "center",
                  opacity: 0.6,
                  marginLeft: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                  }}
                >
                  Plein Tarif :
                  <Text style={{ fontWeight: "bold" }}>
                    {" "}
                    {data.price[0].price} €
                  </Text>
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                }}
                onPress={() => dispatch({ type: "resetCart", payload: data })}
              >
                <FontAwesome
                  name="trash-o"
                  style={{
                    fontSize: 16,
                    color: "#777777",
                    backgroundColor: "#F0F0F3",
                    padding: 8,
                    borderRadius: 100,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 25,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    dispatch({
                      type: "decreaseCartTarifAbonnement",
                      payload: data,
                    })
                  }
                  style={{
                    borderRadius: 100,
                    marginRight: 20,
                    padding: 4,
                    borderWidth: 1,
                    borderColor: "#B9B9B9",
                    opacity: 0.5,
                  }}
                >
                  <MaterialCommunityIcons
                    name="minus"
                    style={{
                      fontSize: 16,
                      color: "#777777",
                    }}
                  />
                </TouchableOpacity>
                <Text>{data.price[1].quantity}</Text>
                <TouchableOpacity
                  onPress={() =>
                    dispatch({ type: "cartAbonnement", payload: data })
                  }
                  style={{
                    borderRadius: 100,
                    marginLeft: 20,
                    padding: 4,
                    borderWidth: 1,
                    borderColor: "#B9B9B9",
                    opacity: 0.5,
                  }}
                >
                  <MaterialCommunityIcons
                    name="plus"
                    style={{
                      fontSize: 16,
                      color: "#777777",
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginTop: 4,
                  flexDirection: "row",
                  alignItems: "center",
                  opacity: 0.6,
                  marginLeft: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                  }}
                >
                  Tarif carte abonnement :
                  <Text style={{ fontWeight: "bold" }}>
                    {" "}
                    {data.price[1].price} €
                  </Text>
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                }}
                onPress={() =>
                  dispatch({ type: "resetCartTarifAbonnement", payload: data })
                }
              >
                <FontAwesome
                  name="trash-o"
                  style={{
                    fontSize: 16,
                    color: "#777777",
                    backgroundColor: "#F0F0F3",
                    padding: 8,
                    borderRadius: 100,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 25,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    dispatch({ type: "decreaseCartTarifMoins", payload: data })
                  }
                  style={{
                    borderRadius: 100,
                    marginRight: 20,
                    padding: 4,
                    borderWidth: 1,
                    borderColor: "#B9B9B9",
                    opacity: 0.5,
                  }}
                >
                  <MaterialCommunityIcons
                    name="minus"
                    style={{
                      fontSize: 16,
                      color: "#777777",
                    }}
                  />
                </TouchableOpacity>
                <Text>{data.price[2].quantity}</Text>
                <TouchableOpacity
                  onPress={() =>
                    dispatch({ type: "cartTarifMoins", payload: data })
                  }
                  style={{
                    borderRadius: 100,
                    marginLeft: 20,
                    padding: 4,
                    borderWidth: 1,
                    borderColor: "#B9B9B9",
                    opacity: 0.5,
                  }}
                >
                  <MaterialCommunityIcons
                    name="plus"
                    style={{
                      fontSize: 16,
                      color: "#777777",
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginTop: 4,
                  flexDirection: "row",
                  alignItems: "center",
                  opacity: 0.6,
                  marginLeft: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                  }}
                >
                  Tarif moins de 12 ans :
                  <Text style={{ fontWeight: "bold" }}>
                    {" "}
                    {data.price[2].price} €
                  </Text>
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                }}
                onPress={() =>
                  dispatch({ type: "resetCartTarifMoins", payload: data })
                }
              >
                <FontAwesome
                  name="trash-o"
                  style={{
                    fontSize: 16,
                    color: "#777777",
                    backgroundColor: "#F0F0F3",
                    padding: 8,
                    borderRadius: 100,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    dispatch({
                      type: "decreaseCartTarifJeuneAbonne",
                      payload: data,
                    })
                  }
                  style={{
                    borderRadius: 100,
                    marginRight: 20,
                    padding: 4,
                    borderWidth: 1,
                    borderColor: "#B9B9B9",
                    opacity: 0.5,
                  }}
                >
                  <MaterialCommunityIcons
                    name="minus"
                    style={{
                      fontSize: 16,
                      color: "#777777",
                    }}
                  />
                </TouchableOpacity>
                <Text>{data.price[3].quantity}</Text>
                <TouchableOpacity
                  onPress={() =>
                    dispatch({ type: "cartTarifJeuneAbonne", payload: data })
                  }
                  style={{
                    borderRadius: 100,
                    marginLeft: 20,
                    padding: 4,
                    borderWidth: 1,
                    borderColor: "#B9B9B9",
                    opacity: 0.5,
                  }}
                >
                  <MaterialCommunityIcons
                    name="plus"
                    style={{
                      fontSize: 16,
                      color: "#777777",
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginTop: 4,
                  flexDirection: "row",
                  alignItems: "center",
                  opacity: 0.6,
                  marginLeft: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                  }}
                >
                  Tarif jeune abonné 12/25 ans :
                  <Text style={{ fontWeight: "bold" }}>
                    {" "}
                    {data.price[2].price} €
                  </Text>
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                }}
                onPress={() =>
                  dispatch({ type: "resetCartTarifJeuneAbonne", payload: data })
                }
              >
                <FontAwesome
                  name="trash-o"
                  style={{
                    fontSize: 16,
                    color: "#777777",
                    backgroundColor: "#F0F0F3",
                    padding: 8,
                    borderRadius: 100,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      {programmes.cartItems.length > 0 ? (
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#ffffff",
            position: "relative",
            paddingTop: 20,
          }}
        >
          {loading && <Loader />}
          <ScrollView>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                paddingTop: 16,
                paddingHorizontal: 16,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialCommunityIcons
                  name="chevron-left"
                  style={{
                    fontSize: 18,
                    color: "#777777",
                    padding: 12,
                    backgroundColor: "#F0F0F3",
                    borderRadius: 12,
                  }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 20,
                  color: "#000000",
                  fontWeight: "400",
                  fontWeight: "bold",
                }}
              >
                Ma réservation
              </Text>
              <View></View>
            </View>

            <Text
              style={{
                fontSize: 20,
                color: "#000000",
                fontWeight: "bold",
                letterSpacing: 1,
                paddingTop: 20,
                paddingLeft: 16,
                marginBottom: 10,
              }}
            >
              Tickets
            </Text>
            <View style={{ paddingHorizontal: 16 }}>
              {programmes ? programmes.cartItems.map(renderProducts) : null}
            </View>
            <View>
              <View
                style={{
                  paddingHorizontal: 16,
                  marginTop: 40,
                  marginBottom: 80,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#000000",
                    fontWeight: "500",
                    letterSpacing: 1,
                    marginBottom: 20,
                  }}
                >
                  Informations de la réservation
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "400",
                      maxWidth: "80%",
                      color: "#000000",
                      fontWeight: "bold",
                    }}
                  >
                    Frais de gestion par place
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "500",
                      color: "#000000",
                      fontWeight: "bold",
                    }}
                  >
                    1 €
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "400",
                      maxWidth: "80%",
                      color: "#000000",
                      fontWeight: "bold",
                    }}
                  >
                    {getPlaces()} places
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "500",
                      color: "#000000",
                      fontWeight: "bold",
                    }}
                  >
                    {getTotal()} €
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      maxWidth: "80%",
                      color: "#000000",
                      fontWeight: "bold",
                    }}
                  >
                    TOTAL (FRAIS INCLUS)
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "500",
                      color: "#000000",
                      fontWeight: "bold",
                    }}
                  >
                    {getTotal() + 1 * getPlaces()} €
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 25,
                    marginBottom: 10,
                  }}
                >
                  <Checkbox
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginRight: 10,
                    }}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? "#f26522" : undefined}
                  />
                  <Text
                    style={{
                      fontSize: 13,
                      width: "90%",
                    }}
                  >
                    En cochant cette case , j'accepte et je reconnais avoir pris
                    connaissance des Conditions Générales de Vente du service de
                    billettrie en ligne
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              position: "absolute",
              bottom: 10,
              height: "8%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              // onPress={() => (total != 0 ? checkOut() : null)}
              onPress={() => validateCart()}
              style={{
                width: "86%",
                height: "70%",
                backgroundColor: colors.primary,
                borderRadius: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
              disabled={
                programmes.cartItems[0].date && isChecked === true
                  ? false
                  : true
              }
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  letterSpacing: 1,
                  color: "#ffffff",
                  textTransform: "uppercase",
                }}
              >
                Valider mon panier (€ {getTotal() + 1 * getPlaces()} )
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#ffffff",
            position: "relative",
            paddingTop: 20,
          }}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              paddingTop: 16,
              paddingHorizontal: 16,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons
                name="chevron-left"
                style={{
                  fontSize: 18,
                  color: "#777777",
                  padding: 12,
                  backgroundColor: "#F0F0F3",
                  borderRadius: 12,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 20,
                color: "#000000",
                fontWeight: "400",
                fontWeight: "bold",
              }}
            >
              Ma réservation
            </Text>
            <View></View>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <Feather name="shopping-bag" size={50} color="black" />

            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              Votre panier est vide !{" "}
            </Text>
          </View>
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 100,
    fontWeight: "bold",
  },
  button: {
    width: 100,
    height: 50,
    margin: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 2,
  },
});
export default ShoppingCart;
