import { useState, useCallback, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../../UserContext"

const ProductBuy = () => {

    const navigate = useNavigate()
    const context = useContext(UserContext)
    let userEmail = ''

    const [product, setProduct] = useState({
        title: "",
        email: userEmail,
        master_price: "",
        endtime: "",
        auction_status: "N",
        isbn: "",
        content: "",
    })

    useEffect(() => {
        const sessionEmail = sessionStorage.getItem("email")
        // const contextEmail = context.state.userData.email
        userEmail = sessionEmail
        // console.log('1',userEmail)
        if (userEmail) setProduct((prevProduct) => ({ ...prevProduct, email: userEmail }))
        else {
            window.alert('로그인이 필요합니다.')
            navigate('/user/signin')
        }
    }, [])

    // useEffect(()=>{
    //   console.log('2', product)
    // }, [product])

    const [author, setAuthor] = useState('')

    const fileRef = useRef()

    const [fileUpload, setFileUpload] = useState()

    const [isChecked, setIsChecked] = useState(false)

    const changeData = useCallback((e) => {
        let date = new Date()
        date.setDate(date.getDate() + 30)
        const endDate = new Date(date).toISOString().slice(0, 19).replace('T', ' ')
        // console.log('종료일',endDate)
        setProduct((product) => ({ ...product, [e.target.name]: e.target.value, endtime: endDate }))
    }, [])

    // useState 는 비동기 방식이기 때문에 동기적으로 처리하려면 따로 함수(동기적실행)를 빼거나, useEffect로 관리를 하거나...

    const insertProduct = async (e) => {
        e.preventDefault()
        if (!isChecked) {
            window.alert('체크박스를 선택해주세요')
            return
        }
        if (fileUpload) {
            // console.log(product)
            const formData = new FormData()
            formData.append("file1", fileUpload)
            const strData = JSON.stringify(product)
            formData.append("sendData", strData)

            const resp = await axios.post("http://localhost:8000/products/buyinsert", formData)
            if (resp.data.status === 500) window.alert(resp.data.message)
            else {
                // console.log('구매등록데이터', resp.data.message)
                navigate('/products/list')
            }
        }
    }

    const searchISBN = async () => {
        // console.log(product.title, author)
        if (product.title && author) {
            const resp = await axios.get(`https://www.nl.go.kr/NL/search/openApi/search.do?key=39b4dd4a523f80ea24ba476b79fc50c968db9622ffd612dc415b4176e41ccadd&kwd=${product.title}&authorInfo=${author}&apiType=json`)
            if (resp.data.result[0].isbn) {
                const isbnNumber = resp.data.result[0].isbn
                setProduct((product) => ({ ...product, isbn: isbnNumber }))
            } else {
                console.log(resp.statusText)
                setProduct((product) => ({ ...product, isbn: 'no isbn' }))
            }
        } else {
            alert("책 제목과 저자명을 입력하세요.")
        }
    }

    const insertCancle = () => {
        setProduct({ title: "", email: userEmail, master_price: "", endtime: "", auction_status: "N", isbn: "", content: "" })
        setIsChecked(false)
        setAuthor('')
        fileRef.current.value = ''
    }

    return (
        <div className="container-fluid mt-5">
            <div className="container mb-5">
                <form encType="multipart/form-data">
                    <div className="row g-5">
                        <div className="col-md-12 col-lg-6 col-xl-7">
                            <div className="form-item">
                                <label className="form-label my-3">책 제목 <sup>*</sup></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={product.title}
                                    onChange={changeData}
                                    placeholder="책 제목을 입력하세요"
                                    onFocus={(e) => e.target.placeholder = ""}
                                    onBlur={(e) => (e.target.placeholder = "책 제목을 입력하세요")}
                                />
                            </div>

                            <div className="form-item">
                                <label className="form-label my-3">저자명 <sup>*</sup></label>
                                <input type="text" className="form-control" name="author" value={author}
                                    onChange={(e) => setAuthor(e.target.value)} placeholder="저자명을 입력하세요" />
                            </div>

                            <label className="form-label my-3">isbn (선택사항)</label>
                            <div className="input-group">
                                <input type="text" className="form-control" name="isbn" value={product.isbn}
                                    onChange={changeData} placeholder="isbn 번호" />
                                <button type='button' className="btn btn-secondary" onClick={searchISBN}>검색</button>
                            </div>

                            <div className="form-item">
                                <label className="form-label my-3">책 이미지 <sup>*</sup></label>
                                <input type="file" className="form-control" name="file1" ref={fileRef}
                                    onChange={(e) => setFileUpload(e.target.files[0])} />
                            </div>

                            <div className="form-item">
                                <label className="form-label my-3">즉시구매가 <sup>*</sup></label>
                                <input type="number" className="form-control" name="master_price" value={product.master_price}
                                    onChange={changeData} placeholder="예)50000 (원 단위로 숫자만 입력)" />
                            </div>

                            {/* <div className="form-item">
                <label className="form-label my-3">경매 종료일 <sup>*</sup></label>
                <input type="datetime-local" className="form-control" name="endtime" value={product.endtime} 
                onChange={changeData} placeholder="예)50000 (원 단위로 숫자만 입력)" />
              </div> */}

                            <div className="form-item">
                                <label className="form-label my-3">요청사항 (선택사항)</label>
                                <textarea className="form-control" spellCheck="false" cols="30" rows="3"
                                    placeholder="구매를 원하는 상품의 정보와 상태를 기입해주세요."
                                    name="content" value={product.content} onChange={changeData}></textarea>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-6 col-xl-5">
                            <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                                <div className="col-12">
                                    <div className="form-check text-start my-3">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="isChecked"
                                            name="isChecked"
                                            value={isChecked}
                                            onChange={(e) => setIsChecked(e.target.checked)}
                                        />
                                        <label className="form-check-label" htmlFor="isChecked">
                                            입력한 내용으로 구매 신청하시겠습니까?
                                        </label>
                                    </div>
                                    <div className="alert alert-danger">최종 구매신청을 위해 체크박스를 선택하세요.</div>

                                    <p className="text-start text-dark font-small">
                                        낙찰기한은 구매를 신청한 시간을 기준으로 30일간 진행됩니다.
                                        <br />
                                        본 경매는 구매자의 의사에 따라 경매가 중지될 수 있습니다.
                                        자세한 내용은 고객센터로 문의해주세요.
                                        <br />
                                        본 경매는 구매자의 의사에 따라 최종 낙찰 없이 경매가 종료될
                                        수 있습니다.
                                        <br />
                                        구매자가 희망하는 즉시구매가로 해당 상품이 경매에 참여할 시,
                                        남은 경매 기간과 상관없이 바로 경매를 체결할 수 있습니다.
                                        <br />
                                    </p>
                                </div>
                            </div>
                            <br />
                            <br />
                            <div className="d-grid gap-2 col-6 mx-auto">
                                <button className="btn_3" type="button" onClick={insertCancle}>취소하기</button>
                                <button className="btn_3" type="button" onClick={insertProduct}>구매신청하기</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductBuy;