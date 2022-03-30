import Title from "@/atoms/title";
import objectExtracter from "@/utils/objectExtracter";
import theme from "@/utils/theme";
import React, { FC } from "react";
import styled from "styled-components";

type Props = {
  head?: Array<string>;
  minus?: Array<string>;
  body: any;
  height?: string;
  title?: string;
};

interface ITableRows {
  cols: number;
}

const Table: FC<Props> = ({
  body,
  head,
  height = "auto",
  title,
  minus = [""],
}) => {
  if (minus.length >= 1) {
    head = objectExtracter(body.length > 1 ? body[0] : {}, minus);
  } else {
    head = objectExtracter(body[0], [""]);
  }

  return (
    <div>
      {title && (
        <Title className="p-0" important="thired" hasBorder={false}>
          {title}
        </Title>
      )}
      <TableContainerST height={height}>
        <TableHead cols={head.length}>
          <span>#</span>
          {head.length > 0 &&
            head.map((headItem, index: number) => (
              <span key={index}>{headItem}</span>
            ))}
        </TableHead>

        {body.length <= 0 && <NetFoundText>No Items Found</NetFoundText>}

        {body.map((item: any, index: number) => (
          <TableItem
            key={index}
            cols={head && head.length > 0 ? head.length : 1}
          >
            <span>{index + 1}</span>
            {head &&
              head.length > 0 &&
              head.map((headItem: any, i) => (
                <span key={i}>{item[headItem]}</span>
              ))}
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

const TableContainerST = styled.div<ITableContainerST>`
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
    flex: 0 0 calc(95% / ${(props) => (props.cols ? props.cols : 1)});
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 0.9rem;

    &:first-child {
      flex: 0 0 5%;
      border-bottom: 0;
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
