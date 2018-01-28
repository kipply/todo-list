import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Constants } from 'expo';
import { CheckBox } from 'react-native-elements'; // 0.16.0

import '@expo/vector-icons'; // 5.2.0

export default class App extends Component {
  state = {
    checked: false,
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
            <CheckBox
              title="Press me"
              checked={this.state.checked}
              onPress={() => this.setState({ checked: !this.state.checked })}
              style={styles.todoItem}
            />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
    },
    todoItem: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    }
});
