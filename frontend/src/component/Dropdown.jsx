import { StyleSheet,TouchableOpacity, Text, View } from 'react-native';
import React,{useState} from 'react';

import Icon1 from 'react-native-vector-icons/AntDesign';


const Dropdown = ({ daata , value , onSelect, name}) => {
   
    // let data = [{id:1,name:'Haircut'},{id:2,name:'spa'},{id:3,name:'massage'},{id:4,name:'Beard-trim'}];

    
    const [showoption, setShowoption] = useState(false);
   
    const selecteditems =(e)=>{
      setShowoption(!showoption)
      onSelect(e)
      
    }

  console.log()
  return (
    <>
    <TouchableOpacity onPress={()=>setShowoption(!showoption)}>
    <View style={styles.Dropdowni}>
        <Text style={{fontSize:16}}>{!!value? value  :name} </Text>
        <Icon1 name ='down' size={22} color='black' style={{position:'absolute' , right:'6%',top:'70%', transform:[{rotate: showoption? '180deg':'0deg'}]} }/>
    </View>
    </TouchableOpacity>


    {showoption &&  <View >
    {daata.map((e)=> (
        <View key={e.id} style={styles.option}>
          <TouchableOpacity onPress={()=> selecteditems(e)}>
            <View >
            <Text style={{fontSize:13,color:'black',padding:4,}}>{e.name}</Text>
            </View>
            </TouchableOpacity> 
        </View>
    ) )}
    </View> }
   
    
  </>
  )
}


export default Dropdown

const styles = StyleSheet.create({
    option:{
        fontSize:15,
        backgroundColor:'white',
        borderRadius:2,
        
      },
      Dropdowni:{
        height: 52,
        fontWeight: '400',
        borderWidth: 1,
        padding: 13,
       
        backgroundColor:'white',
        marginVertical: '2%',
        flexDirection:'row',
        
    
      },
      input: {
        fontSize: 15,
        fontWeight: '400',
        paddingLeft: 10,
        marginVertical: '2%',
        fontFamily: 'roboto',
        borderWidth: 1,
        height: 52,
        backgroundColor: 'white'
      },
})