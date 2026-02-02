import Link from 'next/link'

export const metadata = {
  title: '개인정보처리방침 | 커플 궁합 테스트',
  description: '커플 궁합 테스트 서비스의 개인정보처리방침입니다.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          홈으로 돌아가기
        </Link>

        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">개인정보처리방침</h1>

          <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
            <p className="text-sm text-gray-500">
              시행일: 2024년 1월 1일
            </p>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">1. 개인정보의 수집 및 이용 목적</h2>
              <p>
                커플 궁합 테스트(이하 &quot;서비스&quot;)는 사용자의 개인정보를 다음의 목적을 위해 처리합니다.
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>서비스 제공 및 운영</li>
                <li>서비스 이용 통계 분석 (익명화된 데이터)</li>
                <li>서비스 개선 및 신규 기능 개발</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">2. 수집하는 개인정보 항목</h2>
              <p>
                본 서비스는 <strong>개인을 식별할 수 있는 정보를 수집하지 않습니다.</strong>
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>닉네임: 사용자가 입력한 닉네임은 URL에 인코딩되어 상대방과 공유되며, 서버에 저장되지 않습니다.</li>
                <li>테스트 답변: 답변 데이터는 URL 파라미터로만 전달되며, 서버에 저장되지 않습니다.</li>
                <li>통계 데이터: 궁합 점수 등의 익명화된 통계 데이터만 수집될 수 있습니다.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">3. 개인정보의 보유 및 이용 기간</h2>
              <p>
                본 서비스는 개인정보를 서버에 저장하지 않으므로, 별도의 보유 기간이 없습니다.
                모든 테스트 데이터는 URL을 통해 일시적으로만 처리됩니다.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">4. 개인정보의 제3자 제공</h2>
              <p>
                본 서비스는 사용자의 개인정보를 제3자에게 제공하지 않습니다.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">5. 쿠키 및 광고</h2>
              <p>
                본 서비스는 Google AdSense를 통해 광고를 게재할 수 있습니다.
                Google AdSense는 쿠키를 사용하여 사용자에게 맞춤형 광고를 제공할 수 있습니다.
              </p>
              <p className="mt-2">
                쿠키 사용에 대한 자세한 내용은{' '}
                <a
                  href="https://policies.google.com/technologies/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:underline"
                >
                  Google 광고 정책
                </a>
                을 참고해 주세요.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">6. 이용자의 권리</h2>
              <p>
                사용자는 언제든지 브라우저 설정을 통해 쿠키를 차단하거나 삭제할 수 있습니다.
                다만, 쿠키를 차단할 경우 일부 서비스 이용에 제한이 있을 수 있습니다.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">7. 개인정보 보호책임자</h2>
              <p>
                개인정보 처리에 관한 문의사항이 있으시면 아래 연락처로 문의해 주세요.
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>이메일: support@couple-mbti.com</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">8. 개인정보처리방침의 변경</h2>
              <p>
                본 개인정보처리방침은 법령이나 서비스 정책의 변경에 따라 수정될 수 있습니다.
                변경 시 본 페이지를 통해 공지합니다.
              </p>
            </section>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          © 2024 커플 궁합 테스트. All rights reserved.
        </p>
      </div>
    </div>
  )
}
