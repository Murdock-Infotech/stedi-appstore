import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { NavigationContainer } from '@react-navigation/native';
import {FontAwesome5} from '@expo/vector-icons';
import{ Ionicons} from '@expo/vector-icons';



import Help from '../screens/Help';
import Counter from '../screens/Counter';
import About from '../screens/About';
import Profile from '../screens/Profile';


//Stack Navigator 


const Stack = createNativeStackNavigator();



const CounterStackScreen = () =>{
    return(
     <Stack.Navigator
     screenOptions= {{
        headerStyle:{backgroundColor:'#A0CE4E'},
        headerTintColor:'white'}}
     >
        <Stack.Screen name="Counter" component={Counter} options={{
             headerTitleAlign: "center",
             headerTitleStyle:{
               fontWeight:'bold', 
               fontSize:22
              }
              }}>
        </Stack.Screen>
     </Stack.Navigator>
    );
}

const ProfileStackScreen = (props) =>{
    return(
     <Stack.Navigator
     screenOptions= {{
        headerStyle:{backgroundColor:'#A0CE4E'},
        headerTintColor:'white'}}>

        <Stack.Screen name="Profile" 
         children={()=><Profile setLoggedInState={props.setLoggedInState}/>}
        options={{
             headerTitleAlign: "center",
             headerTitleStyle:{
               fontWeight:'bold', 
               fontSize:22
              }
             }} >
        </Stack.Screen>
     </Stack.Navigator>
    );
}


const AboutStackScreen = () =>{
    return(
     <Stack.Navigator
     screenOptions= {{
        headerStyle:{backgroundColor:'#A0CE4E'},
        headerTintColor:'white'}}
     >
        <Stack.Screen name="About" component={About} options={{
             headerTitleAlign: "center",
             headerTitleStyle:{
               fontWeight:'bold', 
               fontSize:22
              }
             }}>
        </Stack.Screen>
     </Stack.Navigator>
    );
}


const HelpStackScreen = () =>{
    return(
     <Stack.Navigator
     
     screenOptions= {{
        headerStyle:{backgroundColor:'#A0CE4E'},
        headerTintColor:'white',  }}
     >
        <Stack.Screen name="Help" component={Help} options={{
             headerTitleAlign: "center",
             headerTitleStyle:{
               fontWeight:'bold', 
               fontSize:22
              }
            }}
             >
        </Stack.Screen>
     </Stack.Navigator>
    );
}



//Tab Navigator

const Tab = createMaterialBottomTabNavigator();

export default function Navigation (props) {
   console.log('navigation testing:', props.loggedInState)
    return(
  
       
        <Tab.Navigator
        initialRouteName='TabCounter'
        activeColor='#A0CE4E'
        screenOptions={{
            showLabel: 'false',
            activeTintColor: 'Black',

        }}
        
         barStyle={{ backgroundColor: 'white',
        
         }}>
             
            <Tab.Screen name="TabCounter" 
            // component={counterStackScreen}
            children={()=><CounterStackScreen/>}
            options={{
                // tabBarColor:'pink',
                   tabBarLabel: 'Counter',
                 tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name='gauge' color={color} size={28} style={{ width: 30,  height: 30, marginTop: -3 }} />
                  ),
                  }}
            />
            <Tab.Screen name="TabProfile" 
            // component={ProfileStackScreen}
            children={()=><ProfileStackScreen setLoggedInState={props.setLoggedInState}/>}
            options={{
                // tabBarColor:'pink',
                   tabBarLabel: 'Profile',
                 tabBarIcon: ({ color }) => (
                  <FontAwesome5 name='user-alt' color={color} size={28}  style={{ width: 30,  height: 30, marginTop: -3 }}/>
                  ),
                  }}
            />
            <Tab.Screen name="TabAbout" 
            component={AboutStackScreen}
            options={{
                // tabBarColor:'pink',
                   tabBarLabel: 'About',
                 tabBarIcon: ({ color }) => (
                  <Ionicons name='information-circle-sharp' color={color} size={30} style={{ width: 30,  height: 30, marginTop: -3}}/>
                  ),
                  }}
            />
            <Tab.Screen name="TabHelp" 
            // component={HelpStackScreen}
            children={()=><HelpStackScreen sessionToken={props.sessionToken}/>}
            options={{
                // tabBarColor:'pink',
                   tabBarLabel: 'Help',
                 tabBarIcon: ({ color }) => (
                  <Ionicons name='help-circle' color={color} size={32} style={{ width: 30, height: 30, marginTop: -5 }} />
                  ),
                  }}
            />
        </Tab.Navigator>
      
    );
}

const styles = StyleSheet.create({
  
 
});
