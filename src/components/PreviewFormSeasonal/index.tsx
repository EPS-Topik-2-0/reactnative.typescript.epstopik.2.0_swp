import React from "react";
import {
  StyleSheet,
  Text,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  Modal,
  SafeAreaView,
} from "react-native";
import moment from "moment";
import I18n from "../../i18n";
import themes from "../../themes";

export default function PreviewForm(props: any) {
  const { visible, handleClose, handleSave, data } = props;
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}
    >
      <SafeAreaView
        style={{ flex: 1, flexDirection: "column", backgroundColor: "white" }}
      >
        <View style={styles.headerPreview}>
          <Text style={styles.textPreview} numberOfLines={2}>
            សូមធ្វើការផ្ទៀងផ្ទាត់ព័ត៌មានរបស់អ្នក
          </Text>
        </View>
        <ScrollView>
          <View style={[styles.viewImageProfile, { marginTop: 50 }]}>
            {Platform.OS === "ios" ? (
              <Image
                source={{ uri: data?.image?.["path"] }}
                style={{
                  width: 160,
                  height: 240,
                  borderColor: "black",
                }}
              />
            ) : (
              <Image
                source={{
                  uri: `data:image/png;base64,${data?.image?.["data"]}`,
                }}
                style={{
                  width: 160,
                  height: 240,
                  borderColor: "black",
                }}
              />
            )}
          </View>
          <View style={{ flexDirection: "column", alignContent: "center" }}>
            <Text style={{ fontSize: 12, alignSelf: "center",color:themes.Primary.colorTextBlack }}>
              នាមត្រកូលនិង នាមខ្លួនជាអក្សរឡាតាំង
            </Text>
            <Text
              style={{ fontSize: 20,marginTop:10, alignSelf: "center", fontWeight: "600",color:themes.Primary.colorTextBlack }}
            >
              {data?.fullName}
            </Text>
          </View>
          <View style={styles.codeExam}>
            <View style={{ flexDirection: "row", marginVertical: 5 }}>
              <View style={{ width: "50%" }}>
                <Text style={{ fontSize: 12,color:themes.Primary.colorTextBlack }}>
                  <Text style={{ fontSize: 10, color: themes.Primary.colorRed }}> * </Text>
                  ភេទ ៖
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    marginLeft: 20,
                    fontFamily: themes.FontFamily.Hanuman,
                    color:themes.Primary.colorTextBlack
                  }}
                >
                  {data?.gender === "Male" || data?.gender === "male"
                    ? I18n.t('male')
                    : I18n.t('female')}
                </Text>
              </View>
              <View style={{ width: "50%" }}>
                <Text style={{ fontSize: 12,color:themes.Primary.colorTextBlack }}>
                  <Text style={{ fontSize: 10, color: "red" }}> * </Text>
                  {I18n.t('birthday')}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    marginTop: 5,
                    marginLeft: 20,
                    color:themes.Primary.colorTextBlack
                  }}
                >
                  {data?.birthday
                    ? moment(data.birthday).format("DD-MM-YYYY")
                    : 'N/A'}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", marginVertical: 5 }}>
              <View style={{ width: "100%" }}>
                <Text style={{ fontSize: 12,color:themes.Primary.colorTextBlack }}>
                  <Text style={{ fontSize: 10, color: "red" }}> * </Text>
                  លេខទូរស័ព្ទ ៖
                </Text>
                <Text
                  style={{ fontSize: 16, marginLeft: 20, fontWeight: "600",color:themes.Primary.colorTextBlack }}
                >
                  {data?.phone}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", marginVertical: 5 }}>
              <View style={{ width: "100%" }}>
                <Text style={{ fontSize: 12,color:themes.Primary.colorTextBlack }}>
                  <Text style={{ fontSize: 10, color: "red" }}> * </Text>
                  លេខអត្តសញ្ញាណប័ណ្ណ / លិខិតឆ្លងដែន ៖
                </Text>
                <Text
                  style={{ fontSize: 16, marginLeft: 20, fontWeight: "600",color:themes.Primary.colorTextBlack }}
                >
                  {data?.passport}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", marginVertical: 5 }}>
              <View style={{ width: "100%" }}>
                <Text style={{ fontSize: 12,color:themes.Primary.colorTextBlack }}>
                  <Text style={{ fontSize: 10, color: "red" }}> * </Text>
                  អាស័យដ្នាន ៖
                </Text>
                <Text
                  style={{ fontSize: 16, marginLeft: 20, fontWeight: "600",color:themes.Primary.colorTextBlack }}
                >
                  {data?.place}
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.codeExam]}>
            <Text style={{ fontSize: 12,color:themes.Primary.colorTextBlack }}>
              <Text style={{ fontSize: 10, color: "red" }}> * </Text>
              រូបថតអត្តសញ្ញាណប័ណ្ណ ឬលិខិតឆ្លងដែន
            </Text>
            {Platform.OS === "ios" ? (
              <Image
                source={{ uri: data?.imagePass?.["sourceURL"] }}
                style={{
                  padding: 0,
                  resizeMode: "contain",
                  alignSelf: "center",
                  height: 220,
                  width: "100%",
                  borderColor: "black",
                }}
              />
            ) : (
              <Image
                source={{
                  uri: `data:image/png;base64,${data?.imagePass?.["data"]}`,
                }}
                style={[
                  {
                    width: "100%",
                    resizeMode: "contain",
                    borderColor: "black",
                  },
                  data?.imagePass && { aspectRatio: 1.5 },
                ]}
              />
            )}
          </View>
          <View style={[styles.codeExam, { marginBottom: 50 }]}>
            <Text style={{ fontSize: 12,color:themes.Primary.colorTextBlack }}>
              <Text style={{ fontSize: 10, color: "red" }}> * </Text>
              {I18n.t('bookMark')}
            </Text>
            {Platform.OS === "ios" ? (
              <Image
                source={{ uri: data?.fmlbook?.["sourceURL"] }}
                style={{
                  padding: 0,
                  resizeMode: "contain",
                  alignSelf: "center",
                  height: 220,
                  width: "100%",
                  borderColor: "black",
                }}
              />
            ) : (
              <Image
                source={{
                  uri: `data:image/png;base64,${data?.fmlbook?.["data"]}`,
                }}
                style={[
                  {
                    width: "100%",
                    resizeMode: "contain",
                    borderColor: "black",
                  },
                  data?.fmlbook && { aspectRatio: 1.5 },
                ]}
              />
            )}
          </View>
        </ScrollView>
        <View style={[styles.headerPreview, { flexDirection: "row" }]}>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              width: "50%",
              paddingHorizontal: 5,
              paddingVertical: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => handleClose()}
              style={{
                height: "100%",
                width: "100%",
                borderRadius: 6,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FFF",
              }}
            >
              <Text style={{ color: "#e91e63" }}>កែប្រែ</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              width: "50%",
              paddingHorizontal: 5,
              paddingVertical: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => handleSave()}
              style={{
                height: "100%",
                width: "100%",
                borderRadius: 6,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: themes.Primary.mainColor,
              }}
            >
              <Text style={{ color: "#FFF" }}>បន្តស្នើសុំ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  headerPreview: {
    height: 60,
    backgroundColor: themes.Primary.mainColor,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  textPreview: {
    fontFamily: "KhmerOSMuolLight",
    fontSize: 16,
    color:themes.Primary.colorTextWhite
  },
  viewImageProfile: {
    flexDirection: "row",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
    opacity: 0.97,
  },
  codeExam: {
    backgroundColor: "#e0e0e0",
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    alignSelf: "center",
    borderWidth: 0,
    width: "95%",
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  imageCheck: {
    marginTop: Platform.OS === "ios" ? 0 : 0,
    width: 15,
    resizeMode: "contain",
  },
});
