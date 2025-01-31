// src/components/Navbar.js
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Input, Select, Space, Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import {
  getCategories,
  getProductByCategory,
  searchProducts,
} from "../actions/products";
import { debounce } from "../utils/debouce";

const { Header } = Layout;

const Navbar = () => {
  const [cats, setCats] = useState([]);
  const dispatch = useDispatch();
  const { categories, categoriesLoading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    rebuildData();
  }, [categories]);

  const rebuildData = async () => {
    const categoriesRebuilded = await categories.map((item) => {
      return {
        value: item.url,
        label: item.name,
      };
    });

    setCats([
      {
        value: "https://dummyjson.com/products",
        label: (
          <div style={{ color: "green" }}>
            <b>All Products</b>
          </div>
        ),
      },
      ...categoriesRebuilded,
    ]);
  };

  // const handleSearch = (query) => {
  //   debounce(dispatch(searchProducts(query)), 1000);
  // };

  const debouncedSearch = useCallback(
    debounce((query) => {
      dispatch(searchProducts(query));
    }, 1000), // 1000ms delay
    [dispatch] // Dependency array
  );

  const handleSearch = (query) => {
    debouncedSearch(query); // Call the memoized debounced function
  };

  return (
    <Header
      style={{
        // display: "flex",
        // alignItems: "center",
        // justifyContent: "space-between",
        height: "auto",
        background: "#fff",
        padding: "0 20px",
      }}
    >
      <Row align="middle" justify="space-between">
        <Row align="middle" justify="start">
          <Col span={24}>
            {/* Logo */}
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>
              Strategywerks
            </div>
          </Col>
        </Row>
        <Row align="middle" justify="center">
          <Col span={24}>
            {/* Search Bar */}
            <Input
              placeholder="Search..."
              prefix={
                <SearchOutlined
                  style={{
                    color: "rgba(0,0,0,.25)",
                  }}
                />
              }
              style={{ width: "300px" }}
              onChange={(e) => handleSearch(e.target.value)}
              allowClear
            />
          </Col>
        </Row>
        <Row align="middle" justify="end">
          <Col span={24}>
            {/* Filter Options */}
            <Select
              style={{ width: "200px" }}
              showSearch
              placeholder="Select a category"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={cats}
              loading={categoriesLoading}
              onSelect={(value) => dispatch(getProductByCategory(value))}
            />
          </Col>
        </Row>
      </Row>
    </Header>
  );
};

export default Navbar;
