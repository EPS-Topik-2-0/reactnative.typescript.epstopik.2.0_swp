import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
  RefreshControl,
  Image,
  Alert,
  Linking,
  Dimensions
} from "react-native";
import {
  TextInput,
  PickerSelect,
  CheckBox,
  PickerImage,
  PreviewFormSeasonal,
} from "../components";
import Layout from "../layout";
import {
  ML
} from "../assets";
import I18n from "../i18n";
import { useForm } from "react-hook-form";
import themes from "../themes";
import moment from "moment";
import { Months as ArrayMonths } from "../constants";
import Navigation from "../services/navgationService";
import { navRoutes } from "../navigation/navRoutes";
import NavigationServer from "../services/navgationService";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { keystores } from "../constants";
import LoadingPayment from "../components/LoadingPayment";
import { trimEmptyString } from "../utils";
import {isValidPhoneNumber,sendMessagePushBackError} from "../helper";

const {  height } = Dimensions.get('window');
function NoSchedule() {
  return (
    <View style={{height:height-120,flex:1,width:'100%'}}>
      <View style={{flex:1,flexDirection:"column",alignItems:'center'}}>
      <View style={{flex:.3,marginTop:50}}>
        <Image source={ML} style={styles.imageLogo} />
      </View>
      <View style={{flex:.7,justifyContent:'center',paddingHorizontal:20}}>
        <Text
          style={{
            marginTop:-100,
            textAlign: "center",
            fontSize: 18,
            fontFamily: themes.FontFamily.MuolLight,
            color: themes.Primary.colorRed100,
          }}
        >
          {I18n.t("wordSorrySWP")}
        </Text>
        <Text
          style={{
            width:220,
            fontSize:15,
            fontFamily:themes.FontFamily.Hanuman,
            textAlign: "center",
            color: themes.Primary.colorRed100,
          }}
        >
          {I18n.t("wanningNoSchedule1SWP")}
        </Text>
      </View>
      <View
        style={{
          flex:.1,
          backgroundColor: themes.Primary.colorRed100,
          paddingVertical: 10,
          width:'100%'
        }}
      >
        <Text
          style={{ textAlign: "center", color: themes.Primary.colorTextWhite,fontSize:16 }}
        >
          {I18n.t("wanningNoSchedule2SWP")}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL("http://mtosb.gov.kh/");
            }}
          >
            <Text
              style={{
                color: themes.Primary.wanning,
                textAlign: "center",
                fontSize:16,
                textDecorationLine: "underline",
              }}
            >
              គេហទំព័រ 
            </Text>
          </TouchableOpacity>
          <Text  style={{
                fontSize:16,
                color:themes.Primary.colorTextWhite,
                textAlign: "center",
                marginLeft:5
              }}>
          និង
          </Text>
          <TouchableOpacity
            style={{ marginStart: 5 }}
            onPress={() => {
              Linking.openURL("https://www.facebook.com/mtosbcambodia");
            }}
          >
            <Text
              style={{
                fontSize:16,
                color: themes.Primary.wanning,
                textAlign: "center",
                textDecorationLine: "underline",
              }}
            >
              ទំព័រហ្វ៊េសបុកផ្លូវការ
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
    </View>
  );
}

