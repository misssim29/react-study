import React, { useState, useRef, useEffect, useContext } from 'react';
import { DiaryDispatchContext } from './App';

const DiaryItem = ({
        id,
        author,
        emotion,
        created_date,
        content,
    }) => {

    const {onEdit,onRemove} = useContext(DiaryDispatchContext);

    const handleRemove = () => {
        if(window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)){
            onRemove(id);
        }
    }
    const [isEdit, setIsEdit] = useState(false);
    const [localContent, setLocalContent] = useState(content);
    const toggleIsEdit = () => {
        setIsEdit(!isEdit);
    }
    const handleQuitEdit = () => {
        setIsEdit(false);
        setLocalContent(content);
    }
    const EditText = useRef();
    const handleEdit = () => {
        if(localContent.length < 5){
            EditText.current.focus();
            return;
        }
        if(window.confirm(`${id}번째 일기를 수정하시겠습니까?`)){
            onEdit(id,localContent);
            toggleIsEdit();
        }
    }
    return (
        <div className="DiaryItem">
            <div className="info">
                <span>작성자 : {author} | 감정점수 : {emotion}</span>
                <span className="date">{ new Date(created_date).toLocaleString()}</span>
            </div>
            <div className="content">
                {isEdit ? <><textarea ref={EditText} value={localContent} onChange={(e) => setLocalContent(e.target.value)} /></> : <>{content}</> }
            </div>
            {isEdit ? 
                <>
                    <button onClick={handleQuitEdit}>수정 취소</button>
                    <button onClick={handleEdit}>수정 완료</button>
                </> : 
                <>
                    <button onClick={handleRemove}>삭제하기</button>
                    <button onClick={toggleIsEdit}>수정하기</button>
                </>
            }
        </div>
    )
}
export default React.memo(DiaryItem);