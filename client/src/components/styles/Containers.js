import styled from 'styled-components';

const ErrorStyles = styled.div`
  padding: 2rem;
  background: white;
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid red;
  p {
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 1rem;
  }
`;

const TextColumn = styled.div`
  width: 240px;
  /* margin: 30px auto; */
`;

const TextContainer = styled.div`
  width: 100%;
  padding: 20px;
  margin: 20px auto;
`;

const DnDColumn = styled.div`
  width: 600px;
  margin: 30px auto;
  padding: 20px;
  border: 3px solid ${props => props.theme.primary};
  background-color: #ccffff;
`;

const DnDContainer = styled.div`
  width: 100%;
  padding: 5px 20px;
  margin: auto;
  border: 35px solid ${props => props.theme.secondary};
  border-radius: 20px;
  background-color: #ffffb3;
  box-shadow: 5px 5px 15px #333;
`;

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
`;

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

export {
  ErrorStyles,
  TextColumn,
  TextContainer,
  DnDColumn,
  DnDContainer,
  StyledPage,
  Inner
}