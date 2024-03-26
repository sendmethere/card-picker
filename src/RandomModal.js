import React, { useEffect, useState } from 'react';

function RandomModal({ isOpen, setIsOpen, deck }) {
    // deck 배열 내 각 카드에 대한 로컬 상태를 만듭니다. 
    // 이 상태는 카드의 앞면과 뒷면을 토글하기 위해 사용됩니다.
    const [selectedCards, setSelectedCards] = useState([]);

    // isOpen이나 deck이 변경될 때마다 selectedCards 상태를 초기화합니다.
    useEffect(() => {
        // deck 내의 모든 카드에 대해 showBack 속성을 false로 설정하여 초기화합니다.
        setSelectedCards(deck.map(card => ({ ...card, showBack: false })));
    }, [deck, isOpen]);

    // 사용자가 특정 카드를 클릭하면 그 카드의 showBack 속성을 토글합니다.
    const toggleCard = (index) => {
        setSelectedCards(cards =>
            cards.map((card, idx) => 
                idx === index ? { ...card, showBack: !card.showBack } : card
            )
        );
    };

    // 모달이 열려있지 않거나 선택된 카드가 없으면 아무것도 렌더링하지 않습니다.
    if (!isOpen || selectedCards.length === 0) {
        return null;
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50" onClick={() => setIsOpen(false)}>
            <div className="modal-content bg-white rounded-lg shadow-lg p-5 m-5" onClick={e => e.stopPropagation()}>
                <div className="flex flex-wrap justify-center">
                    {selectedCards.map((card, index) => (
                        <div key={index} className="m-1 cursor-pointer" onClick={() => toggleCard(index)}  style={{ width: `${90/selectedCards.length}%`}}>
                            <img src={`/images/${card.showBack ? card.image_back : card.image_front}`} alt="Card" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RandomModal;
