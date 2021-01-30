import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Tabs from "./Tabs";
import Detail from "../screens/Detail";

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: "black",
            borderBottomColor: "black",
            shadowColor: "black"
        },
        headerTintColor: "white",
        headerBackTitleVisible: false // detail 화면에서 뒤로 갈 때, 타이틀의 이름을 숨겨준다
    }}>
        <Stack.Screen name="Tabs" component={Tabs} /> 
        <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
    // screen 은 그냥 단순히 component 일뿐! screen은 props를 보낸다 
);