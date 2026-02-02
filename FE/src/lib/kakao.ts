declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void
      isInitialized: () => boolean
      Share: {
        sendDefault: (options: KakaoShareOptions) => void
      }
    }
  }
}

interface KakaoShareOptions {
  objectType: 'feed'
  content: {
    title: string
    description: string
    imageUrl: string
    link: {
      mobileWebUrl: string
      webUrl: string
    }
  }
  buttons?: Array<{
    title: string
    link: {
      mobileWebUrl: string
      webUrl: string
    }
  }>
}

const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY || ''

export function initKakao(): boolean {
  if (typeof window === 'undefined') return false
  if (!KAKAO_JS_KEY) {
    console.warn('Kakao JS Key is not set. Please set NEXT_PUBLIC_KAKAO_JS_KEY environment variable.')
    return false
  }

  if (window.Kakao && !window.Kakao.isInitialized()) {
    window.Kakao.init(KAKAO_JS_KEY)
  }

  return window.Kakao?.isInitialized() || false
}

export function shareKakao(options: {
  title: string
  description: string
  imageUrl?: string
  url: string
  buttonText?: string
}): boolean {
  if (typeof window === 'undefined' || !window.Kakao) {
    console.warn('Kakao SDK is not loaded')
    return false
  }

  if (!window.Kakao.isInitialized()) {
    if (!initKakao()) {
      return false
    }
  }

  try {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: options.title,
        description: options.description,
        imageUrl: options.imageUrl || `${window.location.origin}/og-image.png`,
        link: {
          mobileWebUrl: options.url,
          webUrl: options.url,
        },
      },
      buttons: [
        {
          title: options.buttonText || '테스트 하러 가기',
          link: {
            mobileWebUrl: options.url,
            webUrl: options.url,
          },
        },
      ],
    })
    return true
  } catch (error) {
    console.error('Failed to share via Kakao:', error)
    return false
  }
}
