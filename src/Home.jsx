import React from "react";
import { useNavigate } from "react-router-dom";
import './home.css'; // ← これを忘れずに！

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      <h1 className="home-title">参政党 BINGO!</h1>
      <p className="home-description">あなたのビンゴカードをランダム生成しよう！</p>

      <button
        className="home-button"
        onClick={() => navigate("/bingo")}
      >
        ビンゴカードを生成する
      </button>
    </div>
  );
}
