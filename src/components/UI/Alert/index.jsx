import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Alert({ close, type, title, children }) {
  const TypeConfigs = {
    default: {
      title: 'Notificación',
      color: 'CCCCCC',
      icon: 'fa-question-circle',
    },
    success: {
      title: 'Éxito',
      color: '00C781',
      icon: 'fa-check-circle',
    },
    error: {
      title: 'Error',
      color: 'FF4040',
      icon: 'fa-times-circle',
    },
    info: {
      title: 'Info',
      color: '3923ff',
      icon: 'fa-info-circle',
    },
    warn: {
      title: 'Advertencia',
      color: 'FFAA15',
      icon: 'fa-exclamation-circle',
    },
  };

  const Container = styled.div`
    display: flex;
    background-color: #${TypeConfigs[type].color};
    padding: 15px;
    margin-bottom: 16px;
    color: #fff;
    border-radius: 4px;
    width: 15vw;
  `;

  const IconContent = styled.div`
    display: flex;
    align-items: center;
    margin-right: 15px;
  `;

  const MessageContent = styled.div`
    flex-grow: 1;
  `;

  const TitleContainer = styled.div`
    display: flex;
  `;

  const Title = styled.span`
    font-weight: bold;
    margin-bottom: 4px;
    font-size: 16px;
    flex-grow: 1;
  `;

  const Icon = styled.i`
    cursor: pointer;
    font-size: 14px;
  `;

  const Description = styled.span`
    font-size: 14px;
    display: block;
  `;

  return (
    <Container>
      <IconContent>
        <i className={`fas ${TypeConfigs[type].icon}`} onClick={close}></i>
      </IconContent>
      <MessageContent>
        <TitleContainer>
          <Title>{title !== undefined ? title : TypeConfigs[type].title}</Title>
          <Icon className="fas fa-times" onClick={close}></Icon>
        </TitleContainer>
        <Description>{children}</Description>
      </MessageContent>
    </Container>
  );
}

Alert.propTypes = {
  close: PropTypes.func.isRequired,
  type: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Alert.defaultProps = {
  type: 'default',
};

export default Alert;
