const getPool = require("../common/pool");

const sql = {
  detail: "select * from product where product_id = ?", //read
  detail_auction: "select * from auction where product_id = ?", //detail 안에서 불러오려고
  update:
    "update product set master_price =?, content = ? where product_id = ?", //update
  // bidding:
  //   "insert into product (title, author, isbn, auction_price, picture, product_status, createAt) values (?,?,?,?,?,?,?)",
  //create
  insertAuction:
    "INSERT INTO auction (product_id, email, auction_price, picture, product_status) VALUES (?, ?, ?, ?, ?)",
};

const productDAO = {
  detail: async (item, callback) => {
    //item 매개변수로 조회하고자 하는 상품의 정보가 담긴 객체를 받음
    let conn = null;
    try {
      console.log("dao detail", item.product_id);
      conn = await getPool().getConnection();
      const [resp] = await conn.query(sql.detail, [item.product_id]);
      //바인딩할 변수가 필요 sql 쿼리에서 사용하는 ?자리를 채워놓음
      // callback({ status: 200, message: "ok", data: Array.isArray(resp) ? resp[0] : resp })
      if (resp !== null && resp.length > 0) {
        console.log("11");
        const [auction_resp] = await conn.query(sql.detail_auction, [
          item.product_id,
        ]);
        resp[0]["auctions"] = auction_resp; //원래 상품 정보에 경매 정보 추가
        console.log(resp);
      }
      // 여기 if문 추가
      callback({ status: 200, message: "ok", data: resp });
    } catch (error) {
      console.log(error);
      return { status: 500, message: "디테일 불러들이기 실패", error: error };
    } finally {
      if (conn !== null) conn.release();
    }
  },

  update: async (item, callback) => {
    let conn = null;
    try {
      conn = await getPool().getConnection();
      const [resp] = await conn.query(sql.update, [
        item.master_price,
        item.content,
        item.product_id,
      ]);
      //detail? buy? 페이지에서 글작성자가 수정할 수 있는 내용
      callback({ status: 200, message: "ok" });
    } catch (error) {
      return { status: 500, message: "게시글 수정 실패", error: error };
    } finally {
      if (conn !== null) conn.release();
    }
  },

  // bidding: async (item, callback) => {
  //   let conn = null;
  //   try {
  //     conn = await getPool().getConnection();
  //     const [resp] = await conn.query(sql.bidding, [
  //       item.title,
  //       item.author,
  //       item.isbn,
  //       item.auction_price,
  //       item.picture,
  //       item.product_status,
  //       item.createAt,
  //     ]);
  //     console.log("입찰등록1", resp);
  //     callback({ status: 200, message: "ok", data: resp });
  //   } catch (error) {
  //     return { status: 500, message: "입찰 등록 실패", error: error };
  //   } finally {
  //     if (conn !== null) conn.release();
  //   }
  // },

  bidding: async (data, file_name, callback) => {
    let conn = null;
    try {
      const dataObj = JSON.parse(data);
      console.log("3", dataObj);
      console.log("4", file_name);
      conn = await getPool().getConnection();
      const [result] = await conn.query(sql.insertAuction, [
        dataObj.product_id,
        dataObj.email,
        dataObj.auctionPrice,
        file_name,
        dataObj.quality,

        //product_status가 quality가 된거고
      ]);
      if (result) {
        console.log("5");
        callback({ status: 200, message: "입찰성공", data: file_name });
      }
    } catch (e) {
      console.log(e);
      return { status: 500, message: "입찰실패", error: e };
    } finally {
      if (conn !== null) conn.release();
    }
  },
};

module.exports = productDAO;
