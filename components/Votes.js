import React from 'react';
import PropTypes from "prop-types";
import styled from 'styled-components/native';

const Container = styled.Text`
    color: rgb(220, 220, 220);
    margin-bottom: 7px;
    font-size: 12px;
    font-weight: 500;
`;

const Votes = ({votes}) => <Container>⭐ {votes} / 10</Container>

export default Votes;