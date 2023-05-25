import React, { useEffect, useRef, useState } from "react";
import cactus from "./img/cactus.png";
import trex from "./img/trex.png";


function Dino() {
  const dinoRef = useRef();
  const cactusRef = useRef();
  const [score, setScore] = useState(0);

  const jump = () => {
    if (!!dinoRef.current && dinoRef.current.classList != "jump") {
      dinoRef.current.classList.add("jump");
      setTimeout(function () {
        dinoRef.current.classList.remove("jump");
      }, 300);
    }
  };

  useEffect(() => {
    const isAlive = setInterval(function () {
      // get current dino Y position
      const dinoTop = parseInt(
        getComputedStyle(dinoRef.current).getPropertyValue("top")
      );

      // get current cactus X position
      let cactusLeft = parseInt(
        getComputedStyle(cactusRef.current).getPropertyValue("left")
      );

      // detect collision
      if (cactusLeft < 40 && cactusLeft > 0 && dinoTop >= 140) {
        // collision
        alert("Game Over! Your Score : " + score);
        setScore(0);
      } else {
        setScore(score + 1);
      }
    }, 10);

    return () => clearInterval(isAlive);
  });

  useEffect(() => {
    document.addEventListener("keydown", jump);
    return () => document.removeEventListener("keydown", jump);
  }, []);

  return (
    <>
    <div className="game">
      Score : {score}
      <div id="dino" ref={dinoRef}></div>
      <div id="cactus" ref={cactusRef}></div>
      
    </div>
    <style jsx>{`
    .game {
      width: 600px;
      height: 225px;
      border: 1px solid black;
      margin: auto;
    }
    
    #dino {
      width: 50px;
      height: 50px;
      background-image: url(${trex.src});
      background-size: 50px 50px;
      position: relative;
      top: 150px;
    }
    
    .jump {
      animation: jump 0.3s linear;
    }
    
    @keyframes jump {
      0% {
        top: 150px;
      }
    
      30% {
        top: 130px;
      }
    
      50% {
        top: 80px;
      }
    
      80% {
        top: 130px;
      }
    
      100% {
        top: 150px;
      }
    }
    
    #cactus {
      width: 20px;
      height: 40px;
      position: relative;
      top: 110px;
      left: 580px;
    
      background-image: url(${cactus.src});
      background-size: 20px 40px;
    
      animation: block 1s infinite linear;
    }
    
    @keyframes block {
      0% {
        left: 680px;
      }
    
      100% {
        left: -5px;
      }
    }
    
    `}</style>
    </>
  );
}

export default Dino;
