import theme from "@/utils/theme";
import Link from "next/link";
import React, { useEffect } from "react";
import styled from "styled-components";
import { BiBarChartSquare } from "react-icons/bi";
import { IoIosNutrition } from "react-icons/io";
import { GiMeal } from "react-icons/gi";
import { TiDocumentText } from "react-icons/ti";
import { useRouter } from "next/router";
import { useAppContext } from "context/app-context";

type Props = {};

const Sidebar = (props: Props) => {
  const router = useRouter();
  const { setLoaderActiver, loaderActive } = useAppContext();

  useEffect(() => {
    const Parallaxify = require("pure-parallaxify").default;
    const NewParallaxify = new Parallaxify(
      {
        positionProperty: "transform",
      },
      "#my-wrapper"
    );
    return () => NewParallaxify.destroy();
  }, []);

  return (
    <SidebarContainerST>
      <PLWrapper id="my-wrapper">
        <ImgMain
          className={loaderActive ? "active" : ""}
          src="/img/pizza-main.png"
          data-parallaxify-range-x="-75"
          data-parallaxify-range-y="-75"
          onClick={() => setLoaderActiver(!loaderActive)}
        />
      </PLWrapper>
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

const PLWrapper = styled.div`
  width: 70%;
  margin: 0 auto;
`;

const ImgMain = styled.img`
  width: 100%;
  height: auto;
  box-shadow: 0 0 20px -10px ${theme.colors.primary};
  border-radius: 50%;
  margin: 2rem auto;
  transition: 0.5s ease all;

  @keyframes rote {
    0% {
      transform: rotateZ(0deg);
    }
    50% {
      transform: rotateZ(180deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }

  &.active {
    animation: rote 2s ease infinite;
  }
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
