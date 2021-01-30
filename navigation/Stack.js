import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Tabs from "./Tabs";
import Detail from "../screens/Detail";

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator>
        <Stack.Screen name="Tabs" component={Tabs} /> 
        <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
    // screen 은 그냥 단순히 component 일뿐! screen은 props를 보낸다 
)