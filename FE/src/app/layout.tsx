import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '커플 궁합 테스트',
  description: '당신과 상대방의 궁합을 테스트해보세요! 질문에 답하고 공유 링크를 보내면 궁합 점수를 확인할 수 있어요.',
  keywords: ['커플', '궁합', '테스트', 'MBTI', '연애', '사랑'],
  openGraph: {
    title: '커플 궁합 테스트',
    description: '당신과 상대방의 궁합을 테스트해보세요!',
    type: 'website',
    locale: 'ko_KR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <div className="flex min-h-screen">
          <aside className="hidden lg:flex items-start pt-8 pl-4 shrink-0 w-[180px]">
            <div className="sticky top-8">
              <ins
                className="kakao_ad_area"
                style={{ display: 'none' }}
                data-ad-unit="DAN-p0h7DLWDVjYmpKqU"
                data-ad-width="160"
                data-ad-height="600"
              />
            </div>
          </aside>
          <main className="flex-1 min-h-screen">
            {children}
          </main>
          <aside className="hidden lg:flex items-start pt-8 pr-4 shrink-0 w-[180px]">
            <div className="sticky top-8">
              <ins
                className="kakao_ad_area"
                style={{ display: 'none' }}
                data-ad-unit="DAN-mErGjZG9UDaiAHEj"
                data-ad-width="160"
                data-ad-height="600"
              />
            </div>
          </aside>
        </div>
        <Script
          src="//t1.daumcdn.net/kas/static/ba.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
