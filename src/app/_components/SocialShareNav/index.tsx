import React, { FunctionComponent } from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  // EmailShareButton,
  LinkedinShareButton,
  
} from 'react-share';
import styles from '@/app/_components/SocialShareNav/styles.module.css'
import Image from 'next/image';

const SHARE_MODAL_HEIGHT = 800;
const SHARE_MODAL_WIDTH = 600;

const Component: FunctionComponent<{}> = () => {
  return (
    <div>
      <h4 className={styles.title}>Compartí con tus amigos</h4>
      <nav className={styles.socialNav}>
        <WhatsappShareButton
          title={`${process.env.NEXT_PUBLIC_WHATSAPP_TITLE_SHARE} hdfjhdjhdj`}
          url={`${process.env.NEXT_PUBLIC_URL_SHARE}`}
          separator=" "
          windowHeight={SHARE_MODAL_HEIGHT}
          windowWidth={SHARE_MODAL_WIDTH}
          className={styles.icon}
        >
          <Image
            src="/images/icons/whatsapp-icon.svg"
            alt="Whatsapp"
            width={64}
            height={64}
          />
        </WhatsappShareButton>

        <FacebookShareButton
          quote={`${process.env.NEXT_PUBLIC_FACEBOOK_TITLE_SHARE}`}
          url={`${process.env.NEXT_PUBLIC_URL_SHARE}`}
          windowHeight={SHARE_MODAL_HEIGHT}
          windowWidth={SHARE_MODAL_WIDTH}
          className={styles.icon}
        >
          <Image
            src="/images/icons/facebook-icon.svg"
            alt="Facebook"
            width={64}
            height={64}
          />
        </FacebookShareButton>

        <TwitterShareButton
          title={`${process.env.NEXT_PUBLIC_TWITTER_TITLE_SHARE}`}
          url={`${process.env.NEXT_PUBLIC_URL_SHARE}`}
          windowHeight={SHARE_MODAL_HEIGHT}
          windowWidth={SHARE_MODAL_WIDTH}
          className={styles.icon}
        >
          <Image
            src="/images/icons/twitter-icon.svg"
            alt="Twitter"
            className={styles.icon}
            width={64}
            height={64}
          />
        </TwitterShareButton>

        <LinkedinShareButton
          about={`${process.env.NEXT_PUBLIC_LINKEDIN_ABOUT_SHARE}`}
          url={`${process.env.NEXT_PUBLIC_URL_SHARE}`}
          className={styles.icon}
        >
          <Image
            src="/images/icons/linkedin-icon.svg"
            alt="Linkedin"
            width={64}
            height={64}
          />
        </LinkedinShareButton>
      </nav>
    </div>
  )
};

          
          
          {/* <Image
            src="/images/icons/email-icon.png"
            alt="Email"
            className={styles.icon}
            width={64}
            height={64}
          /> */}

Component.displayName = 'SocialShareElements.Nav';
export default Component;
