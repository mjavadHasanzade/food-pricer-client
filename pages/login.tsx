import Seo from "@/molecules/seo";
import Layout from "@/organisms/layout";
import type { GetServerSideProps, NextPage } from "next";
import styled from "styled-components";
import theme from "@/utils/theme";
import Input from "@/atoms/input";
import Button from "@/atoms/button";
import { useState } from "react";
import { getAxiosInstanse } from "api/api";
import { useToasts } from "react-toast-notifications";
import authMiddleware from "middlewares/auth";
import { setCookie } from "@/utils/setCookie";
import { useRouter } from "next/router";

interface ILogin {
  foods: IRowsCount<IFood>;
  ingredients: IRowsCount<IIngredient>;
}

const Login: NextPage<ILogin> = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const { addToast } = useToasts();
  const { push } = useRouter();

  async function handleLogin() {
    await getAxiosInstanse()
      .post("user/login", { email, password })
      .then((res) => {
        setCookie("token", res.data.token, 4);
        addToast(res.data.message, { appearance: "success" });
        push("/");
      })
      .catch((err) => {
        try {
          addToast(err.response.data.message, { appearance: "error" });
        } catch (error) {
          addToast("Something went wrong", { appearance: "error" });
        }
      });
  }

  return (
    <>
      <Seo title="Login"></Seo>
      <Layout translations={""} isLogin={false}>
        <LoginContainer>
          <div className="loginBox">
            <h3>Login To Your Account</h3>
            <Input
              name="Email"
              placeHolder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              name="Password"
              placeHolder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="primary"
              style={{ marginTop: "1rem", width: "100%" }}
              onClick={() => handleLogin()}
            >
              Submit
            </Button>
          </div>
        </LoginContainer>
      </Layout>
    </>
  );
};

export default Login;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .loginBox {
    border: 1px solid ${theme.colors.primary};
    padding: 1rem;
    border-radius: 8px;
  }
`;
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const auth = authMiddleware(req.headers.cookie || "");
  if (auth.auth) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  } else {
    return {
      props: {},
    };
  }
};
