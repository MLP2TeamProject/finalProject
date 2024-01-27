import { useState, useEffect, useContext, useCallback } from "react"
// import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import axios from 'axios'
import UserContext from "../../userContext"

const BidList = () => {
    // context에 공개된 전역 상태,함수를 이용하겠다면 useContext를 이용
    const context = useContext(UserContext)

    // 회원정보 get
    const userEmail = context.state.userData.email
    const imgUrl = 'http://localhost:8000/static/'


    // 구매등록 상품 상태
    const [data, setData] = useState([{}])
    // 구매등록 상품정보 get
    const showInfo = useCallback(async ()=>{
        const resp = await axios.get('http://localhost:8000/product/' + userEmail)
        if(resp.data.status === 500) window.alert(resp.data.message)
        else {
            console.log('구매등록상품', resp.data.data)
            const result = resp.data.data.map((item) => {
                let auctionArr = []
                if (item.auction_info) {
                    auctionArr = item.auction_info.split(';')
                    item.auction_info = auctionArr
                }               
                return item
            })
            setData(result)
        }        
    }, [userEmail])  

    // 입찰 정보 
    const [bidList, setBidList] = useState([])
    // 내가 입찰한 상품정보 get
    const showBidd = useCallback(async ()=>{
        const resp = await axios.get('http://localhost:8000/auction/' + userEmail)
        if(resp.data.status === 500) window.alert(resp.data.message)
        else {
            console.log('나의 입찰정보', resp.data.data)
            setBidList(resp.data.data)
        }        
    }, [userEmail])   

    // 입찰 선택 상태 
    const [selectedData, setSelectedData] = useState({selectedAucId: 0, selectedAucEmail: '', selectedAucPrice: 0})
    // 라디오버튼 선택 시 연결된 label 가져와서 해당하는 auction_id를 set
    const handleRadioChange = (e) => {
        const labelFor = e.target.id
        const label = document.querySelector(`label[for=${labelFor}]`)
        const aucId = label ? label.textContent.split(',')[0] : 0
        const aucEmail = label ? label.textContent.split(',')[1] : ''
        const aucPrice = label ? label.textContent.split(',')[2] : 0
        setSelectedData({selectedAucId: aucId, selectedAucEmail: aucEmail, selectedAucPrice: aucPrice})
    }
    // selectedLabel 상태 변경되었을 때, log 찍기
    // useEffect(() => { 
    //     console.log(selectedAucId)
    // }, [selectedAucId])

    // 낙찰 요청 
    const selectBiddWrite = async (product_id) => {
        console.log('선택요소', product_id, selectedData.selectedAucId)
        const confirmOK = window.confirm(`${selectedData.selectedAucEmail}님 ${selectedData.selectedAucPrice}으로 낙찰하시겠습니까?`)
        if (confirmOK) {
            const resp = await axios.post('http://localhost:8000/product/selectbid', {pId: product_id, selectedAucId: selectedData.selectedAucId})
            if(resp.data.status === 500) window.alert(resp.data.message)
            else {
                // 성공시 페이지 리로드 
                location.reload(true)
                // 리랜더링의 다른방법 
                // 상품1개 - 입찰정보 - 단일 컴포넌트로 만들고, 낙찰시 서버연동후 서버에서 성공정보를 넘기면 그 데이터로 상태를 변경해서.. 
                // 화면이 자동으로 리랜더링되게.. 처리..
            }  
        }
    }

    // 페이지 진입 시, useEmail이 변경될 때 실행  
    useEffect(()=>{
        if(userEmail) {
            console.log('login user:', userEmail)
            showInfo()
            showBidd()
        }
    }, [userEmail, showInfo, showBidd])     
    
    return (
        <>
        <section className="cart_area mt-5">
        <div className="container">
            <div className="col-lg-12">
                <h3>구매 희망 도서 목록</h3>
            </div>
            <div className="cart_inner">
                <div className="table-responsive">
                <table className="table">
                    <thead className="table-light">
                    <tr>
                        <th scope="col"><strong>구매희망도서</strong></th>
                        <th scope="col"><strong>입찰현황</strong></th>
                        <th scope="col"><strong>낙찰</strong></th>
                    </tr>
                    </thead>
                    <tbody>
                        {data[0] ? (
                            <>
                            {data.map((item) => (
                            <tr key={item.product_id}>
                                <td>
                                    <div className="media">
                                        <div className="media-body">
                                            <Link to={'/product/'+item.product_id}>{item.title}</Link>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <ul className="list">
                                        {item.auction_info ? (
                                            <>
                                                {item.auction_info.map((subitem,index) => (
                                                    <li key={index}>
                                                        <input type="radio" name="selectBid" id={`selectBid${item.product_id}_${index}`} 
                                                        onChange={handleRadioChange} disabled={item.auction_id === null ? false:true} />{' '}
                                                        <img src={imgUrl+subitem.split(',')[3]} className='img_size' alt="" />{' '}
                                                        입찰번호:{' '}
                                                        <label htmlFor={`selectBid${item.product_id}_${index}`}>
                                                            {subitem.split(',')[0]}, {subitem.split(',')[1]}, {subitem.split(',')[2]}원
                                                        </label>{' '}
                                                        <span className="text_select_auc">
                                                            {item.auction_id === Number(subitem.split(',')[0]) ? '✔ 낙찰' : ''}
                                                        </span>
                                                    </li>
                                                ))}
                                            </>
                                        ) : (
                                            <li>입찰된 내용이 없습니다.</li>
                                        )}
                                    </ul>
                                </td>
                                <td>
                                    <div className="product_count">
                                        {item.auction_info && item.auction_id === null ? (
                                            <button type='button' className='genric-btn info circle small' 
                                            onClick={()=>selectBiddWrite(item.product_id)}>낙찰</button>
                                        ) : ('')}
                                    </div>
                                </td>
                            </tr>
                            ))}
                            </>
                        ) : (
                            <tr>
                                <td colSpan={3} className="text-center">구매 요청 도서가 없습니다.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                </div>
            </div>

            <div className="col-lg-12 mt-5">
                <h3>나의 입찰 도서 목록</h3>
            </div>
            <div className="cart_inner">
                <div className="table-responsive">
                <table className="table">
                    <thead className="table-light">
                    <tr>
                        <th scope="col"><strong>입찰 도서</strong></th>
                        <th scope="col"><strong>입찰내용</strong></th>
                        <th scope="col"><strong>경매 현황</strong></th>
                    </tr>
                    </thead>
                    <tbody>
                        {bidList[0] ? (
                            <>
                            {bidList.map((item, index)=>(
                                <tr key={index}>
                                    <td>
                                        <div className="media">
                                            <div className="d-flex">
                                                <img src={imgUrl+item.picture} className='img_size' alt="" />
                                            </div>
                                            <div className="media-body">
                                                <Link to={'/product/'+item.product_id}>{item.title}</Link>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {item.auction_price}원 입찰 ({item.createAt.substr(0, 10)} {' '} {item.createAt.substr(11, 8)})
                                    </td>
                                    <td>
                                        {item.auction_id !== null ? (
                                            <>
                                                {item.selectedEmail === userEmail ? '낙찰되었습니다.' : '유찰되었습니다.'}
                                            </>
                                        ) : '경매진행 중입니다.'} <br />
                                    </td>
                                </tr>
                            ))}
                            </>
                        ) : (
                            <tr>
                                <td colSpan={3} className="text-center">입찰한 내용이 없습니다.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
        </section>
        </>
    )
}

export default BidList