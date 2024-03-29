import React, { FC } from "react";
import styled, {
  ThemeProvider,
  createGlobalStyle,
  css,
} from "styled-components";
import theme from "@/utils/theme";
import { media } from "@/utils/media";
import Menu from "@/organisms/menu";

import { useRouter } from "next/router";
import Sidebar from "./sidebar";

const GlobalStyle = createGlobalStyle`

    html, body {
    height: 100%;
    overflow-x: hidden;
    font-family: 'Inter', sans-serif !important;
    ${(props) =>
      // @ts-ignore
      !props.theme.rtl &&
      css`
        letter-spacing: -0.035em;
      `}
    
    ul{
        list-style: none;
    }
    
    ${(props) =>
      // @ts-ignore
      props.theme.rtl &&
      css`
        font-family: "IRANSansX", sans-serif !important;
        direction: rtl;
        text-align: right;
      `}
  }

  a{
      text-decoration: none;
      &:hover{
        text-decoration: none;
      }
  }

  .img-fluid {
    max-width: 100%;
    height: auto;
  }


  .bold-primary{
      color: ${theme.colors.primary};
      font-weight: bold;
  }

  .text-center{
      text-align:center !important;
  }

  .scrollHide{
    scrollbar-width: none;  /* Firefox */
    -ms-overflow-style: none;  /* IE and Edge */
    &::-webkit-scrollbar {
        display: none;
    }
  }

  .react-slidedown {
    transition-duration: .25s;
    transition-timing-function: ease-in-out;
   }

   
    .ReactModal__Overlay{
        background-color: rgba(0,0,0,.75) !important;
        z-index: 999;
    }

    .ReactModal__Content{
        @media ${media.sm}{
            padding: 2.5rem !important;
        }
    }

    input[type=number] {
        &::-webkit-inner-spin-button ,
        &::-webkit-outer-spin-button{
            -webkit-appearance: none;
            margin: 0;
        }

        -moz-appearance: textfield;
    }

      
  .mobVisible {
    @media ${media.sm}{
        display: none !important;
    }
  }
  .deskVisible {
    display: none !important;

    @media ${media.sm}{
        display: block !important;
    }
  }
`;

interface ILayout {
  children?: React.ReactNode;
  isInnerPage?: boolean;
  isLogin?: boolean;
  translations: any;
}

const Layout: FC<ILayout> = ({
  children,
  translations,
  isInnerPage = false,
  isLogin = true,
}) => {
  const { locale } = useRouter();
  const isRtl = locale === "fa";

  return (
    <ThemeProvider
      theme={{
        ...theme,
        rtl: isRtl,
      }}
    >
      <GlobalStyle />
      <Menu />
      {children && (
        <Main isLogin={isLogin}>
          {isLogin && <Sidebar />}
          <div className="childrenContent">{children}</div>
        </Main>
      )}
    </ThemeProvider>
  );
};

export default Layout;

interface IMain {
  isLogin: boolean;
}
const Main = styled.main<IMain>`
  display: flex;
  min-height: calc(100vh - 64px);
  .childrenContent {
    padding: 1rem 2rem;
    width: ${(props) => (props.isLogin ? "80%" : "100%")};
    flex: 0 0 ${(props) => (props.isLogin ? "80%" : "100%")};
  }
`;
