
import React from "react";
import { WebView } from 'react-native-webview';
import Loader from "./Loader";

export default function Fondation({ navigation}) {

    const jsCode = "document.body.style.userSelect = 'none';document.querySelector('.navbar-default').style.display = 'none'; document.querySelector('footer').style.display = 'none'; document.querySelector('.cc-type-info').style.display='none'; document.querySelector('.cc-theme-classic').style.display='none';document.querySelector('.cc-window.cc-floating').style.display='none';";
      
    return (  
    
     
    <WebView
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}
    source={{ uri: 'https://www.festivaloffavignon.com/fondation-afc/' }}
    
    javaScriptEnabled={true}
    domStorageEnabled={true}
    startInLoadingState={true}
    scalesPageToFit={true}
    renderLoading={(e) => { return ( <Loader />  );  }}
    injectedJavaScript={jsCode}
    onMessage={(event) => {}}   
    ref={() => {}}
    />
  
      );
  }