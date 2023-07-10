import Image from 'next/image'
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
        <Header />
        <main className={styles.main}>
          <Provider>
            {children}
          </Provider>
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/gp-bosques-logo.svg`}
            alt="Votá por los bosques"
            className={styles.logo}
            width={300}
            height={300}
            priority
          />
          <div className={styles.content}>
            <p><strong>Argentina se encuentra en emergencia forestal:</strong> perdemos una hectárea de bosques cada 2 minutos, el equivalente a la superficie de 30 canchas de fútbol por hora. La deforestación provoca desaparición de especies, cambio climático, inundaciones, sequías, desertificación, enfermedades, desalojos de indígenas y campesinos, pérdida de alimentos, maderas y medicinas.</p>
            <p><strong>Las principales causas son el avance de la frontera agropecuaria (ganadería y soja que en gran medida se exportan a Asia y Europa) y los incendios forestales (el 95% son por acciones humanas).</strong></p>
            <p>A pesar de que en Argentina existe una muy buena Ley de Bosques, la mayoría de los desmontes son ilegales. Es evidente que las multas no son suficientes para desalentar que arrasen con los bosques, y los empresarios suelen incluirlas como un costo más de producción. Además, los responsables casi nunca son obligados a restaurarlos y en muchos casos es clara la complicidad de funcionarios al autorizar desmontes donde no está permitido.</p>
            <p><strong>Ante esta situación, consultamos a la sociedad si considera que los desmontes ilegales e incendios forestales deben ser un delito penal.</strong></p>
          </div>
        </main>
        <Footer />
      </body>
    </html>
  )
}
