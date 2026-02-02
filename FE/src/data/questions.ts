import { Question, CategoryInfo } from '@/types'

export const categories: CategoryInfo[] = [
  { key: 'values', label: '가치관', emoji: '💎' },
  { key: 'lifestyle', label: '라이프스타일', emoji: '🏠' },
  { key: 'taste', label: '취향', emoji: '🎨' },
  { key: 'communication', label: '소통방식', emoji: '💬' },
]

export const questions: Question[] = [
  // 가치관 (5문항)
  {
    id: 1,
    category: 'values',
    categoryLabel: '가치관',
    question: '연인과의 관계에서 가장 중요한 것은?',
    options: [
      { id: 1, text: '서로에 대한 신뢰' },
      { id: 2, text: '함께하는 시간' },
      { id: 3, text: '솔직한 대화' },
      { id: 4, text: '서로의 독립성 존중' },
    ],
  },
  {
    id: 2,
    category: 'values',
    categoryLabel: '가치관',
    question: '결혼에 대한 생각은?',
    options: [
      { id: 1, text: '꼭 하고 싶다' },
      { id: 2, text: '좋은 사람이 있다면' },
      { id: 3, text: '굳이 안 해도 괜찮다' },
      { id: 4, text: '아직 잘 모르겠다' },
    ],
  },
  {
    id: 3,
    category: 'values',
    categoryLabel: '가치관',
    question: '돈에 대한 가치관은?',
    options: [
      { id: 1, text: '철저하게 저축하는 편' },
      { id: 2, text: '계획적으로 쓰는 편' },
      { id: 3, text: '현재를 즐기며 쓰는 편' },
      { id: 4, text: '필요할 때만 쓰는 편' },
    ],
  },
  {
    id: 4,
    category: 'values',
    categoryLabel: '가치관',
    question: '가족과의 관계는 어떤가요?',
    options: [
      { id: 1, text: '매우 가깝고 자주 연락함' },
      { id: 2, text: '적당히 가깝고 종종 연락' },
      { id: 3, text: '독립적이지만 사이 좋음' },
      { id: 4, text: '각자의 삶을 존중함' },
    ],
  },
  {
    id: 5,
    category: 'values',
    categoryLabel: '가치관',
    question: '미래에 대한 계획은?',
    options: [
      { id: 1, text: '세세하게 계획하는 편' },
      { id: 2, text: '큰 그림만 그려두는 편' },
      { id: 3, text: '상황에 맞게 유연하게' },
      { id: 4, text: '흘러가는 대로' },
    ],
  },

  // 라이프스타일 (5문항)
  {
    id: 6,
    category: 'lifestyle',
    categoryLabel: '라이프스타일',
    question: '이상적인 주말은?',
    options: [
      { id: 1, text: '집에서 넷플릭스' },
      { id: 2, text: '카페에서 여유롭게' },
      { id: 3, text: '야외 활동' },
      { id: 4, text: '친구들과 모임' },
    ],
  },
  {
    id: 7,
    category: 'lifestyle',
    categoryLabel: '라이프스타일',
    question: '청소는 얼마나 자주 하나요?',
    options: [
      { id: 1, text: '매일매일' },
      { id: 2, text: '일주일에 2-3번' },
      { id: 3, text: '일주일에 한 번' },
      { id: 4, text: '더러워지면 그때그때' },
    ],
  },
  {
    id: 8,
    category: 'lifestyle',
    categoryLabel: '라이프스타일',
    question: '아침형 인간 vs 저녁형 인간?',
    options: [
      { id: 1, text: '완전 아침형' },
      { id: 2, text: '약간 아침형' },
      { id: 3, text: '약간 저녁형' },
      { id: 4, text: '완전 저녁형' },
    ],
  },
  {
    id: 9,
    category: 'lifestyle',
    categoryLabel: '라이프스타일',
    question: '선호하는 여행 스타일은?',
    options: [
      { id: 1, text: '철저하게 계획된 여행' },
      { id: 2, text: '핵심만 정하고 자유롭게' },
      { id: 3, text: '완전 즉흥 여행' },
      { id: 4, text: '집에서 쉬는 게 최고' },
    ],
  },
  {
    id: 10,
    category: 'lifestyle',
    categoryLabel: '라이프스타일',
    question: '반려동물에 대한 생각은?',
    options: [
      { id: 1, text: '꼭 키우고 싶다' },
      { id: 2, text: '키워도 괜찮다' },
      { id: 3, text: '별로 관심 없다' },
      { id: 4, text: '키우고 싶지 않다' },
    ],
  },

  // 취향 (5문항)
  {
    id: 11,
    category: 'taste',
    categoryLabel: '취향',
    question: '좋아하는 음식 스타일은?',
    options: [
      { id: 1, text: '한식이 최고' },
      { id: 2, text: '양식/이탈리안' },
      { id: 3, text: '아시안 (중식, 일식 등)' },
      { id: 4, text: '가리지 않고 다 좋아함' },
    ],
  },
  {
    id: 12,
    category: 'taste',
    categoryLabel: '취향',
    question: '선호하는 데이트는?',
    options: [
      { id: 1, text: '영화/공연 관람' },
      { id: 2, text: '맛집 탐방' },
      { id: 3, text: '액티비티 (운동, 게임 등)' },
      { id: 4, text: '집에서 함께 보내기' },
    ],
  },
  {
    id: 13,
    category: 'taste',
    categoryLabel: '취향',
    question: '좋아하는 음악 장르는?',
    options: [
      { id: 1, text: 'K-POP / 아이돌' },
      { id: 2, text: '힙합 / R&B' },
      { id: 3, text: '발라드 / 인디' },
      { id: 4, text: '팝 / 록' },
    ],
  },
  {
    id: 14,
    category: 'taste',
    categoryLabel: '취향',
    question: '술에 대한 취향은?',
    options: [
      { id: 1, text: '술을 즐기는 편' },
      { id: 2, text: '가끔 한 잔 정도' },
      { id: 3, text: '거의 안 마시는 편' },
      { id: 4, text: '아예 안 마심' },
    ],
  },
  {
    id: 15,
    category: 'taste',
    categoryLabel: '취향',
    question: '휴가 때 가고 싶은 곳은?',
    options: [
      { id: 1, text: '바다/해변' },
      { id: 2, text: '산/자연' },
      { id: 3, text: '도시 여행' },
      { id: 4, text: '이색 체험 (캠핑 등)' },
    ],
  },

  // 소통방식 (5문항)
  {
    id: 16,
    category: 'communication',
    categoryLabel: '소통방식',
    question: '연락 빈도는 어느 정도가 좋나요?',
    options: [
      { id: 1, text: '수시로 연락하고 싶다' },
      { id: 2, text: '하루에 몇 번 정도' },
      { id: 3, text: '아침/저녁 안부 정도' },
      { id: 4, text: '필요할 때만' },
    ],
  },
  {
    id: 17,
    category: 'communication',
    categoryLabel: '소통방식',
    question: '갈등이 생겼을 때는?',
    options: [
      { id: 1, text: '바로 대화로 해결' },
      { id: 2, text: '진정된 후 대화' },
      { id: 3, text: '시간을 두고 생각 정리' },
      { id: 4, text: '상대가 먼저 말하길 기다림' },
    ],
  },
  {
    id: 18,
    category: 'communication',
    categoryLabel: '소통방식',
    question: '애정 표현 방식은?',
    options: [
      { id: 1, text: '스킨십으로 표현' },
      { id: 2, text: '말로 직접 표현' },
      { id: 3, text: '선물이나 행동으로' },
      { id: 4, text: '함께 시간을 보내며' },
    ],
  },
  {
    id: 19,
    category: 'communication',
    categoryLabel: '소통방식',
    question: '상대방의 친구들과는?',
    options: [
      { id: 1, text: '적극적으로 어울리고 싶다' },
      { id: 2, text: '가끔 만나는 건 좋다' },
      { id: 3, text: '특별한 날에만' },
      { id: 4, text: '각자의 친구는 따로' },
    ],
  },
  {
    id: 20,
    category: 'communication',
    categoryLabel: '소통방식',
    question: '고민이 있을 때는?',
    options: [
      { id: 1, text: '바로 연인에게 이야기함' },
      { id: 2, text: '정리 후에 이야기함' },
      { id: 3, text: '혼자 해결하려고 함' },
      { id: 4, text: '친구에게 먼저 이야기함' },
    ],
  },
]
