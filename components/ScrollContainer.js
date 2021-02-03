import React, { useState } from "react";
import PropTypes from "prop-types";
import { ActivityIndicator, RefreshControl, ScrollView } from 'react-native';

const ScrollContainer = ({loading, children, contentContainerStyle, refreshFn}) => {
    const [refreshing, setrefreshing] = useState(false);
    const onRefresh = async () => {
        setrefreshing(true);
        await refreshFn();
        setrefreshing(false);
    };
    return (
        <ScrollView 
            refreshControl={
                <RefreshControl 
                    onRefresh={onRefresh}
                    tintColor={"white"} 
                    refreshing={refreshing} 
                    enabled={false}
                />
            }
            style={{backgroundColor:"black"}}
            contentContainerStyle={{
                flex: loading ? 1 : 0,
                justifyContent: loading ? "center" : "flex-start",
                ...contentContainerStyle
            }}
        >
            {loading ? <ActivityIndicator color="white" size="small" /> : children}
        </ScrollView>
    )
};


ScrollContainer.propTypes = {
    loading: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    contentContainerStyle: PropTypes.object,
    refreshFn: PropTypes.func
};

export default ScrollContainer;