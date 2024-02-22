const getPool = require("../common/pool");

const sql = {
    // sql구문
    // ? 는 프로그램 데이터가 들어갈 자리

  // 상품리스트, 구매신청
  productList: "select * from product",
  buy: "update product set auction_status = '?' where product_id = ?",
  insertProduct: `insert into product (title, email, picture, master_price, endtime, auction_status, isbn, content) 
  values (?, ?, ?, ?, ?, ?, ?, ?)`,

  // 상품상세, 입찰
  detail: "select * from product where product_id = ?",
  detail_auction: "select * from auction where product_id = ?",
  update:
    "update product set master_price =?, content = ? where product_id = ?",
  //SET 새로운 값 설정
  insertAuction:
    "INSERT INTO auction (product_id, email, auction_price, picture, product_status) VALUES (?, ?, ?, ?, ?)",
  checkBookTitle: "SELECT title, isbn FROM product WHERE product_id = ?",
  biddingCountDown: "SELECT createAt from product WHERE product_id = ?",

  
  // 마이페이지
  checkProductAuction: `SELECT P.product_id, P.title, P.picture, P.auction_id, P.endtime, 
    GROUP_CONCAT(CONCAT(A.auction_id, ',', A.email, ',', A.auction_price, ',', A.picture) 
    ORDER BY A.auction_price DESC SEPARATOR ';') AS auction_info 
    FROM product AS P  LEFT JOIN auction AS A 
    ON A.product_id = P.product_id WHERE P.email = ? 
    GROUP BY P.product_id, P.title, P.picture, P.auction_id`,
  selectBidd: "UPDATE product SET auction_id = ?, auction_status = 'Y' WHERE product_id = ?",
  
  // 페이지네이션 
  totalProducts: "SELECT COUNT(product_id) as TOTALCOUNT FROM product",
  listOnepage: "SELECT * FROM product ORDER BY product_id DESC LIMIT ?, ?",

  // 키워드검색
  searchKeyword: "SELECT * FROM product WHERE title LIKE '%' ? '%'"
};