export default function ScreenSchedule(props: any) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues
  } = useForm();
  const [refreshing, setRefreshing] = React.useState(true);
  const [isPreview, setPreview] = React.useState(false);
  const [isNoSchedule, setNoSchedule] = React.useState(false);
  const [isLoadingPayment, setLoadingPayment] = React.useState(false);
  const [isLoading, setLoading] = React.useState<{
    loading: boolean,
    label: string
    type?: string
  }>({ label: '', loading: false, type: '' });
  const [isLastDayOfMonth, setLastDayOfMonth] = React.useState(31);
  const [isScheduleInfo, setScheduleInfo] = React.useState<{
    dateEnd: string,
    dateStart: string,
    folder: string,
    id: number,
    maxBirthday: string,
    minBirthday: string,
    name: string,
    open: number,
    status: number,
  }>({
    dateEnd: "",
    dateStart: "",
    folder: "",
    id: 0, maxBirthday: "",
    minBirthday: "",
    name: "", open: 0,
     status: 1,
  });
  const schedulesSeasonal = props?.schedulesSeasonal || [];
  const resultProfileSeasonal = props?.resultProfileSeasonal;
  const verifyMemberSeasonal=props?.verifyMemberSeasonal;
  const loadingHome = props?.loadingHome;
  const submitFormSeasonal=props?.submitFormSeasonal;
  const checkLogged = async () => {
    const userInfo = await AsyncStorage.getItem(keystores.user);
    if (userInfo) {
      const userInfoParsed = await JSON.parse(userInfo);
      if (userInfoParsed?.data && userInfoParsed?.token !== "") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  // first start screen
  useEffect(()=>{
    // get schedule first
    if(props?.useSchedulesSeasonal) props?.useSchedulesSeasonal(0);
  },[]);

  // Check User Result Profile
  React.useEffect(() => {
    if(typeof resultProfileSeasonal !=='undefined'){
    if (resultProfileSeasonal && resultProfileSeasonal?.message === 'success') {
      if(isScheduleInfo?.open===1){
        setRefreshing(true);
        Navigation.reset(navRoutes.CARD_SEASONAL);
      }else{
        setTimeout(()=>{
          setRefreshing(false);
          setNoSchedule(true);
        },3000);
      }
    }else{
      if (resultProfileSeasonal && resultProfileSeasonal?.message === 'empty') {
        if(isScheduleInfo?.open===1 && isScheduleInfo?.status===1){
          setTimeout(() => {
            setLoading({ loading: false, label: '' });
            setRefreshing(false);
          }, 3000);
        }
      }
    }
  }
  }, [props.resultProfileSeasonal]);

  // RE-GET SCHEDULE SUCCESS
  React.useEffect(() => {
    if(typeof schedulesSeasonal!=='undefined' && schedulesSeasonal?.message==='success' &&
    Array.isArray(schedulesSeasonal?.data) && schedulesSeasonal?.data?.[0]
    ){
      setScheduleInfo({ ...schedulesSeasonal?.data?.[0] });
        setNoSchedule(false);
        checkLogged().then((status: boolean) => {
          if (status) {
            const scheduleSeasonal=schedulesSeasonal?.data?.[0];
            AsyncStorage.setItem(keystores.scheduleSeasonalInfo,JSON.stringify(scheduleSeasonal))
            if (props?.useResultProfileSeasonal) props?.useResultProfileSeasonal({ schedule: scheduleSeasonal?.id })
            setTimeout(()=>setRefreshing(false),3000);
          }else{
            setLoading({label:"",loading:true})
            setTimeout(async()=>{
              await Alert.alert(
                `${I18n.t('titlePleaseRequiredLogin')}`,
                `${I18n.t('messagePleaseRequiredLoginSWP')}`,
                [
                  {
                    text: `${I18n.t('login')}`,
                    onPress: () => NavigationServer.reset(navRoutes.LOGIN_SWP),
                  },
                ],
                { cancelable: false }
              )
            },2000)
          }
        });
    }else{
      if(schedulesSeasonal?.message==='empty'){
        setRefreshing(false);
        setNoSchedule(true);
      }
    }
  }, [props?.schedulesSeasonal]);

    // Response Verify success
  React.useEffect(() => {
      if (isLoading.loading && verifyMemberSeasonal?.message === "success") {
        const {
          schedule,
          fullName,
          birthday,
          passport,
          gender,
          phone, device, image, imagePass,
          fmlbook,
          place
        } = getValues();
        const input = {
          schedule,
          name: trimEmptyString(fullName),
          birthday: moment(birthday).format('yyyy-MM-DD'),
          passport:trimEmptyString(passport),
          phone:trimEmptyString(phone),fmlbook
          , device, image, imagePass,
          gender,
          place
        }
        if (props?.useSubmitFormSeasonal) props?.useSubmitFormSeasonal({ ...input });
        setLoading({ label: I18n.t('messageRequiringSubmitForm'), loading: true, type: 'submitForm' });
      }else{
        if (verifyMemberSeasonal && isLoading.loading) {
          // RE-SET Loading to false when has error response
          setTimeout(() => setLoading({ label: '', loading: false }), 2000);
          if (verifyMemberSeasonal.message === "exist-member-in-schedule") {
            showMessage({
              message: `${I18n.t('sorryForMember')} ${getValues('fullName')} ${I18n.t('cannotBuyDuplicateFormOfOneSchedule')}`,
              type: "danger",
              backgroundColor: themes.Primary.colorRed100,
              color: "white",
              icon: "warning",
              duration: 7000,
            });
          } else if (verifyMemberSeasonal.message === "not-exist-member-in-special-schedule") {
            showMessage({
              message: `${I18n.t('sorryForMember')} ${getValues('fullName')} ${I18n.t('cannotBuySpecialForm')}`,
              type: "danger",
              backgroundColor: themes.Primary.colorRed100,
              color: "white",
              icon: "warning",
              duration: 7000,
            });
          } else if (verifyMemberSeasonal.message === "not-exist-schedule") {
            showMessage({
              message: `${I18n.t('cannotSubmitForm')}`,
              type: "danger",
              backgroundColor: themes.Primary.colorRed100,
              color: "white",
              icon: "warning",
              duration: 7000,
            });
          } else if (verifyMemberSeasonal.message === "member-is-blocked") {
            showMessage({
              message: `${I18n.t('cannotSubmitFormBecauseBlocked')}`,
              type: "danger",
              backgroundColor: themes.Primary.colorRed100,
              color: "white",
              icon: "warning",
              duration: 7000,
            });
          }else if (verifyMemberSeasonal.message === "member-is-underage") {
            const momentMinDate = moment(isScheduleInfo.minBirthday);
            const momentMaxDate = moment(isScheduleInfo.maxBirthday);
            showMessage({
              message: `សូមអភ័យទោស​! បេក្ខជនត្រូវមានអាយុចន្លោះពី ${momentMinDate.format("DD-MM-YYYY")} រហូតដល់ ${momentMaxDate.format("DD-MM-YYYY")}`,
              type: "danger",
              backgroundColor: "red",
              color: "white",
              icon: "warning",
              duration: 10000,
            });
          }
          else {
            showMessage({
              message: verifyMemberSeasonal?.errorCode,
              type: "danger",
              backgroundColor: themes.Primary.colorRed100,
              color: "white",
              icon: "warning",
              duration: 7000,
            });
          }
        }
      }
    }, [props?.verifyMemberSeasonal]);
  
    React.useEffect(() => {
      // when back-screen props not reset to false; so i will popup alert again.
      // solution check with state loading if require worked loading will true and props will response
      if(typeof props?.submitFormSeasonal!=='undefined' && props?.submitFormSeasonal && isLoading.loading){
        if (Object(submitFormSeasonal)?.message === 'success') {
          NavigationServer.reset(navRoutes.CARD_SEASONAL);
        }else{
          if(Object(submitFormSeasonal)?.message!==''){
            // if error duplicate member not send message to telegram bot
            if(Object(submitFormSeasonal)?.message===('data-duplicate')){
              showMessage({
                message: `${I18n.t('sorryForMember')} ${getValues('fullName')} ${I18n.t('cannotBuyDuplicateFormOfOneSchedule')}`,
                type: "danger",
                backgroundColor: themes.Primary.colorRed100,
                color: "white",
                icon: "warning",
                duration: 7000,
              });
              setLoading({ label: '', loading: false });
            }else{
              sendMessagePushBackError("Submit-form-member-seasonal" + `${JSON.stringify(submitFormSeasonal)} ]`);
              setTimeout(() => {
                showMessage({
                  message: `${I18n.t('cannotSubmitFormError')}`,
                  type: "danger",
                  backgroundColor: themes.Primary.colorRed100,
                  color: "white",
                  icon: "warning",
                  duration: 7000,
                });
                setLoading({ label: '', loading: false });
              }, 3000);
            }
          }
        }
      }
    }, [props?.submitFormSeasonal]);

  const Days = () => {
    var rs = [];
    for (var i = 1; i <= isLastDayOfMonth; i++) {
      if (i <= 9) {
        rs.push({ label: `0` + i.toString(), value: `${i}` });
      } else {
        rs.push({ label: i.toString(), value: `${i}` });
      }
    }
    return rs;
  };
  const Months = () => {
    return ArrayMonths.map((month: string, i: number) => ({
      value: `${i + 1}`,
      label: `${month}`,
    }));
  };
  const Years = () => {
    const YDateStart = moment(isScheduleInfo.minBirthday).format('YYYY');
    const YDateEnd = moment(isScheduleInfo.maxBirthday).format('YYYY');
    let years = []
    if (YDateStart <= YDateEnd) {
      for (let i = Number(YDateStart); i <= Number(YDateEnd); i++) {
        years.push(
          {
            value: `${i}`,
            label: `${Number(i)}`,
          })
      }
    }
    return years;
  }
  const handleRequest = async () => {
    if (props?.useSchedulesSeasonal) await props?.useSchedulesSeasonal(isScheduleInfo.id);
  };
  const onRefresh = () => {
    setRefreshing(true);
    handleRequest();
  };
  const onSubmit = (data: any) => {
    var birthday = data?.day + "-" + data?.month + "-" + data?.year;
    const formatted = moment(birthday, "DD-MM-YYYY");
    const momentMinDate = moment(isScheduleInfo.minBirthday);
    const momentMaxDate = moment(isScheduleInfo.maxBirthday);
    if (formatted.isValid() ) {
      if(isValidPhoneNumber(data?.phone)){
        if (data?.condition1 && data?.condition2 && data?.condition3 && data?.condition4 && data?.fullName !== ''
          && data?.gender !== '' &&
          data?.passport !== '' && data?.phone !== '' && data?.image && data?.imagePass && data?.fmlbook
        ) {
          const isBetween = formatted.isBetween(momentMinDate, momentMaxDate, null, '[]'); // '[]' includes boundaries
            if(isBetween){
              setPreview(true);
              setValue('birthday', formatted);
              setValue('schedule', Number(isScheduleInfo.id));
            }else{
              showMessage({
                message: `សូមអភ័យទោស​! បេក្ខជនត្រូវមានអាយុចន្លោះពី ${momentMinDate.format("DD-MM-YYYY")} រហូតដល់ ${momentMaxDate.format("DD-MM-YYYY")}`,
                type: "danger",
                backgroundColor: "red",
                color: "white",
                icon: "warning",
                duration: 10000,
              });
          }
      }else{
       // has null
        showMessage({
          message: I18n.t("verifyForm"),
          type: "danger",
          backgroundColor: themes.Primary.colorRed100,
          color: "white",
          icon: "warning",
          duration: 7000,
        });
      }
      } else {
         // invalid phone
         showMessage({
          message: I18n.t("messageRequiredPhone"),
          type: "danger",
          backgroundColor: themes.Primary.colorRed100,
          color: "white",
          icon: "warning",
          duration: 7000,
        });
       
      }
    } else {
      showMessage({
        message: I18n.t("verifyBirthday"),
        type: "danger",
        backgroundColor: themes.Primary.colorRed100,
        color: "white",
        icon: "warning",
        duration: 7000,
      });
    }

  };
  const handleAlertEmptyForm = () => {
    if (Object.keys(errors).length > 0) {
      showMessage({
        message: I18n.t("verifyForm"),
        type: "danger",
        backgroundColor: themes.Primary.colorRed100,
        color: "white",
        icon: "warning",
        duration: 7000,
      });
      return;
    }
  }
  const handleVerify = () => {
    const {
      schedule,
      fullName,
      birthday,
      passport
    } = getValues();
    const input = {
      exam: schedule,
      name: trimEmptyString(fullName),
      birthday: moment(birthday).format('yyyy-MM-DD'),
      passport:trimEmptyString(passport)
    }
    setLoading({ label: I18n.t('messageRequiringVerify'), type: "verify", loading: true });
    props?.useVerifyMemberSeasonal({ ...input });
    setTimeout(() => setPreview(false), 1000);
  }
  const supperClearVerify = () => {
    setLoading({'loading':false,label:''});
    setLoadingPayment(false);
  }
  return (
    <React.Fragment>
      <Layout
        loading={loadingHome || refreshing || isLoading.loading}
        typeScreenSchedule
        centerTitle={isScheduleInfo?.name}
        handleLeftBack={() => Navigation.goBack()}
        labelLoading={isLoading.label}
      >
        {
        refreshing || loadingHome || isLoading.loading?null:
        <React.Fragment>
        {isScheduleInfo.open>0 && !isNoSchedule?
          (<ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            style={styles.bodyScroll}>
            <TouchableOpacity
              onPress={() => {
                setValue('fullName', 'BIENSOTHEARITH1');
                setValue('gender', 'Male');
                setValue('day', '30');
                setValue('month', '4');
                setValue('year', '2024');
                setValue('condition1', true);
                setValue('condition2', true);
                setValue('condition3', true);
                setValue('condition4', true);
                setValue('phone', '0705946061');
                setValue('passport', '0705946061');
                setValue('place', 'kompongcham');
              }
              }>
              <Text>AA</Text>
            </TouchableOpacity> 
            <TextInput
              inputStyle={{
                fontSize: 16,
                fontFamily: themes.FontFamily.Hanuman,
                height: 45,
              }}
              englishLetter
              keyboardType="default"
              style={styles.input}
              name="fullName"
              rules={{
                required: true,
              }}
              errors={errors}
              control={control}
              placeholder={I18n.t("fullName")}
            />
            <PickerSelect
              style={{
                marginTop: 10,

              }}
              name="gender"
              control={control}
              errors={errors}
              data={[
                { label: I18n.t("female"), value: "Female" },
                { label: I18n.t("male"), value: "Male" },
              ]}
              rules={{
                required: true,
              }}
              title={I18n.t("gender")}
            />
            <View style={{ flexDirection: "row", flex: 1 }}>
              <PickerSelect
                style={{
                  marginTop: 10,
                  flex: 0.25,
                  marginEnd: 5,
                }}
                name="day"
                control={control}
                errors={errors}
                data={Days()}
                rules={{
                  required: true,
                }}
                title={I18n.t("day")}
              />
              <PickerSelect
                style={{
                  marginTop: 10,
                  flex: 0.35,
                  marginEnd: 5,
                }}
                name="month"
                control={control}
                errors={errors}
                data={Months()}
                rules={{
                  required: true,
                }}
                title={I18n.t("month")}
              />

              <PickerSelect
                style={{
                  marginTop: 10,
                  flex: 0.4,
                }}
                name="year"
                control={control}
                errors={errors}
                data={Years()}
                rules={{
                  required: true,
                }}
                title={I18n.t("year")}
              />
            </View>
            <TextInput
              phoneNumber
              keyboardType="phone-pad"
              name="phone"
              rules={{
                required: true,
              }}
              style={{ marginTop: 10 }}
              errors={errors}
              control={control}
              helperText={Object(errors)?.phone?.message}
              placeholder={I18n.t("phoneForm")}
            />
            <TextInput
              name="passport"
              rules={{
                required: true,
              }}
              style={{ marginTop: 10 }}
              errors={errors}
              control={control}
              helperText={Object(errors)?.passport?.message}
              placeholder={I18n.t("idCardOrPassport")}
            />
             <TextInput
              name="place"
              rules={{
                required: true,
              }}
              style={{ marginTop: 10 }}
              errors={errors}
              control={control}
              helperText={Object(errors)?.place?.message}
              placeholder={I18n.t("address")}
            />
            <CheckBox
              rules={{
                required: true,
              }}
              errors={errors}
              style={{ marginTop: 30 }}
              name="condition1"
              title={I18n.t("conditionForm1SWP")}
              control={control}
            />
            <CheckBox
              style={{ marginTop: 5 }}
              name="condition2"
              title={I18n.t("conditionForm2SWP")}
              control={control}
            />
            <CheckBox
              style={{ marginTop: 5 }}
              name="condition3"
              title={I18n.t("conditionForm3SWP")}
              control={control}
            />
 <CheckBox
              style={{ marginTop: 5 }}
              name="condition4"
              title={I18n.t("conditionForm4SWP")}
              control={control}
            />
            <>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 30,
                }}
              >
                <Text style={{ fontSize: 16, color: themes.Primary.colorRed }}>*</Text>
                <Text style={{ fontSize: 16, color: themes.Primary.colorTextBlack }}>{I18n.t('userPhoto')}</Text>
              </View>
              <PickerImage
                type="photo"
                control={control}
                name="image"
                onChange={(value) => {
                  setValue("image", value);
                }}
              />
            </>
            <>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 30,
                }}
              >
                <Text style={{ fontSize: 16, color: themes.Primary.colorRed }}>*</Text>
                <Text style={{ fontSize: 16, color: themes.Primary.colorTextBlack }}>
                  {I18n.t('userCard')}
                </Text>
              </View>
              <PickerImage
                control={control}
                name="imagePass"
                type="IdCard"
                onChange={(value) => {
                  setValue("imagePass", value);
                }}
              />
            </>
            <>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 30,
                }}
              >
                <Text style={{ fontSize: 16, color: themes.Primary.colorRed }}>*</Text>
                <Text style={{ fontSize: 16, color: themes.Primary.colorTextBlack }}>
                  {I18n.t('bookMark')}
                </Text>
              </View>
              <PickerImage
                control={control}
                name="fmlbook"
                type="IdCard"
                onChange={(value) => {
                  setValue("fmlbook", value);
                }}
              />
            </>
            <View style={{ marginBottom: 50 }}>
              <View>
                
