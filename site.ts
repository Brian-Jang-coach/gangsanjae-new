export const locales = ['ko', 'en'] as const;
export type Locale = typeof locales[number];
export const site = {
  name: '강산재', nameEn: 'KANGSANJAE',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000', // TODO: confirmed production domain
  address: '강원특별자치도 홍천군 서면 고루개길 110',
  addressEn: '110, Gorugae-gil, Seo-myeon, Hongcheon-gun, Gangwon State, South Korea',
  mapUrl: 'https://map.naver.com/p/search/' + encodeURIComponent('강원특별자치도 홍천군 서면 고루개길 110'),
  links: { naver: null, airbnb: null, instagram: null, phone: null, email: null, kakao: null } as Record<string, string | null>,
  needsVerification: {
    rooms: true, occupancy: true, facilities: true, rates: true, checkInOut: true,
    policies: true, transport: true, pickup: true, parking: true, experienceDetails: true,
    host: true, architect: true, business: true, contact: true, booking: true, filming: true,
    reviews: true, privacy: true, domain: true,
  },
};
export const paths = ['', 'about', 'stay', 'stay/main-hanok', 'stay/private-hanok', 'experiences', 'filming', 'gallery', 'explore', 'guide', 'contact', 'privacy', 'terms'];
export const photos = [
  { src: '/images/hanok-front.jpg', width: 1280, height: 853, category: 'hanok', ko: '숲을 배경으로 돌담 위에 자리한 강산재 한옥 전경', en: 'Front view of Kangsanjae hanok with a stone wall and forest' },
  { src: '/images/garden-courtyard.jpg', width: 1280, height: 853, category: 'nature', ko: '정자와 나무가 어우러진 강산재의 한옥 마당', en: 'Kangsanjae courtyard with trees and a traditional pavilion' },
  { src: '/images/hanok-night.jpg', width: 1280, height: 853, category: 'filming', ko: '푸른 저녁 하늘 아래 따뜻한 불빛이 켜진 한옥', en: 'Warmly illuminated hanok under a blue evening sky' },
  { src: '/images/fireside-evening.jpg', width: 1280, height: 853, category: 'experience', ko: '한옥 앞 마당의 모닥불과 야외 의자', en: 'An outdoor fire and chairs in front of the hanok' },
  { src: '/images/hanok-daylight.jpg', width: 1280, height: 818, category: 'hanok', ko: '햇살 아래 기와지붕과 소나무가 보이는 한옥', en: 'Hanok roof and pine tree in daylight' },
  { src: '/images/mountain-view.jpg', width: 1280, height: 853, category: 'nature', ko: '한옥 처마 너머로 보이는 홍천의 산과 정원', en: 'Hongcheon mountain and garden beyond the hanok eaves' },
] as const;
// TODO: The following are editorial preview labels, not confirmed bookable room inventory.
export const rooms = [
  { slug: 'main-hanok', photo: 4, name: { ko: '본채 한옥', en: 'Main Hanok' }, description: { ko: '기와와 나무, 돌담이 어우러지는 전통 한옥의 풍경을 만나보세요.', en: 'Discover the textures of tiled roofs, timber and stone in a traditional hanok.' }, needsVerification: true, occupancy: null, bedrooms: null, beds: null, bathrooms: null, amenities: null, detached: null },
  { slug: 'private-hanok', photo: 1, name: { ko: '별채 한옥', en: 'Private Annex' }, description: { ko: '자연을 가까이 두고 한옥의 고요한 시간을 바라봅니다.', en: 'A quiet perspective on hanok life, with nature close at hand.' }, needsVerification: true, occupancy: null, bedrooms: null, beds: null, bathrooms: null, amenities: null, detached: null },
];
