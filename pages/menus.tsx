import Button from "@/atoms/button";
import Title from "@/atoms/title";
import Seo from "@/molecules/seo";
import Table from "@/molecules/table";
import Layout from "@/organisms/layout";
import authMiddleware from "middlewares/auth";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";

interface IMenusPage {
  menus: IRowsCount<IMenus>;
}

const MenusPage: NextPage<IMenusPage> = ({ menus }) => {
  return (
    <>
      <Seo title="Menus"></Seo>
      <Layout translations={""}>
        <Title>Menus</Title>

        <div className="actions my-4">
          <Link href="/menus/add" passHref>
            <Button type="secondary">Add Menu</Button>
          </Link>
        </div>

        <Table
          body={menus.rows}
          height="70vh"
          minus={["id", "UserId"]}
          actions={true}
          tablePath="menus/"
        />
      </Layout>
    </>
  );
};

export default MenusPage;
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const auth = authMiddleware(req.headers.cookie || "");
  if (auth.auth) {
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
      props: { menus }, // will be passed to the page component as props
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
