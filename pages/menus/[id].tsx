import Button from "@/atoms/button";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Input from "@/atoms/input";
import Title from "@/atoms/title";
import Seo from "@/molecules/seo";
import Layout from "@/organisms/layout";
import { getAxiosInstanse } from "api/api";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import styled from "styled-components";
import theme from "@/utils/theme";
import { TableContainerST } from "@/molecules/table";
import Check from "@/atoms/check";
import { useAppContext } from "context/app-context";
import { getCookie } from "@/utils/setCookie";
import authMiddleware from "middlewares/auth";

const selectStyles = {
  control: (baseStyles: any, state: any) => ({
    ...baseStyles,
    background: "#fafafa",
    // match with the menu
    borderRadius: 5,
    cursor: "pointer",
    border: state.isSelected ? "1px solid #000" : "0.5px solid rgba(0,0,0,0.1)",
    outline: "none",
    borderWidth: 0.5,
    fontSize: 14,
    margin: "2rem 0 0 0",
    padding: ".3rem",
    "&:hover": {
      border: state.isFocused
        ? "1px solid rgba(0,0,0,1)"
        : "0.5px solid rgba(0,0,0,0.1)",
      boxShadow: state.isFocused ? "none" : "0.5px solid rgba(0,0,0,0.1)",
    },
    "&:focus": {
      border: "1px solid rgba(0,0,0,1)",
      boxShadow: "0 0 rgba(0,0,0,0.1)",
    },
  }),
  option: (baseStyles: any, state: any) => {
    return {
      ...baseStyles,
      color: state.isSelected ? "#fff" : "#000",
      fontSize: 14,
      background: state.isSelected ? theme.colors.primary : "#fff",
      cursor: state.isDisabled ? "not-allowed" : "pointer",
      "&:hover": {
        background: `${theme.colors.primary}33`,
      },
    };
  },
  dropdownIndicator: (base: any) => ({
    ...base,
    color: "#7B7B7B", // Custom colour
  }),
};

interface IAddOne {
  foods: IRowsCount<IFood>;
  menu: IMenus;
  id: number;
}

const AddOne: NextPage<IAddOne> = ({ foods: fds, menu, id }) => {
  const [name, setName] = useState<string>(menu.name);
  const [foods, setFoods] = useState<Array<IPostFood>>([]);
  const [choosenFoods, setChoosenFoods] = useState<Array<IFood>>(menu.Foods);
  const [isActiveMenu, setIsActiveMenu] = useState<Boolean>(menu.isActiveMenu);

  const router = useRouter();
  const { addToast } = useToasts();
  const { setLoaderActiver } = useAppContext();

  const animatedComponents = makeAnimated();

  useEffect(() => {
    const cfdArr: Array<IPostFood> = [];
    menu?.Foods.map((item) => {
      cfdArr.push({ foodId: item.id });
    });
    setFoods(cfdArr);
  }, []);

  const handleSelect = (selectedOption: any) => {
    if (selectedOption.length <= 0) {
      return setChoosenFoods([]);
    }
    const cfdArr: Array<IFood> = [];
    const fdArr: Array<IPostFood> = [];

    selectedOption.map((item: any) => {
      //@ts-ignore
      cfdArr.push(fds.rows.find((f) => f.id == item.id));
      //@ts-ignore
      fdArr.push({ foodId: fds.rows.find((f) => f.id == item.id)?.id });
    });
    setChoosenFoods(cfdArr);
    setFoods(fdArr);
    console.log({ fdArr });
  };

  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault();

    const food = {
      name,
      foods,
      isActiveMenu,
    };
    setLoaderActiver(true);
    await getAxiosInstanse()
      .put("menus/" + id, food, {
        headers: {
          "x-auth": getCookie("token"),
        },
      })
      .then((res) => {
        router.push("/menus");
        addToast(res.data.message, { appearance: "success" });
      })
      .catch((err) => {
        try {
          addToast(err.response.data.message, { appearance: "error" });
        } catch (error) {
          addToast("Something went wrong", { appearance: "error" });
        }
      })
      .finally(() => {
        setLoaderActiver(false);
      });
  };

  return (
    <>
      <Seo title={`Edit Menu ${name}`}></Seo>
      <Layout translations={""}>
        <Title>Edit Menu {name}</Title>
        <FormIng className="container">
          <div className="row">
            <div className="col-md-5">
              <div className="row">
                <div className="col-md-12">
                  <Input
                    name="name"
                    placeHolder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="col-md-12">
                  <Check
                    label="is Active Menu"
                    name="isActiveMenu"
                    onChange={() => setIsActiveMenu(!isActiveMenu)}
                  />
                </div>
                <div className="col-md-12 text-center">
                  <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={fds.rows}
                    defaultValue={choosenFoods}
                    onChange={handleSelect}
                    styles={selectStyles}
                    instanceId={"food_ingss"}
                    //@ts-ignore
                    getOptionLabel={(option) => option.name}
                    //@ts-ignore
                    getOptionValue={(option) => option.id}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <TableContainerST height="60vh">
                <TableHead>
                  <span>#</span>
                  <span>Name</span>
                  <span>Price</span>
                </TableHead>
                {choosenFoods.length <= 0 && (
                  <NetFoundText>No Items Found</NetFoundText>
                )}
                {choosenFoods.length > 0 &&
                  choosenFoods.map((item, index) => {
                    return (
                      <TableItem key={index}>
                        <span>{index + 1}</span>
                        <span>{item.name}</span>
                        <span>{item.priceByRestaurant}</span>
                      </TableItem>
                    );
                  })}
              </TableContainerST>
            </div>
          </div>
          <Button onClick={(e) => handleForm(e)}>Save</Button>
        </FormIng>
      </Layout>
    </>
  );
};

export default AddOne;

const FormIng = styled.form`
  max-width: 85%;
`;

const TableItem = styled.span`
  display: flex;
  border-bottom: 1px solid ${theme.colors.primary}40;

  span {
    padding: 0.6rem 0;
    flex: 0 0 calc(70% / 3);
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 0.9rem;
    display: flex;
    justify-content: center;
    align-items: center;

    &:first-child {
      flex: 0 0 5%;
      border-bottom: 0;
    }
    &:last-child {
      flex: 0 0 25%;
      border-bottom: 0;
    }

    input {
      width: 100%;
    }
  }
`;

const TableHead = styled(TableItem)`
  position: sticky;
  top: 0;
  background-color: #fff;
  border-bottom: 2px solid ${theme.colors.primary};
`;

const NetFoundText = styled.p`
  color: ${theme.colors.texts};
  justify-self: center;
  align-self: center;
  font-size: 0.9rem;
  letter-spacing: 0.75px;
  margin-top: 2rem;
`;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  const auth = authMiddleware(req.headers.cookie || "");
  if (auth.auth) {
    const menuRes = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "menus/" + params.id ||
        "http://localhost:5000",
      {
        headers: {
          "x-auth": auth.token,
        },
      }
    );
    const menu = await menuRes.json();

    const foodsRes = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "foods/" || "http://localhost:5000",
      {
        headers: {
          "x-auth": auth.token,
        },
      }
    );
    const foods = await foodsRes.json();

    return {
      props: { menu, foods, id: params.id }, // will be passed to the page component as props
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
