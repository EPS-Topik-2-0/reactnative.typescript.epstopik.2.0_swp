import React from "react";
import Layout from "../layout";
import I18n from "../i18n";
import { WebView } from "react-native-webview";
import NavigationServer from "../services/navgationService";
export default function ScreenScreenInfo(props: any) {
  return (
    <Layout
      centerTitle={I18n.t("facebook")}
      handleLeftBack={() => NavigationServer.goBack()}
      handleLeftBackLabel={I18n.t("homepage")}
    >
      <WebView
        source={{ uri: "https://www.facebook.com/mtosbcambodia" }}
        style={{ flex: 1 }}
      />
    </Layout>
  );
}

