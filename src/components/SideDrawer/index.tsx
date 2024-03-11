import React from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Pressable,
  Alert,
  View,
} from "react-native";
import { typeTheme } from "../../types";
import themes from "../../themes";
import { ButtonTheme, TextTheme } from "../../components";
import {
  IcHome,
  IcMessage,
  IcGuide,
  IcGlobal,
  IcFacebook,
  IcChat,
  IcCondition,
  IcLogout,
  IcUserAdd,
  IcInfo,
} from "../../assets";
import I18n from "../../i18n";
import NavigationService from "../../services/navgationService";
import { navRoutes } from "../../navigation/navRoutes";
import { useNavigationState } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { keystores } from "../../constants";
import { store } from "../../providers";
import DataContext from "../../navigation/dataContext";
import ModalScroll from "react-native-modalbox";
import { ImLogout } from "../../assets";
import { LOGOUT_REQUEST } from "../../modules/app";

const NotLogin = () => (
  <View
    style={{
      justifyContent: "center",
      flexDirection: "column",
      paddingLeft: 10,
      paddingVertical: 10,
      alignItems: "center",
      height: 120,
    }}
  >
    <ButtonTheme
      onPress={() => NavigationService.navigate(navRoutes.LOGIN)}
      style={{
        flexDirection: "row",
        paddingVertical: 7,
        paddingHorizontal: 15,
        borderRadius: 8,
        backgroundColor: themes.Primary.buttonBackgroundMain,
        alignItems: "center",
        width: 130,
      }}
    >
      <IcUserAdd width={25} height={25} />
      <TextTheme
        style={{
          fontSize: 16,
          fontFamily: themes.FontFamily.Hanuman,
          color: themes.Primary.colorTextWhite,
        }}
      >
        {I18n.t("register")}
      </TextTheme>
    </ButtonTheme>
    <View
      style={[
        styles.viewLine,
        {
          backgroundColor: themes.Primary.mainColor,
          width: 120,
          marginTop: 5,
          height: 2,
        },
      ]}
    ></View>
  </View>
);

const LogInReady = ({
  phone,
  name,
}: {
  phone: string;
  name: string;
  id: number;
}) => (
  <View
    style={{
      justifyContent: "center",
      flexDirection: "column",
      paddingLeft: 10,
      paddingVertical: 10,
    }}
  >
    <View style={styles.header}>
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          marginLeft: 10,
        }}
      >
        <View style={styles.uploadPhoto}>
          <Text
            style={{
              color: "white",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              fontWeight: "600",
            }}
          >
            {`${name?.[0]}`.toLocaleUpperCase() || "R"}
          </Text>
        </View>
        <View
      style={{
        height: 45,
        justifyContent: "space-between",
        paddingHorizontal: 10,
        marginTop: 5,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          color: themes.Primary.colorTextBlack,
        }}
      >
        {`${name}`.toLocaleUpperCase()}
      </Text>
      <View style={[styles.viewLine,{width:165}]}></View>
      <Text
        style={{
          fontSize: 14,
          fontWeight: "500",
          color: themes.Primary.colorTextBlack,
        }}
      >
        {phone}
      </Text>
    </View>
      </TouchableOpacity>
    </View>
    
  </View>
);

interface ModalNoInternetType {
  theme?: typeTheme;
  visible?: boolean;
  loading?:boolean;
  handleClose?: () => void;
  handleReload?: () => void;
}

