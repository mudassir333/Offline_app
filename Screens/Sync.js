/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { transformSync } from '@babel/core';
import React, { Component } from 'react';
import { View, ActivityIndicator, Text, TouchableOpacity, FlatList, File, Image, Platform } from 'react-native';
import SQLITE from 'react-native-sqlite-storage';
import RNFetchBlob from 'rn-fetch-blob';
import { request, PERMISSIONS, RESULTS, check, openSettings } from 'react-native-permissions';
const table_query = 'CREATE TABLE MEMBERS (id int(10),name varchar(50) NOT NULL,dob DATE NOT NULL, email varchar(30) NOT NULL,profile varchar(30),PRIMARY KEY(id))';
// INSERT INTO MEMBERS VALUES(1,JOHN,1999-03-08,john@gmail.com,null)
SQLITE.enablePromise(true);
const database = SQLITE.openDatabase({
    location:'default',
    name:'node_api.db',

});
const PLATEFORM_STORAGE_PERMISSION = {
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
};
const REQUEST_PERMISSION_TYPE = {
    storage: PLATEFORM_STORAGE_PERMISSION,
};
const PERMISSION_TYPE = {
    storage: 'storage',
};
const person = { 'id': 3, 'name': 'Mandy', 'dob': '19-03-1999', 'email': 'andy@gmail.com', 'profile': 'image.com' };
const fs = RNFetchBlob.fs;
class Sync extends Component {

