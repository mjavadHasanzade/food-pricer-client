import Title from "@/atoms/title";
import Detail from "@/molecules/detail";
import Seo from "@/molecules/seo";
import Layout from "@/organisms/layout";
import type { GetServerSideProps, NextPage } from "next";
import styled from "styled-components";
import { MdOutlineGrain, MdShoppingCart } from "react-icons/md";
import { GiHotMeal } from "react-icons/gi";
import { AiFillStar } from "react-icons/ai";
import theme from "@/utils/theme";
import Table from "@/molecules/table";
import authMiddleware from "middlewares/auth";

interface IHome {
  foods: IRowsCount<IFood>;
  ingredients: IRowsCount<IIngredient>;
  menus: IRowsCount<IMenus>;
}

const Home: NextPage<IHome> = ({ foods, ingredients, menus }) => {
  return (
    <>
      <Seo title="Home"></Seo>
      <Layout translations={""}>
        <Title>Overview</Title>
        <DetailsContainer>
          <Detail
            title="Ingredients"
            color={Math.floor(Math.random() * 16777215).toString(16)}
            qty={ingredients.count}
          >
            <MdOutlineGrain />
          </Detail>
          <Detail
            title="Foods"
            color={Math.floor(Math.random() * 16777215).toString(16)}
            qty={foods.count}
          >
            <GiHotMeal />
          </Detail>
          <Detail
            title="Menu"
            color={Math.floor(Math.random() * 16777215).toString(16)}
            qty={menus.count}
          >
            <AiFillStar />
          </Detail>
          <Detail
            title="Orders"
            color={Math.floor(Math.random() * 16777215).toString(16)}
            qty={452}
          >
            <MdShoppingCart />
          </Detail>
        </DetailsContainer>

        <Tables className="row">
          <div className="col-12">
            <Title className="mt-3" hasBorder={false} important="secondary">
              Details
            </Title>
          </div>
          <div className="col-md-4">
            <Table
              title="Foods"
              body={foods.rows}
              minus={[
                "id",
                "priceByRestaurant",
                "createdAt",
                "updatedAt",
                "Ingredients",
                "UserId",
              ]}
              tablePath="/foods"
              height="60vh"
            ></Table>
          </div>
          <div className="col-md-4">
            <Table
              title="Ingredients"
              body={ingredients.rows}
              minus={[
                "id",
                "isComplete",
                "createdAt",
                "updatedAt",
                "Foods",
                "UserId",
              ]}
              height="60vh"
              tablePath="/ingredients"
            ></Table>
          </div>
          <div className="col-md-4">
            <Table
              title="Menus"
              body={menus.rows}
              minus={["UserId", "Foods", "id", "createdAt", "updatedAt"]}
              height="60vh"
              tablePath="/menus"
            ></Table>
          </div>
        </Tables>
      </Layout>
    </>
  );
};

export default Home;

const DetailsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0.75rem 0;
  border-bottom: 1px solid ${theme.colors.primary};
`;

const Tables = styled.div``;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const auth = authMiddleware(req.headers.cookie || "");
  if (auth.auth) {
    try {
      const foodRes = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "foods" || "http://localhost:5000",
        {
          headers: {
            "x-auth": auth.token,
          },
        }
      );
      const foods = await foodRes.json();

      const ingredientRes = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "ingredients" ||
          "http://localhost:5000",
        {
          headers: {
            "x-auth": auth.token,
          },
        }
      );
      const ingredients = await ingredientRes.json();

      const menusRes = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "menus" || "http://localhost:5000",
        {
          headers: {
            "x-auth": auth.token,
          },
        }
      );
      const menus = await menusRes.json();

      return {
        props: { foods, ingredients, menus }, // will be passed to the page component as props
      };
    } catch (error) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
        props: {},
      };
    }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }
};
