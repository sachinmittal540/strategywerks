// src/components/Products.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Spin,
  Row,
  Col,
  Card,
  Rate,
  Typography,
  Button,
  Empty,
  Flex,
  Image,
} from "antd";
import { DownloadOutlined } from "@ant-design/icons";

import ProductDetailsModal from "./ProductDetailsModal";
import { getProducts, loadMoreProducts } from "../actions/products";

const { Text } = Typography;
const { Meta } = Card;

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();
  const { prods, productsLoading, loadMoreLoading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
  };

  const handleLoadMore = () => {
    dispatch(loadMoreProducts(20, prods.skip + 20));
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <Spin tip="Loading Products..." spinning={productsLoading} size="large">
      <div style={{ padding: "20px" }}>
        <Row gutter={[16, 16]} align="middle">
          {(prods.products || []).map((product) => (
            <Col key={product.id} xs={24} sm={12} md={8} lg={6} xl={6}>
              <Card
                hoverable
                className="card-cover"
                cover={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      alt={product.title}
                      src={product.thumbnail}
                      loading="lazy"
                      className="card-cover-image"
                    />
                  </div>
                }
                onClick={() => handleProductClick(product)}
              >
                <Meta
                  title={product.title}
                  description={
                    <>
                      <Rate disabled defaultValue={product.rating} />
                      <br />
                      <Text strong>Price: ${product.price}</Text>
                      <br />
                      <Text type="secondary">
                        Category: {capitalizeFirstLetter(product.category)}
                      </Text>
                    </>
                  }
                />
              </Card>
            </Col>
          ))}
          {!prods?.products?.length && (
            <Col span={24}>
              <Flex justify="center" align="center" style={{ height: "50vh" }}>
                <Empty description="No Products found" />
              </Flex>
            </Col>
          )}
        </Row>
        {prods?.skip + prods?.limit < prods?.total && (
          <Row justify="center" style={{ marginTop: "24px" }}>
            <Col>
              <Button
                type="primary" // Primary button style
                size="large" // Larger button size
                onClick={() => handleLoadMore()}
                disabled={loadMoreLoading}
                loading={loadMoreLoading}
                shape="round"
                icon={<DownloadOutlined />}
              >
                {loadMoreLoading ? "Loading..." : "Load More"}
              </Button>
            </Col>
          </Row>
        )}

        {/* Product Details Modal */}
        {selectedProduct?.id && (
          <ProductDetailsModal
            productId={selectedProduct?.id}
            visible={isModalVisible}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </Spin>
  );
};

export default Products;
