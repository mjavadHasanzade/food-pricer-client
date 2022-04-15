import Button from "@/atoms/button";
import Title from "@/atoms/title";
import Seo from "@/molecules/seo";
import Table from "@/molecules/table";
import Layout from "@/organisms/layout";
import type { NextPage } from "next";
import Link from "next/link";

interface IIngredients {
  ingredients: IRowsCount<IFood>;
}

const Ingredients: NextPage<IIngredients> = ({ ingredients }) => {
  return (
    <>
      <Seo title="Foods"></Seo>
      <Layout translations={""}>
        <Title>Foods</Title>

        <div className="actions my-4">
          <Link href="/foods/add" passHref>
            <Button type="secondary">Add Food</Button>
          </Link>
        </div>

        <Table
          body={ingredients.rows}
          height="70vh"
          minus={["id", "Ingredients"]}
          actions={true}
          tablePath="foods/"
        />
      </Layout>
    </>
  );
};

export default Ingredients;

export async function getServerSideProps() {
  const ingredientRes = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "foods" || "http://localhost:5000"
  );
  const ingredients = await ingredientRes.json();

  return {
    props: { ingredients }, // will be passed to the page component as props
  };
}
