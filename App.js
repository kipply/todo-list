import React, { Component } from 'react';
import { FlatList, Platform, KeyboardAvoidingView, View, StyleSheet, ScrollView, Text, TextInput } from 'react-native';
import { Constants } from 'expo';
import { CheckBox } from 'react-native-elements'; // 0.16.0

import '@expo/vector-icons'; // 5.2.0

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        items: [
            {"content": "first item", "checked": true, "key": 'smth'},
            {"content": "second item", "checked": false, "key": 'smthelse'},
        ]
    };
  }

  clickCheck(id){
      // process clicking an item based on it's eventual firebase id.
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
                      onPress={this.clickCheck(item.content)}
                      style={styles.todoItem}
                    />
                )}
            />
        </ScrollView>
        <KeyboardAvoidingView behavior="padding" style={styles.todoInput}>
            <TextInput
              style={{height: 40}}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
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
