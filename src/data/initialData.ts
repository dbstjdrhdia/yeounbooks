import { BookCuration, StoryEssay, SiteConfig } from '../types';

export const INITIAL_SITE_CONFIG: SiteConfig = {
  siteName: '여운책방',
  siteSubtitle: 'Yeoun Books',
  slogan: '마음에 긴 여운을 남기는 문장과 이야기',
  aboutIntro: '속도와 효율의 시대 속에서, 저희는 다소 느리더라도 오래도록 마음에 남아 조용히 맴도는 문장들의 힘을 믿습니다.',
  aboutBodyParagraphs: [
    '여운책방은 매일 쏟아지는 뉴스 피드와 자극적인 정보의 홍수에서 벗어나, 시간이 흘러도 가치를 잃지 않는 에버그린(Evergreen) 콘텐츠를 다듬고 차곡차곡 보관하는 타임리스 아카이브 공간입니다.',
    '우리가 쫓기는 것은 시간 자체가 아니라 마음의 여백일지도 모릅니다. 단 한 편의 글, 책 한 권에서 발췌된 묵직한 몇 줄의 문장이 당신의 오늘 밤을 조금 더 깊고 포근하게 만들어주기를 바랍니다.',
    '비정기적으로 엄선하는 [여운의 책]과 오랜 사색 끝에 가다듬은 [여운의 글]은 언제 방문하더라도 항상 당신을 조용히 기다리고 있을 것입니다.'
  ],
  curatorName: '여운책방 지기',
  curatorBio: '책과 종이 향기, 고요한 밤의 사색을 사랑하는 도서 큐레이터이자 에세이스트.',
  curatorImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
  heroBanner: {
    title: '이달의 여운의 책',
    subtitle: '시간이 흘러도 빛이 바래지 않는 텍스트의 힘을 믿습니다.',
    quote: '우리가 진정으로 사유하기 시작할 때,\n비로소 마음속 깊은 곳에서\n조용한 여운이 피어난다',
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1600&q=80',
    badgeText: 'Curated Exhibition',
    linkToType: 'curation',
    linkToId: 'curation-1'
  },
  theme: {
    fontStyle: 'gowun',
    palette: 'warm-cream',
    hideDates: true
  },
  operationalNotice: {
    enabled: true,
    bannerText: '매월 1일, 마음에 긴 여운을 남기는 새로운 문장과 엄선된 도서가 찾아옵니다.',
    modelType: 'monthly'
  },
  socialLinks: {
    instagram: 'https://instagram.com',
    substack: 'https://substack.com',
    youtube: 'https://youtube.com',
    email: 'contact@yeounbooks.com'
  },
  seo: {
    metaTitle: '여운책방 (Yeoun Books) - 마음에 긴 여운을 남기는 문장과 이야기',
    metaDescription: '시간이 지나도 가치를 잃지 않는 에버그린 도서 큐레이션과 깊이 있는 에세이 아카이브 공간입니다.',
    ogImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
    keywords: '여운책방, 에세이, 도서 큐레이션, 감성 문장, 에버그린 아카이브, 독서, 책추천'
  }
};

