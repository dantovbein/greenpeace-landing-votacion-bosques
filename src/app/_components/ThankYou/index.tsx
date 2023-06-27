'use client'

import { FC } from "react";
import styles from '@/app/_components/ThankYou/styles.module.css';
import { useFormContext } from "@/app/_contexts/form";
import SocialShareNav from '@/app/_components/SocialShareNav'
// import Image from "next/image";

interface IProps {
  children?: React.ReactNode;
}

export const Component:FC<IProps> = ({ children }) => {
  const { data } = useFormContext();

  return (
    <div className={styles.main}>
      <h2 className={styles.heading}>Gracias <span className={styles.highlighted}>{data.fullName}</span> por tu voto.</h2>
      { children }
      {/* <Image
        src="/trees.svg"
        alt="Votá por los bosques"
        className={styles.trees}
        width={250}
        height={250}
        priority
      /> */}
      <SocialShareNav />
    </div>
  )
}

export default Component;
