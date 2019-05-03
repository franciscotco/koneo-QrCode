import React from 'react';
import { Icon } from 'expo';
import { Platform, View, Text, StyleSheet, Image } from 'react-native';

export default class StarIcon extends React.Component {
  render() {
    return (
        <View style={styles.koneoLabel}>
          <Image
            style={styles.koneoImage}
            source={require('../assets/images/koneo.png')}
          />
          <Text style={{fontSize: 20, fontWeight: "900", color: "white"}}>K</Text>
          <Text style={{fontSize: 20, fontWeight: "700", color: "white"}}>O</Text>
          <Text style={{fontSize: 20, fontWeight: "500", color: "white"}}>N</Text>
          <Text style={{fontSize: 20, fontWeight: "300", color: "white"}}>E</Text>
          <Text style={{fontSize: 20, fontWeight: "100", color: "white"}}>O</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  koneoLabel: {
    zIndex: 1,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
  },
  koneoImage: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
})