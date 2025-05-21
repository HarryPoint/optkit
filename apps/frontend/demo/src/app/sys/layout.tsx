"use client";

import {
  AlertOutlined,
  DashboardOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import { GetProps } from "antd";
import { useRouter } from "next/navigation";
import { InitProConfig } from "optkit-toolbox";

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
  const router = useRouter();
  return (
    <InitProConfig router={router}>
      <ProLayout
        route={{
          children: routes,
        }}
      >
        {children}
      </ProLayout>
    </InitProConfig>
  );
}
