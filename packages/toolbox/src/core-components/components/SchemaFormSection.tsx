import { CusProComponentsType } from "../../pro-components";
import {
  BetaSchemaForm,
  GridContext,
  ProFormColumnsType,
} from "@ant-design/pro-components";
import { Col, GetProps, Row } from "antd";
import { merge } from "lodash";
import { useContext } from "react";

export function SchemaFormSection<T, ValueType = CusProComponentsType>(props: {
  columns: ProFormColumnsType<T, ValueType>[];
  rowProps?: GetProps<typeof Row>;
  colProps?: GetProps<typeof Col>;
}) {
  const { columns, rowProps, colProps } = props;
  const {
    grid: originGrid,
    rowProps: originRowProps = { gutter: [40, 0] },
    colProps: originColProps,
  } = useContext(GridContext);

  const mergeRowProps = merge({}, originRowProps, rowProps);
  const mergeColProps = merge({}, originColProps, colProps);

  return (
    <GridContext.Provider
      value={{
        grid: true,
        rowProps: mergeRowProps,
        colProps: mergeColProps,
      }}
    >
      {originGrid ? (
        <BetaSchemaForm layoutType="Embed" columns={columns as any} />
      ) : (
        <Row {...mergeRowProps}>
          <BetaSchemaForm layoutType="Embed" columns={columns as any} />
        </Row>
      )}
    </GridContext.Provider>
  );
}
