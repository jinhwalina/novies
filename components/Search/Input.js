import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";

const TextInput = styled.TextInput`
    background-color: white;
    margin: 0px 30px;
    padding: 10px 10px;
    border-radius: 15px;
    margin-bottom: 50px;
`;

const Input = ({placeholder, value, onChange, onSubmit}) => (
    <TextInput 
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        onSubmitEditing={onSubmit} 
        returnKeyType={"search"} /> // keyType을 search로 설정해주면, 키보드에 버튼이 검색으로 바뀐다. 
    
    
);

Input.propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired

}

export default Input;