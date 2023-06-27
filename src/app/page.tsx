'use client'

import Script from 'next/script'
import QuizForm from '@/app/_components/QuizForm'

export default function Home() {
  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=GTM-TZB6GQ3" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'GTM-TZB6GQ3');
        `}
      </Script>
      <div>
        <QuizForm />
      </div>
    </>
  )
}
