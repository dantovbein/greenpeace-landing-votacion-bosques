'use client'

import { FC } from "react";
import styles from '@/app/_components/ThankYou/styles.module.css';
import { useAppContext } from "@/app/_contexts/app";
import SocialShareNav from '@/app/_components/SocialShareNav'

interface IProps {
  children?: React.ReactNode;
}

export const Component:FC<IProps> = ({ children }) => {
  const { user } = useAppContext();

  return (
    <div className={styles.main}>
      <h2 className={styles.heading}>Gracias <span className={styles.highlighted}>{user.firstName}</span> por tu voto.</h2>
      { children }
      <SocialShareNav />
    </div>
  )
}

export default Component;
