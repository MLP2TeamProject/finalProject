//상품정보를 수정하는 페이지(Update임) - Detail에서 권한이 있으면 수정 버튼이 보이고 - 클릭했을 때 buy html을 갖고와야할 것 같음
import axios from "axios";
import React, { useCallback, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const navigate = useNavigate();
  const { product_id } = useParams();
  //해당 url에서 product_id 받아올거고
  const [product, setProduct] = useState({
    master_price: "",
    content: "",
    //여기는 바꿀 수 있는 부분만
  });

  const changeData = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
    //[e.target.name] 변경된 input요소 이름
  };

  const getData = async () => {
    const resp = await axios.get(
      "http://localhost:8000/products/detail/" + product_id
    );
    setProduct(resp.data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const detailUpdate = async (e) => {
    await axios.post("http://localhost:8000/products/update/" + product_id, {
      product,
    });
    //서버에서 json 형식으로 데이터를 받기를..
    navigate("product/detail/" + product_id);
  };
  return <h1>html 작성해야함</h1>;
};
export default Update;