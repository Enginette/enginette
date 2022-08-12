import styled from "styled-components";

const HeaderDiv = styled.div`
    height: 73px;
    width: 100%;
    background-color: white;
    border-radius: 20px;
`;

const Header = () => {
    return (
        <HeaderDiv> 
            <h1>hello world</h1>
        </HeaderDiv>
    );
};

export default Header;
