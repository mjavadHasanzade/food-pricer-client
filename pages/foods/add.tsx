import Button from "@/atoms/button";
import Select, { OnChangeValue } from "react-select";
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
  valueContainer: (provided: any, state: any) => ({
    ...provided,
    flexWrap: "nowrap",
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

interface IAddNew {
  ingredients: IRowsCount<IIngredient>;
}

const AddNew: NextPage<IAddNew> = ({ ingredients: ings }) => {
  const [name, setName] = useState("");
  const [priceByRestaurant, setPriceByRestaurant] = useState<number>(0);
  const [priceByIngredient, setPriceByIngredient] = useState<number>(0);

  const [selectIngredients, setSelectIngredients] = useState<Array<ISelects>>(
    []
  );

  const [choosenIngredient, setChoosenIngredient] = useState<
    Array<IIngredient>
  >([]);

  const [ingredients, setIngredients] = useState<Array<IPostIngredient>>([]);
  const [benefit, setBenefit] = useState<number>(0);
  const router = useRouter();
  const { addToast } = useToasts();

  const animatedComponents = makeAnimated();

  useEffect(() => {
    const ingArr: Array<ISelects> = [];
    ings.rows.map((item: any) => {
      ingArr.push({ value: item.id, label: item.name });
    });
    setSelectIngredients(ingArr);
  }, [ings.rows]);

  const handleChangeInputs = (
    e: React.ChangeEvent<HTMLInputElement>,
    isComplete: boolean
  ) => {
    const chosenIngs: Array<IIngredient> = [...choosenIngredient];
    const ingredientArray: Array<IPostIngredient> = [...ingredients];
    let pBI = 0;

    let index = ingredientArray.findIndex(
      (itm) => itm.ingId == Number(e.target.name)
    );

    if (index >= 0) {
      let indexFinded = ingredientArray[index];
      indexFinded.qty = Number(e.target.value);
      ingredientArray[index] = indexFinded;
      chosenIngs.map((item) => {
        if (item.id == Number(e.target.name)) {
          item.qty = Number(e.target.value);
        }
      });
    } else {
      ingredientArray.push({
        ingId: Number(e.target.name),
        qty: Number(e.target.value),
      });
      chosenIngs.map((item) => {
        if (item.id == Number(e.target.name)) {
          item.qty = Number(e.target.value);
        }
      });
      setIngredients(ingredientArray);
    }

    choosenIngredient.map((item) => {
      pBI += Math.floor(
        Number(item.price) *
          Number(item.qty ? item.qty / (isComplete ? 1 : 1000) : 0)
      );
    });
    setPriceByIngredient(pBI);
    if (!priceByRestaurant) {
      addToast("Fill Price By resaurant to calculate the benefit", {
        appearance: "info",
      });
    } else {
      let bnft = priceByRestaurant / pBI;
      setBenefit(Math.floor((bnft == 0 ? 0 : bnft - 1) * 100));
    }
  };

  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const ingredient = {
      name,
      priceByRestaurant,
      priceByIngredient,
      ingredients,
      benefit,
    };

    await getAxiosInstanse()
      .post("foods", ingredient)
      .then((res) => {
        router.push("/foods");
        addToast(res.data.message, { appearance: "success" });
      })
      .catch((err) => {
        try {
          addToast(err.response.data.message, { appearance: "error" });
        } catch (error) {
          addToast("Something went wrong", { appearance: "error" });
        }
      });
  };

  const handleSelect = (selectedOption: any) => {
    if (selectedOption.length <= 0) {
      setIngredients([]);
      return setChoosenIngredient([]);
    }
    const ingArr: Array<IIngredient> = [];
    selectedOption.map((item: any) => {
      //@ts-ignore
      return ingArr.push(ings.rows.find((f) => f.id == item.value));
    });
    setChoosenIngredient(ingArr);
  };

  const handlePriceByResturant = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceByRestaurant(Number(e.target.value));
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!priceByIngredient) {
        addToast("Choose ingredients to calculate the benefit", {
          appearance: "info",
        });
      } else {
        let bnft = priceByRestaurant / priceByIngredient;
        setBenefit(Math.floor((bnft == 0 ? 0 : bnft - 1) * 100));
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [priceByRestaurant]);

  const handleBenefit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBenefit(Number(e.target.value));
    console.log(Number(e.target.value) / 100);

    setPriceByRestaurant(
      priceByIngredient + (Number(e.target.value) / 100) * priceByIngredient
    );
  };

  return (
    <>
      <Seo title="Foods"></Seo>
      <Layout translations={""}>
        <Title>Add New Food</Title>
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
                <div className="col-12">
                  <Input
                    name="priceByRestaurant"
                    placeHolder="Price By Restaurant (Auto fill by Benefit)"
                    value={priceByRestaurant}
                    onChange={handlePriceByResturant}
                    type={"number"}
                  />
                </div>
                <div className="col-12">
                  <Input
                    name="priceByIngredient"
                    placeHolder="Price By Ingredient"
                    value={priceByIngredient}
                    readOnly
                    type={"number"}
                  />
                </div>
                <div className="col-md-12">
                  <Input
                    name="benefit"
                    placeHolder="Benefit (Auto fill by Price By Resaurant and Ingredients)"
                    value={benefit}
                    onChange={(e) => {
                      handleBenefit(e);
                    }}
                    className="mx-auto"
                    type={"number"}
                  />
                </div>
                <div className="col-md-12 text-center">
                  <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={selectIngredients}
                    onChange={handleSelect}
                    styles={selectStyles}
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
                  <span>Is Complete</span>
                  <span>Quantity</span>
                </TableHead>
                {choosenIngredient.length <= 0 && (
                  <NetFoundText>No Items Found</NetFoundText>
                )}
                {choosenIngredient.length > 0 &&
                  choosenIngredient.map((item, index) => {
                    return (
                      <TableItem key={index}>
                        <span>{index + 1}</span>
                        <span>{item.name}</span>
                        <span>{item.price}</span>
                        <span>
                          <Check
                            checked={Boolean(item.isComplete)}
                            label=""
                            name="iC"
                            disabled
                          />
                        </span>
                        <span>
                          <input
                            type={"number"}
                            name={String(item.id)}
                            step={"1"}
                            onChange={(e) =>
                              handleChangeInputs(
                                e,
                                item.isComplete ? item.isComplete : false
                              )
                            }
                            onKeyDown={
                              item.isComplete
                                ? (event) =>
                                    event.key === "."
                                      ? event.preventDefault()
                                      : null
                                : () => null
                            }
                          />
                        </span>
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

export default AddNew;

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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const ingredientsRes = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "ingredients/" || "http://localhost:5000"
  );
  const ingredients = await ingredientsRes.json();

  return {
    props: { ingredients }, // will be passed to the page component as props
  };
};
