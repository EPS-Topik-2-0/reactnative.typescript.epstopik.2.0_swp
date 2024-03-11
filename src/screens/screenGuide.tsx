import React from "react";
import {
  StyleSheet,
  Text,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  RefreshControl,
} from "react-native";
import {
  ThumbnailLoading,
} from "../components";
import Layout from "../layout";
import {
  IcGuide,
} from "../assets";
import I18n from "../i18n";
import themes from "../themes";
import NavigationService from "../services/navgationService";
import { navRoutes } from "../navigation/navRoutes";
function LinkVideo({data}:any) {
  return (
    <TouchableOpacity
    onPress={()=>NavigationService.navigate(navRoutes.YOUTUBE,{link:data?.link})}
    style={{ marginBottom: 15 }}>
      <View
        style={[
          {
            height: 280,
            borderRadius: 10,
            shadowColor: themes.Primary.colorGrey,
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,

            elevation: 2,
            backgroundColor: themes.Primary.background,
            paddingHorizontal: 15,
            paddingVertical: 10,
          },
        ]}
      >
        <View
          style={{
            flex: 0.15,
            flexDirection: "row",
          }}
        >
          <IcGuide width={20} height={20} />
          <Text
            numberOfLines={1}
            style={{
              fontSize: 14,
              marginLeft: 10,

              fontFamily: themes.FontFamily.HanumanBold,
              color: themes.Primary.colorTextBlack,
            }}
          >
            {data?.name}
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            overflow: "hidden",
          }}
        >
          {
            !data?.alias || data?.alias ===''?
            <ThumbnailLoading />:
            <Image
              source={{uri:`${data?.alias}`}}
              resizeMode="contain" style={{ height:"100%",width:'100%' }}
               /> 
          }
        </View>
        <View
          style={{
            flex: 0.2,
            marginTop: 10,
            flexDirection: "row",
          }}
        >
          <Text
            numberOfLines={2}
            style={{ fontSize: 12, fontFamily: themes.FontFamily.Hanuman }}
          >
           {data?.desc}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function ScreenGuide(props: any) {
  const videos = props?.videos;
  const [refreshing, setRefreshing] = React.useState(false);
  
  const handleRequest = async () => {
    if (props?.useVideos) await props?.useVideos();
  };
  React.useEffect(() => {
    handleRequest();
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    handleRequest();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  return (
    <Layout
      centerTitle={I18n.t("guidePage")}
      handleLeftBack={() => NavigationService.goBack()}
      handleLeftBackLabel={I18n.t("homepage")}
      backgroundMainColor
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.bodyScroll}
      >

        
        {videos?.message === "success" &&
        Array.isArray(videos?.data)
          ? videos?.data?.map((data:any) => (
          <LinkVideo key={data.id} data={data} />
        )):null
      }
        <View
          style={{
            height: 50,
          }}
        ></View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "flex-end",
  },
  bodyScroll: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: themes.Primary.background,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    paddingTop: 30,
  },

  labelLogin: {
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 2,
  },
  txtLogin: {
    fontSize: 18,
    fontFamily: themes.FontFamily.HanumanBold,
  },
  input: {
    marginTop: 10,
  },
  viewBottomInput: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  touchCondition: {
    fontSize: 14,
    marginTop: -2,
    fontFamily: themes.FontFamily.Hanuman,
    paddingHorizontal: 3,
    color: themes.Primary.colorRed,
  },
  txtThereAre: {
    fontSize: 14,
    marginTop: -2,
    fontFamily: themes.FontFamily.Hanuman,
    color: themes.Primary.colorGrey,
  },
  buttonLogin: {
    width: "70%",
    height: 40,
    justifyContent: "center",
    backgroundColor: themes.Primary.mainColor,
    borderRadius: 12,
  },
  txtBtnLogin: {
    fontSize: 16,
    fontFamily: themes.FontFamily.Hanuman,
    textAlign: "center",
    color: themes.Primary.colorTextWhite,
  },
  txtLabel: {
    fontFamily: themes.FontFamily.Hanuman,
    fontSize: 12,
    textAlign: "center",
    color: themes.Primary.mainColor,
  },
  vBottom: {
    flexDirection: "column",
    marginTop: 30,
    alignItems: "center",
  },
  txtDesc: {
    color: themes.Primary.colorTextBlack,
    fontFamily: themes.FontFamily.Hanuman,
    textDecorationLine: "underline",
  },
  txtVersion: {
    fontSize: 10,
    color: themes.Primary.border,
    paddingLeft: 10,
  },
  imageLogo: {
    flex: 0.8,
    height: "100%",
    marginEnd: 5,
    resizeMode: "contain",
  },
  view_lr: {
    flex: 0.3,
    flexDirection: "column",
    justifyContent: "center",
  },
  viewLine: {
    height: 2,
    backgroundColor: themes.Primary.mainColor,
    width: "100%",
  },
  view_lb: {
    flexDirection: "row",
  },
  text_lb: {
    fontSize: Platform.OS === "ios" ? 16 : 18,
    textAlign: "center",
  },

  content: {
    flex: 1,
    height: "100%",
    alignContent: "center",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
