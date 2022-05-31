import React, { useEffect, useState, useContext } from "react";

import {  Overlay } from 'react-native-elements';

import {
Image,

TextInput,
View,
StyleSheet,
searchText,
ScrollViewButton,
ScrollView,
Button,
FlatList,
TouchableOpacity,
Modal,
Pressable,
TouchableWithoutFeedback,
Switch,
} from "react-native";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";
import { ActivityIndicator, ToastAndroid } from "react-native";

import { Card } from "react-native-paper";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import WebView from "react-native-webview";
import styles from "../config/styles/StyleGeneral";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import Loader from "./Loader";
import ListStyleSpectacle from "./recherche/ListStyleSpectacle";
import { StoreContext } from "../store/store";
import { RechercheContext } from "../store/storeRecherche";

import { Tooltip, Text } from 'react-native-elements';
import { abs } from "react-native-reanimated";
import { round } from "lodash";


const validationSchema = Yup.object().shape({});
const baseUrl = "https://appli.ovh/off/app/";
const url_programme = baseUrl + "api2022.php?a=1&limit=";

export default function RechercheModal({ navigation }) {
//console.log("recherche");
const [date, setDate] = useState(new Date());
const [time, setTime] = useState(new Date());
const [mode, setMode] = useState("date");
const [show, setShow] = useState(false);

const showMode = (currentMode) => {
setShow(true);
setMode(currentMode);
};

const showDatepicker = () => {
showMode("date");
};

const showTimepicker = () => {
showMode("time");
};
const { state, dispatch } = React.useContext(StoreContext);
const { stateRecherche, dispatchRecherche } = React.useContext(RechercheContext);
const [isLoading, setIsLoading] = useState(false);
const [limite, setLimite] = useState(false);

const resetForm = () => {
setIsLoading(false);
//setFieldValue('type_public', '');
};

const [switchMatin, setswitchMatin] = useState(false);
const [switchApresMidi, setswitchApresMidi] = useState(false);
const [switchSoir, setswitchSoir] = useState(false);
const [switchTicketOff,setswitchTicketOff] = useState(false);

const toggleSwitchMatin = (value) => {
//To handle switch toggle
setswitchMatin(value);
//State changes according to switch
};
const toggleSwitchApresMidi = (value) => {
//To handle switch toggle
setswitchApresMidi(value);
//State changes according to switch
};
const toggleSwitchSoir = (value) => {
//To handle switch toggle
setswitchSoir(value);

//State changes according to switch
};

const toggleTicketOff = (value) => {
  //To handle switch toggle
  setswitchTicketOff(value);
  
  //State changes according to switch
  };


const  [nb_styles,setNb_Styles] = useState();// =  stateRecherche.StylesRecherchesSelected.length;


function countUnique(iterable) {
  return new Set(iterable).size;
}



useEffect(() => {
console.log(stateRecherche.StylesRecherches);
//setNb_Styles(stateRecherche.StylesRecherchesSelected.length);
setNb_Styles(countUnique(stateRecherche.StylesRecherches));

// setNb_Styles(stateRecherche.limite);


}, [stateRecherche]);





const handleSubmit = async (values) => {
let data = [];

setIsLoading(true);

// dispatchRecherche({
//   type: "ADD_LIMITE",
//   payload: limite,
// });


await axios.get(url_programme).then(async (response) => {
data = response.data;
});


//<Text>    {switchMatin ? 'Switch is ON' : 'Switch is OFF'}</Text>

const fil = data.filter(
  (item) => {
   
    let search_ticket_off = '';
  
   

    if (
      (stateRecherche.StylesRecherches.includes(item.style))  &&
      (switchTicketOff == true ? item.ticket_off.includes('Oui') : true ) 
      &&
      (
        (
          switchMatin == true ?
          (
            item.horaire.includes('05h')
            || item.horaire.includes('06h')
            || item.horaire.includes('07h')
            || item.horaire.includes('08h')
            || item.horaire.includes('09h')
            || item.horaire.includes('10h')
            || item.horaire.includes('11h')
            

          ): true 
      )
      &&
      (
        switchApresMidi == true ?
        (
          item.horaire.includes('12h')
          || item.horaire.includes('13h')
          || item.horaire.includes('14h')
          || item.horaire.includes('15h')
          || item.horaire.includes('16h')
          || item.horaire.includes('17h')
        
          

        ): true 
    )
    &&
    (
      switchSoir == true ?
      (
        item.horaire.includes('18h')
        || item.horaire.includes('19h')
        || item.horaire.includes('20h')
        || item.horaire.includes('21h')
        || item.horaire.includes('22h')
        || item.horaire.includes('23h')
        || item.horaire.includes('24h')
        

      ): true 
    )


       /* (switchMatin == true
        ? item.horaire.includes('05h') : true
        ) || 
        (switchMatin == true
        ? item.horaire.includes('06h') : true
        ) || 
        (switchMatin == true
        ? item.horaire.includes('07h') : true
        ) || 
        (switchMatin == true
        ? item.horaire.includes('08h') : true
        ) || 
        (switchMatin == true
        ? item.horaire.includes('09h') : true
        ) || 
        (switchMatin == true
        ? item.horaire.includes('10h') : true
        ) || 
        (switchMatin == true
        ? item.horaire.includes('11h') : true
        ) 
        
        ) && (
        
        
        (switchApresMidi == true
        ? item.horaire.includes('12h' 
        ) : true
        )  || 
       (switchApresMidi == true
        ? item.horaire .includes('13h') : true
        ) || 
        (switchApresMidi == true
        ? item.horaire.includes('14h') : true
        ) || 
        (switchApresMidi == true
        ? item.horaire.includes('15h' ) : true
        ) || 
        (switchApresMidi == true
        ? item.horaire .includes('16h') : true
        ) || 
        (switchApresMidi == true
        ? item.horaire.includes('17h') : true
        ) 
       
        
        ) && (
        
        (switchSoir == true
        ? item.horaire.includes('18h') : true
        ) ||
        (switchSoir == true
        ? item.horaire.includes('19h') : true
        ) ||
        (switchSoir == true
        ? item.horaire.includes('20h') : true
        ) ||
        (switchSoir == true
        ? item.horaire.includes('21h') : true
        ) ||
        (switchSoir == true
        ? item.horaire.includes('22h') : true
        ) ||
        (switchSoir == true
        ? item.horaire.includes('23h' ): true
        ) 
         
        )  */
   
      )
    ) {
      return true;
    } else {
      return false;
    }
  }
);






const fil2 = data.filter(
(item) =>

/*
(
(values.titre_spectacle
? item.titre_spectacle
.toLowerCase()
.includes(values.titre_spectacle.toLowerCase())
: true) 

||


(values.titre_spectacle
? item.description
.toLowerCase()
.includes(values.titre_spectacle.toLowerCase())
: true) 

)  


&&
*/
/*   (values.description
? item.description
.toLowerCase()
.includes(values.description.toLowerCase())
: true) &&

*/

//(
//(values.style ? item.style.includes(values.style) : true)  

   (stateRecherche.StylesRecherches.includes(item.style))
//&& (stateRecherche.StylesRecherchesSelected.includes(item.style))
//)&&
/*
&&
(values.nom
? item.nom.toLowerCase() == values.nom.toLowerCase()
: true) &&
(values.type_public
? item.type_public.toLowerCase() == values.type_public.toLowerCase()
: true) &&
(values.salle ? item.salle == values.salle : true) &&

*/

/*   (values.horaire
? moment(item.horaire, "h:mm a").format("HH:mm") === values.horaire
: true) && */

/*
(

(switchMatin == true
? item.horaire.includes('05h') : true
) || 
(switchMatin == true
? item.horaire.includes('06h') : true
) || 
(switchMatin == true
? item.horaire.includes('07h') : true
) || 
(switchMatin == true
? item.horaire.includes('08h') : true
) || 
(switchMatin == true
? item.horaire.includes('09h') : true
) || 
(switchMatin == true
? item.horaire.includes('10h') : true
) || 
(switchMatin == true
? item.horaire.includes('11h') : true
) 

) || (


(switchApresMidi == true
? item.horaire.includes('12h') : true
) || 
(switchApresMidi == true
? item.horaire .includes('13h') : true
) || 
(switchApresMidi == true
? item.horaire.includes('14h') : true
) || 
(switchApresMidi == true
? item.horaire.includes('15h' ) : true
) || 
(switchApresMidi == true
? item.horaire .includes('16h') : true
) || 
(switchApresMidi == true
? item.horaire.includes('17h') : true
) 


) || (

(switchSoir == true
? item.horaire.includes('18h') : true
) ||
(switchSoir == true
? item.horaire.includes('19h') : true
) ||
(switchSoir == true
? item.horaire.includes('20h') : true
) ||
(switchSoir == true
? item.horaire.includes('21h') : true
) ||
(switchSoir == true
? item.horaire.includes('22h') : true
) ||
(switchSoir == true
? item.horaire.includes('23h' ): true
) 

) &&


(values.date ? item.dates.includes(values.date) : true) &&

(values.acces_handicape && values.acces_handicape == true
? item.acces_handicape == "Oui"
: true) 
*/

/*&&
(values.acces_handicape && values.acces_handicape == false
? item.acces_handicape == "Non"
: true) 
&&
(values.ticket_off && values.ticket_off == true
? item.ticket_off == "Oui"
: true)
*/
/* &&
(values.ticket_off && values.ticket_off == false
? item.ticket_off == "Non"
: true)*/

&& (
item.ticket_off.toLowerCase().indexOf('oui') > -1 && values.ticket_off
)

); 

/*&&
(values.deja_joue && values.deja_joue == true
? item.deja_joue == "Non"
: true)
;*/

dispatch({ type: "addData", payload: fil });
setIsLoading(false);

navigation.goBack();
};

const pickerStyle = {
  inputIOS: {
  width: "100%",   
   textAlign: 'right',
  },
}



return (
<View style={{ width: "100%", backgroundColor: "#fff", padding:20, height: '100%'}}>

<ScrollView style={{height: '100%', width: '100%', display: 'flex'}}>
{isLoading && <Loader />}

<View style={{  display: isLoading ? "none" : "flex" }}>

<Formik
initialValues={{
titre_spectacle: "",
ticket_off: "",
acces_handicape: "",
type_public: "",
style: "",
nom: "",
salle: "",
date: "",
horaire: "",
}}
onSubmit={handleSubmit}
validationSchema={validationSchema}
>
{({
values,
setFieldTouched,
setFieldValue,
errors,
touched,
handleChange,
handleSubmit,
resetForm,
}) => (
<>

<View style={{
  padding: 15,
  paddingTop:0,
  width: "100%",
  margin: 0,
  flexDirection: "row",
  alignContent: "space-between",
  alignItems: "center"
}}>
<TextInput
style={{
  paddingTop:0,
  width: "100%",
}}
autoCapitalize="none"
placeholder="Tapez votre recherche..."
onChangeText={(text) =>
  setFieldValue("titre_spectacle", text)
}
value={values["titre_spectacle"]}
/>
</View>
<View style={styles.Separateur} />

<View
style={{
  padding: 15,
  width: "100%",
  margin: 0,
  flexDirection: "row",
  alignContent: "space-between",
  alignItems: "center",
  display:'none'
}}
>

<Text>Style de pièce</Text>

<TextInput
style={{
  width: "100%",
}}
autoCapitalize="none"
placeholder="Style de pièce..."
onChangeText={(text) => setFieldValue("style", text)}
value={values["style"]}
/>
</View>

<View>

<Pressable
style={{
  padding: 15,
  flexDirection: "row",
  alignContent: "space-between",
  width: "100%",
  alignItems: "center",
}}
title="liste Style"
onPress={() => navigation.navigate("ListStyleSpectacle")}
>
<Text>Style de pièce ({nb_styles})</Text></Pressable>
</View>
<View style={styles.Separateur} />



<View style={{
  padding: 15,
  flexDirection: "row",
  alignContent: "space-between",
  width: "100%",
  alignItems: "center", 
}}>
<Text>
Type de public
</Text>
<View    style={{width: "100%",     position: "absolute"}}>
  
<RNPickerSelect
style={pickerStyle}
placeholder={{
  label: "Type de public",
  value: values["type_public"],
}}

value={values["type_public"]}
onValueChange={(value) => setFieldValue("type_public", value)}
items={[
  { label: "Jeune public", value: "Jeune public" },
  { label: "Public adulte", value: "Public adulte" },
  { label: "Tout public", value: "Tout public" },
  {
    label: "Public non francophone",
    value: "Public non francophone",
  },
]}
/></View>
</View>





<View style={styles.Separateur} />

<View
style={{
  padding: 15,
  width: "100%",
  flexDirection: "row",
  alignContent: "space-between",
  alignItems: "center",
}}
>
<Text >Date</Text>
{/* <TouchableOpacity onPress={showDatepicker}>
<Text>selected: {date.toLocaleString()}</Text>
</TouchableOpacity> */}

{show && (
<DateTimePicker
testID="dateTimePicker"
value={mode == "date" ? date : time}
mode={mode}
is24Hour={true}
onChange={(event, selectedDate) => {
  const currentDate = selectedDate;
  setShow(false);
  mode == "date"
  ? setDate(currentDate)
  : setTime(currentDate);
  mode == "date"
  ? setFieldValue(
    "date",
    moment(selectedDate).format("DD/MM/YYYY")
    )
    : setFieldValue(
      "horaire",
      moment(selectedDate).format("HH:mm")
      );
      console.log(time);
    }}
    />
    )}
    <View style={{width: "100%",    textAlign: 'right',     position: "absolute"}}>
    <TouchableOpacity onPress={showDatepicker}>
    <TextInput
    style={{width: "100%",    textAlign: 'right'}}
    placeholder="Date"
    placeholderTextColor="grey"
    value={values["date"]}
    editable={false}
    pointerEvents="none"
    />
    </TouchableOpacity>
    </View></View>
    <View style={styles.Separateur} />
    
    <View
    style={{
      padding: 15,
      width: "100%",
      flexDirection: "row",
      alignContent: "space-between",
      alignItems: "center",
    }}
    >
    <Text>Horaires</Text>
   

   <View style={{    width: "75%",right: 0,
    textAlign: 'right', 
    position: "absolute", flexDirection: 'row', alignContent: 'space-between'}}>
    <View  style={{width: '33%', textAlign: 'center', alignItems: 'center'}}
    
    >
    {/*
    <TouchableOpacity onPress={showTimepicker}>
    <TextInput
    style={{
      marginLeft: 10,
    }}
    placeholder="Horaire"
    placeholderTextColor="grey"
    value={values["horaire"]}
    editable={false}
    pointerEvents="none"
    />
  </TouchableOpacity> */ }
  
  <Text>Matin</Text>
  
  <Switch
  
  onValueChange={toggleSwitchMatin}
  value={switchMatin}
  />
  
  
  </View>
  
  <View  style={{width: '33%', textAlign: 'center', alignItems: 'center'}}>
  
  <Text>Apres midi</Text>
  <Switch
  
  onValueChange={toggleSwitchApresMidi}
  value={switchApresMidi}
  />
  
  
  
  
  </View>
  
  <View  style={{width: '33%', textAlign: 'center', alignItems: 'center'}}>
  
  <Text>Soir</Text>
  <Switch
  
  onValueChange={toggleSwitchSoir}
  value={switchSoir}
  />
  
  
  
  
  </View>
  </View>
  </View>
  <View style={styles.Separateur} />
  
  <View
  style={{
    padding: 15,
    flexDirection: "row",
    alignContent: "space-between",
    width: "100%",
    alignItems: "center",
  }}
  >
  <Text>Théâtre</Text>
  <TextInput
  style={{
    width: "100%",
    textAlign: 'right', 
    position: "absolute"
  }}
  autoCapitalize="none"
  placeholder="Théatre..."
  onChangeText={(text) => setFieldValue("salle", text)}
  value={values["salle"]}
  />
  </View>
  <View style={styles.Separateur} />
  
  <View
  style={{
    padding: 15,
    flexDirection: "row",
    alignContent: "space-between",
    width: "100%",
    alignItems: "center",
  }}
  >
  <Text>Auteur</Text>
  <TextInput
  style={{
    width: "100%",
    textAlign: 'right', 
    position: "absolute"
  }}
  autoCapitalize="none"
  placeholder="Auteur..."
  onChangeText={(text) => setFieldValue("nom", text)}
  value={values["nom"]}
  />
  </View>
  <View style={styles.Separateur} />
  
  <View
  style={{
    padding: 15,
    flexDirection: "row",
    alignContent: "space-between",
    width: "100%",
    alignItems: "center",
  }}
  >
  <Text>ticket off </Text>
  <View style={{ position: "absolute", right: 15, marginTop: 5 }}>
  {/* <Image
  style={{
    resizeMode: "cover",
    height: 30,
    width: 30,
  }}
  source={require("../assets/next.png")}
/>
<Switch
trackColor={{ false: "#767577", true: "#f26522" }}
// thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
ios_backgroundColor="#e8e8e8"
onValueChange={(text) => setFieldValue("ticket_off", text)}
value={values["ticket_off"]}
/>
 */}
<Switch
  
  onValueChange={toggleTicketOff}
  value={switchTicketOff}
  />
</View>
</View>
<View style={styles.Separateur} />

<View
style={{
  padding: 15,
    flexDirection: "row",
    alignContent: "space-between",
    width: "100%",
    alignItems: "center",
}}
>
<Text>Accès personnes à mobilité réduite</Text>
<View style={{ position: "absolute", right: 15, marginTop: 5 }}>
{/* <Image
style={{
  resizeMode: "cover",
  height: 30,
  width: 30,
}}
source={require("../assets/next.png")}
/> */}
<Switch
trackColor={{ false: "#767577", true: "#f26522" }}
// thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
ios_backgroundColor="#e8e8e8"
onValueChange={(text) =>
setFieldValue("acces_handicape", text)
}
value={values["acces_handicape"]}
/>
</View>
</View>

<View style={styles.Separateur} />
{/*  
<View
style={{
padding: 10,
width: "90%",
margin: 0,
marginLeft: "5%",
flexDirection: "row",
alignContent: "space-between",
width: "100%",
alignItems: "center",
}}
>
<Text>1ere à Avignon</Text>
<View style={{ position: "absolute", right: 40, marginTop: 5 }}>

<Switch
trackColor={{ false: "#767577", true: "#81b0ff" }}
// thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
ios_backgroundColor="#3e3e3e"
onValueChange={(text) =>
setFieldValue("deja_joue", text)
}
value={values["deja_joue"]}
/>
</View>
</View>
<View style={styles.Separateur} />
*/}

{/* <View
style={{
padding: 10,
width: "90%",
margin: 0,
marginLeft: "5%",
flexDirection: "row",
alignContent: "space-between",
width: "100%",
}}
>
<Text>Autour des spectacles</Text>
<View style={{ position: "absolute", right: 40, marginTop: 5 }}>
<Image
style={{
resizeMode: "cover",
height: 30,
width: 30,
}}
source={require("../assets/next.png")}
/>
</View>
</View> */}
{/* <View style={styles.Separateur} /> */}




</>
)}
</Formik>

</View>
</ScrollView>


<View style={{   flex: 2, position: 'absolute', bottom: 120, width: '80%', marginLeft: '15%' }} >





<TouchableOpacity
onPress={handleSubmit}

>
<View
style={[styles.labelCard, styles.labelAchat, styles.bigButton]}
>
<Text style={styles.textBigButton}>
Afficher les résultats
</Text>
</View>
</TouchableOpacity>


</View>
</View>
);
//<Button color={'#221f1f'} type="reset" onPress={resetForm} title="Effacer les critères" />
}