import React,{ useEffect } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import Favs from "../screens/Favs";
import { Platform } from 'react-native';


const Tabs = createBottomTabNavigator();

const getHeaderName = (route) => route?.state?.routeNames[route.state.index] || "Movies";

export default ({navigation, route}) => {
    useEffect(() => {
       // console.log("the route changed") 이렇게 콘솔에 확인해준 이유는, 화면에서 tab을 할 경우 ( 각 페이지에 해당하는 항목의 tab ) 누를 때마다 콘솔에 찍힌다. 
       const name = getHeaderName(route);
       navigation.setOptions({
           title: name
        });
    }, [route]);

    return (
        <Tabs.Navigator 
            screenOptions={({route}) => ({
                tabBarIcon: ({focused}) =>{
                    let iconName = Platform.OS === "ios" ? "ios-" : "md-";
                    if(route.name === "Movies") {
                        iconName += "film"
                    } else if (route.name === "TV") {
                        iconName += "tv"
                    } else if (route.name === "Search") {
                        iconName += "search"
                    } else if (route.name === "Discovery") {
                        iconName += "heart"
                    } // 이렇게 각각 써주는 이유는, 각 탭 항목에 해당하는 아이콘을 지정해서 넣어주기 위함이다.
                    // 위에 ? 연산자를 통해서 ios인 경우와 아닌경우를 나눠서 iconName + ~ 이런식으로 쉽게 설정하도록 해줬다. 
                    return (
                        <Ionicons 
                            name={iconName} 
                            color={focused ? "white" : "grey"} 
                            size={26}
                        />
                    );
                }
            })}
            tabBarOptions={{
            showLabel: false,
            style: {
                backgroundColor: "black",
                borderTopColor: "black"
            }
        }}>
        <Tabs.Screen name="Movies" component={Movies} />
        <Tabs.Screen name="TV" component={Tv} />
        <Tabs.Screen name="Search" component={Search} />
        <Tabs.Screen name="Discovery" component={Favs} />
        </Tabs.Navigator>
    );
};
// name 값들은 tab의 항목 이름이다. 

// navigetor 안에 있는 모든 screen은 navigation prop을 갖는다. 그리고, 그 navigation prop은 나에게 조종하게 
// 허용하게 하는것 뿐만 아니라, 부모 navigator랑 소통할 수 있게도 해준다. 
// 즉, Stack.js 에 있는 tab요소들이 부모가 되는것. 
// 지금 tab navigation이 stack navigation의 자식이기 때문에 그 tab navigation은 prop navigation을 갖는다. 
// 그리고 이건 우리가 몇몇 옵션들을 지정할 수 있다는 의미이다. 
// 그리고 이 옵션들 중 하나는, navigation.setOption({})