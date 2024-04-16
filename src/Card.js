// Card.js
import React from 'react';
import playSoundEffect from './Sound';

function Card({ card, selectMode, isSelected, onCheckChange, onCardClick, soundEnabled, showBackInList }) {
    
    const handleCheckboxClick = (e) => {
        e.stopPropagation(); // 이벤트 버블링을 중지합니다.
        if (selectMode) {
            onCheckChange(card.id); // 상위 컴포넌트로 카드 ID 전달
        }
        playSoundEffect(soundEnabled, "click");
    };

    const handleCardClick = (e) => {
        e.stopPropagation(); // 선택 모드가 아닐 때도 이벤트 버블링을 중지합니다.
        if (selectMode) {
            onCheckChange(card.id); // 선택 모드일 때 카드 선택 상태 토글
            playSoundEffect(soundEnabled, "click");
        } else {
            onCardClick(card, showBackInList); // 선택 모드가 아닐 때 카드 클릭 동작 처리
        }
    };

    return (
        <div className={`card ${isSelected ? 'selected' : ''}`} onClick={handleCardClick}>
            <img src={`${process.env.PUBLIC_URL}/images/${showBackInList? card.image_back : card.image_front}`} 
                alt="Card" 
                style={{ 
                    width: card.rotate ? '80%' : '100%',
                    height: 'auto',
                }} />
            {selectMode && (
                <div className="checkbox-container" onClick={handleCheckboxClick}>
                    <input 
                        style={{width:'100%'}}
                        type="checkbox" 
                        checked={isSelected} 
                        readOnly // 이것은 컴포넌트 내에서 상태를 변경하지 않으므로 readOnly로 설정합니다.
                    />
                </div>
            )}
        </div>
    );
}

export default Card;
