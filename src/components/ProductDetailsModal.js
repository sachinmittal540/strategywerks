import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  Typography,
  Row,
  Col,
  Rate,
  Collapse,
  Carousel,
  Tag,
} from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { getProductById } from "../actions/products";
import ProductDetailsSkeleton from "./ProductDetailsSkeleton";

const { Title, Text } = Typography;
const { Panel } = Collapse;

const ProductDetailsModal = ({ productId, visible, onClose }) => {
  const dispatch = useDispatch();
  const { selectedProduct } = useSelector((state) => state.products);

  useEffect(() => {
    if (productId) {
      dispatch(getProductById(productId));
    }
  }, [productId, dispatch]);

  if (!productId || !visible) return null;

  const renderProductDetails = () => {
    if (!Object.keys(selectedProduct).length) return <ProductDetailsSkeleton />;

    const {
      title,
      description,
      price,
      rating,
      category,
      brand,
      stock,
      discountPercentage,
      warrantyInformation,
      shippingInformation,
      availabilityStatus,
      returnPolicy,
      minimumOrderQuantity,
      weight,
      dimensions,
      sku,
      tags,
      reviews,
      images,
    } = selectedProduct;

    return (
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Carousel autoplay arrows style={{ background: "#f5f5f5" }}>
            {images.map((imgg, index) => {
              return (
                <LazyLoadImage
                  src={imgg}
                  alt={`${title}-${index + 1}`}
                  style={{ width: "100%", height: "100%", borderRadius: "8px" }}
                  loading="lazy"
                />
              );
            })}
          </Carousel>
        </Col>
        <Col xs={24} md={12}>
          <Title level={3}>{title}</Title>
          <Text>{description}</Text>
          <br />
          <Text strong>Price: ${price}</Text>
          <br />
          <div style={{ margin: "10px 0" }}>
            <Rate disabled defaultValue={rating} />
          </div>
          <Collapse>
            <Panel header="Basic Information" key="1">
              <Text type="secondary">
                <b>Category:</b> {category}
              </Text>
              <br />
              <Text type="secondary">
                <b>Brand:</b> {brand || "N/A"}
              </Text>
              <br />
              <Text type="secondary">
                <b>Stock:</b> {stock}
              </Text>
              <br />
              <Text type="secondary">
                <b>Discount:</b> {discountPercentage}%
              </Text>
              <br />
              <Text type="secondary">
                <b>Warranty:</b> {warrantyInformation}
              </Text>
              <br />
              <Text type="secondary">
                <b>Shipping:</b> {shippingInformation}
              </Text>
              <br />
              <Text type="secondary">
                <b>Availability:</b>{" "}
                {availabilityStatus === "In Stock" && (
                  <Tag color="#4ab11e">{availabilityStatus}</Tag>
                )}
                {availabilityStatus === "Low Stock" && (
                  <Tag color="#c18c00">{availabilityStatus}</Tag>
                )}
              </Text>
              <br />
              <Text type="secondary">
                <b>Return Policy:</b> {returnPolicy}
              </Text>
              <br />
              <Text type="secondary">
                <b>Minimum Order Quantity:</b> {minimumOrderQuantity}
              </Text>
              <br />
              <Text type="secondary">
                <b>Weight:</b> {weight} kg
              </Text>
              <br />
              <Text type="secondary">
                <b>Dimensions:</b> {dimensions.width} cm (W) x{" "}
                {dimensions.height} cm (H) x {dimensions.depth} cm (D)
              </Text>
              <br />
              <Text type="secondary">
                <b>SKU:</b> {sku}
              </Text>
              <br />

              {tags && (
                <Text type="secondary">
                  <b>Tags:</b>{" "}
                  {tags.map((tag) => (
                    <Tag bordered={false} color="#108ee9">
                      {tag}
                    </Tag>
                  ))}
                </Text>
              )}
            </Panel>
            <Panel header="Reviews" key="2">
              <ul>
                {reviews.map((review, index) => (
                  <li key={index}>
                    <Text>
                      {review.reviewerName} - {review.rating} stars
                    </Text>
                    <br />
                    <Text type="secondary">{review.comment}</Text>
                  </li>
                ))}
              </ul>
            </Panel>
          </Collapse>
        </Col>
      </Row>
    );
  };

  return (
    <Modal visible={visible} onCancel={onClose} footer={null} width={800}>
      {renderProductDetails()}
    </Modal>
  );
};

export default ProductDetailsModal;
