import React, { useState, useEffect } from 'react';
import Card from './Card';
import Modal from './Modal';
import SelectedModal from './SelectedModal';
import cardData from './cards.json';
import playSoundEffect from './Sound';

import ToggleSwitch from './ToggleSwitch';
import './App.css';
import './ToggleSwitch.css';

import {loadStateFromLocalStorage, saveStateToLocalStorage} from './Local';

const cardSets = [
  {no: 1, title: '마음을 열어주는 감정카드', cardSetName: 'emotion'},
  {no: 2, title: '가치카드', cardSetName: 'value'},
  {no: 3, title: '낱말카드', cardSetName: 'words'},
  {no: 4, title: '초성퀴즈 - 고학년', cardSetName: 'voca_high'},
  {no: 5, title: '그림책 질문카드', cardSetName: 'picture_book'},
  {no: 6, title: '독서질문카드', cardSetName: 'book'}
];

function App() {

  // 카드 제어 관련
  const [isOpen, setIsOpen] = useState(false);
  const [currentCardSet, setCurrentCardSet] = useState(loadStateFromLocalStorage('currentCardSet', cardSets[0]));
  const [currentCard, setCurrentCard] = useState(null);

  const [selectMode, setSelectMode] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 카드를 눌렀을 때 모달
  const handleCardDetails = (card, showBackInList) => {
    playSoundEffect(soundEnabled, "pop");
    setCurrentCard(card);
    setIsOpen(true); // 모달 상태를 true로 설정하여 모달을 열어줍니다.
  };

  // 덱과 카드셋 관련
  const [currentDeck, setCurrentDeck] = useState([]);

  useEffect(() => {
    const emotionCards = cardData.filter(card => card.cardSet === currentCardSet.cardSetName);
    setCurrentDeck(emotionCards);
  }, [currentCardSet]);

  useEffect(() => {
    if(!isOpen)  {
      setSelectedCards([]);
    }
  }, [isOpen]);

  // 옵션
  const [soundEnabled, setSoundEnabled] = useState(() => loadStateFromLocalStorage('soundEnabled', true));
  const [reinsertCard, setReinsertCard] = useState(false);
  const [drawCount, setDrawCount] = useState(() => loadStateFromLocalStorage('drawCount', 1)); 
  const [showBackInList, setShowBackInList] = useState(() => loadStateFromLocalStorage('showBackInList', false));

  const handleSelectCardSet = (event) => {
    const selectedCardSet = cardSets.find(set => set.title === event.target.value);
    if (selectedCardSet) {
      setCurrentCardSet(selectedCardSet);
      setSelectedCards([]); // 선택한 카드 내용 초기화
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
    // 현재 덱의 복사본을 생성하여 작업합니다.
    let tempDeck = [...currentDeck];
    const newSelectedCards = [];

    // drawCount와 현재 덱의 길이를 비교합니다.
    const drawLimit = Math.min(drawCount, currentDeck.length);

    for (let i = 0; i < drawLimit; i++) {
      const randomIndex = Math.floor(Math.random() * tempDeck.length);
      const selectedCard = { ...tempDeck[randomIndex], showBack: false };

      newSelectedCards.push(selectedCard);
      // 선택된 카드를 임시 덱에서 제거하여 중복 선택을 방지합니다.
      tempDeck.splice(randomIndex, 1);
  }

  setSelectedCards(newSelectedCards); // 상태 업데이트
  setIsModalOpen(true); // 모달 열기
  playSoundEffect(soundEnabled, "pop");
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
        playSoundEffect(soundEnabled, "pop");
  };

  const handleCancelSelected = () => {
        setSelectedCards([]); // 선택된 카드 초기화
        setSelectMode(false); // 선택 모드 해제
  };

  useEffect(() => {
    saveStateToLocalStorage('soundEnabled', soundEnabled);
    saveStateToLocalStorage('drawCount', drawCount);
    saveStateToLocalStorage('currentCardSet', currentCardSet);
    saveStateToLocalStorage('showBackInList', showBackInList);
  }, [soundEnabled, drawCount, currentCardSet, showBackInList]);

  return (
    <div className="min-h-screen bg-[#D7EBFA] flex flex-col items-center justify-center pb-6">
      <div className='md:flex  flex-wrap  justify-between p-4 w-[70vw]'>
        <div><h1 className="maple-story text-2xl font-bold mb-4">{currentCardSet.title}</h1></div>
        <div className='md:flex'>
          <div className='flex  maple-story items-end mx-4'>
            <select value={currentCardSet.title} onChange={handleSelectCardSet} className="min-w-[300px] h-[2.5rem] px-2 rounded-full border border-gray-300">
                  {cardSets.map(set => (
                    <option key={set.no} value={set.title}>{set.title}</option>
                  ))}
            </select>
        </div>
        <div>
          <div className='flex flex-wrap justify-center items-center maple-story'>
            <label className='flex flex-wrap items-center mr-4 my-auto'>
              앞면
              <ToggleSwitch
                checked={showBackInList}
                onChange={() => setShowBackInList(!showBackInList)}
              />
              뒷면
            </label>
            <label className='flex items-center my-auto'>
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
          <div className='flex justify-center hidden'>
            <label className='maple-story flex flex-wrap items-center'>
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
      <button onClick={handleRandomDraw} className="bg-[#469CE1] maple-story text-white p-2 mx-2 rounded">랜덤뽑기</button>
      {!selectMode && (
                    <button onClick={() => setSelectMode(true)} className="bg-[#469CE1] maple-story text-white p-2 mx-2 rounded">선택뽑기</button>
                )}
                {selectMode && (
                    <>
                        <button onClick={handleShowSelected} className="bg-[#DAE6AA] text-[#53A347] maple-story p-2 mx-2 rounded">선택보기</button>
                        <button onClick={handleCancelSelected} className="bg-[#F5DDE7] text-[#DD74A5] maple-story p-2 mx-2 rounded">선택취소</button>
                    </>
      )}
    </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-4">
      {currentDeck.map((card, index) => (
                    <Card
                    key={card.id}
                    card={card}
                    selectMode={selectMode}
                    isSelected={selectedCards.some(selectedCard => selectedCard.id === card.id)}
                    onCardClick={handleCardDetails} 
                    onCheckChange={toggleSelectCard}
                    soundEnabled={soundEnabled}
                    showBackInList={showBackInList}
                />
                ))}
      </div>
      {isOpen && (
          <Modal isOpen={isOpen} setIsOpen={setIsOpen} card={currentCard} setSelectedCards={setSelectedCards} soundEnabled={soundEnabled} showBackInList={showBackInList}>
                <button className="bg-white p-3 mx-2 rounded" onClick={(e) => e.stopPropagation()}>뜻 보기</button>
                <button className="bg-white p-3 mx-2 rounded" onClick={(e) => e.stopPropagation()}>예문 보기</button>
                <button className="bg-white p-3 mx-2 rounded" onClick={(e) => e.stopPropagation()}>글 쓰기</button>
          </Modal>
      )}
      {isModalOpen && (
    <SelectedModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} deck={selectedCards} />
)}
        <p className="text-center text-gray-500">© TEAM</p>
      </div>
    </div>
  );
}

export default App;
