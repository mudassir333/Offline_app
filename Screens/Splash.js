/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View , Text} from 'react-native';

class Splash extends Component {
    componentDidMount(){
       this._interval = setInterval(()=>{
        this.props.navigation.navigate('Sync');
       },5000);
    }
    componentWillUnmount(){
        clearInterval(this._interval);
    }
    render() {
        return (
            <View style={{flex:1,backgroundColor:'grey',justifyContent:'center',alignItems:'center'}}>
                <Text style={{textAlign:'center',fontSize:18,color:'black'}}>{'Welcome'}</Text>
            </View>
        );
    }
}

export default Splash;
