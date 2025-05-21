import { InitProConfig, BaseTable } from "@optkit/toolbox";

function App() {
  return (
    <InitProConfig>
      <BaseTable
        cacheKey="sd"
        searchColumns={[{ title: "demo", dataIndex: ["demo"] }]}
        columns={[{ title: "haa", dataIndex: ["sd"] }]}
        request={async () => {
          await new Promise((resolve) => {
            setTimeout(resolve, 200);
          });
          return {
            data: [],
            success: true,
            total: 100,
          };
        }}
      ></BaseTable>
    </InitProConfig>
  );
}

export default App;
