import { Layout } from "antd";
import React from "react";
import PageHeader from "./PageHeader";
import PageFooter from "./PageFooter";

const { Content } = Layout;

function AppLayout({ hasHeader = true, hasFooter = true, ...props }) {
  return (
    <Layout
      style={{
        minHeight: "100vh",
        maxWidth: "480px",
        margin: "0 auto",
        backgroundColor: "var(--bg-body)",
      }}
    >
      {hasHeader && <PageHeader>{props.title}</PageHeader>}
      <Content style={{ flex: 1, overflowY: "auto" }}>{props.children}</Content>
      {hasFooter && <PageFooter />}
    </Layout>
  );
}

export default AppLayout;
