"use client";

import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import styled, { createGlobalStyle } from 'styled-components';

// Global Styles
const GlobalStyle = createGlobalStyle`
  /* --- DESIGN TOKENS & CSS VARIABLES --- */
  :root {
    /* Colors - Softer & Modern Palette */
    --color-primary: #0056b3;
    --color-accent: #00a8cc;
    --color-bg-primary: #fdfdfd;
    --color-bg-secondary: #f0f4f8;
    --color-text-primary: #1a202c;
    --color-text-secondary: #4a5568;
    --gradient-primary: linear-gradient(135deg, var(--color-primary), var(--color-accent));

    /* Typography */
    --font-family: 'Inter', sans-serif;
    --font-size-base: 16px;
    --font-size-lg: 18px;
    --font-size-xl: 20px;
    --font-size-2xl: 24px;
    --font-size-3xl: 32px;
    --font-size-4xl: 42px;

    /* Spacing - Reduced for a more compact layout */
    --space-3: 1px;
    --space-4: 16px;
    --space-5: 0px;
    --space-6: 24px;
    --space-7: 32px;
    --space-8: 48px;
    --space-9: 2px;

    /* Border Radius */
    --radius-md: 12px;
    --radius-lg: 20px;

    /* Shadows */
    --shadow-md: 0 4px 20px rgba(0, 86, 179, 0.08);
    --shadow-lg: 0 10px 40px rgba(0, 86, 179, 0.12);
  }

  /* --- GLOBAL RESET & BASE STYLES --- */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: var(--font-family);
    background-color: var(--color-bg-secondary);
    color: var(--color-text-primary);
    line-height: 1.6;
  }
`;

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-5);
`;

const Heading = styled.h1`
  font-weight: 800;
  font-size: var(--font-size-4xl);
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: var(--space-4);
  color: var(--color-text-primary);
`;

const Paragraph = styled.p`
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  font-weight: 400;
  margin-bottom: var(--space-6);
  max-width: 460px;
`;

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-radius: 50px;
  font-weight: 600;
  font-size: var(--font-size-base);
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  text-decoration: none;
  gap: 8px;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const PrimaryButton = styled(Button)`
  background: var(--gradient-primary);
  color: white;
  box-shadow: var(--shadow-md);
  
  &:hover {
    box-shadow: var(--shadow-lg);
  }
`;

const OutlineButton = styled(Button)`
  background: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  
  &:hover {
    background: var(--color-primary);
    color: white;
  }
`;

const HeroSection = styled.section`
  padding: var(--space-9) 0;
  background: var(--color-bg-primary);
  position: relative;
  overflow: hidden;
  background-image: 
      radial-gradient(circle at 20% 80%, rgba(0, 168, 204, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(0, 86, 179, 0.03) 0%, transparent 50%),
      var(--color-bg-primary);
  
  &::before {
    content: '';
    position: absolute;
    top: -15%;
    right: -15%;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 168, 204, 0.08) 0%, rgba(0, 168, 204, 0) 70%);
    z-index: 0;
  }
`;

const HeroContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-6);
  align-items: center;
  position: relative;
  z-index: 1;
  min-height: 60vh;
`;

const HeroText = styled.div``;

const HeroCta = styled.div`
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
`;

const HeroVisual = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const StackedImageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 420px;
  height: 400px;
