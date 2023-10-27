import React, {useState} from 'react';


export default function MyModal({ open, title, onCancel, text, onAddClick, modalMessage}){
    return (
        <div className={open ? "modalroot" : "modalrootDisable"}>
        <div className="modalContainer">
            <div className="modalclose" onClick={onCancel}>X</div>

            {title && <p className="modaltitle">{title}</p>}

            <div className="modalBody">
                {text}
            </div>

            {modalMessage && (
                <div className='modalmessage'>
                    {modalMessage}
            
        </div>
            )}

        <div className='modalfooter'>
            <button onClick={onAddClick} className="addButton">추가</button>
            <button onClick={onCancel} className='closeButton'>취소</button>
        </div>
        </div>
        </div>
    );
}
