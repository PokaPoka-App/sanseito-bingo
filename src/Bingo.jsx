import React, { useEffect, useState } from 'react';
import './Bingo.css';
import html2canvas from 'html2canvas';

const Bingo = () => {
  const [card, setCard] = useState([]);
  const [winners, setWinners] = useState([]);
  const [isImageSaved, setIsImageSaved] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

const positions = [
  { top: 50, left: 25 },
  { top: 50, left: 50 },
  { top: 50, left: 75 },
  { top: 75, left: 25 },
  { top: 75, left: 50 },
  { top: 75, left: 75 },
  { top: 100, left: 25 },
  { top: 100, left: 50 },
  { top: 100, left: 75 },
];
  useEffect(() => {
    const fetchData = async () => {
      const savedCard = localStorage.getItem('bingoCard');
      const resWinners = await fetch('/sanseito-bingo/winners.json');
      const winnersData = await resWinners.json();
      setWinners(winnersData);

      if (savedCard) {
        setCard(JSON.parse(savedCard));
      } else {
        const resCandidates = await fetch('/sanseito-bingo/candidates_with_names.json');
        const candidates = await resCandidates.json();
        const kamiya = candidates.find(c => c.id === 'kamiya');
        const others = candidates.filter(c => c.id !== 'kamiya');
        const shuffled = others.sort(() => 0.5 - Math.random()).slice(0, 8);
        const newCard = [
          shuffled[0], shuffled[1], shuffled[2],
          shuffled[3], kamiya, shuffled[4],
          shuffled[5], shuffled[6], shuffled[7],
        ];
        setCard(newCard);
        localStorage.setItem('bingoCard', JSON.stringify(newCard));
      }
    };
    fetchData();
  }, []);

  const saveAsImage = () => {
    const node = document.getElementById('bingo-card');
    if (!node) return;

    const clone = node.cloneNode(true);
    clone.style.position = 'fixed';
    clone.style.top = '0';
    clone.style.left = '0';
    clone.style.zIndex = '-9999';
    clone.style.transform = 'none';
    clone.style.scale = '1';
    document.body.appendChild(clone);

    html2canvas(clone).then(canvas => {
      const link = document.createElement('a');
      link.download = 'bingo_card.png';
      const dataUrl = canvas.toDataURL();
      link.href = dataUrl;
      link.click();
      setIsImageSaved(true);
      setImageUrl(dataUrl);
      document.body.removeChild(clone);
    });
  };

  const shareOnX = () => {
  const text = encodeURIComponent(
    "私の #参政党BINGO 結果はこちら！\nあなたもやってみよう🎯✨\n\n"
  );
  const url = encodeURIComponent("https://PokaPoka-App.github.io/sanseito-bingo/"); // ←公開URLに変更
  const shareUrl = `https://twitter.com/intent/tweet?text=${text}${url}`;
  window.open(shareUrl, '_blank');
};
console.log(import.meta.env.BASE_URL)
  return (
    <div className="bingo-wrapper">
      <div className="bingo-bg" id="bingo-card">
        {card.map((item, index) => (
          <div
            className="bingo-slot"
            key={item.id || index}
            style={{
  top: `${positions[index].top}vw`,
  left: `${positions[index].left}vw`,
}}
          >
            <div className="slot-image-wrapper">
              <img
  src={`images/${item.id}`}
  alt={item.name}
  className="slot-image"
/>

              {winners.includes(item.id) && (
                <img src={`${import.meta.env.BASE_URL}images/ribbon.png`} alt="ribbon" className="ribbon-overlay" />

              )}
            </div>
           
          </div>
        ))}
      </div>
      <button className="save-button" onClick={saveAsImage}>画像を保存</button>
        
     <div className="share-text">画像を保存してXでシェアしてね！ #参政党BINGO</div>
    <button className="share-button" onClick={shareOnX}>Xでシェア</button>
        
      
    </div>
  );
};

export default Bingo;
