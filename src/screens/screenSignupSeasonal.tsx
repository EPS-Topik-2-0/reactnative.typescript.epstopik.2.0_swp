import React from "react";
import {
  StyleSheet,
  Text,
  Keyboard,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { TextInput, ButtonTheme, RadioButton } from "../components";
import Layout from "../layout";
import {
  IcPasswordCheck,
  ML,
  IcCall,
  IcEyeSlash,
  IcText,
} from "../assets";
import I18n from "../i18n";
import { useForm } from "react-hook-form";
import themes from "../themes";
import NavigationService from "../services/navgationService";
import { navRoutes } from "../navigation/navRoutes";
import { trimEmptyString } from "../utils";
import { showMessage } from "react-native-flash-message";
import { isValidPhoneNumber } from "../helper";
import DataContext from "../navigation/dataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { keystores } from "../constants";

export default function ScreenSignUp(props: any) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isPassword, setPassword] = React.useState(true);
  const [isLoading, setLoading] = React.useState(false);
  const { setUserId, setUserName, setUserPhone }: any =
  React.useContext(DataContext);
  const loadingUser = props?.loadingUser;
  const signUp = props?.signUp;
  const errorSignUp = props?.errorSignUp;
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
  // ERROR
  React.useEffect(() => {
    setLoading(false);
    if (errorSignUp) {
      if (errorSignUp?.message === "data-duplicate") {
        showMessage({
          message: I18n.t("messageDuplicatePhoneNumber"),
          type: "danger",
          backgroundColor: themes.Primary.colorRed100,
          color: "white",
          icon: "warning",
          duration: 7000,
        });
      } else {
        showMessage({
          message: errorSignUp?.errorCode,
          type: "danger",
          backgroundColor: themes.Primary.colorRed100,
          color: "white",
          icon: "warning",
          duration: 7000,
        });
      }
    }
  }, [errorSignUp]);

  // LOGIN SUCCESS
  React.useEffect(() => {
    if (signUp && signUp?.message === "success" && isLoading===true) {
      showMessage({
        message: I18n.t("messageRegisterSuccess"),
        type: "success",
        backgroundColor: themes.Primary.success,
        color: "white",
        icon: "success",
        duration: 7000,
      });
      setTimeout(async () => {
        if (setUserId) setUserId(signUp?.data?.id);
        if (setUserName) setUserName(signUp?.data?.name);
        if (setUserPhone) setUserPhone(signUp?.data?.phone);
        setLoading(false);
        await NavigationService.reset(navRoutes.MAIN);
      }, 5000);
    }
  }, [signUp]);

  React.useEffect(()=>{
    handleReFetch();
  },[])
  const handleReFetch = async () => {
    const sideInfo = await AsyncStorage.getItem(keystores.sideInfo);
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
  const onSubmit =async (data: any) => {
    const name = trimEmptyString(data?.name);
    const phone = trimEmptyString(data?.phone);
    const pass = trimEmptyString(data?.password);
    const confPass = trimEmptyString(data?.confirmPassword);
    if (isValidPhoneNumber(phone) && pass.length > 0) {
      if(data?.condition){
        if(pass.length>=6){
          if(pass===confPass){
            setLoading(true);
            await props?.useSignUp({
              phone:phone,
              pass: pass,
              type: "phone",
              name:name,
              device:Platform.OS==='ios'?1:2
            });
          }else{
            showMessage({
              message: I18n.t("messageRequiredPasswordAsAndAs"),
              type: "danger",
              backgroundColor: themes.Primary.colorRed100,
              color: "white",
              icon: "warning",
              duration: 7000,
            });
          }
        }else{
          showMessage({
            message: I18n.t("messageRequiredPasswordBigLenght6digit"),
            type: "danger",
            backgroundColor: themes.Primary.colorRed100,
            color: "white",
            icon: "warning",
            duration: 7000,
          });
        }
      }else{
        showMessage({
          message: I18n.t("messageRequireAcceptCondition"),
          type: "danger",
          backgroundColor: themes.Primary.colorRed100,
          color: "white",
          icon: "warning",
          duration: 7000,
        });
      }
    } else {
      showMessage({
        message: I18n.t("messageRequiredPhone"),
        type: "danger",
        backgroundColor: themes.Primary.colorRed100,
        color: "white",
        icon: "warning",
        duration: 7000,
      });
    }
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.screen}
          keyboardVerticalOffset={Platform.OS === 'android' ? -300 : 0}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Layout
            backgroundMainColor
            loading={loadingUser || isLoading}
            handleLeftBack={() => NavigationService.goBack()}
            handleLeftBackLabel={I18n.t("homepage")}
            handleRightRegister={() =>
              NavigationService.navigate(navRoutes.LOGIN_SWP)
            }
            handleRightRegisterLabel={I18n.t("login")}
          >
            <View style={styles.container}>
              <Image source={ML} style={styles.imageLogo} />
            </View>
            <ScrollView style={styles.bodyScroll}>
              <View style={styles.labelLogin}>
                {/* <Text style={styles.txtLogin}>{I18n.t("register")}</Text> */}
              </View>
              <TextInput
                englishLetter
                keyboardType="default"
                contextMenuHidden={true}
                startAdornment={<IcText width={20} height={17} />}
                name="name"
                rules={{
                  required: true,
                }}
                errors={errors}
                control={control}
                placeholder={I18n.t("nameLatten")}
              />
              <TextInput
                phoneNumber
                keyboardType="phone-pad"
                contextMenuHidden={true}
                style={styles.input}
                startAdornment={<IcCall width={20} height={20} />}
                name="phone"
                rules={{
                  required: true,
                }}
                errors={errors}
                control={control}
                helperText={Object(errors)?.phone?.message}
                placeholder={I18n.t("numberPhone")}
              />
              <TextInput
                contextMenuHidden={true}
                style={styles.input}
                startAdornment={<IcPasswordCheck width={20} height={20} />}
                endAdornment={
                  <TouchableOpacity
                    onPress={() => {
                      setPassword(!isPassword);
                    }}
                  >
                    <IcEyeSlash width={25} height={25} />
                  </TouchableOpacity>
                }
                secureTextEntry={isPassword}
                name="password"
                rules={{
                  required: true,
                }}
                errors={errors}
                control={control}
                placeholder={I18n.t("password")}
              />
              <TextInput
                contextMenuHidden={true}
                style={styles.input}
                startAdornment={<IcPasswordCheck width={20} height={20} />}
                endAdornment={
                  <TouchableOpacity
                    onPress={() => {
                      setPassword(!isPassword);
                    }}
                  >
                    <IcEyeSlash width={25} height={25} />
                  </TouchableOpacity>
                }
                secureTextEntry={isPassword}
                name="confirmPassword"
                rules={{
                  required: true,
                }}
                errors={errors}
                control={control}
                placeholder={I18n.t("confirmPassword")}
              />
              <View style={styles.viewBottomInput}>
                <RadioButton
                  style={{ marginTop: 7 }}
                  name="condition"
                  title={I18n.t("wanningConditionCheck")}
                  control={control}
                />
                <TouchableOpacity
                  onPress={()=>NavigationService.navigate(navRoutes.TERMOfUSE)}
                >
                  <Text style={styles.touchCondition}>
                    {I18n.t("condition")}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.txtThereAre}>{I18n.t("thereAre")}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <ButtonTheme
                  style={styles.buttonLogin}
                  onPress={handleSubmit(onSubmit)}
                >
                  <Text style={styles.txtBtnLogin}>{I18n.t("register")}</Text>
                </ButtonTheme>
              </View>
              <View
                style={{
                  marginTop: 10,
                }}
              >
                <Text style={styles.txtLabel}>{I18n.t("labelInfo1")}</Text>
                <Text style={styles.txtLabel}>{I18n.t("labelInfo2")}</Text>
              </View>
              <View style={styles.vBottom}>
                <TouchableOpacity onPress={()=>NavigationService.navigate(navRoutes.GUIDE)}>
                  <Text style={styles.txtDesc}>{I18n.t("desc")}</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Layout>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      {
        isUserDevice?.version && isUserDevice?.version>0?
        <Text style={styles.txtVersion}>{I18n.t("txtVersion")} {Number(isUserDevice?.version)?.toFixed(1)}</Text>
        :null
      }
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flexDirection: "row",
    flex: Platform.OS === "ios" ? 0.45 : 0.35,
    justifyContent: "center",
    alignContent: "flex-end",
    marginBottom: -10,
  },
  bodyScroll: {
    flex: 0.45,
    paddingHorizontal: 30,
    backgroundColor: themes.Primary.background,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },

  labelLogin: {
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 2,
    height:25
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
    textAlign: "center",
    width: "100%",
    backgroundColor: themes.Primary.background,
    paddingBottom:10,
  },
  imageLogo: {
    flex: 0.8,
    height: "100%",
    marginEnd: 10,
    marginStart: 10,
    resizeMode: "contain",
  },
});