const productDAO = {
  // 상품리스트
  productList: async (callback) => {
    let conn = null
    try {
        conn = await getPool().getConnection()
        const [resp] = await conn.query(sql.productList, [])
        console.log('1010', resp)
        callback({ status: 200, message: 'OK', data: resp })
    } catch (error) {
        return { status: 500, message: '조회 실패', error: error }
    } finally {
        if (conn !== null) conn.release()
    }
  },

  buy: async (item, callback) => {
    let conn = null;
    try {
      conn = await getPool().getConnection();
      // auction 테이블에 구매 정보 기록 하나씩 전부 받아야 하는건가..? 빈 배열은?
      // 'product' 테이블의 상태 업데이트
      await conn.query(sql.buy, [
        item.product_id,
        item.title,
        item.email,
        item.master_price,
        item.auction_id,
        item.isbn,
      ]);
      console.log("22222", resp);
      // 콜백으로 성공 응답 전송
      callback(null, { status: 200, message: "구매 신청 완료" });
    } catch (error) {
      return { status: 500, message: "구매 실패", error: error };
    } finally {
      if (conn !== null) conn.release();
    }
  },

  // 구매신청
  buyInsert: async (obj, filename, callback) => {
    let conn = null;
    try {
      conn = await getPool().getConnection();
      const [result] = await conn.query(sql.insertProduct, 
        [obj.title, obj.email, filename, obj.master_price, obj.endtime, obj.auction_status, obj.isbn, obj.content])
      if (result) {
        callback({ status: 200, message: '상품 등록 성공' });
      } else {
        callback({ status: 200, message: "상품 등록 실패" });
      }
    } catch (e) {
      console.log(e)
      return { status: 500, message: "상품 등록 실패", error: e }
    } finally {
      if (conn !== null) conn.release()
    }
  },
  

  // 상품상세
  detail: async (item, callback) => {
    let conn = null;
    try {
      console.log("dao detail", item.product_id);
      conn = await getPool().getConnection();
      const [resp] = await conn.query(sql.detail, [item.product_id]);
      if (resp !== null && resp.length > 0) {
        const [auction_resp] = await conn.query(sql.detail_auction, [
          item.product_id,
        ]);
        resp[0]["auctions"] = auction_resp; 
        console.log(resp);
      }
      callback({ status: 200, message: "ok", data: resp });
    } catch (error) {
      console.log(error);
      return { status: 500, message: "디테일 불러들이기 실패", error: error };
    } finally {
      if (conn !== null) conn.release();
    }
  },

  // 상품상세 수정
  update: async (id, item, callback) => {
    let conn = null;
    try {
      conn = await getPool().getConnection();
      const [resp] = await conn.query(sql.update, [
        item.master_price,
        item.content,
        id,
      ]);
      callback({ status: 200, message: "ok" });
    } catch (error) {
      console.log("dao error", error);
      return { status: 500, message: "게시글 수정 실패", error: error };
    } finally {
      if (conn !== null) conn.release();
    }
  },

  // 상품상세 입찰
  bidding: async (data, callback) => {
    let conn = null;
    try {
      console.log("1", data);
      conn = await getPool().getConnection();
      const [result] = await conn.query(sql.insertAuction, [
        data.product_id,
        data.email,
        data.auctionPrice,
        data.filename,
        data.quality,
      ]);
      if (result) {
        const [bookInfo] = await conn.query(sql.checkBookTitle, [
          data.product_id,
        ]); //insert성공하면 책 정보를 db에서 조회, bookinfo에 결과 할당하기
        // console.log("5", bookInfo);
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

  timer: async (productId, callback) => {
    let conn = null;
    try {
      conn = await getPool().getConnection();
      const [result] = await conn.query(sql.biddingCountDown, [productId]);

      if (result.length > 0) {
        console.log("000", result[0].createAt);

        const createdAt = new Date(result[0].createAt);
        console.log("createdAt", createdAt);
        const currentDate = new Date();
        const biddingDate = new Date(createdAt);
        //문자열 데이터 객체로 변화하고
        biddingDate.setDate(createdAt.getDate() + 30); //일로 반환을 하고

        const timeRemaining = biddingDate - currentDate;
        console.log(biddingDate, currentDate, timeRemaining);
        //밀리초

        callback({
          status: 200,
          message: "타이머 정보 가져오기 완료",
          countdown: { endtime: biddingDate },
        });
      } else {
        callback({ status: 404, message: "상품을 찾을 수 없습니다." });
      }
    } catch (error) {
      console.error("타이머 정보 가져오기 실패", error);
      callback({
        status: 500,
        message: "타이머 정보 가져오기 실패",
        error: error,
      });
    } finally {
      if (conn !== null) conn.release();
    }
  },


    // 마이페이지 : 회원 구매 등록, 입찰 정보 조회
    buyBooks: async (email, callback) => {
        let conn = null;
        try {
            conn = await getPool().getConnection();
            const [books] = await conn.query(sql.checkProductAuction, [email]);
            console.log("북스", books);
            if (books != []) {
                callback({ status: 200, data: books });
            } else {
                callback({ status: 200, data: "구매등록한 책이 없습니다." });
            }
        } catch (e) {
            console.log(e);
            return { status: 500, message: "회원 구매등록 조회실패", error: e };
        } finally {
            if (conn !== null) conn.release();
        }
    },

  // 마이페이지 : 낙찰
  bidWrite: async (pId, selectedAucId, callback) => {
    let conn = null;
    try {
      conn = await getPool().getConnection();
      console.log("넘어온 데이타", pId, selectedAucId);
      const [selectedResult] = await conn.query(sql.selectBidd, [
        selectedAucId,
        pId,
      ]);
      console.log("업데이트 결과", selectedResult);
      if (selectedResult) callback({ status: 200, data: "낙찰완료" });
      else callback({ status: 200, data: "낙찰실패" });
    } catch (e) {
      console.log(e); // sql query를 날린 후 정상동작이 안된다면 여기서 로그 확인해보기
      return { status: 500, message: "낙찰 입력 실패", error: e };
    } finally {
      if (conn !== null) conn.release();
    }
  },

  // 페이지네이션
  listpage1: async (page, count, callback) => {
    let conn = null
    try {
      conn = await getPool().getConnection()
      const [totalCount] = await conn.query(sql.totalProducts)
      const [result] = await conn.query(sql.listOnepage, [(page-1)*count, count])
      if(result) callback({status:200, data: result, totalCount: totalCount[0].TOTALCOUNT})
      else callback({status:500, message:'결과없음'})
    } catch(e) {
      console.log(e)
      return { status: 500, message: "상품조회실패", error: e }
    } finally {
      if (conn !== null) conn.release()
    } 
  },
  listpage: async (page, callback) => {
    let conn = null
    try {      
      conn = await getPool().getConnection()
      const [items] = await conn.query(sql.productList)
      //한페이지에 2개 item 가정
      const responseData = items.slice((page-1)*2, page*2)
      //totalItems : 항목 갯수
      //perPage: 한 페이지당 항목 수
      if(responseData) callback({status: 200, totalItems : items.length, perPage: 2, data: responseData})
      else callback({status:500, message:'결과없음'})
    } catch(e) {
      console.log(e)
      return { status: 500, message: "상품조회실패", error: e }
    } finally {
      if (conn !== null) conn.release()
    } 
  },

  // 헤더 검색
  keyword: async (keyword, callback) => {
    let conn = null
    try {      
      conn = await getPool().getConnection()
      console.log('0', keyword)
      const [keywordResult] = await conn.query(sql.searchKeyword, [keyword])
      console.log('1',keywordResult)
      if(keywordResult) callback({status: 200, data: keywordResult})
      else callback({status:200, message:'검색 결과없음'})
    } catch(e) {
      console.log(e)
      return { status: 500, message: "검색 실패", error: e }
    } finally {
      if (conn !== null) conn.release()
    } 
  },
};

module.exports = productDAO;
