import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ message }) => (
    <div className="error">
        <h1>No job for this guy!</h1>
        <p>{message}</p>
    </div>
);

ErrorMessage.propTypes  = {
    message: PropTypes.string
}

ErrorMessage.defaultProps = {
    message: "There was an error"
}

export default ErrorMessage;
