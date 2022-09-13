/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
import SQLITE from 'react-native-sqlite-storage';
class OfflineData extends Component {
    // componentDidMount(){
    //     this.offlineData();
    // }
    offlineData(){
        SQLITE.openDatabase({
            location: 'default',
            name: 'node_api.db',
        }).then((db)=>{
            db.transaction((tx)=>{
                tx.executeSql('SELECT * FROM people',[]).then(([,results])=>{
                    console.log('result',results.rows.item(0).name);
                });
            });

        });
    }
    render() {
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text>{'Data from Sqlite database'}</Text>
                <TouchableOpacity style={{ top: 50, height: 30, width: 200, backgroundColor: 'white', justifyContent: 'center' }}
                    onPress={() => { this.offlineData(); }}
                >
                    <Text style={{ alignSelf: 'center', textAlign: 'center', color: 'black', fontSize: 16 }}>{'Set data into Database'}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default OfflineData;
