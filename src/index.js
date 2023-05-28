import {View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity} from 'react-native'
import React, {useState} from 'react';
import axios from 'axios';


const ChatGPT=()=>{
    const [data, setData]=useState([]);
    const apiKey = "";
    const apiUrl = "";
    const [textInput, setTextInput]= useState('');
    
    const handleSend= async () =>{ 
        const prompt= textInput
        const response= await axios.post(apiUrl,{
            prompt: prompt,
            max_tokens:1024,
            temperature:0.5,
        },{
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        })
        const text = response.data.choices[0].text;
        setData([...data, {type:'user', 'text':textInput},{type:'bot', 'text':text}]);
        setTextInput('');
    }

        return(
        <View style={styles.container}>
            <Text style={styles.title}>
                i-chat
            </Text>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                style={styles.body}
                renderItem={({item}) => (
                    <View style={{flexDirection:'row', padding:8,width:'86%' }}>
                        <Text style={{fontWeight:'bold', fontSize:15,  color:"white", borderRadius:30, padding:7, textAlign:'center'}}>{item.type ==='user'? 'Ritik: ':'Bot: '} </Text>
                        <Text style={{fontSize:14, color:"white", borderColor:'grey', borderWidth:1, borderRadius:20, padding:8, backgroundColor: item.type==='user'? third: fourth }}>{item.text}</Text>
                    </View>
                )}/>
            <View style={{flexDirection:'row', padding:10 }}>
            <TextInput
                style={styles.input}
                value={textInput}
                onChangeText = {text => setTextInput(text)}
                placeholder='Ask me anything'
                placeholderTextColor="white" 
              
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleSend}>
                <Text style={styles.buttonText}>Go</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}



export default ChatGPT



const first="#042333"
const second="black"
const third="#12E5C3"
const fourth="#42bfff"


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: first,
      alignItems: 'center',
    },
    title:{
        fontSize:30,
        fontWeight: 'bold',
        color:"white",
        marginTop: 40,
        backgroundColor:first,
        borderRadius:40
    },
    body:{
        backgroundColor:second,
        width:'102%',
        margin:5,
        color:"white"
    },
    
    input:{
        borderWidth:1,
        borderColor:'grey',
        backgroundColor:second,
        width:'80%',
        height:45,
        marginBottom:3,
        borderRadius:40,
        fontSize:18,
        color:"white",
        paddingLeft:12

    },
    button:{
        backgroundColor:third,
        width:'18%',
        height:45,
        borderRadius:50,
        justifyContent: 'center',
        alignItems:'center',
        marginBottom:3,
        marginLeft:4
    },
    buttonText:{
        fontSize:18, 
        fontWeight:'bold',
        color:'white'
    }
  });