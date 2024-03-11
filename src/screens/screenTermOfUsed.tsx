import React from "react";
import Layout from "../layout";
import I18n from "../i18n";
import { WebView } from "react-native-webview";
import NavigationServer from "../services/navgationService";
export default function ScreenTermOfUsed(props: any) {
  const termOfUse= props?.termOfUse;
  const [isPageScript,setPageScript]=React.useState('');
  React.useEffect(()=>{
    if(props?.useTermOfUse)props?.useTermOfUse();
  },[]);

  React.useEffect(()=>{
    if(termOfUse?.message==='success'){
      setPageScript(termOfUse?.data?.page)
    }
  },[termOfUse])
  
  return (
    <Layout
      centerTitle={I18n.t("termOfUsed")}
      handleLeftBack={() => NavigationServer.goBack()}
      handleLeftBackLabel={I18n.t("homepage")}
      backgroundMainColor
    >
      <WebView
        originWhitelist={['*']}
        source={{ html: isPageScript }}
        style={{ flex: 1,margin:20 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </Layout>
  );
}
