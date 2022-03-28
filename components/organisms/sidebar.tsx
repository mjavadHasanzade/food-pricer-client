import theme from "@/utils/theme";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { BiBarChartSquare } from "react-icons/bi";
import { IoIosNutrition } from "react-icons/io";
import { GiMeal } from "react-icons/gi";
import { TiDocumentText } from "react-icons/ti";
import { useRouter } from "next/router";

type Props = {};

const Sidebar = (props: Props) => {
  const router = useRouter();

  return (
    <SidebarContainerST>
      <ImgMain src="/img/pizza-main.png" />
      <SidebarItemsST>
        <p className="pTitle">Menu</p>

        <Link href="/" passHref>
          <LinkItemST className={router.pathname == "/" ? "active" : ""}>
            <BiBarChartSquare className="icon" />
            <span>Home</span>
          </LinkItemST>
        </Link>
        <Link href="/ingredients" passHref>
          <LinkItemST
            className={router.pathname == "/ingredients" ? "active" : ""}
          >
            <IoIosNutrition className="icon" />
            <span>Ingredients</span>
          </LinkItemST>
        </Link>
        <Link href="/foods" passHref>
          <LinkItemST className={router.pathname == "/foods" ? "active" : ""}>
            <GiMeal className="icon" />
            <span>Foods</span>
          </LinkItemST>
        </Link>
        <Link href="/menus" passHref>
          <LinkItemST className={router.pathname == "/menus" ? "active" : ""}>
            <TiDocumentText className="icon" />
            <span>Menus</span>
          </LinkItemST>
        </Link>
      </SidebarItemsST>
    </SidebarContainerST>
  );
};

export default Sidebar;

const SidebarContainerST = styled.div`
  width: 20%;
  flex: 0 0 20%;
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;

const ImgMain = styled.img`
  width: 60%;
  height: auto;
  box-shadow: 0 0 20px -10px ${theme.colors.primary};
  border-radius: 50%;
  margin: 2rem auto;
`;

const SidebarItemsST = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  width: 100%;
  .pTitle {
    width: 100%;
    letter-spacing: 2px;
    margin: 1rem 0;
    color: ${theme.colors.primary};
    padding: 0 3rem;
  }
`;

const LinkItemST = styled.a`
  width: 100%;
  padding: 0.75rem 3rem;
  color: ${theme.colors.texts};
  border-radius: 0 8px 8px 0;
  font-size: 0.8rem;
  letter-spacing: 1px;
  transition: 0.3s ease all;

  span {
    margin: 0 0.5rem;
  }

  .icon {
    background-color: #f6fafb;
    color: ${theme.colors.primary};
    padding: 0.35rem;
    font-size: 1.8rem;
    border-radius: 12px;
  }

  &.active {
    color: ${theme.colors.primary};
    background-color: #f6fafb;
    border-left: 4px solid ${theme.colors.primary};

    .icon {
      color: #f6fafb;
      background-color: ${theme.colors.primary};
    }
  }
`;
