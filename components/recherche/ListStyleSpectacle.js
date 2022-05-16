
import React, { useEffect, useState } from "react";
import { View,Text} from 'react-native';

import { ActivityIndicator, Colors } from 'react-native-paper';


import { AlphabetList } from "react-native-section-alphabet-list";
import axios from 'axios';

import styles from '../styles/StyleGeneral';

export default function ListStyleSpectacle({ navigation}) {

    //

   // const [data, setData] = useState();
    

/*

const data = [
  { value: 'Lillie-Mai Allen', key: 'lCUTs2' },
  { value: 'Emmanuel Goldstein', key: 'TXdL0c' },
  { value: 'Winston Smith', key: 'zqsiEw' },
  { value: 'William Blazkowicz', key: 'psg2PM' },
  { value: 'Gordon Comstock', key: '1K6I18' },
  { value: 'Philip Ravelston', key: 'NVHSkA' },
  { value: 'Rosemary Waterlow', key: 'SaHqyG' },
  { value: 'Julia Comstock', key: 'iaT1Ex' },
  { value: 'Mihai Maldonado', key: 'OvMd5e' },
  { value: 'Murtaza Molina', key: '25zqAO' },
  { value: 'Peter Petigrew', key: '8cWuu3' },
];
*/

const data = [
        { value: "Art du récit"},
    { value: "Atelier"},
    { value: "Boulevard"},
    { value: "Café-théâtre"},
    { value: "Chanson"},
    { value: "Cirque contemporain"},
    { value: "Clown"},
    { value: "Comédie"},
    { value: "Concert"},
    { value: "Conférence"},
    { value: "Conférence-spectacle"},
    { value: "Conte"},
    { value: "Cycle d'événements"},
    { value: "Danse"},
    { value: "Danse-théâtre"},
    { value: "Débat"},
    { value: "Improvisation"},
    { value: "Lecture"},
    { value: "Lecture / Causerie"},
    { value: "Magie"},
    { value: "Marionnette-objet"},
    { value: "Mime"},
    { value: "Performance"},
    { value: "Pluridisciplinaire"},
    { value: "Poésie"},
    { value: "Projection"},
    { value: "Rencontre"},
    { value: "Rencontre débat"},
    { value: "Scène ouverte"},
    { value: "Seul.e en scène"},
    { value: "Sketch"},
    { value: "Spectacle"},
    { value: "Spectacle musical"},
    { value: "Stand-up"},
    { value: "Tables rondes"},
    { value: "Théâtre citoyen"},
    { value: "Théâtre classique"},
    { value: "Théâtre contemporain"},
    { value: "Théâtre d'objet"},
    { value: "Théâtre expérimental"},
    { value: "Théâtre masqué"},
    { value: "Théâtre musical"},
    { value: "Tragédie"},
    { value: "Web TV"}

];

 


  return (
    <AlphabetList
      data={data}
      indexLetterStyle={{ 
        color: 'blue', 
        fontSize: 15,
      }}
      renderCustomItem={(item) => (
        <View style={styles.listItemContainer}>
          <Text style={styles.listItemLabel}>{item.value}</Text>
        </View>
      )}
      renderCustomSectionHeader={(section) => (
        <View style={styles.sectionHeaderContainer}>
          <Text style={styles.sectionHeaderLabel}>{section.title}</Text>
        </View>
      )}
    />
  )


}