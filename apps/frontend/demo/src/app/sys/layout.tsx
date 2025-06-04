"use client";

import {
  AlertOutlined,
  DashboardOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import { GetProps } from "antd";
import Link from "next/link";

type Routes = NonNullable<
  NonNullable<GetProps<typeof ProLayout>["route"]>["children"]
>;

const routes: Routes = [
  {
    path: "/sys/dashboard",
    icon: <DashboardOutlined />,
    name: "Dashboard",
  },
  {
    name: "core-components",
    icon: <UserOutlined />,
    children: [
      {
        path: "/sys/core-components/AsyncButton",
        name: "AsyncButton",
      },
      {
        path: "/sys/core-components/DictionarySelect",
        name: "DictionarySelect",
      },
      {
        path: "/sys/core-components/DisabledFormItemProvider",
        name: "DisabledFormItemProvider",
      },
      {
        path: "/sys/core-components/SchemaFormSection",
        name: "SchemaFormSection",
      },
    ],
  },
  {
    name: "pro-components",
    icon: <AlertOutlined />,
    children: [
      {
        path: "/sys/pro-components/ProCusDate",
        name: "ProCusDate",
      },
    ],
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProLayout
      contentStyle={{
        padding: 0,
      }}
      token={{
        bgLayout: "#F3F4F5",
        pageContainer: {
          // paddingInlinePageContainerContent: 20,
          // paddingBlockPageContainerContent: 20,
        },
        header: {
          heightLayoutHeader: 66,
          colorBgHeader: "#fff",
        },
        sider: {
          colorMenuBackground: "#fff",
        },
      }}
      title="PHV Admin Portal"
      layout="mix"
      route={{
        children: routes,
      }}
      menuItemRender={(props, defaultDom) => {
        return <Link href={props.path as any}>{defaultDom}</Link>;
      }}
    >
      {children}
    </ProLayout>
  );
}
