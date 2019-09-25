import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ScrollView, ActivityIndicator, Image } from 'react-native';

import { Form, Item, Input, Label, Button } from 'native-base';
import { ImagePicker} from "expo";
import { Header } from 'react-navigation';



export default class EditContact extends React.Component{
    static navigationOptions = {
        title: "Add Contact"
    }

    state = {
        fname,
        lname,
        phone,
        email,
        address,
        image,
        imageDownloadUrl,
        isUploading: true,
    };

   

    render(){
        if(this.state.isUploading){
            return (
                <View style={{ flex: 1, alignContent:"center", justifyContent: "center"}}>
                    <ActivityIndicator
                    size = "large"
                    color = "#74B9FF"
                    />
                    <Text style={{textAlign:"center"}}>
                        Contacts uploading please wait ...
                    </Text>

                </View>
            )
        }
        return (
            <View style={styles.container}>
            
            </View>
        );
    }
  }
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      margin: 10
    },
});