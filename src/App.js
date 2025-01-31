// src/App.js
import React from "react";
import { Layout } from "antd";
import "./App.css";

import Products from "./components/Products";

const { Content } = Layout;

function App() {
  return (
    <Layout>
      <Content style={{ padding: "20px" }}>
        <div style={{ background: "#fff", padding: "20px", minHeight: "80vh" }}>
          <Products />
        </div>
      </Content>
    </Layout>
  );
}

export default App;