`;

const StackedImage = styled.a`
  position: absolute;
  width: 80%;
  height: auto;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  background-color: #fff;
  overflow: hidden;
  border: 6px solid white;
  
  &:hover {
    z-index: 10 !important;
    transform: rotate(0deg) scale(1.05) !important;
    box-shadow: var(--shadow-lg);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const Item1 = styled(StackedImage)`
  top: 0%;
  left: 5%;
  z-index: 1;
  transform: rotate(-3deg);
`;

const Item2 = styled(StackedImage)`
  top: 8%;
  right: 0%;
  z-index: 2;
  transform: rotate(2deg);
`;

const Item3 = styled(StackedImage)`
  bottom: 5%;
  left: 0%;
  z-index: 3;
  transform: rotate(1deg);
`;

const Item4 = styled(StackedImage)`
  bottom: 12%;
  right: 5%;
  z-index: 4;
  transform: rotate(-2deg);
`;

const DynamicHighlight = styled.span`
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
  transition: opacity 0.6s ease-in-out;
`;

const Mainpage = () => {
  const [dynamicWord, setDynamicWord] = useState('Electricians');
  const words = ["Electricians", "Plumbers", "AC Experts", "Carpenters", "Home Cleaners"];
  const wordIndexRef = useRef(0);

  useEffect(() => {
    const changeWord = () => {
      setDynamicWord(prev => {
        // Fade out effect
        const tempElement = document.getElementById('dynamicWord');
        if (tempElement) {
          tempElement.style.opacity = '0';
          
          setTimeout(() => {
            wordIndexRef.current = (wordIndexRef.current + 1) % words.length;
            const newWord = words[wordIndexRef.current];
            setDynamicWord(newWord);
            
            // Fade in effect
            setTimeout(() => {
              if (tempElement) {
                tempElement.style.opacity = '1';
              }
            }, 50);
          }, 600);
        }
        return prev;
      });
    };

    // Initialize
    const tempElement = document.getElementById('dynamicWord');
    if (tempElement) {
      tempElement.style.opacity = '1';
    }
    
    const intervalId = setInterval(changeWord, 2800);
    
    return () => clearInterval(intervalId);
  }, []);

  const handleImageClick = (serviceType: string) => {
    alert(`You clicked on the ${serviceType} image!`);
    console.log(`Stacked image for ${serviceType} was clicked.`);
  };

  return (
    <>
      <Head>
        <title>Hero Section - TechConnect</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
      </Head>
      
      <GlobalStyle />

      {/* HERO SECTION */}
      <HeroSection>
        <Container>
          <HeroContent>
            <HeroText>
              <Heading>
                Find Trusted <DynamicHighlight id="dynamicWord">{dynamicWord}</DynamicHighlight> Near You
              </Heading>
              <Paragraph>
                Connect with certified professionals for your home and office needs. Get instant quotes and book with confidence.
              </Paragraph>
              <HeroCta>
                <PrimaryButton href="#">
                  Book a Pro <i className="fas fa-arrow-right"></i>
                </PrimaryButton>
                <OutlineButton href="#">
                  Explore Services
                </OutlineButton>
              </HeroCta>
            </HeroText>
            <HeroVisual>
              {/* STACKED IMAGE LAYOUT */}
              <StackedImageContainer>
                <Item1 
                  href="#" 
                  data-service="Electrician"
                  onClick={(e) => {
                    e.preventDefault();
                    handleImageClick('Electrician');
                  }}
                >
                  <img src="https://images.pexels.com/photos/4109111/pexels-photo-4109111.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Certified Electrician" />
                </Item1>
                <Item2 
                  href="#" 
                  data-service="Plumber"
                  onClick={(e) => {
                    e.preventDefault();
                    handleImageClick('Plumber');
                  }}
                >
                  <img src="https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Expert Plumber" />
                </Item2>
                <Item3 
                  href="#" 
                  data-service="AC Expert"
                  onClick={(e) => {
                    e.preventDefault();
                    handleImageClick('AC Expert');
                  }}
                >
                  <img src="https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg?auto=compress&cs=tinysrgb&w=600" alt="AC Repair Specialist" />
                </Item3>
                <Item4 
                  href="#" 
                  data-service="Carpenter"
                  onClick={(e) => {
                    e.preventDefault();
                    handleImageClick('Carpenter');
                  }}
                >
                  <img src="https://images.pexels.com/photos/5077068/pexels-photo-5077068.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Skilled Carpenter" />
                </Item4>
              </StackedImageContainer>
            </HeroVisual>
          </HeroContent>
        </Container>
      </HeroSection>
    </>
  );
};

export default Mainpage;