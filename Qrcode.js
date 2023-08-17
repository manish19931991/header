import {useState} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import QRCode from 'react-native-qrcode-svg';

const Qrcode = (props) => {
    const [inputText, setInputText] = useState('');
    const [qrvalue, setQrvalue] = useState('');
  
      return (
        <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.titleStyle}>
           QR Code 
          </Text>
          <QRCode
        
            value={qrvalue ? qrvalue : 'NA'}
           
            size={250}
            
            color="black"
          
            backgroundColor="white"
           
            logo={{
              url:
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/logosmalltransparen.png',
            }}
           
            logoSize={30}
            logoMargin={2}
            
            logoBorderRadius={15}
    
            logoBackgroundColor="yellow"
          />
          <Text style={styles.textStyle}>
            Please insert value 
          </Text>
          <View style={{   marginHorizontal: 10, flexDirection: "row",
            backgroundColor: "#2D2D2D69",
            borderRadius: 15, marginTop: 20, height: 82}}>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={
              (inputText) => setInputText(inputText)
            }
            placeholder="Enter Any Value"
            placeholderTextColor="blue"
            value={inputText}
          />
          </View>
         
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => setQrvalue(inputText)}>
            <Text style={styles.buttonTextStyle}>
              Generate QR Code
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => props.navigation.navigate("Scrnner")}>
            <Text style={styles.buttonTextStyle}>
              scrnner
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      );
  }
  
  export default Qrcode
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: 10,
    },
    titleStyle: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    textStyle: {
      textAlign: 'center',
      margin: 10,
      color:"red"
    },
    textInputStyle: {
      flexDirection: 'row',
      height: 40,
      marginTop: 20,
      marginLeft: 35,
      marginRight: 35,
      margin: 10,
     marginHorizontal:50
    },
    buttonStyle: {
      backgroundColor: '#51D8C7',
      borderWidth: 0,
      color: '#FFFFFF',
      borderColor: '#51D8C7',
      alignItems: 'center',
      borderRadius: 5,
      marginTop: 30,
      padding: 10,
    },
    buttonTextStyle: {
      color: '#FFFFFF',
      paddingVertical: 10,
      fontSize: 16,
      
    },
  });