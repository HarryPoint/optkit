"use client";

import { PageWrapper } from "@/common/components/PageWrapper";
import {
  ProForm,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { CusProForm, SchemaFormSection } from "optkit-toolbox";

export default function Page() {
  return (
    <PageWrapper>
      <CusProForm colProps={{ span: 8 }} rowProps={{ gutter: [90, 0] }}>
        <SchemaFormSection
          columns={[
            {
              title: "sdf",
              valueType: "text",
            },
            {
              title: "sdf",
              valueType: "text",
            },
            {
              title: "sdf",
              valueType: "text",
            },
            {
              title: "sdf",
              valueType: "text",
            },
          ]}
        />
      </CusProForm>
      <ProForm grid colProps={{ span: 8 }} rowProps={{ gutter: [100, 0] }}>
        <ProFormRadio.Group
          label="标签布局"
          radioType="button"
          colProps={{
            span: 20,
          }}
          options={["horizontal", "vertical", "inline"]}
        />
        <ProFormSwitch
          colProps={{
            span: 4,
          }}
          initialValue={true}
          label="grid开关"
          name="grid"
        />
        <ProFormText
          name="name"
          label="标题"
          tooltip="最长为 24 位"
          placeholder="请输入名称"
        />
        <ProFormText colProps={{ md: 12, xl: 8 }} name="company" label="姓名" />
        <ProFormDigit colProps={{ md: 12, xl: 8 }} name="phone" label="电话" />
        <ProFormText colProps={{ md: 12, xl: 8 }} name="email" label="邮箱" />
        <ProFormTextArea
          colProps={{ span: 24 }}
          name="address"
          label="详细的工作地址或家庭住址"
        />
        <ProFormDatePicker
          colProps={{ xl: 8, md: 12 }}
          label="入职日期"
          name="date"
        />
        <ProFormDateRangePicker
          colProps={{ xl: 8, md: 12 }}
          label="工作周期"
          name="dateRange"
        />
        <ProFormSelect
          colProps={{ xl: 8, md: 12 }}
          label="职位"
          name="level"
          valueEnum={{
            1: "front end",
            2: "back end",
            3: "full stack",
          }}
        />
        <SchemaFormSection
          colProps={{
            span: 12,
          }}
          columns={[
            {
              title: "sdfsss",
              valueType: "text",
              colProps: {
                span: 24,
              },
            },
            {
              title: "sdf",
              valueType: "text",
            },
            {
              title: "sdf",
              valueType: "text",
            },
            {
              title: "sdf",
              valueType: "text",
            },
          ]}
        />
      </ProForm>
    </PageWrapper>
  );
}
