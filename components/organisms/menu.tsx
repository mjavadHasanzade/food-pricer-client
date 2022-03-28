import theme from "@/utils/theme";
import React from "react";
import styled from "styled-components";

type Props = {};

const Menu = (props: Props) => {
  return (
    <NavbarContainerST>
      <Brand>
        <span className="semiLogo">FP</span>
        <p>Food Pricer</p>
      </Brand>
      <UserArea>
        <UserImage src="/img/user.jpg" />
        <p>John Doe</p>
      </UserArea>
    </NavbarContainerST>
  );
};

export default Menu;

const NavbarContainerST = styled.div`
  padding: 0.75rem 2rem;
  background-color: ${theme.colors.primary};
  display: flex;
`;

const Brand = styled.div`
  display: flex;
  align-items: center;

  .semiLogo {
    background-color: ${theme.colors.white};
    color: ${theme.colors.primary};
    padding: 0.5rem 0.6rem;
    margin: 0 0.25rem;
    border-radius: 50%;
    font-weight: 700;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 35px;
  }

  p {
    font-size: 0.8rem;
    margin: 0 0.5rem;
    color: ${theme.colors.white};
  }
`;

const UserArea = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;

  p {
    font-size: 0.8rem;
    margin: 0 0.75rem;
    color: ${theme.colors.white};
  }
`;

const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
