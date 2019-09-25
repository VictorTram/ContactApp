import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Linking, Alert, Platform, ActivityIndicator, Image, Dimensions } from 'react-native';

import { Card, CardItem} from 'native-base';
import { Entypo } from '@expo/vector-icons';

import * as firebase from 'firebase';



export default class ViewContact extends React.Component{
    static navigationOptions = {
        title: "View Contact"
    }

    state = {
        fname: null,
        lname: null,
        phone: null,
        email: null,
        address: null,
        image: null,
        key: null,
        isLoading: true,
    };

    componentDidMount(){
        let key = this.props.navigation.getParam("key","");
        this.getContact(key);
    };

    getContact = async(key) => {
        let self = this;
        let contactRef = firebase.database().ref().child(key);

        await contactRef.on("value", (dataSnapshot) =>{
            if(dataSnapshot.val()){
                contactValue = dataSnapshot.val();
                self.setState({
                    fname: contactValue.fname,
                    lanem: contactValue.lname,
                    phone: contactValue.phone,
                    email: contactValue.email,
                    address: contactValue.address,
                    image: contactValue.image,
                    key: key,
                    isLoading: false


                })
            }
        })
    };

    callAction = (phone) => {
        let phoneNumber = phone;
        if (Platform.OS !== "android"){
            phoneNumber = `telpromt:${phone}`
        } else{
            phoneNumber = `tel:${phone}`
        }
        Linking.canOpenURL(phoneNumber)
        .then( (supported) => {
            if(!supported) {
                Alert.alert("Phone number is not available")
            } else{
                return Linking.openURL(phoneNumber)
            }
        })
        .catch( (error) => {
            console.log(error);
        })
    };

    smsAction = (phone) => {
        let phoneNumber = phone;
        phoneNumber = `sms:${phone}`
        Linking.canOpenURL(phoneNumber)
        .then( (supported) => {
            if(!supported) {
                Alert.alert("Phone number is not available")
            } else{
                return Linking.openURL(phoneNumber)
            }
        })
        .catch( (error) => {
            console.log(error);
        })
    }
    
    deleteContact = (key) => {
        Alert.alert(
            "Delete Contact",
            `${this.state.fname} ${this.state.lname}`,
            [
                {
                    text: "Cancel" , 
                    onPress: () => console.log("Cancelled Press")
                },
                {
                    text: "OK" , 
                    onPress: async() => {
                        let contactRef = firebase.database().ref().child(key);
                        await contactRef.remove( (error) => {
                            if(!error){
                                this.props.navigation.goBack();
                            } else{
                                console.log(error);
                            }
                        })
                }}
            ],
            {cancelable: false}
        )
    };

    editContact = (key) => {
        this.props.navigation.navigate("Edit", {
            key: key,
        });
    };

    render(){
        if(this.state.isLoading){
            return (
                <View style={{ flex: 1, alignContent:"center", justifyContent: "center"}}>
                    <ActivityIndicator
                    size = "large"
                    color = "#74B9FF"
                    />
                    <Text style={{textAlign:"center"}}>
                        Contacts loading please wait ...
                    </Text>
                </View>
            );
        } 
        return (
            <ScrollView style={styles.container}>
                <View style={styles.contactIconContainer}>
                    <Image
                    style={styles.contactIcon}
                    source={ 
                        this.state.image === "empty" 
                        ? require("../assets/person.png")
                        : {uri: this.state.image}}
                    />
                    <View style={styles.nameContainer}>
                        <Text style={styles.name}>
                            {this.state.fname} {this.state.lname}
                        </Text>
                    </View>
                </View>
                <View style={styles.infoContainer}>
                        <Card>
                            <CardItem bordered>
                                <Text style={styles.infoText}>Phone</Text>
                            </CardItem>
                            <CardItem bordered>
                                <Text style={styles.infoText}>{this.state.phone}</Text>
                            </CardItem>
                        </Card>
                        <Card>
                            <CardItem bordered>
                                <Text style={styles.infoText}>Email</Text>
                            </CardItem>
                            <CardItem bordered>
                                <Text style={styles.infoText}>{this.state.email}</Text>
                            </CardItem>
                        </Card>
                        <Card>
                            <CardItem bordered>
                                <Text style={styles.infoText}>Address</Text>
                            </CardItem>
                            <CardItem bordered>
                                <Text style={styles.infoText}>{this.state.address}</Text>
                            </CardItem>
                        </Card>
                        <Card style={styles.actionContainer}>
                            <CardItem style={styles.actionButton} bordered>
                                <TouchableOpacity
                                onPress={()=>{
                                    this.smsAction(this.state.phone);
                                }}
                                >
                                    <Entypo name="message" size={50} color="#74B9FF"/>
                                </TouchableOpacity>
                            </CardItem>
                        
                            <CardItem style={styles.actionButton} bordered>
                                <TouchableOpacity
                                onPress={()=>{
                                    this.callAction(this.state.phone);
                                }}
                                >
                                    <Entypo name="phone" size={50} color="#74B9FF"/>
                                </TouchableOpacity>
                            </CardItem>
                        </Card>
                        <Card style={styles.actionContainer}>
                            <CardItem style={styles.actionButton} bordered>
                                <TouchableOpacity
                                onPress={()=>{
                                    this.editContact(this.state.key);
                                }}
                                >
                                    <Entypo name="edit" size={50} color="#74B9FF"/>
                                    <Text style={styles.actionText}Edit></Text>
                                </TouchableOpacity>
                            </CardItem>
                        
                            <CardItem style={styles.actionButton} bordered>
                                <TouchableOpacity
                                onPress={()=>{
                                    this.deleteContact(this.state.key);
                                }}
                                >
                                    <Entypo name="trash" size={50} color="#74B9FF"/>
                                </TouchableOpacity>
                            </CardItem>
                        </Card>
                </View>
            </ScrollView>
        );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff"
    },
    contactIconContainer: {
      alignItems: "center",
      justifyContent: "center"
    },
    contactIcon: {
      // to create a square box both height and width should be same
      height: Dimensions.get("window").width,
      width: Dimensions.get("window").width
    },
    nameContainer: {
      width: "100%",
      height: 70,
      padding: 10,
      backgroundColor: "rgba(255,255,255,0.5)",
      justifyContent: "center",
      position: "absolute",
      bottom: 0
    },
    name: {
      fontSize: 24,
      color: "#000",
      fontWeight: "900"
    },
    infoText: {
      fontSize: 18,
      fontWeight: "300"
    },
    actionContainer: {
      flexDirection: "row"
    },
    actionButton: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    actionText: {
      color: "#B83227",
      fontWeight: "900"
    }
  });