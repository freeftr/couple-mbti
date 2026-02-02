import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
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
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
