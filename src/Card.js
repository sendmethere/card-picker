import React from 'react';

// Card 컴포넌트는 이미지 URL과 클릭 이벤트 핸들러를 props로 받습니다.
function Card({ imageUrl, sizeW, sizeH, onClick }) {
    const cardStyle = {
        backgroundImage: `url(/images/${imageUrl})`,
        backgroundSize: 'cover',
        width: `${sizeW}px`, // 너비
        height: `${sizeH}px`, // 높이
        cursor: 'pointer', // 마우스 오버 시 커서 변경
        borderRadius: '10px', // 둥근 모서리 효과
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' // 그림자 효과
    };
    return (
        <div className="bg-gray-200 rounded mx-auto w-full h-full flex items-center justify-center transform transition-transform duration-500 hover:scale-110 cursor-pointer my-2"
        style={cardStyle}
        onClick={onClick}>
        </div>
    );
}

export default Card;