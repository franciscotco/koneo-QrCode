import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
  Image
} from 'react-native';
import { BarCodeScanner, Permissions, Haptic, LinearGradient, Icon } from 'expo';

// Component
import HomeButton from './HomeButton';
import Koneo from './Koneo';

// Constant
import { SCANNER, HOME, CART } from '../constants';

export default class ScannerScreen extends React.Component {
  static navigationOptions = {
    title: 'Scan a product',
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: '#2F2F2F',
    },
  };

  state = {
    scannedProductId: null,
    hasCameraPermission: null,
    addedToCart: "",
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  handleBarCodeScanned = ({ type, data }) => {
    const { scannedProductId } = this.state;
    if (Platform.OS === 'ios')
      Haptic.impact();
    if (data.toString() !== scannedProductId)
      this.setState({addedToCart: ""});
    this.setState({ scannedProductId: data.toString() });
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  }

  handleAddProduct = () => {
    const { changeScreen, addToCart, products } = this.props;
    const { scannedProductId } = this.state;

    if (addToCart({ key: scannedProductId }) === true)
      this.setState({addedToCart: `${products[scannedProductId].name} added to the cart`});
    else
      this.setState({addedToCart: "Your cart is full"})
      changeScreen(CART)
    }

  addMail = () => {
    const { addToMail } = this.props;
    const { scannedProductId } = this.state;

    addToMail(scannedProductId);
    this.setState({addedToCart: `Mail add : ${scannedProductId}`});
  }

  renderNoProductInfo = () => {
    const { scannedProductId, addedToCart } = this.state;

    return (
      <>
        <View style={styles.productInfoAddContainer}>
          <Text style={styles.productInfoAddText}>
            {addedToCart}
          </Text>
        </View>
        <Text style={styles.productInfo}>
          id : {scannedProductId} not in database
        </Text>
        <Button onPress={this.addMail} title="ADD MAIL"/>
      </>
    )
  }

  renderProductInfo() {
    const { products } = this.props;
    const { scannedProductId, addedToCart } = this.state;
    console.log("SCAN >", scannedProductId);
    if (!scannedProductId) {
      return (
        <Text style={styles.noProductScan}>Scan a product</Text>
      )
    }
    const product = products[scannedProductId];
    // console.log("SCANNED PRODUCT", product)
    if (!product || product === undefined)
      return this.renderNoProductInfo();
    
    return (
      <>
      <View style={styles.productInfoContainer}>
        <View>
          <Text style={styles.productInfo}>{product.name}</Text>
          <Text style={styles.productInfoDescription}>quantity : {product.quantity}</Text>
          <Text style={styles.productInfoPrice}>{product.price}</Text>
        </View>
        <TouchableHighlight onPress={this.handleAddProduct} >
          <View style={styles.productInfoButton}>
            <Image 
              source={require('../assets/images/shopping.png')}
              style={styles.shoppingImage}
            />
            <Text style={styles.productInfo}>ADD TO CART</Text>
          </View>          
        </TouchableHighlight>
      </View>
      <View style={styles.productInfoAddContainer}>
        <Text style={styles.productInfoAddText}>
          {addedToCart}
        </Text>
      </View>
      </>
    )

  }

  renderNavButton = () => {
    const { changeScreen, groceryList } = this.props;

    return (
      <View style={styles.navButtonContainer}>
       <TouchableHighlight onPress={() => changeScreen(CART)}>
          <View style={{backgroundColor: "#313131", width: "100%", width: 320, height: 50, borderRadius: 20, display: "flex", justifyContent: "center", marginBottom: 20}}>
             <Text style={{textAlign: "center", color: "white", fontSize: 15}}>
                Shopping Cart {groceryList.length}/10
             </Text>
          </View>
       </TouchableHighlight>
       </View>
    );
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
    return (
      <View style={{ backgroundColor: "#2F2F2F" }}>
        <View style={{ width: "100%", height: "75%", zIndex: 0, overflow: "hidden"}}>
          {this.renderCodeScanner()}
        </View>
        <View style={{height: "25%", backgroundColor: "#696969"}}>
          {this.renderProductInfo()}
          {this.renderNavButton()}
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F2F2F',
  },
  noProductScan: {
    fontSize: 15,
    textAlign: "center",
    color: "#313131",
    marginTop: 20,
  },
  productInfo: {
    color: "white",
    fontSize: 15,
  },
  productInfoDescription: {
    color: "white",
    fontSize: 10,
  },
  productInfoPrice: {
    marginLeft: 15,
    fontWeight: "900",
    color: "white",
    fontSize: 15,
  },
  productInfoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#2F2F2F",
    margin: 10,
  },
  productInfoButton: {
    color: "#841584",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  productInfoAddContainer: {
    marginTop: 10,
    display: "flex",
    alignItems: "center",
  },
  productInfoAddText: {
    color: "yellow",
    fontSize: 15,
  },
  navButtonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  shoppingImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    tintColor: "white",
  }
});
