import React, { FC } from "react";
import styled, {
  ThemeProvider,
  createGlobalStyle,
  css,
} from "styled-components";
import theme from "@/utils/theme";
import { media } from "@/utils/media";
import { useRouter } from "next/router";

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
  translations: any;
}

const Layout: FC<ILayout> = ({
  children,
  translations,
  isInnerPage = false,
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
      {children && <main>{children}</main>}
    </ThemeProvider>
  );
};

export default Layout;

