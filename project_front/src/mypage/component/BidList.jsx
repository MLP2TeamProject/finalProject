import { useEffect, useState, useContext, useCallback } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import UserContext from "../../UserContext"

const BidList = () => {
    // context에 공개된 전역 상태,함수를 이용하겠다면 useContext를 이용
    const context = useContext(UserContext)

    // 회원정보 get
    const userEmail = context.state.userData.email
    const imgUrl = 'http://localhost:8000/static/upload/'

    // 구매등록 상품 상태
    const [data, setData] = useState([{}])
    // 구매등록 상품정보 get
    const showInfo = useCallback(async ()=> {
        const resp = await axios.get('http://localhost:8000/products/my/' + userEmail)
        if(resp.data.status === 500) window.alert(resp.data.message)
        else {
            // console.log('구매등록상품', resp.data.data)
            // 상품에 입찰된 정보 문자열을 배열로 
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
    //     console.log(selectedData.selectedAucId)
    // }, [selectedData])    

    // 낙찰 요청 
    const selectBiddWrite = async (product_id) => {
        // console.log('선택요소', product_id, selectedData.selectedAucId)
        const confirmOK = window.confirm(`${selectedData.selectedAucEmail}님 ${selectedData.selectedAucPrice}으로 낙찰하시겠습니까?`)
        if (confirmOK) {
            const resp = await axios.post('http://localhost:8000/products/selectbid', {pId: product_id, selectedAucId: selectedData.selectedAucId})
            if(resp.data.status === 500) window.alert(resp.data.message)
            else {
                // console.log('낙찰응답', resp.data.data)
                showInfo() 
                // location.reload(true)
                // 리랜더링의 다른방법 
                // 상품1개 - 입찰정보 - 단일 컴포넌트로 만들고, 낙찰시 서버연동후 서버에서 성공정보를 넘기면 그 데이터로 상태를 변경해서.. 
                // 화면이 자동으로 리랜더링되게.. 처리..
            }  
        }
    }

    // 입찰 정보 상태
    const [bidList, setBidList] = useState([])
    // 내가 입찰한 상품정보 get
    const showBidd = useCallback(async ()=>{
        const resp = await axios.get('http://localhost:8000/auction/' + userEmail)
        if(resp.data.status === 500) window.alert(resp.data.message)
        else {
            // console.log('나의 입찰정보', resp.data.data)
            setBidList(resp.data.data)
        }        
    }, [userEmail])      

    // 페이징 상수 선언 
    const perPageItemNum = 3 // 한 페이지에 보여줄 항목 개수
    const perGroupPageNum = 3 // 한 그룹에 보여줄 페이지 개수

    // 페이징 상태
    const [pageState, setPageState] = useState({
        totalCount: 0, //전체 항목 개수
        totalPageCount: 0, //전체 페이지 개수 
        totalGroupCount: 0, //전체 그룹 개수
        currentPage: 1, //현재 페이지
        currentPageGroup: 0, //현재 페이지그룹
        pageArray: [], // 현재 그룹의 페이지 배열
        listArray: [] // 항목 배열
    })

    const [bidPageState, setBidPageState] = useState({
        totalCount: 0, //전체 항목 개수
        totalPageCount: 0, //전체 페이지 개수 
        totalGroupCount: 0, //전체 그룹 개수
        currentPage: 1, //현재 페이지
        currentPageGroup: 0, //현재 페이지그룹
        pageArray: [], // 현재 그룹의 페이지 배열
        listArray: [] // 항목 배열
    })

    // 페이징 set
    const paging = (targetData, group, pageNum) => {
        const totalCount = targetData.length
        const totalPageCount = Math.ceil(totalCount / perPageItemNum)
        const totalGroupCount = Math.ceil(totalPageCount / perGroupPageNum)
        const listArray = targetData.slice((pageNum - 1) * perPageItemNum, (pageNum - 1) * perPageItemNum + perPageItemNum)
        let pageArray = []

        if(totalPageCount - (group * perGroupPageNum) < perGroupPageNum) {
            pageArray = Array.from({ length: totalPageCount - (group * perGroupPageNum) }, (_, index) => index+1 + (group * perGroupPageNum))
        }else {
            pageArray = Array.from({ length: perGroupPageNum }, (_, index) => index+1 + (group * perGroupPageNum))
        }
        // console.log('셋팅값', totalCount, totalPageCount, totalGroupCount, listArray, pageArray)
        // console.log('원데이터', data)
        if (targetData === data) {
            setPageState({...pageState, totalCount, totalPageCount, totalGroupCount, listArray, pageArray, currentPage: pageNum, currentPageGroup:group })
        } else if (targetData === bidList) {
            setBidPageState({...bidPageState, totalCount, totalPageCount, totalGroupCount, listArray, pageArray, currentPage: pageNum, currentPageGroup:group })
        }        
    }

    const onClickPage = (targetData, page) => {
        paging(targetData, pageState.currentPageGroup, page)
    }
    const onMoveGroup = (targetData, group, page) => {        
        paging(targetData, group, page)
    }

    // 페이지 진입 시, useEmail이 변경될 때 실행  
    useEffect(()=>{
        if(userEmail) {
            // console.log('login user:', userEmail)
            showInfo()
            showBidd()
        }
    }, [userEmail, showInfo, showBidd]) 

    useEffect(()=>{
        paging(data, 0, 1)
        paging(bidList, 0, 1)
    }, [data, bidList]) 

    return (
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
                        {pageState.listArray[0] ? (
                            <>
                            {pageState.listArray.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <div className="media">
                                        <div className="media-body">
                                            <Link to={'/product/detail/'+item.product_id}>{item.title}</Link>
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
                {/* <p>현재페이지: {pageState.currentPage} / 총 페이지: {pageState.totalPageCount}</p>
                <p>현재그룹: {pageState.currentPageGroup} / 총 그룹: {pageState.totalGroupCount}</p>
                <p>페이지배열 : {pageState.pageArray}</p> */}
                {data[0] ? (
                    <nav className="justify-content-center d-flex mb-5">
                    <ul className="pagination">
                        <li className={pageState.currentPageGroup === 0 ? "page-item disabled" : "page-item"}>
                            <a href="#N" className="page-link" aria-label="Previous Group"
                            onClick={() => onMoveGroup(data, pageState.currentPageGroup - 1, (pageState.currentPageGroup - 1) * perGroupPageNum +1)}>
                                <i className="ti-angle-double-left"></i>
                            </a>
                        </li>
                        <li className={pageState.currentPage === pageState.pageArray[0] ? "page-item disabled" : "page-item"}>
                            <a href="#N" className="page-link" aria-label="Previous page"
                            onClick={() => onClickPage(data, pageState.currentPage - 1)}>
                                <i className="ti-angle-left"></i>
                            </a>
                        </li>
                        {pageState.pageArray.map((item, index) => (
                        <li className={pageState.pageArray[index] === pageState.currentPage ? "page-item active" : "page-item"} key={index}>
                            <a href="#N" className="page-link" onClick={(e) => onClickPage(data, Number(e.target.text))}>
                                {item}
                            </a>
                        </li>
                        ))}
                        <li className={pageState.currentPage === pageState.pageArray[pageState.pageArray.length-1] ? "page-item disabled" : "page-item"}>
                            <a href="#N" className="page-link" aria-label="Next page" 
                            onClick={() => onClickPage(data, pageState.currentPage + 1)}>
                                <i className="ti-angle-right"></i>
                            </a>
                        </li>
                        <li className={pageState.currentPageGroup === pageState.totalGroupCount - 1 ? "page-item disabled" : "page-item"}>
                            <a href="#N" className="page-link" aria-label="Next Group"
                            onClick={() => onMoveGroup(data, pageState.currentPageGroup + 1, (pageState.currentPageGroup + 1) * perGroupPageNum + 1)}>
                                <i className="ti-angle-double-right"></i>
                            </a>
                        </li>
                    </ul>
                    </nav>
                ) : ''}
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
                        {bidPageState.listArray[0] ? (
                            <>
                            {bidPageState.listArray.map((item, index)=>(
                                <tr key={index}>
                                    <td>
                                        <div className="media">
                                            <div className="d-flex">
                                                <img src={imgUrl+item.picture} className='img_size' alt="" />
                                            </div>
                                            <div className="media-body">
                                                <Link to={'/product/detail/'+item.product_id}>{item.title}</Link>
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
                {/* <p>현재페이지: {bidPageState.currentPage} / 총 페이지: {bidPageState.totalPageCount}</p>
                <p>현재그룹: {bidPageState.currentPageGroup} / 총 그룹: {bidPageState.totalGroupCount}</p>
                <p>페이지배열 : {bidPageState.pageArray}</p> */}
                {bidList[0] ? (
                    <nav className="justify-content-center d-flex mb-5">
                    <ul className="pagination">
                        <li className={bidPageState.currentPageGroup === 0 ? "page-item disabled" : "page-item"}>
                            <a href="#N" className="page-link" aria-label="Previous Group"
                            onClick={() => onMoveGroup(bidList, bidPageState.currentPageGroup - 1, (bidPageState.currentPageGroup - 1) * perGroupPageNum +1)}>
                                <i className="ti-angle-double-left"></i>
                            </a>
                        </li>
                        <li className={bidPageState.currentPage === bidPageState.pageArray[0] ? "page-item disabled" : "page-item"}>
                            <a href="#N" className="page-link" aria-label="Previous page"
                            onClick={() => onClickPage(bidList, bidPageState.currentPage - 1)}>
                                <i className="ti-angle-left"></i>
                            </a>
                        </li>
                        {bidPageState.pageArray.map((item, index) => (
                        <li className={bidPageState.pageArray[index] === bidPageState.currentPage ? "page-item active" : "page-item"} key={index}>
                            <a href="#N" className="page-link" onClick={(e) => onClickPage(bidList, Number(e.target.text))}>
                                {item}
                            </a>
                        </li>
                        ))}
                        <li className={bidPageState.currentPage === bidPageState.pageArray[bidPageState.pageArray.length-1] ? "page-item disabled" : "page-item"}>
                            <a href="#N" className="page-link" aria-label="Next page" 
                            onClick={() => onClickPage(bidList, bidPageState.currentPage + 1)}>
                                <i className="ti-angle-right"></i>
                            </a>
                        </li>
                        <li className={bidPageState.currentPageGroup === bidPageState.totalGroupCount - 1 ? "page-item disabled" : "page-item"}>
                            <a href="#N" className="page-link" aria-label="Next Group"
                            onClick={() => onMoveGroup(bidList, bidPageState.currentPageGroup + 1, (bidPageState.currentPageGroup + 1) * perGroupPageNum + 1)}>
                                <i className="ti-angle-double-right"></i>
                            </a>
                        </li>
                    </ul>
                    </nav>
                ) : ''}
                </div>
            </div>
        </div>
    </section>
    )
}

export default BidList
