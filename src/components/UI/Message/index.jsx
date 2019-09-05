import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Message({ children }) {
  const Container = styled.div`
    background-color: red;
  `;

  return (
    <Container>
      <div>{children}</div>
    </Container>
  );
}

Message.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Message;
