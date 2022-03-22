import React from "react";
import Layout from "./../components/layout";

export default function index() {
  return (
    <Layout>
      <div className="card">
        <div className="card-header">Willkommen</div>
        <div className="card-subheader">Ich bin Sebastian</div>
        <div className="card-text">
          <div className="button">Button</div>
        </div>
      </div>
    </Layout>
  );
}
