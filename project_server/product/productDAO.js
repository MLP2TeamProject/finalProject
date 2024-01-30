const getPool = require("../common/pool");

const sql = {
  detail: "select * from product where product_id = ?",
  detail_auction: "select * from auction where product_id = ?",
  update:
    "update product set master_price =?, content = ? where product_id = ?",
  //이부분은 buy에서 글쓴이가 수정하려면 쓸 부분
  insertAuction:
    "INSERT INTO auction (product_id, email, auction_price, picture, product_status) VALUES (?, ?, ?, ?, ?)",
  checkBookTitle: "SELECT title, isbn FROM product WHERE product_id = ?",
};

const productDAO = {
  detail: async (item, callback) => {
    let conn = null;
    try {
      console.log("dao detail", item.product_id);
      conn = await getPool().getConnection();
      const [resp] = await conn.query(sql.detail, [item.product_id]);
      //바인딩할 변수가 필요 sql 쿼리에서 사용하는 ?자리를 채워놓음
      // callback({ status: 200, message: "ok", data: Array.isArray(resp) ? resp[0] : resp })
      if (resp !== null && resp.length > 0) {
        const [auction_resp] = await conn.query(sql.detail_auction, [
          item.product_id,
        ]);
        resp[0]["auctions"] = auction_resp; //??? 배열의 첫 번째 요소(상품정보)에 auctions라는 키로 경매 정보를 추가
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

  //상품 정보 수정 : 글작성자 권한이 있는 사람만이 수정 가능
  update: async (item, callback) => {
    let conn = null;
    try {
      conn = await getPool().getConnection();
      const [resp] = await conn.query(sql.update, [
        item.master_price,
        item.content,
        item.product_id,
      ]);
      callback({ status: 200, message: "ok" });
    } catch (error) {
      return { status: 500, message: "게시글 수정 실패", error: error };
    } finally {
      if (conn !== null) conn.release();
    }
  },

  bidding: async (data, callback) => {
    let conn = null;
    try {
      console.log("1", data);
      conn = await getPool().getConnection();
      const [result] = await conn.query(sql.insertAuction, [
        data.product_id,
        data.email,
        data.auction_price,
        data.picture,
        data.product_status,
      ]);
      if (result) {
        const [bookInfo] = await conn.query(sql.checkBookTitle, [
          data.product_id,
        ]); //insert성공하면 책 정보를 db에서 조회, bookinfo에 결과 할당하기
        console.log("5", bookInfo);
        callback({
          status: 200,
          message: "입찰성공",
          data: {
            file_name: data.picture,
            auction_price: data.auction_price,
            title: bookInfo[0].title,
            isbn: bookInfo[0].isbn,
          }, //경매삽입, 책정보조회 성공하면 성공 응답 전송
        });
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