    state = {
        color: 'blue',
        loading: false,
        msg: '',
        image: '',
        apiData: null,
    }
    checkPermission = async (type) => {
        const permission = REQUEST_PERMISSION_TYPE[type][Platform.OS];

        try {
            const result = await check(permission);
            if (result === RESULTS.GRANTED) {
                //   console.log(url);

                this.saveImage();
                //   this.addFilePath(url);
                //return true;

            } else {
                return this.requestPermission(permission, type);
            }

        }
        catch (error) {
            console.log('error', error);
            // alert('App permission result fail ' + error);
        }
    }
    requestPermission = async (permission, type) => {
        try {
            const result = await request(permission);
            if (result === RESULTS.DENIED) {
                this.requestPermission(permission, type);
            } else {
                this.saveImage();
                //  console.log(url);
                // RNFetchBlob.config({
                //     // fileCache:true,
                //     path: RNFetchBlob.fs.dirs.DocumentDir,
                // })
                //     .fetch('GET', url, {
                //         'Content-Type': 'multipart/form-data; charset=utf-8',
                //     }).then((res)=>{
                //             console.log(res.path());
                //     }).catch(error=>{
                //         console.log('file saving error',error);
                //     });
                //  this.addFilePath(url);
                //   return true;
            }
        } catch (error) {
            return false;
        }
    };
    saveImage() {
        const d = fs.dirs.DocumentDir + '/Profiles';
        const dir = fs.mkdir(d);
        console.log('directory', dir);
        RNFetchBlob.config({
            // fileCache:true,
            path: RNFetchBlob.fs.dirs.DownloadDir,
        })
            .fetch('GET', 'http://www.example.com/images/img1.png', {
                Authorization: 'Bearer access-token...',
                'Content-Type': 'multipart/form-data; charset=utf-8',
            }).then((res) => {
                console.log(res.path());

            }).catch(error => {

                console.log('file saving error', error);

            });
        // var path1;
        // const str = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.'));
        // console.log('name', str);
        // RNFetchBlob.config({
        //     // fileCache:true,
        //     path: RNFetchBlob.fs.dirs.DocumentDir + str + '.png',
        // })
        //     .fetch('GET', url, {
        //         'Content-Type': 'multipart/form-data; charset=utf-8',
        //     })
        //     .then((res) => {
        //         //  console.log('The file saved to:', res.path());
        //         this.setState({ image: res.path });

        //         // RNFetchBlob.fs.createFile(res.path).then((response) => {
        //         //     console.log('new file', response);
        //         // });
        //         //return res.path;
        //         // return res.path();

        //     });

    }
    apiCall = () => {
        this.setState({ msg: 'Fetching resources....' });
        fetch('http://10.0.2.2:5000/members/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
            },
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.status === 200) {
                    this.setState({ loading: true, color: 'red' });
                    console.log('response', typeof (res.data));
                    this.setState({ apiData:res.data });
                }
                else {
                    console.log('Could not get the data from server');
                }
            })
            .catch((err) => console.log('err', err))
            .finally(() => {
                const { apiData } = this.state;
                if (apiData == null) {
                    console.log('Syncing failed !');
                    return;
                }
                this.createDatabase(apiData);
                console.log('state Data:', new Array(apiData));
            });
        //   this.checkPermission(PERMISSION_TYPE.storage,this.state.image);
    }
    addFilePath(data) {
        console.log('dcim', fs.dirs.DCIMDir);
        console.log('download', fs.dirs.DownloadDir);
        console.log('document', fs.dirs.DocumentDir);
        let array = [];
        for (let i = 0; i < data.length; i++) {
            const file = data;
            //  const filePath = this.saveImage(data[i].profile);
            //const str = file.substring(file.lastIndexOf('/') + 1, file.lastIndexOf('.'));
            //console.log('name', str);
            // RNFetchBlob.config({
            //     // fileCache:true,
            //     path: RNFetchBlob.fs.dirs.PictureDir + 'name' + '.png',
            // })
            //     .fetch('GET', file, {
            //         'Content-Type': 'multipart/form-data; charset=utf-8',
            //     })
            //     .then((res) => {
            //         console.log('The file saved to:', res.path());
            //         this.setState({ image: res.path() });
            //         // RNFetchBlob.fs.createFile(res.path()).then((response) => {
            //         //     console.log('new file', response);
            //         // });
            //         // data[i].profile = new File(res.path()).name;
            //         // console.log('updated data', data);
            //         // return data;
            //         // return res.path();

            //     });

            // console.log('path', filePath);
            // data[i].profile = filePath;
        }
        // console.log('updated data', data);
        //return data;

    }
    createDatabase = (data) => {
        this.setState({ msg: 'Opening database....' });
        SQLITE.openDatabase({
            location:'default',
            name:'node_api.db',
        
        }).then((db) => {
            this.setState({ color: 'green' });
            if (db.transaction(this.dropTable)) {
                if (db.transaction(this.createTable)) {
                    this.setState({ color: 'yellow', msg: 'Inserting Records ....' });
                    db.transaction((tx) => {
                        console.log('data in quert',data);
                        tx.executeSql("REPLACE INTO people(id,name,dob,email,profile) VALUES(?,?,?,?,?)"
                            ,[data]).then(([, results]) => {
                                console.log('insert result', JSON.stringify(results));
                    this.setState({ loading: false, msg: 'Data has been\nstored in Sqlite database!' });

                                // return;
                            }).catch((error)=>{
                                console.log('insert error',error);
                            }).finally(()=>{
                                console.log('finaly block executed');
                            });
                    }).catch((error)=>{
                        console.log('insert err',error);
                    });
                    // for (let i = 0; i < data.length; i++) {
                    //     db.transaction((tx) => {
                    //         tx.executeSql('REPLACE INTO people (id,name,dob,email,profile) VALUES(?,?,?,?,?)'
                    //             , [data[i].id, data[i].name, data[i].dob, data[i].email, data[i].profile]).then(([, results]) => {
                    //                 console.log('insert result', results);
                    //                 // return;
                    //             });
                    //     });
                    // }
                  //  this.setState({ loading: false, msg: 'Data has been\nstored in Sqlite database!' });
                }
            }
            else {
                console.log('Sqlite operation failed');
            }
            // db.close();
            // let records = [];
            // db.transaction((tr) => {
            //     tr.executeSql('SELECT * FROM people', []).then(([, res]) => {
            //         for (let i = 0; i < res.rows.length; i++) {
            //             const row = res.rows.item(i);
            //             const d = {
            //                 'id': row.id,
            //                 'name': row.name,
            //                 'dob': row.dob,
            //                 'email': row.email,
            //                 'profile': row.profile,
            //             };
            //             records.push(d);
            //         }
            //         //   console.log('rows', JSON.stringify(res.rows.item(0).name));
            //         console.log(records);
            //         this.setState({ loading: false, msg: 'Data has been\nstored in Sqlite database!' });
            //     });
            // });
            // db.close();
        }).catch((error) => {
            console.log('create database err:', error);
        });
    }
    createTable(tx) {
        //    this.setState({msg:'Creating table....'});
        tx.executeSql('CREATE TABLE IF NOT EXISTS people'
            + '(id int(10) NOT NULL PRIMARY KEY ,name VARCHAR(50) NOT NULL,dob DATE NOT NULL,email VARCHAR(30) NOT NULL, profile VARCHAR(100))')
            .then(([, result]) => {
                console.log('table result',result);
                return true; }).catch((error)=>{
console.log('table error',error);
            });
    }
    dropTable(tx) {
        //  this.setState({msg:'Deleting table....'});
        tx.executeSql('DROP TABLE IF EXISTS people', []).then(([, res]) => {
            console.log('drop table result', res);
            return true;
        });
    }
    saveData() {
        SQLITE.openDatabase({
            location: 'default',
            name: 'node_api.db',
        }).then((db) => {
            // db.transaction((tx) => {
            //     tx.executeSql('INSERT INTO people (id,name,dob,email,profile) VALUES (?,?,?,?,?)', [person.id,person.name, person.dob, person.email, person.profile])
            //         .then(([, res]) => {
            //             console.log('result', res);
            //         });
            // });
            let records = [];
            db.transaction((tr) => {
                tr.executeSql('SELECT * FROM people', []).then(([, res]) => {
                    for (let i = 0; i < res.rows.length; i++) {
                        const row = res.rows.item(i);
                        const d = {
                            'id': row.id,
                            'name': row.name,
                            'dob': row.dob,
                            'email': row.email,
                            'profile': row.profile,
                        };
                        records.push(d);
                    }
                    //   console.log('rows', JSON.stringify(res.rows.item(0).name));
                    console.log('records', records);
                    this.postApi(records);
                    //  this.setState({ loading: false, msg: 'Data has been\nstored in Sqlite database!' });
                });
            });
        });
    }
    sendDataToServer() {
        SQLITE.openDatabase({
            location: 'default',
            name: 'node_api.db',
        }).then((db) => {
            let records = [];
            db.transaction((tr) => {
                tr.executeSql('SELECT * FROM people', []).then(([, res]) => {
                    for (let i = 0; i < res.rows.length; i++) {
                        const row = res.rows.item(i);
                        const d = {
                            'id': row.id,
                            'name': row.name,
                            'dob': row.dob,
                            'email': row.email,
                            'profile': row.profile,
                        };
                        records.push(d);
                    }
                    //   console.log('rows', JSON.stringify(res.rows.item(0).name));
                    console.log(records);
                    this.postApi(records);
                    //  this.setState({ loading: false, msg: 'Data has been\nstored in Sqlite database!' });
                });
            });
        });
    }
    postApi(data) {
        // let formBody = [];
        // for (let i = 0; i < data.length; i++){
        //     const obj = data[i];
        //     for (let k in obj){
        //         // console.log('key',k);
        //         // console.log('value',);
        //         let key = encodeURIComponent(k);
        //         let value = encodeURIComponent(obj[k]);
        //         console.log('key and Value',k,value);
        //         formBody.push(key + '=' + value);
        //     }
        // }
        // formBody = formBody.join('&');
        // console.log('form body',formBody);
        fetch('http://10.0.2.2:5000/members/add/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(data),
        }).then((response) => response.json())
            .then((res) => {
                console.log('response', res);
            })
            .catch((error) => {
                console.log('api error', error);
            });
    }
    // componentDidMount() {
    //     //fetch('http://localhost/')
    //    // this.setState({ loading: true, color: 'blue' });
    //     console.log('Hello');
    //     //this.apiCall();
    // }
    render() {
        const { color, loading, msg, image } = this.state;
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color={color}
                    animating={loading} size={'large'} />
                <Text style={{ textAlign: 'center', fontSize: 18, color: 'black' }}>{msg}</Text>
                <TouchableOpacity style={{ top: 50, height: 30, width: 200, backgroundColor: 'white', justifyContent: 'center' }}
                    onPress={() => {
                        this.apiCall();
                    }}
                >
                    <Text style={{ alignSelf: 'center', textAlign: 'center', color: 'black', fontSize: 16 }}>{'Sync'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ top: 100, height: 30, width: 200, backgroundColor: 'white', justifyContent: 'center' }}
                    onPress={() => { this.apiCall(); }}
                >
                    <Text style={{ alignSelf: 'center', textAlign: 'center', color: 'black', fontSize: 16 }}>{'Update local database'}</Text>
                </TouchableOpacity>
                <Image source={image} style={{ height: 100, width: 100 }} />
            </View>
        );
    }
}

export default Sync;
