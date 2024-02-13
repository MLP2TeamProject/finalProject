import { Route, Routes } from "react-router-dom";
import FaqBoardList from "./component/FaqBoardList";

import './board.css'


import NoticeBoardDetail from "./component/NoticeBoardDetail";
import NoticeBoardInsert from "./component/NoticeBoardInsert";
import NoticeBoardUpdate from "./component/NoticeBoardUpdate";

import NoticeBoardList from "./component/NoticeBoardList";
import NoticeBoardList1 from "./component/NoticeBoardList1";
import NoticeBoardList2 from "./component/NoticeBoardList2";
import NoticeBoardList3 from "./component/NoticeBoardList3";

const BoardMain = () => {
    return (
        <div>
            {/* <h2>test - Board Main</h2> */}
            <Routes>
                {/* noticeboard */}
                <Route path="/noticelist" element={<NoticeBoardList />} />
                <Route path="/noticelist/1" element={<NoticeBoardList1 />} />
                <Route path="/noticelist/2" element={<NoticeBoardList2 />} />
                <Route path="/noticelist/3" element={<NoticeBoardList3 />} />
                
                {/* FaqBoardDetail에서 상세페이지, 삭제까지 */}
                <Route path="/noticedetail/:id" element={<NoticeBoardDetail />} />
                <Route path="/noticeinsert" element={<NoticeBoardInsert />} />
                <Route path="/noticeupdate/:id" element={<NoticeBoardUpdate />} />
                
                {/* faqboard */}
                <Route path="/faqlist" element={<FaqBoardList />} />
                {/* FaqBoardDetail에서 상세페이지, 삭제까지 */}
            </Routes>
        </div>
    );
};
export default BoardMain;
