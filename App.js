import React from "react";
import {Alert, AsyncStorage, Button, TextInput, View} from "react-native";

const bind = (context) => (...methods) => (methods.forEach(method => context[method] = context[method].bind(context)));

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
        bind(this)('_onPressSave', '_onPressClear');
    }

    async _onPressSave() {
        try {
            let activityText = this.state.text.trim();
            await AsyncStorage.getItem('@ActivityStore:activities', (err, result) => {
                let allActivities = [];
                let storedActivities = JSON.parse(result);
                if (storedActivities) {
                    allActivities = storedActivities;
                }
                AsyncStorage.setItem('@ActivityStore:activities', JSON.stringify(allActivities.concat([activityText])));
            });
            await AsyncStorage.getItem('@ActivityStore:activities', (err, result) => {
                Alert.alert('Registro exitoso', 'actividades: ' + result);
            });
        } catch (error) {
            console.log(error);
            Alert.alert('Error en el registro');
        }
        this.setState({text: ''});
    }

    async _onPressClear() {
        await AsyncStorage.clear()
            .then(Alert.alert('Cleared'))
            .catch(error => Alert.alert('Error'));
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <View style={{padding: 10, borderBottomColor: '#000000', borderBottomWidth: 1 }}>
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}

                    />
                </View>
                <View style={{padding: 10}}>
                    <Button
                        onPress={this._onPressSave}
                        title="Save"
                        color="#841584"
                        accessibilityLabel="Save new activity"
                    />
                </View>
                <View style={{padding: 10}}>
                    <Button
                        onPress={this._onPressClear}
                        title="Clear"
                        color="#841584"
                        accessibilityLabel="Remove all activity"
                    />
                </View>
            </View>
        );
    }
}
