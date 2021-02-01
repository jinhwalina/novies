import React from 'react';
import PropTypes from "prop-types";
import styled from 'styled-components/native';
import Poster from './Poster';
import Votes from './Votes';
import { apiImage } from '../api';

const Container = styled.View``;
const Title = styled.Text`
    color: white;
`;

const Vertical = ({poster, title, votes}) => (
    <Container>
        <Poster url={apiImage(poster)} />
        <Title>{title}</Title>
        <Votes vote={votes} />
    </Container>
)

Vertical.protoTypes = {
    poster: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired
}

export default Vertical;