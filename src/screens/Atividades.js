import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

export default class Atividades extends Component {

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.separator}>HOJE</Text>
        <View style={styles.activity}>
          <Image style={styles.foto} source={{uri: 'https://s3.amazonaws.com/caelum-online-public/react-native-parte-2/images/adittional-resources/profile-photo-alberto.jpg'}}  />
          <Text style={styles.title}>alberto</Text>
          <Text>curtiu sua publicação</Text>
        </View>
        <View style={styles.activity}>
          <Image style={styles.foto} source={{uri: 'https://s3.amazonaws.com/caelum-online-public/react-native-parte-2/images/adittional-resources/profile-photo-vitor.jpg'}}  />
          <Text style={styles.title}>vitor</Text>
          <Text>curtiu sua publicação</Text>
        </View>

        <Text style={styles.separator}>ONTEM</Text>
        <View style={styles.activity}>
          <Image style={styles.foto} source={{uri: 'https://s3.amazonaws.com/caelum-online-public/react-native-parte-2/images/adittional-resources/profile-photo-alberto.jpg'}}  />
          <Text style={styles.title}>alberto</Text>
          <Text>comentou na sua foto</Text>
        </View>

        <View style={styles.activity}>
          <Image style={styles.foto} source={{uri: 'https://s3.amazonaws.com/caelum-online-public/react-native-parte-2/images/adittional-resources/profile-photo-alberto.jpg'}}  />
          <Text style={styles.title}>alberto</Text>
          <Text>começou a seguir você</Text>
        </View>

        <View style={styles.activity}>
          <Image style={styles.foto} source={{uri: 'https://s3.amazonaws.com/caelum-online-public/react-native-parte-2/images/adittional-resources/profile-photo-vitor.jpg'}}  />
          <Text style={styles.title}>vitor</Text>
          <Text>começou a seguir você</Text>
        </View>
        {/* seguintes atividades */}
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  activity: {
    flexDirection: 'row',
    height: 60,
    padding: 10,
  },
  foto: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
    borderRadius: 20,
    marginRight: 10,
  },
  title: {
    fontWeight: 'bold',
    marginRight: 3
  },
  separator: {
    marginTop: 10,
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#555',
  },
});