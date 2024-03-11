import React from "react";
import {
  StyleSheet,
  Platform,
  Alert,
  ActivityIndicator
} from "react-native";
import Layout from "../layout";
import I18n from "../i18n";
import themes from "../themes";
import { WebView } from "react-native-webview";
import NavigationServer from "../services/navgationService";
import { useRoute } from '@react-navigation/native';
import CryptoJS from 'crypto-js';
import moment from "moment";
import { ABA_PAYWAY_KEY,
  ABA_PAYWAY_MERCHANT_ID,
  REFERER,
  ABA_PAYWAY_CHECK_TRANSACTION,
  HASH,
   } from '@env';
   import {axios} from "../api";
   import { navRoutes } from "../navigation/navRoutes";


export default function ScreenYoutube(props: any) {
  const {params} = useRoute();
  const link = Object(params)?.link || '';
  return (
    <Layout
      backgroundMainColor
      handleLeftBack={() => 
      NavigationServer.goBack()
      }
      centerTitle={I18n.t("video")}
    >
      <WebView
        originWhitelist={['*']}
        style={{ flex: 1,margin:0 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        setBuiltInZoomControls={false}
        allowsFullscreenVideo={true}
        source={{ uri: `https://www.youtube.com/embed/${link}` }}
        renderLoading={() => (
            <ActivityIndicator
              color='black'
              size='large'
            />
          )}
      />
    </Layout>
  );
}