export const ModalLogout = ({
  visible,
  theme,
  handleClose,
  handleReload,
  loading
}: ModalNoInternetType) => {
  return (
    <Modal animationType="none" transparent={true} visible={visible}>
      <View style={stylesModule.coverCenter}>
        <Pressable
          onPress={handleClose}
          style={stylesModule.btnOpacityHide}
        ></Pressable>
        <View style={stylesModule.contentView}>
          <ModalScroll
            swipeToClose={false}
            animationDuration={1000}
            backdropOpacity={0}
            style={[
              stylesModule.modalScroll,
              theme === "dark"
                ? stylesModule.modalScrollDark
                : stylesModule.modalScrollLight,
            ]}
            isOpen={visible}
            onClosed={handleClose}
          >
            <View style={stylesModule.viewBody}>
              <ImLogout width={200} height={200} />
              <TextTheme theme={theme} style={[stylesModule.smallMessage]}>
                {`${I18n.t('messageConfirmLogout')}`}
              </TextTheme>
            </View>
            <View style={styles.layoutButtonLogout}>
              <TouchableOpacity
                style={[
                  styles.buttonLogout,
                  { backgroundColor: themes.Primary.colorRed100 },
                ]}
                onPress={handleClose}
              >
                <Text
                  style={{ color: themes.Primary.colorTextWhite, 
                    fontFamily:themes.FontFamily.Hanuman,
                    fontSize: 14 }}
                >
                  {`${I18n.t('noConfirm')}`}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={loading}
                style={[
                  styles.buttonLogout,
                  { backgroundColor: loading?themes.Primary.colorGrey100:themes.Primary.mainColor },
                ]}
                onPress={handleReload}
              >
                <Text
                  style={{ color: themes.Primary.colorTextWhite,
                    fontFamily:themes.FontFamily.Hanuman,
                    fontSize: 14 }}
                >
                  {`${I18n.t('confirm')}`}
                </Text>
              </TouchableOpacity>
            </View>
          </ModalScroll>
        </View>
      </View>
    </Modal>
  );
};
const stylesModule = StyleSheet.create({
  coverCenter: {
    flex: 1,
    backgroundColor: "rgba(157, 166, 170, 0.88)",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  btnOpacityHide: {
    flex: 1,
    width: "100%",
  },
  contentView: {
    width: "100%",
    height:320,
  },
  viewBody: {
    flexDirection: "column",
    alignItems: "center",
  },
  viewCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalScroll: {
    flexDirection: "column",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalScrollLight: {
    backgroundColor: themes.LayoutLight.background,
  },
  modalScrollDark: {
    backgroundColor: themes.LayoutDark.background,
  },
  fontBigLetter: {
    fontSize: 18,
    marginTop: 10,
  },
  smallMessage: {
    fontSize: 18,
    textAlign: "center",
  },
  buttonTryAgain: {
    width: 160,
    alignSelf: "center",
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
  },
  textButton: {
    textAlign: "center",
    fontSize: 14,
  },
});

export default function SideDrawer(props: any) {
  const { userId, userName, userPhone,setUserId }: any = React.useContext(DataContext);
  const routes = useNavigationState((state) => state?.routes);
  const [isLogged, setLogged] = React.useState(Number(userId) > 0);
  const [isLoading, setLoading] = React.useState(false);
  const [isMessageLogout, setMessageLogout] = React.useState(false);
  const [isUserInfo, setUserInfo] = React.useState<{
    name: string;
    phone: string;
    id: number;
  }>({
    name: userName,
    phone: userPhone,
    id: Number(userId),
  });
  const [isUserDevice, setUserDevice] = React.useState<{
    type: string,
    link: string,
    version: number,
    message: string,
    infoLink: string,
    facebookStatus: number,
    deviceStatus: number,
    devStatus: number
  }>({
    type: '',
    link: '',
    version: 0,
    message: '',
    infoLink: '',
    facebookStatus: 0,
    deviceStatus: 0,
    devStatus: 0,
  });

  React.useEffect(() => {
    handleReFetch();
  }, [userId || userName || userPhone]);
  const handleReFetch = async () => {
    const userInfo = await AsyncStorage.getItem(keystores.user);
    const sideInfo = await AsyncStorage.getItem(keystores.sideInfo);
    if (userInfo) {
      const userInfoParsed = await JSON.parse(userInfo);
      if (userInfoParsed?.data && userInfoParsed?.token !== "") {
        setLogged(true);
        setUserInfo({
          name: userInfoParsed?.data?.data?.name,
          id: Number(userInfoParsed?.data?.data?.id),
          phone: userInfoParsed?.data?.data?.phone,
        });
      }
    } else {
      setLogged(false);
      setUserInfo({
        name: "",
        phone: "",
        id: -1,
      });
    }

    if (sideInfo) {
      const sideInfoParsed = await JSON.parse(sideInfo);
      setUserDevice({...sideInfoParsed});
    }else{
      setUserDevice({
        type: '',
        link: '',
        version: 0,
        message: '',
        infoLink: '',
        facebookStatus: 0,
        deviceStatus: 0,
        devStatus: 0,
      })
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: themes.Primary.background }}
    >
      {isLogged ? <LogInReady {...isUserInfo} /> : <NotLogin />}
      <ScrollView style={styles.bodyScroll}>
        <View style={{ paddingLeft: 10 }}>
          <TouchableOpacity
            // disabled={currentRoute === "CARD"}
            onPress={() => NavigationService.navigate(navRoutes.HOME)}
            style={[
              styles.onActionButton,
              // { opacity: currentRoute === "CARD" ? 0.1 : 1 },
            ]}
          >
            <IcHome width={25} height={25} />
            <Text style={styles.titleButton}>{I18n.t("homepage")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => NavigationService.navigate(navRoutes.NOTIFICATION)}
            style={styles.onActionButton}
          >
            <IcMessage width={25} height={25} />
            <Text style={styles.titleButton}>{I18n.t("notification")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => NavigationService.navigate(navRoutes.GUIDE)}
            style={styles.onActionButton}
          >
            <IcGuide width={25} height={25} />
            <Text style={styles.titleButton}>{I18n.t("desc")}</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.viewLine, { marginVertical: 10 }]}></View>
        <View style={{ paddingLeft: 10 }}>
          <TouchableOpacity 
          onPress={()=>NavigationService.navigate(navRoutes.INFO)}
          style={styles.onActionButton}>
            <IcGlobal width={25} height={25} />
            <Text style={styles.titleButton}>{I18n.t("contactToMe")}</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity 
          onPress={()=>NavigationService.navigate(navRoutes.FACEBOOK)}
          style={styles.onActionButton}>
            <IcFacebook width={25} height={25} />
            <Text style={styles.titleButton}>{I18n.t("facebook")}</Text>
          </TouchableOpacity> */}
          <TouchableOpacity 
          onPress={()=>Alert.alert('Coming Soon !!!')}
          style={styles.onActionButton}>
            <IcChat width={25} height={25} />
            <Text style={styles.titleButton}>{I18n.t("comment")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => NavigationService.navigate(navRoutes.TERMOfUSE)}
            style={styles.onActionButton}
          >
            <IcCondition width={25} height={25} />
            <Text style={styles.titleButton}>{I18n.t("termOfUse")}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => NavigationService.navigate(navRoutes.ABOUT)}
          style={styles.onActionButton}>
            <IcInfo width={25} height={25} />
            <Text style={styles.titleButton}>{I18n.t("aboutMe")}</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.viewLine, { marginVertical: 10 }]}></View>
        <Text
          style={{
            textAlign: "center",
            paddingHorizontal: "5%",
            color: themes.Primary.colorTextMain,
            fontFamily: themes.FontFamily.Hanuman,
          }}
        >
          សូមរក្សាគណនីនិងលេខសំងាត់របស់អ្នក ដើម្បីតាមការចុះឈ្មោះ
        </Text>
        <View style={[styles.viewLine, { marginVertical: 10 }]}></View>
        <View style={{ paddingHorizontal: 10 }}>
          {isLogged?<TouchableOpacity
            onPress={() => {
              setMessageLogout(true);
            }}
            style={{
              flexDirection: "row",
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: themes.Primary.colorRed100,
              borderRadius: 8,
            }}
          >
            <IcLogout width={20} height={20} />
            <Text
              style={[
                styles.titleButton,
                { color: themes.Primary.colorTextWhite },
              ]}
            >
              {I18n.t("logout")}
            </Text>
          </TouchableOpacity>:null}
        </View>
      </ScrollView>
      {
        isUserDevice?.version && isUserDevice?.version>0?
        <Text style={styles.txtVersion}>{I18n.t("txtVersion")} {Number(isUserDevice?.version)?.toFixed(1)}</Text>
        :null
      }
      <ModalLogout
        loading={isLoading}
        theme={"light"}
        handleClose={() => setMessageLogout(false)}
        visible={isMessageLogout}
        handleReload={async() => {
         setLoading(true);
         await store.dispatch({type:LOGOUT_REQUEST});
         setTimeout(()=>{
          setMessageLogout(false);
          handleReFetch();  
          setUserId(-1);    
          NavigationService.reset(navRoutes.MAIN); 
          setLoading(false);
         },3000)
        }
         }
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  header: {
    height: 50,
    justifyContent: "center",
  },
  icon: {
    marginRight: 15,
    width: 25,
    height: 25,
  },
  titleButton: {
    textAlign: "center",
    marginLeft: 10,
    fontSize: 16,
    fontFamily: themes.FontFamily.Hanuman,
    color: themes.Primary.colorTextBlack,
  },
  layoutButtonLogout: {
    flexDirection: "row",
    paddingHorizontal: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonLogout: {
    flex: 0.5,
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 5,
    height:40,
    justifyContent:'center'
  },
  uploadPhoto: {
    width: 50,
    height: 50,
    fontSize: 35,
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 60 / 2,
    backgroundColor: themes.Primary.mainColor,
  },
  viewLine: {
    height: 1,
    backgroundColor: themes.Primary.colorGrey100,
    width: "100%",
  },
  bodyScroll: {
    paddingHorizontal: 10,
    backgroundColor: themes.Primary.background,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    paddingVertical: 20,
  },
  txtVersion: {
    fontSize: 10,
    color: themes.Primary.border,
    backgroundColor: themes.Primary.background,
    width: "100%",
    textAlign: "center",
    marginBottom:20
  },
  onActionButton: {
    flexDirection: "row",
    marginTop: 8,
    height:35,
    alignItems:'center',
    textAlign:'center'
  },
  codeExam: {
    backgroundColor: "#cfd8dc",
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    alignSelf: "center",
    borderWidth: 0,
    width: "80%",
    borderRadius: 10,
  },
  txt_examcode: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  txt_examlbl: {
    textAlign: "center",
    fontSize: 14,
  },
  viewHerder: {
    paddingTop: 10,
    flex: 0.1,
    flexDirection: "row",
  },
  user: {
    height: 160,
    width: 160,
    alignSelf: "center",
  },
  txtNoPay: {
    marginTop: 5,
    fontSize: 25,
    color: "red",
    alignSelf: "center",
  },
  txtPay: {
    marginTop: 5,
    fontSize: 25,
    color: "#00c853",
    alignSelf: "center",
  },
  blogTxt: {
    textAlign: "left",
    paddingEnd: "10%",
    paddingStart: "10%",
    marginBottom: 100,
  },
  txt_form: {
    marginTop: 5,
    fontSize: 16,
    textAlign: "center",
  },
});
