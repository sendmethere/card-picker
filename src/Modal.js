import React, { useEffect, useState } from 'react';

function Modal({ isOpen, setIsOpen, card }) {
    const [showBack, setShowBack] = useState(false);
    const [shouldRender, setShouldRender] = useState(isOpen);
    const [animation, setAnimation] = useState(""); // 새로운 상태 변수 추가

    const toggleCardSide = () => {
        setShowBack(!showBack);
    };

    const closeModal = () => {
    setIsOpen(false);
    setShowBack(false); // 모달을 닫을 때 카드 앞면으로 리셋
    };

    const cardStyle = {
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/${showBack ? card.image_back : card.image_front})`,
        backgroundSize: 'cover',
        width: `${card.image_size_w*card.zoom_ratio}px`,
        height: `${card.image_size_h*card.zoom_ratio}px`,
        cursor: 'pointer',
        borderRadius: '10px',
    };

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            setAnimation("animate-fadeIn"); // 모달이 열릴 때 애니메이션
        } else {
            setAnimation("animate-fadeOut"); // 모달이 닫힐 때 애니메이션
        }
    }, [isOpen]);

    useEffect(() => {
        if (animation === "animate-fadeOut") {
            setTimeout(() => {
                setShouldRender(false);
            }, 500); // 애니메이션과 동일한 시간 설정
        }
    }, [animation]);

    return shouldRender ? (
        <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-70" onClick={closeModal}>
            <div className="modal-content bg-white rounded-lg shadow-lg" onClick={e => e.stopPropagation()}>
                <div className="card flex justify-end items-start" style={cardStyle} onClick={toggleCardSide}>
                <button className="text-black px-2" onClick={closeModal}>×</button>
                {/* 카드 이미지 */}
                </div>
            </div>
            <div className='flex justify-center mt-4' onClick={(e) => e.stopPropagation()}>
            <button className="maple-story bg-white p-2 mx-2 rounded" onClick={toggleCardSide}>뒤집기</button>
            </div>
        </div>
    ) : null;
}

export default Modal;
