import Button from "@/atoms/button";
import Title from "@/atoms/title";
import Seo from "@/molecules/seo";
import Table from "@/molecules/table";
import Layout from "@/organisms/layout";
import authMiddleware from "middlewares/auth";
import type { GetServerSideProps, NextPage } from "next";
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
          minus={["id", "Ingredients", "UserId"]}
          actions={true}
          tablePath="foods/"
        />
      </Layout>
    </>
  );
};

export default Ingredients;
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const auth = authMiddleware(req.headers.cookie || "");
  if (auth.auth) {
    const ingredientRes = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "foods" || "http://localhost:5000",
      {
        headers: {
          "x-auth": auth.token,
        },
      }
    );
    const ingredients = await ingredientRes.json();
    return {
      props: { ingredients }, // will be passed to the page component as props
    };
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
