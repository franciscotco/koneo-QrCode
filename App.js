import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar, Platform, Image } from 'react-native';

// Component
import CartScreen from './components/CartScreen';
import ScannerQrCode from './components/ScannerQrCode';
import Koneo from './components/Koneo';

// Constant
import { SCANNER, CART, GET_PRODUCT, URL, TOKEN_OPT, TOKEN, GET } from './constants';

// const products = {
//   "": {
//     name: "Club-Mate",
//     quantity: "500ml",
//     description: "Drink fresh",
//     price: 1.34,
//     image: require("./assets/images/club_mate.png")
//   },
//   "40235752": {
//     name: "Malboro Red",
//     quantity: "20 pcs",
//     description: "Bad for you health",
//     price: 7.5,
//     image: require("./assets/images/malboro.png")
//   },
//   "4250542847472": {
//     name: "Connor Collegeblock",
//     quantity: "80 pages",
//     description: "Writing paper",
//     price: 4,
//     image: require("./assets/images/feuille-a-rouler-gizeh-regular.jpg")
//   },
//   "5000112555134": {
//     name: "Coca-Cola Zero",
//     quantity: "250 mL",
//     description: "Bad for your health",
//     price: 2.3,
//     image: require("./assets/images/coca.png")
//   },
//   "9001475040486": {
//     name: "Ginger Lemon",
//     quantity: "20 TeaBags",
//     description: "Herbal Infusion",
//     price: 1.83,
//     image: require("./assets/images/feuille-a-rouler-gizeh-regular.jpg"),
//   },
//   "4260426836041": {
//     name: "Iron Max",
//     quantity: "900 g",
//     description: "100% whey protein",
//     price: 29.99,
//     image: require("./assets/images/feuille-a-rouler-gizeh-regular.jpg"),
//   },
//   "42237792": {
//     name: "GIZEH rolling paper",
//     quantity: "100 paper",
//     description: "Extra fine",
//     price: 0.99,
//     image: require("./assets/images/feuille-a-rouler-gizeh-regular.jpg"),
//   },
// }

export default class App extends React.Component {
  state = {
    currentScreen: SCANNER,
    groceryList: [],
    products: []
  }

  componentDidMount() {
    StatusBar.setHidden(true);
    fetch(URL + GET_PRODUCT + TOKEN_OPT + TOKEN,{
      method: GET,
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
    .then(res => {console.log("RES :", res); return res.json()})
    .then(resJson => {
      const products = {};
      resJson.forEach(elem => {
        const { barcode } = elem;
        products[barcode] = elem;
        console.log(elem.picture);
        products[barcode].picture = <Image source={{uri: elem.picture}} style={{ width: 50, height: 50, resizeMode: 'contain',}}/>;
      })
      return products;
    })
    .then(resJson => this.setState({products: resJson}))
    .catch(err => console.log("Err :", err))
  }

  updateGroceryList = (groceryList) => {
    this.setState({groceryList});
  }

  handleStatusBar = () => {
    if (Platform.OS === 'ios')
      return false;
    return true;
  }

  changeScreen = (screen) => {
    this.setState({ currentScreen: screen })
  }

  renderView = () => {
    const { currentScreen, groceryList, products } = this.state;

    switch (currentScreen) {
      case SCANNER:
        return <ScannerQrCode products={products} changeScreen={this.changeScreen} updateGroceryList={this.updateGroceryList} />
      case CART:
        return <CartScreen groceryList={groceryList} changeScreen={this.changeScreen}/>
      default:
        return <ScannerQrCode groceryList={groceryList} changeScreen={this.changeScreen}/>
    }
  }

  render() {
    return (
      <>
        <View style={styles.headerKoneo}>
          <Koneo />
          <View style={styles.headerSecurity}><Text style={{color: "white"}}>Security</Text></View>
        </View>
        <View style={{width: "100%", height: "90%"}}>
          {this.renderView()}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  headerKoneo: {
    width: "100%",
    height: "10%",
    backgroundColor: "#2F2F2F",
    zIndex: 2,
    display: "flex",
    justifyContent: "center"
  },
  headerSecurity: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  }
});
