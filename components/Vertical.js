import React from 'react';
import PropTypes from "prop-types";
import styled from 'styled-components/native';
import Poster from './Poster';
import Votes from './Votes';
import { apiImage } from '../api';
import { TouchableOpacity } from 'react-native';

const Container = styled.View`
    align-items: center;
    margin-right: 20px;
`;

const Title = styled.Text`
    color: white;
    font-weight: 500;
    margin: 10px 0px 5px 0px;
`;

const Vertical = ({poster, title, votes}) => (
    <TouchableOpacity>
        <Container>
            <Poster url={apiImage(poster)} />
            <Title>{title.length > 10 ? `${title.slice(0,10)}...` : title}</Title>
            <Votes votes={votes} />
        </Container>
    </TouchableOpacity>
    
)

Vertical.protoTypes = {
    poster: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired
}

export default Vertical;