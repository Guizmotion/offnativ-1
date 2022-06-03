
import React from "react";
import { WebView } from 'react-native-webview';
import Loader from "./Loader";

export default function CarteAbonnementWebview({ navigation}) {

    const jsCode = "document.body.style.userSelect = 'none';document.querySelector('.navbar-default').style.display = 'none'; document.querySelector('footer').style.display = 'none';";
  
    return (  
    
     
    <WebView
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}
    source={{ uri: 'https://www.festivaloffavignon.com/carte-abonnement/' }}
    
    javaScriptEnabled={true}
    domStorageEnabled={true}
    startInLoadingState={true}
    scalesPageToFit={true}
    renderLoading={(e) => { return ( <Loader />  );  }}

    injectedJavaScript={jsCode}
    />
  
      );
  }