<TouchableOpacity
                      onPressIn={() => {
                        handleAlertEmptyForm();
                        setValue('payment', 'WING');
                      }}
                      onPress={
                        handleSubmit(onSubmit)
                      }
                      style={[styles.payment_btn, { paddingVertical: 5 }]}
                    >
                      <View style={{ marginLeft: 0 }}>
                        <Text style={{
                          fontSize: 18, fontWeight: "bold",
                          color: themes.Primary.colorTextWhite,
                          textAlign:'center'
                        }}>
                         ផ្ទៀងផ្ទាត់ទិន្នន័យ
                        </Text>
                      </View>
                    </TouchableOpacity>
              </View>
            </View>
          </ScrollView>) :
          <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={[styles.bodyScroll,{padding:0, paddingHorizontal:0}]}>
          <NoSchedule />
          </ScrollView>
        }
        </React.Fragment>
        }
        <PreviewFormSeasonal
          data={getValues()}
          visible={isPreview}
          handleClose={() => setPreview(false)}
          handleSave={() =>
            handleVerify()
          }
        />
       
      </Layout>
      {isLoadingPayment?
      <LoadingPayment
      cancelVerifySuper={()=>supperClearVerify()}
        />  :null
      }
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    height,
    marginTop: -180,
    alignContent: "center",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    flex:1,
  },
  bodyScroll: {
    paddingVertical: 30,
    paddingHorizontal: 30,
    backgroundColor: themes.Primary.background,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
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
    flex: 1,
    height: "100%",
    marginEnd: 10,
    marginStart: 10,
    resizeMode: "contain",
  },
  view_lr: {
    flex: 0.3,
    flexDirection: "column",
    justifyContent: "center",
  },
  view_lb: {
    flexDirection: "row",
  },
  text_lb: {
    fontSize: Platform.OS === "ios" ? 16 : 18,
    textAlign: "center",
  },
  butImage46: {
    alignSelf: "center",
    padding: 0,
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  butImage46Text: {
    fontSize: 18,
    textAlign: "center",
  },
  payment_btn: {
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
    shadowColor: themes.Primary.colorGrey,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 2,
    backgroundColor: themes.Primary.mainColor,
    height:50,
    paddingLeft:5
  },
});
