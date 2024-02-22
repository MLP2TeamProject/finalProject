import axios from "axios";
import { useCallback, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom"; //0208
import PropTypes from "prop-types"; //prop-types install
import UserContext from "../../UserContext";

const Bidding = () => {
  const navigate = useNavigate();

  const { product_id } = useParams(); //0208

  //userContext에서 정보 갖고 오기
  const userContext = useContext(UserContext);

  Bidding.propTypes = {
    product_id: PropTypes.number.isRequired,
  };

  //입찰 데이터 상태
  const [data, setData] = useState({
    email: userContext.state.userData.email,
    product_id: product_id,
    isbn: "",
    auctionPrice: 0,
    quality: "",
    additional: "",
  });

  const changeData = useCallback((e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  }, []);

  // 업로드 파일 상태
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState();
  const [uploadImage, setUploadImage] = useState();

  // 최종 체크 상태
  const [isChecked, setIsChecked] = useState(false);

  // 응답받아온 정보 노출
  const [bookTitle, setBookTitle] = useState("");
  const [bookIsbn, setBookIsbn] = useState("");
  const [bookPrice, setBookPrice] = useState("");
  const [bookImg, setBookImg] = useState("");

  //입력 동기화
  const [finalAuctionPrice, setFinalAuctionPrice] = useState("");

  // 입찰하기 함수
  const insertBidding = async (e) => {
    e.preventDefault();
    if (!isChecked) {
      alert("최종 입찰을 위해 반드시 체크박스를 선택해야 합니다.");
      return;
    }
    if (file) {
      const formData = new FormData();
      formData.append("file1", file);
      console.log("넘어가는 data 확인", data, file);

      const strData = JSON.stringify(data);
      formData.append("sendData", strData);

      const res = await axios.post(
        "http://localhost:8000/products/bidding/insert",
        formData

        //여기에 '입찰 성공' alert 메뉴를 넣어야 하나??    navigate("/products/list")추가 하면 될 것 같고
      );
      if (res.data.status === 200) {
        console.log(res.data);
        setBookTitle(res.data.data.title);
        setBookIsbn(res.data.data.isbn);
        setBookPrice(res.data.data.auction_price);
        setBookImg(res.data.data.file_name);
        navigate(`/products/detail/${product_id}`);
      } else {
        console.error("입찰 실패");
      }
    }
  };

  return (
    <div className="container-fluid">
      <div className="container py-5">
        <form id="form" encType="multipart/form-data">
          <div className="row g-5">
            <div className="col-md-12 col-lg-6 col-xl-7">
              <div className="row">
                <div className="col-md-12 col-lg-6">
                  <div className="form-item w-100"></div>
                </div>
              </div>
              <div className="form-item">
                <label className="form-label my-3">
                  입찰가(원)<sup>*</sup>
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Dollar amount (with dot and two decimal places)"
                    name="auctionPrice"
                    id="auctionPrice"
                    required
                    defaultValue={data.auctionPrice} //0202 defaultValue로 수정 원래 value
                    // onChange={changeData}
                    onChange={(e) => {
                      changeData(e);
                      setFinalAuctionPrice(e.target.value);
                    }}
                  />
                  <span className="input-group-text">₩</span>
                  <span className="input-group-text">WON</span>
                </div>
              </div>
              <br />
              <div className="form-item">
                <label className="form-label my-3">
                  품질등급 <sup>*</sup>
                </label>

                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="quality"
                  id="quality"
                  value={data.quality}
                  onChange={changeData}
                  required
                >
                  <option value="" disabled hidden>
                    품질을 선택해주세요.
                  </option>
                  <option value="1">상</option>
                  <option value="2">중</option>
                  <option value="3">하</option>
                </select>
              </div>

              <br />
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">상</th>
                    <th scope="col">중</th>
                    <th scope="col">하</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row"> 변색, 얼룩, 해짐</th>
                    <td>없음</td>
                    <td>있음</td>
                    <td>있음</td>
                  </tr>
                  <tr>
                    <th scope="row"> 낙서, 낙장, 찢어짐</th>
                    <td>없음</td>
                    <td>없음</td>
                    <td>있음</td>
                  </tr>
                  <tr>
                    <th scope="row">사용감</th>
                    <td>없음</td>
                    <td>있음</td>
                    <td>있음</td>
                  </tr>
                </tbody>
              </table>
              <div className="form-item">
                <label className="form-label my-3">
                  사진첨부<sup>*</sup>
                </label>

                <div className="mb-3">
                  <input
                    type="text"
                    name="fileName"
                    defaultValue={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                  />
                  <input
                    type="file"
                    name="file1"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
              </div>
              {uploadImage ? (
                <img src={`http://localhost:8000/upload/${uploadImage}`} />
              ) : (
                ""
              )}
              <br />

              <div className="form-item">
                <label className="form-label my-3">
                  상세내용(선택사항)<sup></sup>
                </label>

                <textarea
                  className="form-control"
                  spellCheck="false"
                  cols="30"
                  rows="11"
                  placeholder="제품 상세 내용"
                  name="additional"
                  id="additional"
                  value={data.additional}
                  onChange={changeData}
                ></textarea>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 col-xl-5">
              <div className="table-responsive">
                <table className="table">
                  {/* <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">ISBN </th>
                      <th scope="col">제목</th>
                      <th scope="col"></th>
                      <th scope="col">저자</th>
                    </tr>
                  </thead> */}
                  <tbody>
                    {/* <tr>
                      <td scope="row">
                        <div className="d-flex align-items-center mt-2">
                          {bookImg ? (
                            <img
                              src={`http://localhost:8000/upload/${bookImg}`}
                              style={{ width: "100px" }}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </td>
                      <td className="py-5">{bookIsbn}</td>
                      <td className="py-5">{bookTitle}</td>
                      <td className="py-5"></td>
                      <td className="py-5"></td>
                    </tr> */}
                    <tr>
                      <th scope="row"></th>
                      <td className="py-5">
                        <p className="mb-0 text-dark text-uppercase py-3">
                          최종입찰가
                        </p>
                      </td>
                      <td className="py-5"></td>
                      <td className="py-5"></td>
                      <td className="py-5">
                        <div className="py-3 border-bottom border-top">
                          <p className="mb-0 text-dark">{bookPrice}</p>
                          <p className="mb-0 text-dark">
                            {finalAuctionPrice} 원
                          </p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                <div className="col-12">
                  <div className="form-check text-start my-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="isChecked"
                      name="isChecked"
                      defaultValue={isChecked}
                      // onChange={() => setIsChecked(!isChecked)}
                      onChange={(e) => setIsChecked(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="isChecked">
                      최종 입찰하시겠습니까?
                    </label>
                  </div>
                  {!isChecked ? (
                    <div className="alert alert-danger">
                      최종 입찰을 위해 체크박스를 선택하세요.
                    </div>
                  ) : (
                    ""
                  )}
                  <p className="text-start text-dark">
                    경매에 참여한 이후 취소가 불가능합니다. <br />
                    본 경매는 언제든 구매자의 의사에 따라 중지될 수 있으며, 최종
                    낙찰 없이 경매가 종료될 수 있습니다.
                    <br />
                    입찰 참여자가 고지한 내용과 다를시 경매 이후 환불이 이루어질
                    수 있습니다.
                    <br />
                  </p>
                </div>
              </div>
              <br />
              <br />
              <div className="d-grid gap-2 col-6 mx-auto">
                <button
                  className="btn_3"
                  type="button"
                  onClick={() => navigate("/products/list")}
                >
                  취소하기
                </button>
                <button className="btn_3" type="button" onClick={insertBidding}>
                  입찰하기
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <a
        href="#"
        className="btn btn-primary border-3 border-primary rounded-circle back-to-top"
      >
        <i className="fa fa-arrow-up"></i>
      </a>
    </div>
  );
};

export default Bidding;