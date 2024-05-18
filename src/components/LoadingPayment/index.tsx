import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  Dimensions,
  Text,
  TouchableOpacity
} from 'react-native';
import themes from '../../themes';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
 const LoadingPayment = (props:any)=> {
   const { cancelVerifySuper } = props;
   return(
      <View style={{ position: 'absolute', width: windowWidth, height: windowHeight, zIndex: 99999999999999, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
        <TouchableOpacity
          style={{position:'absolute',top:40,right:20,flexDirection:'row',zIndex:999999999999991,}}
           onPress={()=>cancelVerifySuper()}>
            <Text style={{color:themes.Primary.colorTextWhite,fontSize:40,textAlign:'center'}}>
              X
            </Text>
        </TouchableOpacity>
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="white" style={{ justifyContent: "center" }} />
          <Text style={{ color: "white", textAlign: 'center', fontSize: 16 }}>ផ្ទៀងផ្ទាត់លើការបង់ប្រាក់</Text>
        </View>
      </View>
   )
}
export default LoadingPayment;
