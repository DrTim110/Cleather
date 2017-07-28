import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableHighlight,
    Picker
} from 'react-native';

const weatherAPIURL = 'https://api.darksky.net/forecast/60c6a5ddecd613aaf3eb7207fd530ae8/';
const locationSearchURL = 'https://maps.googleapis.com/maps/api/place/textsearch/json?key=AIzaSyD0wcGcW2XyArfBG6psXYmJRIDdZsZK0kM&query=';

const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
]

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            clothingOptions: {
            }
        };
        let localThis = this;
        navigator.geolocation.getCurrentPosition(function (res) {
            localThis.setState({ location: res });
            fetch(weatherAPIURL + res.coords.latitude + ',' + res.coords.longitude).then(function (response) {
                response.json().then(function (weather) {
                    localThis.setState({ weather: weather });
                });
            });
        });

        this.currentPressed = this.currentPressed.bind(this);
    }

    currentPressed(){
        this.setState({
            show: !this.state.show
        });
    }

    render() {
        let weather;
        if (this.state.weather) {
            let weath = this.state.weather;

            let forecast = weath.daily.data.map((point, index) => {
                return <View key={point.time} style={styles.dayView}>
                        <Text style={styles.day}>{index == 0 ? 'Today' : days[new Date(point.time * 1000).getDay()]}</Text>
                         <View style={styles.dataHolder}>
                            <Text style={[styles.data, styles.label]}>
                                High:
                            </Text>
                            <Text style={[styles.data, styles.value]}>
                                {point.temperatureMax}
                            </Text>
                        </View>
                        <View style={styles.dataHolder}>
                            <Text style={[styles.data, styles.label]}>
                                Low:
                            </Text>
                            <Text style={[styles.data, styles.value]}>
                                {point.temperatureMin}
                            </Text>
                        </View>
                        <View style={styles.dataHolder}>
                            <Text style={[styles.data, styles.label]}>
                                Humidity:
                            </Text>
                            <Text style={[styles.data, styles.value]}>
                                {( point.humidity * 100 ) + '%'}
                            </Text>
                        </View>
                        <View style={styles.dataHolder}>
                            <Text style={[styles.data, styles.label]}>
                                Wind:
                            </Text>
                            <Text style={[styles.data, styles.value]}>
                                {point.windSpeed}
                            </Text>
                        </View>
                        <View style={[styles.dataHolder, {marginBottom: 10}]}>
                            <Text style={[styles.data, styles.label]}>
                                Clouds:
                            </Text>
                            <Text style={[styles.data, styles.value]}>
                                {(point.cloudCover * 100) + '%'}
                            </Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <TouchableHighlight 
                            style={{flex: 1, marginTop: 10}}
                            onPress={() => {var newState = {}; newState[point.time] = 'light'; this.setState(newState);}}>
                                <Text style={{
                                    backgroundColor:(this.state[point.time] && this.state[point.time] == 'light' ? "#333" : '#fff'), 
                                    color: (this.state[point.time] && this.state[point.time] == 'light' ? "#fff" : '#333'), 
                                    flex: 1, paddingVertical: 5, textAlign: 'center'}} >Light</Text>
                            </TouchableHighlight>
                            <TouchableHighlight 
                            style={{flex: 1, marginTop: 10}}
                            onPress={() => {var newState = {}; newState[point.time] = 'medium'; this.setState(newState);}}>
                                <Text style={{
                                    backgroundColor:(this.state[point.time] && this.state[point.time] == 'medium' ? "#333" : '#fff'), 
                                    color: (this.state[point.time] && this.state[point.time] == 'medium' ? "#fff" : '#333'), 
                                    flex: 1, paddingVertical: 5, textAlign: 'center'}} >Medium</Text>
                            </TouchableHighlight>
                            <TouchableHighlight 
                            style={{flex: 1, marginTop: 10}}
                            onPress={() => {var newState = {}; newState[point.time] = 'heavy'; this.setState(newState);}}>
                                <Text style={{
                                    backgroundColor:(this.state[point.time] && this.state[point.time] == 'heavy' ? "#333" : '#fff'), 
                                    color: (this.state[point.time] && this.state[point.time] == 'heavy' ? "#fff" : '#333'), 
                                    flex: 1, paddingVertical: 5, textAlign: 'center'}} >Heavy</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
            })

            weather = <View>
                {forecast}
            </View>
        }

        let location;
        if (this.state.location) {
            location = <Text style={styles.json}>{JSON.stringify(this.state.location)}</Text>
        }

        return (
            <ScrollView style={styles.container}>
                <Text style={styles.title}>
                    Cleather
                </Text>
                {weather}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ddd',
    },
    dayView:{
        backgroundColor: '#ff6418',
        margin: 10,
        padding: 10
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 10,
        color: '#ffffff',
        backgroundColor: '#333'
    },
    json: {
        textAlign: 'left',
        color: '#333333',
        marginBottom: 5,
        color: '#ffffff'
    },
    day: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center'
    },
    current: {
        fontSize: 24,
        textAlign: 'center',
        padding: 10,
        color: '#333',
        backgroundColor: '#BADA55'
    },
    data: {
        fontSize: 20,
        textAlign: 'left',
        padding: 2,
        color: '#333'
    },
    high: {
        color: '#ff0000'
    },
    low: {
        color: '#0000ff' 
    },
    label: {
        flex: 1
    },
    value: {
        flex: 1,
        textAlign: 'right'
    },
    dataHolder: {
        flexDirection: 'row'
    }
});