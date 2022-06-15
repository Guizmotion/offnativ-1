import React from "react";

import { WebView } from "react-native-webview";
import Loader from "./Loader";

export default function CartPay({ navigation }) {
  const jsCode =
    "document.body.style.userSelect = 'none';document.querySelector('.navbar-default').style.display = 'none'; document.querySelector('footer').style.display = 'none';";

  return (
    <WebView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        
      }}


      onNavigationStateChange={(e) => {
        console.log(e.url);
        console.log( e.url.includes('paiement-annulation') ) ;
        //console.warn("current state is ", JSON.stringify(e, null, 2));
        /** put your comdition here based here and close webview.
         Like if(e.url.indexOf("end_url") > -1)
         Then close webview
         */
       //  if(!e.url.includes("pay_basket.aspx") )
       if(e.url.includes('paiement-annulation') === true)  
       {
         //document.querySelector('body').reload();
        // navigation.goBack();
           //redirect to pay_basket.aspx
           //setUrlPaiement({uri:e.url});
           //setUrlPaiement({url});
           //document.location.href = "https://www.festivaloffavignon.com/ws/pay_basket.aspx";
          }
    }}


      source={{ uri: "https://www.festivaloffavignon.com/ws/pay_basket.aspx" }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      startInLoadingState={true}
      scalesPageToFit={true}
      renderLoading={(e) => {
        return <Loader />;
      }}
      injectedJavaScript={jsCode}
    />
  );
}
