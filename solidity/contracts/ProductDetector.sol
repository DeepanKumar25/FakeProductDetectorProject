// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract ProductDetector {
    address public owner;
    mapping(uint => Product) public productList;

    struct Product {
        uint product_id;
        string product_name;
        uint product_price;
        bool isOriginal;
    }

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "only owner");
        _;
    }

    function uploadProduct(
        uint id,
        string memory name,
        uint price
    ) public onlyOwner {
        require(
            productList[id].product_id == 0,
            "Product found and already Exists"
        );
        productList[id] = Product({
            product_id: id,
            product_name: name,
            product_price: price,
            isOriginal: true
        });
    }

    function reportFakeProduct(uint productId) public {
        require(productList[productId].product_id == 0, "Product not found");
        productList[productId].isOriginal = false;
    }

    function isOriginalProduct(
        uint productId,
        string memory name
    ) public view returns (bool) {
        string memory productname = productList[productId].product_name;
        return
            productList[productId].isOriginal &&
            keccak256(abi.encodePacked(name)) ==
            keccak256(abi.encodePacked(productname));
    }
}
