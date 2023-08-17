import { View, Text,TouchableOpacity,StyleSheet,Image } from 'react-native'
import React from 'react'
const Videocontrol = (props) => {
    const{playing,onPlay,onPause,skipForwards,skipBackwards}= props;
  return (
    <View style={styles.wrapper}>
        <TouchableOpacity style={styles.touchable} onPress={skipBackwards}>
        <Image style={{ width: 22, height: 23 }} source={require('../google/forward7.png')} />
        </TouchableOpacity>
    <TouchableOpacity style={styles.touchable}
    onPress={playing ? onPause : onPlay}>
        {playing ? ( <Image style={{ width: 30, height: 30 }} source={require('../google/videopause4.png')} />):
        ( <Image style={{ width: 30, height: 30 }} source={require('../google/videoplay5.png')} />)}

    </TouchableOpacity>
    <TouchableOpacity style={styles.touchable} onPress={skipForwards}>
        <Image style={{ width: 30, height: 30 }} source={require('../google/forward4.png')} />
        </TouchableOpacity>
    </View>
  )
}

export default Videocontrol
const styles = StyleSheet.create({
   wrapper:{
    // paddingHorizontal:5,
    flexDirection:"row",
    // alignItems:"center",
    justifyContent:"space-evenly",
    top:0,bottom:0,left:0,right:0
   } ,
   touchable:{ 
    // alignSelf:"center"

   }

});