export const INITIAL_CURATIONS: BookCuration[] = [
  {
    id: 'curation-1',
    title: '작은 것들의 신성이 피어나는 서가',
    subtitle: '침묵 속에서 스스로를 찾아가는 조용한 사색의 서사',
    author: '한정원',
    publisher: '난다',
    category: '에세이 / 독서일기',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    quote: '“무언가를 오래 바라보면 그 대상이 나를 향해 빛을 내기 시작한다. 시선은 사랑의 다른 이름이다.”',
    review: `빠르게 변화하는 세상의 속도에 지친 날이면, 문득 무음의 상태로 사물을 고요히 바라보던 어린 날의 시선이 그리워집니다. 이 책은 저자가 오랜 시간 조용히 곁에 둔 책과 풍경, 그리고 시선에 대한 헌사입니다.

한 페이지를 넘길 때마다 서두르던 마음이 차분하게 가라앉으며, 종이의 촉감과 함께 조용한 안식의 감각이 온몸으로 퍼져나갑니다. 지친 날의 끝에서 단 한 문장이라도 내 편이 되어줄 글을 찾고 있는 이들에게 권합니다.`,
    tags: ['독서일기', '조용한침묵', '사색의시간', '감성문장'],
    isFeatured: true
  },
  {
    id: 'curation-2',
    title: '어둠이 다가올 때 켜는 조그만 등불',
    subtitle: '밤의 끝자락에서 만난 고요한 위로의 언어들',
    author: '최진영',
    publisher: '민음사',
    category: '한국소설 / 사색',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    quote: '“서로의 안부를 묻는 일은, 우리가 아직 이 캄캄한 세상에서 길을 잃지 않았음을 확인하는 소박한 신호다.”',
    review: `어둠이 짙게 깔린 밤, 책상 위에 작은 스탠드 불빛 하나만을 켜둔 채 페이지를 넘깁니다. 작가는 특유의 따뜻하고 정갈한 문체로 인간이 지닌 외로움의 온도를 가만히 측정합니다.

언어는 때로 차가운 위로보다 따스한 체온으로 다가옵니다. 타인과 나 자신을 향한 조용한 다정함이 필요할 때, 이 소설집의 한 단락을 천천히 읽어보세요.`,
    tags: ['다정함', '밤의독서', '마음의온도', '위로'],
    isFeatured: true
  },
  {
    id: 'curation-3',
    title: '시간을 견뎌낸 오래된 서점의 서가',
    subtitle: '수백 년의 이야기가 누적된 목조 서점에서의 하루',
    author: '실비아 비치',
    publisher: '열린책들',
    category: '외국문학 / 회고록',
    coverImage: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80',
    quote: '“책방이라는 공간은 단지 종이를 파는 곳이 아닌, 영혼과 영혼이 교차하는 작고 거룩한 정류장이다.”',
    review: `파리의 유명한 서점 '셰익스피어 앤 컴퍼니'의 창립자가 남긴 기록입니다. 헤밍웨이, 조이스, 피츠제럴드 등 당대의 뛰어난 문학가들이 거쳐간 이 자그마한 공간은 문학을 사랑하는 이들의 안식처였습니다.

오래된 나무 냄새와 낡은 양장본의 감촉이 고스란히 느껴지는 이 책은 단순한 기록을 넘어 문학에 대한 숭고한 열정을 일깨워줍니다.`,
    tags: ['서점기록', '클래식', '파리', '문학기행'],
    isFeatured: false
  },
  {
    id: 'curation-4',
    title: '바람이 지나는 길목에서 쓴 편지',
    subtitle: '자연과 계절의 변화 속에서 발견한 삶의 순리',
    author: '이슬아',
    publisher: '헤엄',
    category: '에세이',
    coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
    quote: '“나를 둘러싼 모든 계절은 사실 나를 위해 준비된 커다란 무대이자 선물이었다.”',
    review: `매일 아침 도착하는 글월처럼 산뜻하고 솔직한 저자의 산문집입니다. 일상의 소소한 순간들을 포착하여 유쾌하면서도 마음 한구석을 찡하게 만드는 강한 흡인력을 가지고 있습니다.`,
    tags: ['일상산문', '계절의여운', '솔직함', '연대'],
    isFeatured: false
  }
];

