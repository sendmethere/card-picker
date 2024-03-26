import React, { useState, useEffect } from 'react';
import Card from './Card';
import Modal from './Modal';
import RandomModal from './RandomModal';
import cardData from './cards.json';

import ToggleSwitch from './ToggleSwitch';
import './ToggleSwitch.css'; // CSS 파일을 import 합니다

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

const [isRandomModalOpen, setIsRandomModalOpen] = useState(false);
const [randomCards, setRandomCards] = useState([]);

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

  const toggleModal = (cardIndex) => {
    setCurrentCard(cardIndex);
    setIsOpen(!isOpen);
  };

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

  // 뽑기 관련
  const handleRandomDraw = () => {
    const selectedCards = [];
    for (let i = 0; i < drawCount; i++) {
        const randomIndex = Math.floor(Math.random() * currentDeck.length);
        const selectedCard = { ...currentDeck[randomIndex], showBack: false };
        selectedCards.push(selectedCard);
    }
    setRandomCards(selectedCards);
    setIsRandomModalOpen(true);
};

  return (
    <div className="min-h-screen bg-[#f4f6fa] flex flex-col items-center justify-center">
      <div className='md:flex  flex-wrap  justify-between p-4 w-[70vw]'>
        <div><h1 className="text-2xl font-bold mb-4">{currentCardSet.title}</h1></div>
        <div className='md:flex'>
          <div className='flex items-end mx-4'>
            <select onChange={handleSelectCardSet} className="min-w-[300px] h-[2.5rem] px-2 rounded-full border border-gray-300">
                  {cardSets.map(set => (
                    <option key={set.no} value={set.title}>{set.title}</option>
                  ))}
            </select>
        </div>
        <div>
          <div className='flex flex-wrap justify-center'>
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
      <button onClick={handleRandomDraw} className="bg-blue-500 text-white p-2 rounded">랜덤뽑기</button>
    </div>

      <div className="sm:grid md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
      {currentDeck.map((card, index) => (
            <Card key={index}
                  imageUrl={card.image_front}
                  sizeW={card.image_size_w}
                  sizeH={card.image_size_h}
                  onClick={() => toggleModal(card)} />
          ))}
      </div>
      {isOpen && (
          <Modal isOpen={isOpen} setIsOpen={setIsOpen} card={currentCard}>
                <button className="bg-white p-3 mx-2 rounded" onClick={(e) => e.stopPropagation()}>뜻 보기</button>
                <button className="bg-white p-3 mx-2 rounded" onClick={(e) => e.stopPropagation()}>예문 보기</button>
                <button className="bg-white p-3 mx-2 rounded" onClick={(e) => e.stopPropagation()}>글 쓰기</button>
          </Modal>
      )}
      {isRandomModalOpen && (
          <RandomModal isOpen={isRandomModalOpen} setIsOpen={setIsRandomModalOpen} deck={randomCards} />
      )}
        <p className="text-center text-gray-500">© 2024 카피라이트</p>
      </div>
    </div>
  );
}

export default App;
