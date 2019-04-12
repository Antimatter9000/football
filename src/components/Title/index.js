import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ children }) => (
    <h1 tabIndex="0">{children}</h1>
)

Title.propTypes  = {
    children: PropTypes.string
}

export default Title;
