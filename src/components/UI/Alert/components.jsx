import styled from 'styled-components';
import Types from './Types.config';

export const Container = styled.div`
  display: flex;
  background-color: #${Types[type].color};
  padding: 15px;
  margin-bottom: 16px;
  color: #fff;
  border-radius: 4px;
  width: 15vw;
`;

export const IconContent = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
`;

export const MessageContent = styled.div`
  flex-grow: 1;
`;

export const TitleContainer = styled.div`
  display: flex;
`;

export const Title = styled.span`
  font-weight: bold;
  margin-bottom: 4px;
  font-size: 16px;
  flex-grow: 1;
`;

export const Icon = styled.i`
  cursor: pointer;
  font-size: 14px;
`;

export const Description = styled.span`
  font-size: 14px;
  display: block;
`;
