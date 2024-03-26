import React, { useState, useEffect } from 'react';
import Card from './Card';
import Modal from './Modal';
import SelectedModal from './SelectedModal';
import cardData from './cards.json';

import ToggleSwitch from './ToggleSwitch';
import './App.css';
import './ToggleSwitch.css';

const cardSets = [
  {no: 1, title: '마음을 열어주는 감정카드', cardSetName: 'emotion'},
  {no: 2, title: '가치카드 - 나', cardSetName: 'value_self'},
  {no: 3, title: '가치카드 - 공동체', cardSetName: 'value_community'},
  {no: 4, title: '가치카드 - 우리', cardSetName: 'value_we'},
  {no: 5, title: '낱말카드', cardSetName: 'words'},
  {no: 6, title: '초성퀴즈 - 고학년', cardSetName: 'voca_high'}
];

function App() {

// 카드 제어 관련
const [isOpen, setIsOpen] = useState(false);
const [currentCardSet, setCurrentCardSet] = useState(cardSets[0]);
const [currentCard, setCurrentCard] = useState(null);


const [selectMode, setSelectMode] = useState(false);
const [selectedCards, setSelectedCards] = useState([]);

const [isModalOpen, setIsModalOpen] = useState(false);

// 카드를 눌렀을 때 모달
const handleCardDetails = (card) => {
  setCurrentCard(card);
  setIsOpen(true); // 모달 상태를 true로 설정하여 모달을 열어줍니다.
};

// 덱과 카드셋 관련
  const [currentDeck, setCurrentDeck] = useState([]);

  useEffect(() => {
    const emotionCards = cardData.filter(card => card.cardSet === currentCardSet.cardSetName);
    setCurrentDeck(emotionCards);
  }, [currentCardSet]);

// 옵션
const [soundEnabled, setSoundEnabled] = useState(false);
const [reinsertCard, setReinsertCard] = useState(false);
const [drawCount, setDrawCount] = useState(1); // 기본값 1

  const handleSelectCardSet = (event) => {
    const selectedCardSet = cardSets.find(set => set.title === event.target.value);
    if (selectedCardSet) {
      setCurrentCardSet(selectedCardSet);
    }
  };

  const handleDrawCountChange = (event) => {
    const count = parseInt(event.target.value, 10);
    if (count >= 1 && count <= 5) {
      setDrawCount(count);
    }
  };

  // 랜덤 뽑기 관련
  const handleRandomDraw = () => {
    const newSelectedCards = [];
    for (let i = 0; i < drawCount; i++) {
        const randomIndex = Math.floor(Math.random() * currentDeck.length);
        const selectedCard = { ...currentDeck[randomIndex], showBack: false };
        newSelectedCards.push(selectedCard);
    }
    setSelectedCards(newSelectedCards); // 상태 업데이트
    setIsModalOpen(true); // 모달 열기
};

  // 카드 선택 및 취소 로직
  const toggleSelectCard = (cardId) => {
      setSelectedCards(prevSelectedCards => {
        const isAlreadySelected = prevSelectedCards.some(card => card.id === cardId);
        if (isAlreadySelected) {
            return prevSelectedCards.filter(card => card.id !== cardId);
        } else {
            const newCard = currentDeck.find(card => card.id === cardId);
            if (newCard) {
                return [...prevSelectedCards, { ...newCard, showBack: false }];
            } else {
                return prevSelectedCards;
            }
        }
    });
};


  const handleShowSelected = () => {
        setIsModalOpen(true); // 모달 열기
  };

  const handleCancelSelected = () => {
        setSelectedCards([]); // 선택된 카드 초기화
        setSelectMode(false); // 선택 모드 해제
  };

  return (
    <div className="min-h-screen bg-[#f4f6fa] flex flex-col items-center justify-center">
      <div className='md:flex  flex-wrap  justify-between p-4 w-[70vw]'>
        <div><h1 className="maple-story text-2xl font-bold mb-4">{currentCardSet.title}</h1></div>
        <div className='md:flex'>
          <div className='flex  maple-story items-end mx-4'>
            <select onChange={handleSelectCardSet} className="min-w-[300px] h-[2.5rem] px-2 rounded-full border border-gray-300">
                  {cardSets.map(set => (
                    <option key={set.no} value={set.title}>{set.title}</option>
                  ))}
            </select>
        </div>
        <div>
          <div className='flex flex-wrap justify-center maple-story'>
            <label className='flex flex-wrap  items-center mr-4'>
              소리
              <ToggleSwitch
                checked={soundEnabled}
                onChange={() => setSoundEnabled(!soundEnabled)}
              />
            </label>
            <label className='flex items-center'>
              <input
                type="number"
                value={drawCount}
                onChange={handleDrawCountChange}
                className="border border-gray-300 rounded w-12 text-center"
                min="1"
                max="5"
              />
              장 뽑기
            </label>
          </div>
          <div className='flex justify-center'>
            <label className='flex  lex-wrap items-center'>
              뽑은 카드 다시 넣기
              <ToggleSwitch
                checked={reinsertCard}
                onChange={() => setReinsertCard(!reinsertCard)}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-white py-10 px-10 md:px-20 lg:px-40 rounded-xl shadow-md w-[70vw]">

    <div className="flex justify-center mb-4">
      <button onClick={handleRandomDraw} className="bg-blue-500 maple-story text-white p-2 mx-2 rounded">랜덤뽑기</button>
      {!selectMode && (
                    <button onClick={() => setSelectMode(true)} className="bg-blue-500 maple-story text-white p-2 mx-2 rounded">선택뽑기</button>
                )}
                {selectMode && (
                    <>
                        <button onClick={handleShowSelected} className="bg-green-500 maple-story text-white p-2 mx-2 rounded">선택보기</button>
                        <button onClick={handleCancelSelected} className="bg-red-500 maple-story text-white p-2 mx-2 rounded">선택취소</button>
                    </>
      )}
    </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
      {currentDeck.map((card, index) => (
                    <Card
                    key={card.id}
                    card={card}
                    selectMode={selectMode}
                    isSelected={selectedCards.some(selectedCard => selectedCard.id === card.id)}
                    onCardClick={handleCardDetails} 
                    onCheckChange={toggleSelectCard}
                />
                ))}
      </div>
      {isOpen && (
          <Modal isOpen={isOpen} setIsOpen={setIsOpen} card={currentCard}>
                <button className="bg-white p-3 mx-2 rounded" onClick={(e) => e.stopPropagation()}>뜻 보기</button>
                <button className="bg-white p-3 mx-2 rounded" onClick={(e) => e.stopPropagation()}>예문 보기</button>
                <button className="bg-white p-3 mx-2 rounded" onClick={(e) => e.stopPropagation()}>글 쓰기</button>
          </Modal>
      )}
      {isModalOpen && (
    <SelectedModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} deck={selectedCards} />
)}
        <p className="text-center text-gray-500">© 2024 카피라이트</p>
      </div>
    </div>
  );
}

export default App;
