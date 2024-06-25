"use client"

import { useEffect, useMemo, useRef, useState } from 'react';
import styles from '@/app/_components/Header/styles.module.css'
import { useAppContext } from '@/app/_contexts/app';

type PictureType = {path: string; credits: string;};
const pictures: Array<PictureType> = [
  {path: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/banner/BannerChaco-clean.jpg`, credits: 'M.Katz / Greenpeace'},
  {path: `${process.env.NEXT_PUBLIC_BASE_PATH}/images/banner/BannerLos-Alerces-clean.jpg`, credits: 'Maxi Jonás / Greenpeace'}
];

export default function Header() {
  const sliderWrapperRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [windowInnerWidth, setWindowInnerWidth] = useState<number>(0);
  const { quiz: { yesVotes, noVotes } } = useAppContext();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowInnerWidth(window.innerWidth);
    }

    const interval = setInterval(() => {
      setCurrentSlide(i => i === pictures.length - 1 ? 0 : ++i);
    }, 5000);

    return () => {
      clearInterval(interval);
    }
  }, []);

  return useMemo(() => (
    <header className={styles.main}>
      <div className={styles.topBar}>
        <h4>DESTRUIR BOSQUES ES UN CRIMEN</h4>
      </div>

      <div className={styles.slider}>
        <div
          ref={sliderWrapperRef}
          className={styles.sliderWrapper}
          style={
            {
              width: `${pictures.length*100}%`,
              transform: `translateX(-${windowInnerWidth*currentSlide}px)`,
            }
          }>
          {pictures.map((picture: PictureType, index: number) => (
            <div 
              key={index}
              className={styles.sliderItem} 
              style={{
                backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${picture.path})`,
              }}
            >
              <span className={styles.credits}>{picture.credits}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.headerText}>
        <h1 className={styles.heading}><span className={styles.highlighted}>¡{(yesVotes && noVotes ? yesVotes + noVotes : "")!} PERSONAS VOTARON!</span></h1>
        <p>Sumate al reclamo contra la impunidad</p>
      </div>
    </header>
  ), [
    currentSlide,
    windowInnerWidth,
    yesVotes,
    noVotes,
  ]);
}
