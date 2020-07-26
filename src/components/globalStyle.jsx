import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
background-color: ${props => props.theme.mode === 'dark' ? '#000' : '#fff'};
color: ${props => props.theme.mode === 'dark' ? '#fff' : '#000'};
}
.list-group-item {
background-color: ${props => props.theme.mode === 'dark' ? '#000' : '#fff'};
color: ${props => props.theme.mode === 'dark' ? '#fff' : '#000'};
border: 1px solid ${props => props.theme.mode === 'dark' ? '#fff' : '#000'};
}
.jumbotron {
background-color: ${props => props.theme.mode === 'dark' ? '#696969' : '#D1D1D1'};
}
`;

export default GlobalStyle;