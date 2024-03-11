import React from "react";
import Layout from "../layout";
import I18n from "../i18n";
import { WebView } from "react-native-webview";
import {
  StyleSheet,
  Text,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  RefreshControl,
  Linking,

} from "react-native";
import themes from "../themes";

import NavigationServer from "../services/navgationService";
export default function ScreenScreenInfo(props: any) {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  return (
    <Layout
      centerTitle={I18n.t("contactToMe")}
      handleLeftBack={() => NavigationServer.goBack()}
      handleLeftBackLabel={I18n.t("homepage")}
      backgroundMainColor
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.bodyScroll}
      >
        <Text style={styles.txtTitle}>{`${I18n.t('infoTitle')}`}</Text>
        <Text style={styles.txtSubTitle}>{`${I18n.t('infoSubTitle')}`}</Text>
        <View style={[styles.viewRow,{marginTop:20}]}>
          <Text style={styles.label}>{`${I18n.t('infoLabelFax')}`}</Text>
          <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${I18n.t('infoFax')}`);
              }}
            >
             <Text style={styles.txtLink}>{`${I18n.t('infoFax')}`}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewRow}>
          <Text style={styles.label}>{`${I18n.t('infoEmailLabel')}`}</Text>
          <TouchableOpacity
              onPress={() => {
                Linking.openURL(`mailto:${I18n.t('infoEmail')}`);
              }}
            >
             <Text style={styles.txtLink}>{`${I18n.t('infoEmail')}`}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.txtSubTitle}>{`${I18n.t('infoContactViaPhoneLabel')}`}</Text>
        <View style={styles.viewRow}>
          <Text style={styles.label}>{`${I18n.t('infoSmartLabel')}`}</Text>
          <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${I18n.t('infoLabel016')}`);
              }}
            >
             <Text style={styles.txtLink}>{`${I18n.t('infoLabel016')}`}</Text>
          </TouchableOpacity>
        </View>
       
        <View style={[styles.viewRow,{marginTop:10}]}>
          <Text style={styles.label}>{`${I18n.t('infoCellcardLabel')}`}</Text>
          <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${I18n.t('infoLabel0124')}`);
              }}
            >
             <Text style={styles.txtLink}>{`${I18n.t('infoLabel0124')}`}</Text>
          </TouchableOpacity>
          <Text style={{marginLeft:5,marginRight:5,color:themes.Primary.colorTextBlack}}>/</Text>
          <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${I18n.t('infoLabel0122')}`);
              }}
            >
             <Text style={styles.txtLink}>{`${I18n.t('infoLabel0122')}`}</Text>
          </TouchableOpacity>
          <Text style={{marginLeft:5,marginRight:5,color:themes.Primary.colorTextBlack}}>/</Text>
          <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${I18n.t('infoLabel0125')}`);
              }}
            >
             <Text style={styles.txtLink}>{`${I18n.t('infoLabel0125')}`}</Text>
          </TouchableOpacity>
          <Text style={{marginLeft:5,marginRight:5,color:themes.Primary.colorTextBlack}}>/</Text>
          <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${I18n.t('infoLabel0113')}`);
              }}
            >
             <Text style={styles.txtLink}>{`${I18n.t('infoLabel0113')}`}</Text>
          </TouchableOpacity>
          <Text style={{marginLeft:5,marginRight:5,color:themes.Primary.colorTextBlack}}>/</Text>
          <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${I18n.t('infoLabel0114')}`);
              }}
            >
             <Text style={styles.txtLink}>{`${I18n.t('infoLabel0114')}`}</Text>
          </TouchableOpacity>
        </View>

        
        <View style={[styles.viewRow,{marginTop:10}]}>
          <Text style={styles.label}>{`${I18n.t('infoMetfoneLabel')}`}</Text>
          <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${I18n.t('infoLabel088')}`);
              }}
            >
             <Text style={styles.txtLink}>{`${I18n.t('infoLabel088')}`}</Text>
          </TouchableOpacity>
          <Text style={{marginLeft:5,marginRight:5,color:themes.Primary.colorTextBlack}}>/</Text>
          <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${I18n.t('infoLabel097')}`);
              }}
            >
             <Text style={styles.txtLink}>{`${I18n.t('infoLabel097')}`}</Text>
          </TouchableOpacity>
          <Text style={{marginLeft:5,marginRight:5,color:themes.Primary.colorTextBlack}}>/</Text>
          <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${I18n.t('infoLabel0979')}`);
              }}
            >
             <Text style={styles.txtLink}>{`${I18n.t('infoLabel0979')}`}</Text>
          </TouchableOpacity>
          <Text style={{marginLeft:5,marginRight:5,color:themes.Primary.colorTextBlack}}>/</Text>
          <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${I18n.t('infoLabel071')}`);
              }}
            >
             <Text style={styles.txtLink}>{`${I18n.t('infoLabel071')}`}</Text>
          </TouchableOpacity>
          <Text style={{marginLeft:5,marginRight:5,color:themes.Primary.colorTextBlack}}>/</Text>
          <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${I18n.t('infoLabel0719')}`);
              }}
            >
             <Text style={styles.txtLink}>{`${I18n.t('infoLabel0719')}`}</Text>
          </TouchableOpacity>
          <Text style={{marginLeft:5,marginRight:5,color:themes.Primary.colorTextBlack}}>/</Text>
          <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${I18n.t('infoLabel023')}`);
              }}
            >
             <Text style={styles.txtLink}>{`${I18n.t('infoLabel023')}`}</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.viewRow,{marginTop:10}]}>
          <Text style={styles.label}>{`${I18n.t('infoLabelFacebook')}`}</Text>
          <TouchableOpacity
              onPress={() => {
                Linking.openURL(`${I18n.t('infoFacebook')}`);
              }}
            >
             <Text style={styles.txtLink}>{`${I18n.t('infoFacebook')}`}</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.viewRow,{marginTop:10}]}>
          <Text style={styles.label}>{`${I18n.t('infoLabelTelegram')}`}</Text>
          <TouchableOpacity
              onPress={() => {
                Linking.openURL(`${I18n.t('infoTelegram')}`);
              }}
            >
             <Text style={styles.txtLink}>{`${I18n.t('infoTelegram')}`}</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.viewRow,{marginTop:10}]}>
          <Text style={styles.label}>{`${I18n.t('infoLabelWebsite')}`}</Text>
          <TouchableOpacity
              onPress={() => {
                Linking.openURL(`${I18n.t('infoWebsite')}`);
              }}
            >
             <Text style={styles.txtLink}>{`${I18n.t('infoWebsite')}`}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  bodyScroll: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: themes.Primary.background,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    paddingTop: 30,
    textAlign:"left"
  },
  viewRow:{
    flexDirection:'row',
    flex:1,
    width:'100%',
    flexWrap: 'wrap',
  },
  label:{
    fontSize:16,
    fontFamily:themes.FontFamily.Hanuman,
    color:themes.Primary.colorTextBlack
  },
  txt:{
    fontSize:16,
    fontFamily:themes.FontFamily.Hanuman,
    color:themes.Primary.colorTextBlack
  },
  txtLink:{
    fontSize:16,
    fontFamily:themes.FontFamily.Hanuman,
    color:themes.Primary.colorTextBlack,
    fontWeight:'bold'
 
  },
  txtTitle:{
    fontSize:18,
    fontFamily:themes.FontFamily.Hanuman,
    color:themes.Primary.colorTextBlack
  },
  txtSubTitle:{
    marginTop:20,
    fontSize:16,
    lineHeight:30,
    fontFamily:themes.FontFamily.Hanuman,
    color:themes.Primary.colorTextBlack
  },
  viewBlogByContact:{
    marginTop:5,
  }
});
