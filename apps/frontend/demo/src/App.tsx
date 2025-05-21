import { InitProConfig, BaseTable } from "@optkit/toolbox";

function App() {
  return (
    <InitProConfig>
      <BaseTable
        cacheKey="sd"
        searchColumns={[{ title: "demo", dataIndex: ["demo"] }]}
        columns={[{ title: "haa", dataIndex: ["sd"] }]}
      ></BaseTable>
    </InitProConfig>
  );
}

export default App;
