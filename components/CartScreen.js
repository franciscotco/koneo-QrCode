import React from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, Image } from 'react-native';
import { LinearGradient } from 'expo';

// Constant
import { SCANNER } from '../constants';

export default class CartScreen extends React.Component {
    state = {price: 0, quantity: 0}

    componentDidMount() {
       this.changeScreen();
        this.setPriceAndQuantity();
    }

    changeScreen = () => {
        const { changeScreen } = this.props;

        setTimeout( () => {
            changeScreen(SCANNER);
        },15000);
    }

    setPriceAndQuantity = () => {
        const { groceryList } = this.props;

        let price = 0;
        let quantity = 0;
        groceryList.forEach(item => {
            quantity += 1;
            price += item.price;
        });
        this.setState({price, quantity});
    }

    renderListElement = (elem) => {
        const { item } = elem;
        if (!item) return;
        const {name, quantity, picture, price, number} = item;
        return (
            <View key={price}>
                <View style={styles.itemCart}>
                    <View style={styles.borderBottomItem}>
                        <Text style={styles.itemNumber}>{number} x</Text>
                        {/* <Image
                            source={image}
                            style={styles.imageSize}
                        /> */}
                        {picture}
                        <View style={{marginLeft: 20, marginRight: 5}}>
                            <Text style={{ color: 'white', fontSize: 20 }}>{name}</Text>
                            <Text style={{ color: 'white', fontSize: 8 }}>{quantity}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    renderSummaryList = () => {
        const { price, quantity } = this.state;

        return (
            <>
                <View style={styles.separator}></View>
                <Text style={{ color: "white", fontSize: 16 }}>Total</Text>
                <View style={styles.totalContainer}>
                    <Text style={{ color: "white", fontSize: 18, fontWeight: "700" }}>Articles {quantity}</Text>
                    <Text style={{ color: "white", fontSize: 18, fontWeight: "700" }}>Cost {price}€</Text>
                </View>
            </>
        );
    }

    render() {
        const { groceryList } = this.props;

        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#2F2F2F" />
                <LinearGradient
                    colors={['rgba(0,0,0,0.8)', 'transparent']}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        height: "100%",
                    }}
                />
                <FlatList
                    data={groceryList}
                    renderItem={this.renderListElement}
                    keyExtractor={(item, index) => index.toString()}
                />
                {this.renderSummaryList()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    separator: {
        borderBottomWidth: 1,
        borderColor: "white",
        marginTop: 10,
        width: "100%",
    },
    itemNumber: {
        fontSize: 18,
        color: "white"
    },
    container: {
        paddingTop: 20,
        flex: 1,
        backgroundColor: '#696969',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
    },
    itemCart: {
        margin: 10,
        width: "100%",
        margin: "auto",
        alignItems: "center",
    },
    borderBottomItem: {
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: "grey",
        paddingBottom: 12,
    },
    payNowButton: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        borderRadius: 6,
    },
    totalContainer: {
        marginTop: 2,
        borderBottomWidth: 3,
        borderColor: "grey",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
        margin: "auto",
        paddingBottom: 10,
    },
    removeImage: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        tintColor: "red",
    },
    imageSize: {
        width: 65,
        height: 65,
        resizeMode: 'contain',
    }
});
