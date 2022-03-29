import Title from "@/atoms/title";
import Detail from "@/molecules/detail";
import Seo from "@/molecules/seo";
import Layout from "@/organisms/layout";
import type { NextPage } from "next";
import styled from "styled-components";
import { MdOutlineGrain, MdShoppingCart } from "react-icons/md";
import { GiHotMeal } from "react-icons/gi";
import { AiFillStar } from "react-icons/ai";
import theme from "@/utils/theme";
import Table from "@/molecules/table";

const Home: NextPage = ({ foods, ingredients }) => {
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
            qty={2}
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
              ]}
              height="60vh"
            ></Table>
          </div>
          <div className="col-md-4">
            <Table
              title="Ingredients"
              body={ingredients.rows}
              minus={["id", "isComplete", "createdAt", "updatedAt", "Foods"]}
              height="60vh"
            ></Table>
          </div>
          <div className="col-md-4">
            <Table
              title="Menus"
              body={[]}
              head={["name", "isActive"]}
              height="60vh"
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
  padding: .75rem 0;
  border-bottom: 1px solid ${theme.colors.primary};
`;

const Tables = styled.div``;

export async function getServerSideProps(context) {
  const foodRes = await fetch(
    process.env.API_URL + "foods" || "http://localhost:5000"
  );
  const foods = await foodRes.json();

  const ingredientRes = await fetch(
    process.env.API_URL + "ingredients" || "http://localhost:5000"
  );
  const ingredients = await ingredientRes.json();

  return {
    props: { foods, ingredients }, // will be passed to the page component as props
  };
}
