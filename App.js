import React, { Component } from 'react';
import { Button, FlatList, Platform, KeyboardAvoidingView, View, StyleSheet, ScrollView, Text, TextInput } from 'react-native';
import { Constants } from 'expo';
import { CheckBox } from 'react-native-elements'; // 0.16.0
import firebase from 'firebase';

import '@expo/vector-icons'; // 5.2.0

export default class App extends Component {
  constructor(props){
    super(props);
    firebase.initializeApp({
        apiKey: "AIzaSyB45E3KbffIVARyuoxcyySd-e6SM3XjmX4",
        authDomain: "hthh-d3373.firebaseapp.com",
        databaseURL: "https://hthh-d3373.firebaseio.com",
        projectId: "hthh-d3373",
        storageBucket: "hthh-d3373.appspot.com",
        messagingSenderId: "672760761784"
    });
    this.state = {
        items: [],
        inputText: '',
    };
  }
  componentDidMount() {
    this.listenForItems(firebase.database().ref('/tasks'));
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {
        var data = snap.val();
        if (!data){
            return
        }
        var keys = Object.keys(data);
        var newItems = [];
        keys.forEach(key => {
            newItems.push({
                "content": data[key].content,
                "checked": data[key].checked,
                "key": key
            });
        });
        this.setState({"items": newItems});
    });
  }

  clickCheck(key){
      var taskRef = firebase.database().ref('tasks/' + key);
      taskRef.once('value', snap => {
          var data = snap.val();
          data.checked = !data.checked;
          taskRef.update(data);
      })
      // process clicking an item based on it's eventual firebase id.
  }

  addItem(content){
      this.setState({inputText: ''});
      if (content){
          firebase.database().ref('/tasks').push({"content": content, "checked": false});
      }
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Todo List</Text>
        <ScrollView style={styles.scrollView}>
            <FlatList
                data={this.state.items}
                renderItem={({item}) => (
                    <CheckBox
                      title={item.content}
                      checked={item.checked}
                      onPress={() => this.clickCheck(item.key)}
                      style={styles.todoItem}
                    />
                )}
            />
        </ScrollView>
        <KeyboardAvoidingView behavior="padding" style={styles.todoInput}>
            <TextInput
              style={{height: 40}}
              onChangeText={(inputText) => this.setState({inputText})}
              value={this.state.inputText}
            />
            <Button
              onPress={() => {this.addItem(this.state.inputText)}}
              title="Add task"
              color="#841584"
            />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: Constants.statusBarHeight,
    },
    title: {
        fontSize: 50,
        textAlign: 'center',
    },
    todoItem: {
    },
    scrollView: {
    },
    todoInput: {
        padding: 5,
    },
    todoInput: Platform.select({
      ios: {
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
      }
    }),
});
