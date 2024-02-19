import React from "react";
import { Link } from "react-router-dom";

//auctionDatas라는 prop으로 입찰 데이터
const Table = (props) => {
  // console.dir(props);
  let auctionDatas = props.auctions;
  return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">입찰자</th>
            <th scope="col">입찰금액(원)</th>
            <th scope="col">상품상태 (1-상, 2-중, 3-하)</th>
          </tr>
        </thead>
        <tbody>
          {auctionDatas.map((auction) => (
            <tr key={auction.auction_id}>
              <td>{auction.auction_id}</td>
              <td>{auction.email}</td>
              <td> {auction.auction_price}</td>
              <td> {auction.product_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;