export const INITIAL_ESSAYS: StoryEssay[] = [
  {
    id: 'story-1',
    title: '침묵 속에서 비로소 들려오는 나만의 문장들',
    subtitle: '세상의 소음을 끄고 서가 앞에서 마주하는 온전한 나 자신',
    category: '밤의 사색',
    coverImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80',
    excerpt: '우리가 진정으로 책을 펼치는 순간은 지식을 얻기 위함이 아니라, 비로소 조용히 혼자가 되기 위함입니다.',
    paragraphs: [
      '모든 소음이 잠든 밤 11시, 스탠드 조명의 둥근 궤적 안으로 책 한 권을 가져옵니다. 낮 동안 쉼 없이 울려대던 스마트폰의 알림음과 세상의 수많은 요구로부터 벗어나는 가장 완벽한 방법은, 종이책의 첫 장을 넘기는 그 조용한 동작 하나뿐입니다.',
      '책장은 문장이라는 사다리를 내려주어 우리를 평소보다 조금 더 깊은 내부의 세계로 안내합니다. 타인의 생각과 나의 사유가 겹쳐지는 그 희미한 경계선에서, 우리는 잊고 있던 스스로의 목소리를 다시 듣게 됩니다.',
      '시간이 흐른다는 것은 나이가 드는 것이 아니라, 마음속에 담아둘 수 있는 문장의 수가 늘어난다는 뜻일지도 모릅니다. 오늘 밤, 당신의 마음에 오래도록 묵직한 무게감을 남길 단 한 줄의 문장을 만나셨기를 바랍니다.'
    ],
    inlineImage: {
      url: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1000&q=80',
      caption: '어둠이 내려앉은 서재, 조용히 불을 밝히는 순간'
    },
    highlightQuote: '“책을 읽는 것은 타인의 마음을 빌려 나의 가장 깊은 곳을 비춰보는 조용한 등불을 켜는 일이다.”',
    readingTime: '4분 사색',
    isFeatured: true,
    authorName: '여운책방지기'
  },
  {
    id: 'story-2',
    title: '계절이 고여있는 골목길과 오래된 목조 서점',
    subtitle: '아날로그의 온기가 남아있는 공간이 전하는 다정한 안부',
    category: '공간의 여운',
    coverImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80',
    excerpt: '낡은 나무 바닥이 삐걱거리는 작은 책방에는 시간을 견뎌낸 문장들의 고소한 냄새가 차곡차곡 쌓여 있습니다.',
    paragraphs: [
      '비가 오락가락하는 어느 가을날 오후, 좁은 골목길 모퉁이에 위치한 오래된 목조 서점의 유리문을 열었습니다. 문을 열자마자 밀려드는 종이와 목재, 그리고 진하게 우려낸 차 향기가 비에 젖은 어깨를 다정하게 감싸 안았습니다.',
      '알고리즘이 추천하는 빠른 속도의 세상에서, 무작위로 서가를 거닐며 뜻밖의 책과 손끝이 닿는 그 우연한 경험은 우리에게 커다란 선물과도 같습니다. 서점 주인분이 손글씨로 적어둔 작은 추천 엽서를 읽으며, 사람과 사람을 잇는 가장 아름다운 매개체는 역시 언어라는 사실을 다시금 깨닫습니다.',
      '우리가 이 작은 공간을 쉽게 떠나지 못하는 이유는, 이곳에 머무는 동안만큼은 시계 바늘이 조금 더 천천히 돌아가는 듯한 착각이 들기 때문일 것입니다.'
    ],
    inlineImage: {
      url: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=1000&q=80',
      caption: '빛바랜 책표지 위에 사선으로 떨어지는 따스한 오후의 햇살'
    },
    highlightQuote: '“아날로그 공간이 전하는 온기는 단지 과거에 대한 향수가 아닌, 지금 이 순간 우리 마음을 다독이는 다정한 체온이다.”',
    readingTime: '5분 사색',
    isFeatured: true,
    authorName: '여운책방지기'
  },
  {
    id: 'story-3',
    title: '여름날 차가운 찻잔 위로 떨어진 시 한 구절',
    subtitle: '무심코 흘려보낸 순간을 특별하게 만드는 언어의 힘',
    category: '단상',
    coverImage: 'https://images.unsplash.com/photo-1510172951991-856a654063f9?auto=format&fit=crop&w=1200&q=80',
    excerpt: '잘 차려진 한 끼 식사처럼, 훌륭한 시 한 편은 영혼의 허기를 가만히 채워줍니다.',
    paragraphs: [
      '무더위가 기승을 부리던 한낮, 얼음이 담긴 찻잔 표면에 맺힌 물방울이 모여 테이블 위로 동그랗게 떨어졌습니다. 그 자그마한 물방울 하나에서 우주를 보았던 시인의 마음을 불현듯 이해하게 되었습니다.',
      '일상의 모든 기적은 대단한 모습으로 찾아오지 않습니다. 계절의 변화, 바람의 온도, 그리고 책장 사이에서 우연히 발견한 짧은 시 구절 하나가 우리의 하염없이 평범한 하루를 빛나는 선물로 바꾸어 놓습니다.'
    ],
    highlightQuote: '“시는 언어로 그려낸 가장 아름다운 그림이자, 사물의 본질을 부드럽게 쓰다듬는 손길이다.”',
    readingTime: '3분 사색',
    isFeatured: false,
    authorName: '여운책방지기'
  },
  {
    id: 'story-4',
    title: '타임리스 아카이브를 개점하며 드리는 글',
    subtitle: '최신성이라는 압박에서 벗어나 영원한 문장의 집을 짓다',
    category: '책방 이야기',
    coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
    excerpt: '우리는 무엇인가를 지속적으로 올려야 한다는 조급함 대신, 오랫동안 보관할 가치가 있는 글을 깊게 품고자 합니다.',
    paragraphs: [
      '인터넷 매체들은 날마다 "새로운 소식"과 "실시간 급상승"을 외칩니다. 그러나 오늘 읽고 내일 잊혀지는 단발성 글들은 우리의 마음을 풍요롭게 하기보다 오히려 사색의 잔고를 메마르게 만듭니다.',
      '여운책방은 날짜 표시를 최소화하고, 최신순 피드가 아닌 큐레이터의 세심한 선택에 따른 에버그린 진열 방식을 택했습니다. 한 달에 단 한 권의 책, 혹은 계절에 단 한 편의 글이라도 진심을 다해 선보이겠습니다.'
    ],
    highlightQuote: '“진정한 가치는 마모되지 않는 타임리스(Timeless)함 속에 있습니다.”',
    readingTime: '4분 사색',
    isFeatured: false,
    authorName: '여운책방지기'
  }
];
