// import Image from 'next/image'
import './globals.css'
import styles from './layout.module.css'
import Header from '@/app/_components/Header'
import Footer from '@/app/_components/Footer'
import { Poppins } from 'next/font/google'
import { Provider } from '@/app/_contexts/app'
import Script from 'next/script'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const metadata = {
  title: `${process.env.NEXT_PUBLIC_META_TITLE}`,
  description: `${process.env.NEXT_PUBLIC_META_DESCRIPTION}`,
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://votaporlosbosques.org" />
        <meta property="og:title" content={`${process.env.NEXT_PUBLIC_META_TITLE}`} />
        <meta property="og:description" content={`${process.env.NEXT_PUBLIC_META_DESCRIPTION}`} />
        <meta property="og:image" content="https://votaporlosbosques.org/images/gp-bosques-header.jpg" />
        <meta property="twitter:card" content={`${process.env.NEXT_PUBLIC_META_DESCRIPTION}`} />
        <meta property="twitter:url" content=" https://votaporlosbosques.org" />
        <meta property="twitter:title" content={`${process.env.NEXT_PUBLIC_META_TITLE}`} />
        <meta property="twitter:description" content={`${process.env.NEXT_PUBLIC_META_DESCRIPTION}`} />
        <meta property="twitter:image" content='https://votaporlosbosques.org/images/gp-bosques-header.jpg' />
        <meta property="twitter:image" content='https://votaporlosbosques.org/images/gp-bosques-header.jpg' />
        <Script id="gtm-load-script">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'Script','dataLayer','GTM-TZB6GQ3');
          `}
        </Script>
      </head>
      <body className={poppins.className}>
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GTM-TZB6GQ3');
          `}
        </Script>
        <Provider>
          <Header />
          <main className={styles.main}>
            {children}
          </main>
        </Provider>
        <Footer />
      </body>
    </html>
  )
}
