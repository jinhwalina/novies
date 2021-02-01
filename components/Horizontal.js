import React from 'react';
import PropTypes from "prop-types";
import styled from 'styled-components/native';
import Poster from './Poster';
import Votes from './Votes';
import { apiImage } from '../api';
import { trimText } from '../utils';
import { TouchableOpacity } from 'react-native';

const Container = styled.View`
    padding: 0 30px;
    margin-bottom: 30px;
    flex-direction: row;
    align-items: flex-start;
`;

const Data = styled.View`
    align-items: flex-start;
    width: 60%;
    margin-left: 25px;
`;

const Title = styled.Text`
    color: white;
    font-weight: bold;
    margin-bottom: 10px;
`;

const ReleaseDate = styled.Text`
    margin-vertical: 10px;
    color: white;
    font-size: 12px;
`;

const Overview = styled.Text`
    color: white;
    margin-top: 10px;
`;

const Horizontal = ({ id, title, overview, poster, releaseDate}) => (
    <TouchableOpacity>
        <Container>
            <Poster url={poster}/>
            <Data>
                <Title>{trimText(title, 30)}</Title>
                {releaseDate ? <ReleaseDate>{releaseDate}</ReleaseDate> : null}
                <Overview>{trimText(overview, 130)}</Overview>
            </Data>
        </Container>
    </TouchableOpacity>
);

Horizontal.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    releaseDate: PropTypes.string,
    votes: PropTypes.number.isRequired,
    overview: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired
}

export default Horizontal;