import React, { FunctionComponent } from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  
} from 'react-share';
import styles from '@/app/_components/SocialShareNav/styles.module.css'
import Image from 'next/image';

const SHARE_MODAL_HEIGHT = 800;
const SHARE_MODAL_WIDTH = 700;

const Component: FunctionComponent<{}> = () => {
  return (
    <div>
      <h4 className={styles.title}>Compartí con tus amigos para que voten por los bosques</h4>
      <nav className={styles.socialNav}>
        <WhatsappShareButton
          url={`${process.env.NEXT_PUBLIC_WHATSAPP_URL_SHARE}`}
          title={`${process.env.NEXT_PUBLIC_TITLE_SHARE}`}
          separator=""
          windowHeight={SHARE_MODAL_HEIGHT}
          windowWidth={SHARE_MODAL_WIDTH}
          className={styles.icon}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/icons/whatsapp-icon.svg`}
            alt="Whatsapp"
            width={64}
            height={64}
          />
        </WhatsappShareButton>

        <FacebookShareButton
          hashtag='#votaporlosbosques'
          title={`${process.env.NEXT_PUBLIC_TITLE_SHARE}`}
          about={`${process.env.NEXT_PUBLIC_TITLE_SHARE}`}
          url={`${process.env.NEXT_PUBLIC_FACEBOOK_URL_SHARE}`}
          windowHeight={SHARE_MODAL_HEIGHT}
          windowWidth={SHARE_MODAL_WIDTH}
          className={styles.icon}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/icons/facebook-icon.svg`}
            alt="Facebook"
            width={64}
            height={64}
          />
        </FacebookShareButton>

        <TwitterShareButton
          title={`${process.env.NEXT_PUBLIC_TITLE_SHARE}`}
          hashtags={['votaporlosbosques']}
          via='GreenpeaceArg'
          url={`${process.env.NEXT_PUBLIC_TWITTER_URL_SHARE}`}
          windowHeight={SHARE_MODAL_HEIGHT}
          windowWidth={SHARE_MODAL_WIDTH}
          className={styles.icon}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/icons/twitter-icon.svg`}
            alt="Twitter"
            className={styles.icon}
            width={64}
            height={64}
          />
        </TwitterShareButton>
        
        <LinkedinShareButton
          title={`${process.env.NEXT_PUBLIC_TITLE_SHARE}`}
          source={`${process.env.NEXT_PUBLIC_LINKEDIN_SOURCE}`}
          url={`${process.env.NEXT_PUBLIC_LINKEDIN_URL_SHARE}`}
          className={styles.icon}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/icons/linkedin-icon.svg`}
            alt="Linkedin"
            width={64}
            height={64}
          />
        </LinkedinShareButton>
      </nav>
    </div>
  )
};

Component.displayName = 'SocialShareElements.Nav';
export default Component;
