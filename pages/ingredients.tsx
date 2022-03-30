import Button from "@/atoms/button";
import Title from "@/atoms/title";
import Seo from "@/molecules/seo";
import Table from "@/molecules/table";
import Layout from "@/organisms/layout";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Ingredients: NextPage = ({ ingredients }) => {
  console.log(ingredients);

  return (
    <>
      <Seo title="Ingredients"></Seo>
      <Layout translations={""}>
        <Title>Ingredients</Title>

        <div className="actions my-4">
          <Link href="/ingredient/add" passHref>
            <Button type="secondary">Add Ingredient</Button>
          </Link>
        </div>

        <Table
          body={ingredients.rows}
          height="70vh"
          minus={["id", "isComplete", "Foods"]}
        />
      </Layout>
    </>
  );
};

export default Ingredients;

export async function getServerSideProps(context) {
  const ingredientRes = await fetch(
    process.env.API_URL + "ingredients" || "http://localhost:5000"
  );
  const ingredients = await ingredientRes.json();

  return {
    props: { ingredients }, // will be passed to the page component as props
  };
}