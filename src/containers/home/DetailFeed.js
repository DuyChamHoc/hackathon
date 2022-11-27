import React,{useState,useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView} from 'react-native';
import {color} from '../../assets/colors/color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from "react-native-vector-icons/MaterialIcons"
import Icon3 from 'react-native-vector-icons/EvilIcons';
import Icon4 from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore'

export default function DetailFeed({navigation,route}) {
  const [comment,setcomment]=useState(false);
  const [feed,setfeed]=useState([]);
  const [check,setcheck]=useState(false);
  useEffect(() => {
    const data=tab===0?'FeedsRider':'FeedsHitch';
     firestore()
     .collection('Feeds')
      .doc(data)
      .get()
      .then(documentSnapshot => {
        setfeed(documentSnapshot.data().feeds);
      })
  },[])
  const {item,tab}=route.params;
  const postcomment=()=>{
    feed.map((item1,index)=>{
      if(item1.id===item.id){
        feed[index].comment.push(comment);
        console.log(item1.id);
        setcomment('');
      }
    })
    firestore()
    .collection('Feeds')
    .doc(tab===0?'FeedsRider':'FeedsHitch')
    .set({
      feeds:feed
    }
    )
  }
  return (
    <ScrollView style={{marginVertical:30}}>
      <View
        style={{
          padding: 10,
          borderRadius: 20,
          borderWidth: 1,
          marginVertical: 20,
          marginHorizontal: 20,
          borderColor: color.green,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity style={{right: 10}}>
            <Image
              source={require('../../assets/image/avatar.jpg')}
              style={{width: 50, height: 50, borderRadius: 30}}
            />
          </TouchableOpacity>
          <View style={{marginTop:13}}>
            <Text style={{fontSize: 17, fontWeight: '700', color: 'black'}}>
              {item.user}
            </Text>
            <Text style={{fontSize: 14}}></Text>
          </View>
          <TouchableOpacity
            style={{
              height: 40,
              backgroundColor: color.primarygreen,
              alignItems: 'center',
              justifyContent: 'space-between',
              width: 100,
              borderRadius: 15,
              flexDirection:"row",
              marginTop:5
            }}
            onPress={()=>setcheck(!check)}>
            <Text style={{color: 'white',left:10,fontSize:15,fontWeight:"600"}}>Contact</Text>
            <Icon2
            name='arrow-forward-ios'
            size={20}
            color="white"
            style={{right:5}}
            />
          </TouchableOpacity>
        </View>
        <Text style={{fontSize:15,fontWeight:'500'}}>
          {item.description}
        </Text>
        <View
          style={{
            height: 35,
            borderWidth: 1,
            borderColor:color.gray,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical:15
          }}>
          <View
            style={{
              flexDirection: 'row',
              left: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name="newspaper-variant" size={20} color="black" />
            <Text
              style={{
                left: 25,
                fontWeight: 'bold',
                color: 'black',
                fontSize: 16,
              }}>
              {item.options}
            </Text>
          </View>
          <View style={{height: 35, borderWidth: 1,borderColor:color.gray}} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              right: 28,
            }}>
            <Icon1
              name="car-sport-outline"
              size={20}
              color="black"
              style={{right: 25}}
            />
            <Text style={{fontWeight: 'bold', color: 'black', fontSize: 16}}>
              {item.vehicle}{'('}{item.numPeople}{')'}
            </Text>
          </View>
        </View>
        <View style={{flexDirection:"row"}}>
            <Icon3 name="calendar" size={25} color='black' />
            <Text style={{left:10,fontWeight:'400'}}>{item.dateStart}</Text>
          </View>
          <View style={{flexDirection:"row",marginVertical:10}}>
            <Icon3 name="location" size={25} color="black" />
            <Text style={{left:10,fontWeight:'400'}}>{item.originName}</Text>
          </View>
          <View style={{flexDirection:"row"}}>
            <Icon2 name="my-location" size={25} color='black' />
            <Text style={{left:10,fontWeight:'400'}}>{item.destinationName}</Text>
          </View>
          <View style={{borderWidth:0.5,marginTop:30,borderColor:color.gray,width:300,alignSelf:"center"}}/>
          <Text style={{fontWeight:'700',fontSize:18,color:"black",left:8,marginVertical:20}}>Comments</Text>
          {feed.map((item1,index)=>(
                  item1.id===item.id?
                  item1.comment.map((item2,index2)=>(
          <View style={{flexDirection:"row",marginTop:5}}>
            <Image
              source={require('../../assets/image/avatar.jpg')}
              style={{width: 50, height: 50, borderRadius: 30}}
            />
            
               <View>
               <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:7}}>
               
                   <Text style={{fontSize: 15, fontWeight: '700', color: 'black'}}>
                    {item.user}
                   </Text>
               
               <Text>12h ago</Text>
               </View>
               <Text style={{width:270,fontWeight:"500"}}>
                {item2}
               </Text>
               </View> 
          </View>
           )):null))}
          <View style={{marginVertical:30,flexDirection:"row"}}>
            <TextInput
            onSubmitEditing={()=>{postcomment()}}
            placeholder='Write your comment...'
            style={{backgroundColor:color.gray1,marginTop:20,width:"100%",borderRadius:10}}
            value={comment}
            onChangeText={(text)=>setcomment(text)}
            />
            <Icon2
            name='arrow-forward-ios'
            size={25}
            color="black"
            style={{right:5,alignSelf:"center",bottom:11,position:"absolute"}}
            />
          </View>
      </View>

      {check?<View style={{alignSelf:"center",position:"absolute",width:300,height:300,top:145,backgroundColor:"white",borderRadius:20}}>
        <TouchableOpacity style={{flexDirection:"row",marginTop:100,backgroundColor:color.primarygreen,height:50,alignItems:"center",justifyContent:"center",borderRadius:20,marginHorizontal:10}}>
          <Text style={{fontWeight:'600',fontSize:17,color:"white"}}>Contact via phone number</Text>
          <Icon4 name='phone' size={25} color='white' style={{left:10}}/>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:"row",marginTop:20,backgroundColor:color.primarygreen,height:50,alignItems:"center",justifyContent:"center",borderRadius:20,marginHorizontal:10}}>
          <Text style={{fontWeight:'600',fontSize:17,color:"white"}}>Contact via message</Text>
          <Icon4 name='message1' size={25} color='white' style={{left:10}}/>
        </TouchableOpacity>
      </View>:null}

      {/* Cmt section */}
      <Text style={{fontWeight:'700',fontSize:18,color:"black",left:22,marginVertical:20}}>Related rides</Text>
      {feed.map((item1,index)=>(
        <TouchableOpacity style={{
          borderWidth: 1,
          borderRadius: 10,
          borderColor: '#6CC165',
          marginHorizontal:10,
          padding:10,
          marginTop:5
       }}>
         <View style={{flexDirection:"row",right:10}}>
       <Image
               source={require('../../assets/image/avatar.jpg')}
               style={{width: 50, height: 50, borderRadius: 30}}
             />
             <View>
             <View style={{flexDirection:"row",marginTop:10}}>
             <Text style={{fontSize: 15, fontWeight: '700', color: 'black'}}>
               {item1.user}
             </Text>
             </View>
             <Text>2 hour ago</Text>
             </View>
         <View>
           </View>
         </View>
         <View style={{flexDirection:"row"}}>
       <Text style={{width: 190}}>
         {item1.description}
       </Text>
       <View style={{left:10}}>
           <View style={{flexDirection:"row"}}>
             <Icon3 name="calendar" size={25} color='black' />
             <Text style={{width:115,left:5}}>{item1.dateStart}</Text>
           </View>
           <View style={{flexDirection:"row",marginVertical:5}}>
             <Icon3 name="location" size={25} color="black" />
             <Text style={{left:5,width:115}}>{item1.originName}</Text>
           </View>
           <View style={{flexDirection:"row"}}>
             <Icon2 name="my-location" size={25} color="black" />
             <Text style={{width:115,left:5}}>{item1.destinationName}</Text>
           </View>
       </View>
       </View>
     </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
