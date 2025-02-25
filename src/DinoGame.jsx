import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { dinosaurs } from './dinosaurs';

const floatAcross = keyframes`
  0% {
    transform: translate(-100px, 100vh) rotate(10deg);
  }
  100% {
    transform: translate(calc(100vw + 100px), -100vh) rotate(-10deg);
  }
`;

const FloatingDino = styled.img`
  position: fixed;
  width: 80px;
  height: 80px;
  opacity: 0.7;
  pointer-events: none;
  animation: ${floatAcross} ${props => props.duration}s linear infinite;
  animation-delay: ${props => props.delay}s;
  left: 0;
  bottom: 0;
  object-fit: contain;
`;

const Container = styled.div`
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(180deg, #1A8FE3 0%, #064789 100%);
  overflow: hidden;
`;

const Title = styled.h1`
  color: white;
  text-align: center;
  margin-bottom: 40px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 100px;
`;

const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
  pointer-events: none;
`;

const Button = styled.button`
  background: blue;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  background: rgba(0,0,0,0.2);
`;

const Message = styled.div`
  color: white;
  font-family: 'Dancing Script', cursive;
  font-size: 24px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  
  span {
    color: #FFB6C1;
  }
`;

const FooterImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
`;

const base = '/ocean-dino-game';

export default function DinoGame() {
  const [playingDino, setPlayingDino] = useState(null);

  const playSound = (dino) => {
    const audio = new Audio(dino.sound);
    audio.play();
    setPlayingDino(dino.id);
    audio.onended = () => setPlayingDino(null);
  };

  // Create 5 floating dinos with different speeds and delays
  const floatingDinos = Array.from({ length: 5 }).map((_, index) => ({
    duration: 15 + Math.random() * 10, // Random duration between 15-25 seconds
    delay: index * 3, // Stagger the start times
    image: `${base}/images/coral-raptor.jpg` // Using the coral raptor image
  }));

  return (
    <Container>
      {floatingDinos.map((dino, index) => (
        <FloatingDino
          key={index}
          src={dino.image}
          duration={dino.duration}
          delay={dino.delay}
          alt="Floating dinosaur"
        />
      ))}
      <Title>Ocean Dinos</Title>
      <Grid>
        {dinosaurs.map(dino => (
          <Card key={dino.id}>
            <Image 
              src={dino.image} 
              alt={dino.name}
              draggable={false}
            />
            <h2>{dino.name}</h2>
            <p>{dino.description}</p>
            <Button onClick={() => playSound(dino)}>
              {playingDino === dino.id ? 'Playing...' : 'Play Sound'}
            </Button>
          </Card>
        ))}
      </Grid>
      <Footer>
        <Message>
          Made with love by Daddy <span>♥</span> Love you Ocean
        </Message>
        <FooterImage src="/images/ocean-and-dad.jpeg" alt="Ocean and Dad" />
      </Footer>
    </Container>
  );
}
