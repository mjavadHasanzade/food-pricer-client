import Title from "@/atoms/title";
import objectExtracter from "@/utils/objectExtracter";
import theme from "@/utils/theme";
import React, { FC, useState } from "react";
import styled from "styled-components";
import { BiPencil } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";
import { getAxiosInstanse } from "api/api";
import Link from "next/link";
import { useToasts } from "react-toast-notifications";
import generateDate from "@/utils/generateDate";

type Props = {
  head?: Array<string>;
  minus?: Array<string>;
  body: any;
  height?: string;
  title?: string;
  tablePath: string;
  actions?: boolean;
};

interface ITableRows {
  cols: number;
  actions: boolean;
}

const Table: FC<Props> = ({
  body,
  head,
  height = "auto",
  title,
  minus = [""],
  actions = false,
  tablePath,
}) => {
  const [tableBody, setTableBody] = useState(body);
  const { addToast } = useToasts();

  if (minus.length >= 1) {
    head = objectExtracter(tableBody.length > 1 ? tableBody[0] : {}, minus);
  } else {
    head = objectExtracter(tableBody[0], [""]);
  }

  let cols = head.length;

  const deleteItem = (path: string, id: number | string) => {
    getAxiosInstanse()
      .delete(path + id)
      .then((res) => {
        addToast(res.data.message, { appearance: "success" });
        getAxiosInstanse()
          .get(path)
          .then((res2) => setTableBody(res2.data.rows));
      })
      .catch((err) => {
        console.log(err);
        try {
          addToast(err.response.data.message, { appearance: "error" });
        } catch (error) {
          addToast("Something went wrong", { appearance: "error" });
        }
      });
  };

  return (
    <div>
      {title && (
        <Title className="p-0" important="thired" hasBorder={false}>
          {title}
        </Title>
      )}
      <TableContainerST height={height}>
        <TableHead actions={actions} cols={cols}>
          <span>#</span>
          {head.length > 0 &&
            head.map((headItem, index: number) => (
              <span key={index}>{headItem}</span>
            ))}
        </TableHead>

        {tableBody.length <= 0 && <NetFoundText>No Items Found</NetFoundText>}

        {tableBody.map((item: any, index: number) => (
          <TableItem actions={actions} key={index} cols={cols}>
            <span>{index + 1}</span>
            {head &&
              head.length > 0 &&
              head.map((headItem: any, i) => (
                <span key={i}>
                  {headItem === "createdAt" || headItem === "updatedAt"
                    ? generateDate(item[headItem],true)
                    : item[headItem]}
                </span>
              ))}
            {actions && (
              <>
                <span className="actions">
                  <Link href={tablePath + item.id} passHref>
                    <button className="edit">
                      <BiPencil />
                    </button>
                  </Link>
                </span>
                <span className="actions">
                  <button
                    className="delete"
                    onClick={() => deleteItem(tablePath, item.id)}
                  >
                    <FiTrash2 />
                  </button>
                </span>
              </>
            )}
          </TableItem>
        ))}
      </TableContainerST>
    </div>
  );
};

export default Table;

interface ITableContainerST {
  height: string;
}

export const TableContainerST = styled.div<ITableContainerST>`
  display: flex;
  position: relative;
  flex-direction: column;
  height: ${(props) => props.height};
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 0 8px;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    background-color: ${theme.colors.bgwhiteSmoke};
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.primary};
    border-radius: 5px;
  }
`;
const TableItem = styled.span<ITableRows>`
  display: flex;
  border-bottom: 1px solid ${theme.colors.primary}40;

  span {
    padding: 0.6rem 0;
    flex: 0 0
      calc(
        ${(props) => (props.actions ? "85%" : "95%")} /
          ${(props) => (props.cols ? props.cols : 1)}
      );
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

    &.actions {
      flex: 0 0 5%;

      button {
        border: none;
        padding: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        color: #fff;

        &.edit {
          background-color: #33b9f3;
        }

        &.delete {
          background-color: #fa5c34;
        }
      }
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
