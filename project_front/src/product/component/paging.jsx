//npm install react-paginate
import { useEffect, useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';

function MyList({ currentItems }) {
    return (
        <>
        <table className="table">
            <thead className="table-light">
                <tr>
                    <th scope="col"><strong>product_id</strong></th>
                    <th scope="col"><strong>도서명</strong></th>
                    <th scope="col"><strong>등록이메일</strong></th>
                    <th scope="col"><strong>즉시구매가</strong></th>
                    <th scope="col"><strong>요청사항</strong></th>
                </tr>
            </thead>
            <tbody>
                {currentItems && currentItems.map((item, index) => (
                    <tr key={index}>
                        <td>{item.product_id}</td>
                        <td>
                            <img src={`http://localhost:8000/upload/${item.picture}`} style={{ width: "60px" }} />{" "}
                            <Link to={`/products/detail/${item.product_id}`}>{item.title}</Link>
                        </td>
                        <td>{item.email}</td>
                        <td>{item.master_price}</td>
                        <td>{item.content}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    );
}

const ProductListPage = () => {
    //서버로부터 받은 페이지 데이터
    const [currentItems, setCurrentItems] = useState([])

    const [pageCount, setPageCount] = useState(0)

    const getServerData = async (page) => {
        const resp = await axios.get('http://localhost:8000/products/listpage/' + page)
        if (resp.data.status === 500) window.alert('error')
        else {
        //상태 변경
        console.log(page, resp.data.data)
        setCurrentItems(resp.data.data)
        setPageCount(Math.ceil(resp.data.totalItems / resp.data.perPage))
        }
    }

    //최초, 1페이지 데이터 획득
    useEffect(() => {
        getServerData(1)
    },[])

    const handlePageClick = (event) => {
        console.log(`User requested page number ${event.selected}`);
        getServerData(event.selected+1)
    };

return (
    <div className="container" style={{ marginTop: "100px" }}>
        <h3>paging sample : react-paginate</h3>

        <MyList currentItems={currentItems} />
        <div className="justify-content-center d-flex">
            <ReactPaginate
                nextLabel="next "
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
            />
        </div>
    </div>
    );
};

export default ProductListPage;
