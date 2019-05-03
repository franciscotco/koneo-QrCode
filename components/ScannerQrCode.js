import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { BarCodeScanner, Permissions, Haptic, LinearGradient } from 'expo';

// Constant
import { CART } from '../constants';

export default class ScannerQrCode extends React.Component {
  state = {
    scannedProduct: null,
    hasCameraPermission: null,
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  handleBarCodeScanned = ({ type, data }) => {
    const { updateGroceryList, changeScreen, products } = this.props;

    if (!data) return;
    if (Platform.OS === 'ios')
      Haptic.impact();
   // console.log("Data :", JSON.parse(data));
   console.log("DATA : ", data);
    const parsedData = JSON.parse(data);
    console.log("STOP ?")
    const productsObject = {};
    parsedData.forEach(element => {
      const { key } = element;
      if (products[key]) {
        if (productsObject[key])
          productsObject[key].number += 1;
        else {
          productsObject[key] = products[key];
          productsObject[key].number = 1;
        }
      }
    })
    const groceryList = [];
    Object.keys(productsObject).forEach(key => {
      groceryList.push(productsObject[key]);
    })
   console.log("TAB :", groceryList);
    updateGroceryList(groceryList);
    changeScreen(CART);
  }

  renderCodeScanner = () => {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null)
      return <Text>Requesting for camera permission...</Text>;
    else if (hasCameraPermission === false)
      return <Text>No access to camera...</Text>;
    else
      return <BarCodeScanner onBarCodeScanned={this.handleBarCodeScanned} style={{ width: "100%", height: "100%", zIndex: 0 }} />
  }

  render() {
     console.log("QrCode");
    return (
      <View style={styles.scannerView}>
        {this.renderCodeScanner()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scannerView: { width: "100%", height: "100%", zIndex: 0, overflow: "hidden"},
  container: {
    flex: 1,
    backgroundColor: '#2F2F2F',
  },
  productInfo: {
    color: "white",
    fontSize: 15,
  },
});
