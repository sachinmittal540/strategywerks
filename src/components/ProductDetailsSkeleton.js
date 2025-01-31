import React from "react";
import { Skeleton, Row, Col } from "antd";

const ProductDetailsSkeleton = () => {
  return (
    <Row gutter={[16, 16]}>
      {/* Image Section */}
      <Col xs={24} md={12}>
        <div style={{ display: "inline-grid", width: "100%", height: "70%" }}>
          <Skeleton.Image active style={{ width: "100%", height: "100%" }} />
        </div>
      </Col>

      {/* Details Section */}
      <Col xs={24} md={12}>
        <Skeleton active paragraph={{ rows: 10 }} />
      </Col>
    </Row>
  );
};

export default ProductDetailsSkeleton;
