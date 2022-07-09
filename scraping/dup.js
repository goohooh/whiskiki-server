const mongoose = require('mongoose');
const { Whisky } = require('../src/models');

const mongooseUrl =
  'mongodb+srv://whiskiki:1IGbcjNtO6dnaNgd@cluster0.4vlij.mongodb.net/whiskiki?retryWrites=true&w=majority';
mongoose.connect(mongooseUrl).then(() => {
  run2();
});

const dups = [
  '19 크라임스 레드 블렌드',
  '19 크라임스 쉬라즈',
  '19 크라임스 하드 샤르도네',
  '골드 오브 모리셔스 다크 럼',
  '구미호 루비 테일',
  '글렌 그란트 12년',
  '글렌 그란트 18년',
  '글렌 그란트 아보랄리스',
  '글렌 스코샤 더블 캐스크',
  '글렌 스코샤 캠벨타운 하버',
  '글렌 터너 12년',
  '글렌고인 12년',
  '글렌도워 블렌디드 몰트',
  '글렌드로낙 12년',
  '글렌라씨',
  '글렌로티스 12년',
  '글렌로티스 WMC',
  '글렌모렌지 넥타도르',
  '글렌모렌지 오리지널 10년',
  '글렌알라키 11년 PX 셰리 우드 피니시',
  '글렌알라키 12년 루비 포트 우드 피니시',
  '글렌알라키 12년',
  '글렌알라키 13년 마데이라 우드 피니시',
  '글렌알라키 15년',
  '글렌알라키 싱글 캐스크 1989 루비 포트',
  '글렌파클라스 10년',
  '글렌파클라스 8년',
  '글렌피딕 12년',
  '글렌피딕 18년',
  '깔루아',
  '꼴레 꼬르비아노 몬테풀치아노 다브루쪼',
  '네이키드 그라우스',
  '노아스 밀',
  '다니엘 부쥬 로얄',
  '다니엘 부쥬 XO',
  '다렌버그 더 갈보 가라지',
  '다렌버그 와일드 픽시 쉬라즈',
  '달모어 25년',
  '달모어 시가 몰트 리저브',
  '달위니 15년',
  '더 글렌리벳 12년',
  '더 글렌리벳 15년',
  '더 글렌리벳 18년',
  '더 페이머스 그라우스 1L',
  '더 페이머스 그라우스',
  '도그 포인트 소비뇽 블랑',
  '돈 파파 10년',
  '돈 파파 럼',
  '돈 파파 포트 캐스크 럼',
  '듀랑고 데킬라 골드',
  '듀랑고 커피 리큐르(1L)',
  '듀어스 12년',
  '디 아이리쉬맨 12년 싱글몰트',
  '디 안티콰리 12년',
  '디사론노',
  '디카이퍼 그레이프후르트',
  '디카이퍼 블루큐라소',
  '디카이퍼 카시스',
  '디카이퍼 카페',
  '디카이퍼 콰이페',
  '디카이퍼 트리플 섹',
  '디킨 쉬라즈',
  '디플로마티코 리제르바 익스클루시바',
  '디플로마티코 만투아노',
  '떼땅져 녹턴 시티 라이트',
  '떼땅져 레폴리',
  '라가불린 16년',
  '라가불린 8년',
  '라세이 싱글몰트 위스키 배치 1(R-01)',
  '라세이 싱글몰트 위스키 배치 2(R-02)',
  '라이터즈 티얼즈 더블 오크',
  '라이터즈 티얼즈 코퍼 팟',
  '라프로익 10년',
  '라프로익 쿼터 캐스크',
  '러브 해머',
  '러셀 리저브 10년',
  '러셀 리저브 싱글 배럴',
  '레미 마틴 VSOP',
  '레벨 켄터키 스트레이트 라이',
  '레벨 켄터키 스트레이트 버번 100프루프',
  '레벨 켄터키 스트레이트 버번',
  '레칙 싱클레어',
  '로스 바스코스 크로마스 까르미네르 그란 리세르바',
  '로얄살루트 21년',
  '로크로몬드 12년',
  '로크로몬드 디 오픈 스페셜 에디션',
  '로크로몬드 오리지날',
  '론디아즈 151 럼',
  '론디아즈 골드 럼',
  '론디아즈 실버 럼',
  '론디아즈 코코넛 럼',
  '룩 벨레어 럭스 기프트 박스',
  '룩 벨레어 럭스 로제 기프트 박스',
  '룩 벨레어 로제 기프트 박스',
  '룩사르도 마라스키노 체리',
  '르 진',
  '리뎀션 하이 라이',
  '리젠트',
  '마르케스 데 리스칼 아리엔조 크리안자',
  '마리브리자드 라즈베리',
  '마리브리자드 바이올렛',
  '마리브리자드 파르페아모르',
  '마이너 케이스 라이',
  '매그너스 쥬시애플 1박스(24캔)',
  '매그너스 쥬시애플 4병 팩',
  '맥스 뉴질랜드 스페셜 호프 2021 355ml 24캔',
  '맥캘란 12년 더블 캐스크',
  '맥캘란 12년 셰리 오크',
  '맥캘란 15년 트리플 캐스크',
  '맥캘란 18년 더블 캐스크',
  '메이커스 마크',
  '몰트락 16년',
  '몰피 진 로사',
  '몽지람 M3 크리스탈',
  '몽키숄더',
  '미나토야 토스케 준마이 다이긴죠',
  '미션 서드 까베르네-시라',
  '미스터 보스턴 버번',
  '믹터스 10년 버번',
  '믹터스 배럴 스트렝스 라이',
  '믹터스 US*1 스몰배치 버번',
  '믹터스 US*1 스몰배치 사워매쉬',
  '믹터스 US*1 싱글 배럴 라이',
  '바로스 루비 포트 와인',
  '바로스 콜헤이타 2007 포트 와인',
  '바로스 LBV 포트 와인',
  '발렌타인 12년',
  '발렌타인 17년',
  '발렌타인 21년',
  '발렌타인 30년',
  '발렌타인 마스터즈',
  '발렌타인 싱글몰트 글렌버기 12년',
  '발렌타인 싱글몰트 글렌버기 15년',
  '버지니아-하이랜드 포트 캐스크 피니쉬 위스키',
  '버팔로 트레이스',
  '베이커스 7년',
  '베키아 로마냐 클라시카',
  '베키아 로마냐 트레보티',
  '벤로막 10년',
  '벤로막 15년',
  '벤리악 10년',
  '벨꼴레 모스카토 다스티 1박스(6병)',
  '벨즈 1L',
  '보모어 12년',
  '보모어 15년',
  '부나하벤 12년',
  '부쉬밀 10년',
  '부쉬밀 블랙 부쉬',
  '부쉬밀 오리지날',
  '불라 깔바도스 그랑 솔라지',
  '불라 깔바도스 VSOP',
  '불라 뽀모 드 노르망디',
  '불렛 버번',
  '브로커스 진',
  '브로큰 드림즈 샤르도네',
  '브룩라디 스코티쉬 발리',
  '블랙 보틀',
  '비네티 자냐타, 레 살리네',
  '빈도로 프리미티보 디 만두리아',
  '빌라 아 세스타, 리팔텔라 끼안티 수페리오레',
  '빌로셀 2018',
  '사사이치 나츠 준마이 긴죠',
  '사제락 라이',
  '산토리 가쿠빈',
  '상선여수 준마이 긴죠 30주년 기념',
  '상선여수 준마이 긴죠 55',
  '상선여수 준마이 다이긴죠',
  '상선여수 준마이',
  '샌드 누즈 로제',
  '생 제르맹',
  '샤또 드 피제이 보졸레 누보',
  '샤또 레 알베르 보르도 루즈',
  '서던 컴포트 블랙',
  '서던 컴포트 오리지날',
  '소그라페 실크 앤 스파이스',
  '솔레라5 골드 오브 모리셔스 다크 럼',
  '솔레라8 골드 오브 모리셔스 다크 럼',
  '송죽매 준마이 750',
  '쉴드 에스테이트 쉬라즈',
  '스모키 스캇',
  '스미노프 그린애플',
  '스칼리웩',
  '스태그 주니어',
  '스탠드 아웃 레드',
  '스페이번 10년',
  '스페이번 브라단 오락',
  '슬로 잼스 소비뇽 블랑',
  '시데랄',
  '싱글톤 더프타운 12년',
  '쓰리 스타 바이 골든 블랑 로제',
  '쓰리 스타 바이 골든 블랑',
  '씨에라 데킬라 레포사도',
  '아녹 12년',
  '아드벡 10년',
  '아란 10년',
  '아란 배럴 리저브',
  '아란 아마로네 캐스크 피니쉬',
  '아르망 드 브리냑 브뤼 골드',
  '아메리칸 허니',
  '아벨라워 12년',
  '아벨라워 14년',
  '아벨라워 16년',
  '아벨라워 아부나흐',
  '암룻 인디언 캐스크 스트렝스',
  '암룻 인디언',
  '암룻 퓨전',
  '암룻 피티드 인디언 캐스크 스트렝스',
  '암룻 피티드 인디언',
  '앱솔루트 엑스트랙',
  '앱솔루트 엘릭스',
  '야마자키 12년',
  '야에가키 준마이',
  '양하대곡(375ml)',
  '양하청자',
  '에즈라 99',
  '에즈라 브룩스 켄터키 스트레이트 버번',
  '에페스 필스너 330ml 24병',
  '예거마이스터',
  '옐로우 로즈 프리미엄 아메리칸 위스키',
  '옐로우 로즈 해리스 카운티',
  '옐로우스톤 셀렉트',
  '오반 14년',
  '오스본 화이트 포트 와인',
  '오이스터 베이 소비뇽 블랑',
  '오켄토션 12년',
  '올드 포레스터',
  '와일드 터키 13년',
  '와일드 터키 8년',
  '와일드 터키 라이',
  '와일드 터키 마스터스 킵 바틀 인 본드',
  '와일드 터키 마스터스 킵 코너스톤 라이',
  '우드포드 리저브',
  '울프번 노스랜드',
  '울프번 랭스킵',
  '월계관 준마이 다이긴죠',
  '윌렛 라이',
  '윌렛 팟 스틸 리저브',
  '유 원 프리미티보 디 만두리아',
  '이글 레어 10년',
  '이탈리쿠스',
  '조니 드럼 블랙 라벨',
  '조니워커 18년',
  '조니워커 레드',
  '조니워커 블루',
  '주라 12년 셰리 캐스크',
  '즈이센 코슈 40',
  '지올 2017',
  '짐빔 라이',
  '천지람',
  '치타',
  '칭따오 마스터 리미티드 비어',
  '카를로 사니 수수마니엘로 2020',
  '카발란 디스틸러리 셀렉트',
  '카발란 솔리스트 포트 캐스크 스트렝스',
  '카발란 올로로쏘 셰리 오크',
  '카발란 클래식 싱글몰트',
  '캄파리 홈텐딩 키트',
  '캘러웨이 까베르네 소비뇽',
  '캘러웨이 샤르도네',
  '커티 삭',
  '켄터키 젠틀맨 버번',
  '코발 포 그레인 위스키',
  '코퍼헤드 오리지날 진',
  '콜로마 그랑 리저브',
  '콜로마 크레마',
  '콰트로 콘티 네그로아마로 IGT 4번 와인',
  '쿠보타 준마이 다이긴죠',
  '쿠지노 마쿨 로타',
  '쿠지노 마쿨 피니스 떼라에',
  '크리스찬 드루앵 라 블랑슈',
  '크리스찬 드루앵 셀렉시옹',
  '킬호만 마키어 베이',
  '킬호만 사닉',
  '킹 어브 스카츠',
  '킹스그로브 나파 밸리 까베르네 소비뇽',
  '타파스 가르나차 레드',
  '타파스 가르나차 로제',
  '타파스 까베르네 소비뇽',
  '타파스 모스카토',
  '타파스 베르데호',
  '타파스 템프라니요',
  '탈라몬티, 모다 몬테풀치아노 다브루쪼',
  '탈로 프리미티보 디 만두리아',
  '탈리스커 10년',
  '템플턴 라이 6년(구형)',
  '토모어 프라이빗 캐스크 24년',
  '트림바흐 게뷔르츠트라미너',
  '티나',
  '티모러스 비스티',
  '틸링 스몰 배치 아이리쉬 위스키',
  '틸링 싱글 그레인 아이리쉬 위스키',
  '틸링 싱글몰트 아이리쉬 위스키',
  '파논 토카이 아수 5 푸토뇨스',
  '파이퍼 하이직 뀌베 브뤼',
  '페탈루마, 옐로우 라벨 쿠나와라 까베르네 메를로',
  '페트론 시트론지 오렌지',
  '페페로페즈 골드',
  '펜폴즈 빈 389 까베르네 쉬라즈',
  '포 로지스 싱글 배럴',
  '포 스타 바이 골든 블랑',
  '포트샬롯 10년',
  '폴 지로 리저브',
  '푸나무 소비뇽 블랑',
  '프레시넷 꼬든 네그로 까바 브뤼',
  '프론테라 프리미엄 까베르네 소비뇽',
  '프론테라 프리미엄 메를로',
  '프론테라 프리미엄 샤르도네',
  '플래티넘 No.5',
  '플래티넘 No.6',
  '플랜테이션 파인애플 럼',
  '하디 VR 모스카토 1박스(6병)',
  '하디 VR 샤르도네 1박스(6병)',
  '하디 VR 쉬라즈 1박스(6병)',
  '하우스 픽 럼',
  '하우스 픽 보드카',
  '하우스 픽 진',
  '하이랜드 파크 12년',
  '하이랜드 파크 18년',
  '하쿠슈 12년',
  '하쿠슈 DR',
  '핫카이산 다이긴죠',
  '핫카이산 준마이 다이긴죠',
  '해지람',
  '헤네시 XO',
  '헤드라인, 랑혼크릭 쉬라즈',
  '헤드라인, 멕라렌 베일 까베르네 소비뇽',
  '헨리 무니에 VSOP',
  '호세 쿠엘보 에스페샬',
  '화요 53',
  '화요 X.P',
  '화이트 헤더 21년',
  '휘슬피그 10년 라이',
  '휘틀리 보드카',
  '히비키 하모니',
  'BB&R 셰리 캐스크 스카치 위스키',
  'C&C 뀌베 캐스크',
  'C&C 버번 캐스크',
  'C&C 셰리 캐스크',
  'C&C 아메리칸 싱글몰트',
];

/* eslint-disable no-console */
const ids = [
  '62806324f6cf74c820bc09b9',
  '62806324f6cf74c820bc0604',
  '62806324f6cf74c820bc0bdd',
  '62806324f6cf74c820bc07ec',
  '62806324f6cf74c820bc09a0',
  '62806324f6cf74c820bc0a0a',
  '62806324f6cf74c820bc0aaa',
  '62806324f6cf74c820bc0bb5',
  '62806324f6cf74c820bc0dc8',
  '62806324f6cf74c820bc0722',
  '62806324f6cf74c820bc0ef2',
  '62806324f6cf74c820bc0d5f',
  '62806324f6cf74c820bc0c1d',
  '62806324f6cf74c820bc0d7e',
  '62806324f6cf74c820bc0e87',
  '62806324f6cf74c820bc0a74',
  '62806324f6cf74c820bc0e5a',
  '62806324f6cf74c820bc0ed3',
  '62806324f6cf74c820bc0d9b',
  '62806324f6cf74c820bc0be1',
  '62806324f6cf74c820bc0d1a',
  '62806324f6cf74c820bc05dc',
  '62806324f6cf74c820bc0dd2',
  '62806324f6cf74c820bc0e71',
  '62806324f6cf74c820bc0e5f',
  '62806324f6cf74c820bc0e3a',
  '62806324f6cf74c820bc061c',
  '62806324f6cf74c820bc0d2b',
  '62806324f6cf74c820bc0e6f',
  '62806324f6cf74c820bc0c34',
  '62806324f6cf74c820bc0bfa',
  '62806324f6cf74c820bc08d0',
  '62806324f6cf74c820bc0d4b',
  '62806324f6cf74c820bc0bdc',
  '62806324f6cf74c820bc0e60',
  '62806324f6cf74c820bc0e97',
  '62806324f6cf74c820bc06b3',
  '62806324f6cf74c820bc091c',
  '62806324f6cf74c820bc0ca8',
  '62806324f6cf74c820bc0d61',
  '62806324f6cf74c820bc0c14',
  '62806324f6cf74c820bc0742',
  '62806324f6cf74c820bc0919',
  '62806324f6cf74c820bc065b',
  '62806324f6cf74c820bc0e30',
  '62806324f6cf74c820bc0e55',
  '62806324f6cf74c820bc0e77',
  '62806324f6cf74c820bc0eae',
  '62806324f6cf74c820bc084a',
  '62806324f6cf74c820bc0e6d',
  '62806324f6cf74c820bc0a39',
  '62806324f6cf74c820bc0e1b',
  '62806324f6cf74c820bc0e4d',
  '62806324f6cf74c820bc0e86',
  '62806324f6cf74c820bc06be',
  '62806324f6cf74c820bc091a',
  '62806324f6cf74c820bc0b05',
  '62806324f6cf74c820bc0b91',
  '62806324f6cf74c820bc05a6',
  '62806324f6cf74c820bc0cb5',
  '62806324f6cf74c820bc07ee',
  '62806324f6cf74c820bc0d6d',
  '62806324f6cf74c820bc0e89',
  '62806324f6cf74c820bc0723',
  '62806324f6cf74c820bc0949',
  '62806324f6cf74c820bc0cf5',
  '62806324f6cf74c820bc0d4d',
  '62806324f6cf74c820bc0d4f',
  '62806324f6cf74c820bc0e9f',
  '62806324f6cf74c820bc0b92',
  '62806324f6cf74c820bc0ca2',
  '62806324f6cf74c820bc0e5b',
  '62806324f6cf74c820bc0ed4',
  '62806324f6cf74c820bc0986',
  '62806324f6cf74c820bc0ab8',
  '62806324f6cf74c820bc0af3',
  '62806324f6cf74c820bc0cc6',
  '62806324f6cf74c820bc0b82',
  '62806324f6cf74c820bc0d74',
  '62806324f6cf74c820bc0ed2',
  '62806324f6cf74c820bc0c88',
  '62806324f6cf74c820bc05e0',
  '62806324f6cf74c820bc07dc',
  '62806324f6cf74c820bc0d1d',
  '62806324f6cf74c820bc0cb0',
  '62806324f6cf74c820bc0ee7',
  '62806324f6cf74c820bc0c4c',
  '62806324f6cf74c820bc0bc2',
  '62806324f6cf74c820bc0cc4',
  '62806324f6cf74c820bc0d9f',
  '62806324f6cf74c820bc0ab0',
  '62806324f6cf74c820bc0be3',
  '62806324f6cf74c820bc0c97',
  '62806324f6cf74c820bc0d57',
  '62806324f6cf74c820bc0944',
  '62806324f6cf74c820bc0c3e',
  '62806324f6cf74c820bc0a48',
  '62806324f6cf74c820bc0ef1',
  '62806324f6cf74c820bc0c1c',
  '62806324f6cf74c820bc0e20',
  '62806324f6cf74c820bc0c9a',
  '62806324f6cf74c820bc0ea4',
  '62806324f6cf74c820bc0cf4',
  '62806324f6cf74c820bc08ed',
  '62806324f6cf74c820bc092e',
  '62806324f6cf74c820bc0e59',
  '62806324f6cf74c820bc0ed8',
  '62806324f6cf74c820bc05da',
  '62806324f6cf74c820bc0c20',
  '62806324f6cf74c820bc0c12',
  '62806324f6cf74c820bc0d3b',
  '62806324f6cf74c820bc0c4a',
  '62806324f6cf74c820bc090e',
  '62806324f6cf74c820bc0ca7',
  '62806324f6cf74c820bc0cf9',
  '62806324f6cf74c820bc0a53',
  '62806324f6cf74c820bc0b25',
  '62806324f6cf74c820bc0905',
  '62806324f6cf74c820bc0743',
  '62806324f6cf74c820bc091b',
  '62806324f6cf74c820bc0640',
  '62806324f6cf74c820bc0b07',
  '62806324f6cf74c820bc0dec',
  '62806324f6cf74c820bc0b80',
  '62806324f6cf74c820bc0d12',
  '62806324f6cf74c820bc0711',
  '62806324f6cf74c820bc0a5e',
  '62806324f6cf74c820bc0d5c',
  '62806324f6cf74c820bc0eb5',
  '62806324f6cf74c820bc0b15',
  '62806324f6cf74c820bc0991',
  '62806324f6cf74c820bc0c6b',
  '62806324f6cf74c820bc0e1a',
  '62806324f6cf74c820bc0ece',
  '62806324f6cf74c820bc0b29',
  '62806324f6cf74c820bc0bb9',
  '62806324f6cf74c820bc0903',
  '62806324f6cf74c820bc0df7',
  '62806324f6cf74c820bc0d40',
  '62806324f6cf74c820bc0e54',
  '62806324f6cf74c820bc0e31',
  '62806324f6cf74c820bc0e36',
  '62806324f6cf74c820bc0ed5',
  '62806324f6cf74c820bc0e5c',
  '62806324f6cf74c820bc0977',
  '62806324f6cf74c820bc0e2c',
  '62806324f6cf74c820bc0d30',
  '62806324f6cf74c820bc0bda',
  '62806324f6cf74c820bc0e7c',
  '62806324f6cf74c820bc0cd6',
  '62806324f6cf74c820bc0e22',
  '62806324f6cf74c820bc0952',
  '62806324f6cf74c820bc05f9',
  '62806324f6cf74c820bc0c85',
  '62806324f6cf74c820bc0c9d',
  '62806324f6cf74c820bc0ecc',
  '62806324f6cf74c820bc0cb8',
  '62806324f6cf74c820bc0dd1',
  '62806324f6cf74c820bc0d10',
  '62806324f6cf74c820bc0d8c',
  '62806324f6cf74c820bc0d85',
  '62806324f6cf74c820bc0e0b',
  '62806324f6cf74c820bc0b50',
  '62806324f6cf74c820bc0c65',
  '62806324f6cf74c820bc0e0d',
  '62806324f6cf74c820bc07e9',
  '62806324f6cf74c820bc0912',
  '62806324f6cf74c820bc0c5d',
  '62806324f6cf74c820bc058a',
  '62806324f6cf74c820bc0a07',
  '62806324f6cf74c820bc0985',
  '62806324f6cf74c820bc0b7f',
  '62806324f6cf74c820bc0e61',
  '62806324f6cf74c820bc0e62',
  '62806324f6cf74c820bc0d72',
  '62806324f6cf74c820bc0b00',
  '62806324f6cf74c820bc0cdc',
  '62806324f6cf74c820bc0c35',
  '62806324f6cf74c820bc0c13',
  '62806324f6cf74c820bc0848',
  '62806324f6cf74c820bc0d5e',
  '62806324f6cf74c820bc0e2d',
  '62806324f6cf74c820bc07fd',
  '62806324f6cf74c820bc0cde',
  '62806324f6cf74c820bc0d0b',
  '62806324f6cf74c820bc0934',
  '62806324f6cf74c820bc0a4b',
  '62806324f6cf74c820bc0c49',
  '62806324f6cf74c820bc0cd2',
  '62806324f6cf74c820bc0cdf',
  '62806324f6cf74c820bc0e9a',
  '62806324f6cf74c820bc0ce7',
  '62806324f6cf74c820bc09f4',
  '62806324f6cf74c820bc084c',
  '62806324f6cf74c820bc0ce3',
  '62806324f6cf74c820bc0cc7',
  '62806324f6cf74c820bc0a4f',
  '62806324f6cf74c820bc0a95',
  '62806324f6cf74c820bc08cf',
  '62806324f6cf74c820bc0d4c',
  '62806324f6cf74c820bc0ef4',
  '62806324f6cf74c820bc0da0',
  '62806324f6cf74c820bc0da7',
  '62806324f6cf74c820bc0ee9',
  '62806324f6cf74c820bc0684',
  '62806324f6cf74c820bc07ef',
  '62806324f6cf74c820bc0e4e',
  '62806324f6cf74c820bc0d9c',
  '62806324f6cf74c820bc0eb3',
  '62806324f6cf74c820bc09b5',
  '62806324f6cf74c820bc099d',
  '62806324f6cf74c820bc0b86',
  '62806324f6cf74c820bc0d15',
  '62806324f6cf74c820bc09f9',
  '62806324f6cf74c820bc0eb1',
  '62806324f6cf74c820bc05f4',
  '62806324f6cf74c820bc0bef',
  '62806324f6cf74c820bc0df0',
  '62806324f6cf74c820bc05ae',
  '62806324f6cf74c820bc06ca',
  '62806324f6cf74c820bc073f',
  '62806324f6cf74c820bc091d',
  '62806324f6cf74c820bc0a05',
  '62806324f6cf74c820bc0c98',
  '62806324f6cf74c820bc0c07',
  '62806324f6cf74c820bc0e28',
  '62806324f6cf74c820bc0da8',
  '62806324f6cf74c820bc0de7',
  '62806324f6cf74c820bc08f2',
  '62806324f6cf74c820bc0cd7',
  '62806324f6cf74c820bc05b3',
  '62806324f6cf74c820bc0dc6',
  '62806324f6cf74c820bc0843',
  '62806324f6cf74c820bc09af',
  '62806324f6cf74c820bc0c0d',
  '62806324f6cf74c820bc0d5d',
  '62806324f6cf74c820bc0cf8',
  '62806324f6cf74c820bc0eda',
  '62806324f6cf74c820bc0ea8',
  '62806324f6cf74c820bc077f',
  '62806324f6cf74c820bc08db',
  '62806324f6cf74c820bc0970',
  '62806324f6cf74c820bc0bc7',
  '62806324f6cf74c820bc0d08',
  '62806324f6cf74c820bc078f',
  '62806324f6cf74c820bc0b72',
  '62806324f6cf74c820bc0629',
  '62806324f6cf74c820bc0c6d',
  '62806324f6cf74c820bc0d21',
  '62806324f6cf74c820bc0deb',
  '62806324f6cf74c820bc0e2f',
  '62806324f6cf74c820bc0c04',
  '62806324f6cf74c820bc0ef3',
  '62806324f6cf74c820bc0a92',
  '62806324f6cf74c820bc0e79',
  '62806324f6cf74c820bc0ccf',
  '62806324f6cf74c820bc0da3',
  '62806324f6cf74c820bc0c7b',
  '62806324f6cf74c820bc0c81',
  '62806324f6cf74c820bc0ee5',
  '62806324f6cf74c820bc0af5',
  '62806324f6cf74c820bc0b16',
  '62806324f6cf74c820bc0e72',
  '62806324f6cf74c820bc0eb8',
  '62806324f6cf74c820bc09a3',
  '62806324f6cf74c820bc0972',
  '62806324f6cf74c820bc0b10',
  '62806324f6cf74c820bc0d71',
  '62806324f6cf74c820bc0e8a',
  '62806324f6cf74c820bc0df6',
  '62806324f6cf74c820bc0ec6',
  '62806324f6cf74c820bc0c90',
  '62806324f6cf74c820bc08dd',
  '62806324f6cf74c820bc09b1',
  '62806324f6cf74c820bc0b01',
  '62806324f6cf74c820bc09bd',
  '62806324f6cf74c820bc0bcd',
  '62806324f6cf74c820bc07dd',
  '62806324f6cf74c820bc0bc1',
  '62806324f6cf74c820bc0976',
  '62806324f6cf74c820bc0bae',
  '62806324f6cf74c820bc0c55',
  '62806324f6cf74c820bc0e92',
  '62806324f6cf74c820bc0989',
  '62806324f6cf74c820bc0ca5',
  '62806324f6cf74c820bc0dca',
  '62806324f6cf74c820bc0c3c',
  '62806324f6cf74c820bc0a5b',
  '62806324f6cf74c820bc0d7d',
  '62806324f6cf74c820bc062f',
  '62806324f6cf74c820bc0d1f',
  '62806324f6cf74c820bc0eb9',
  '62806324f6cf74c820bc0732',
  '62806324f6cf74c820bc0ec8',
  '62806324f6cf74c820bc0eac',
  '62806324f6cf74c820bc09ae',
  '62806324f6cf74c820bc0d42',
  '62806324f6cf74c820bc05e1',
  '62806324f6cf74c820bc0d87',
  '62806324f6cf74c820bc05aa',
  '62806324f6cf74c820bc0d18',
  '62806324f6cf74c820bc0ca4',
  '62806324f6cf74c820bc0a40',
  '62806324f6cf74c820bc0d48',
  '62806324f6cf74c820bc08f4',
  '62806324f6cf74c820bc08f5',
  '62806324f6cf74c820bc0c9f',
  '62806324f6cf74c820bc0dfa',
  '62806324f6cf74c820bc0c1a',
  '62806324f6cf74c820bc06cd',
  '62806324f6cf74c820bc0a30',
  '62806324f6cf74c820bc0a62',
  '62806324f6cf74c820bc0d02',
  '62806324f6cf74c820bc0d31',
  '62806324f6cf74c820bc095f',
  '62806324f6cf74c820bc09ff',
  '62806324f6cf74c820bc0d3d',
  '62806324f6cf74c820bc0ec3',
  '62806324f6cf74c820bc0dae',
  '62806324f6cf74c820bc092f',
  '62806324f6cf74c820bc0ba3',
  '62806324f6cf74c820bc0c79',
  '62806324f6cf74c820bc0598',
  '62806324f6cf74c820bc05af',
  '62806324f6cf74c820bc09fc',
  '62806324f6cf74c820bc0d5b',
  '62806324f6cf74c820bc0c2e',
  '62806324f6cf74c820bc0c71',
  '62806324f6cf74c820bc0e82',
  '62806324f6cf74c820bc0600',
  '62806324f6cf74c820bc0d2e',
  '62806324f6cf74c820bc0e74',
  '62806324f6cf74c820bc0d82',
  '62806324f6cf74c820bc0e3d',
  '62806324f6cf74c820bc09fd',
  '62806324f6cf74c820bc05b4',
  '62806324f6cf74c820bc0c3b',
  '62806324f6cf74c820bc0db1',
  '62806324f6cf74c820bc09ba',
  '62806324f6cf74c820bc0a57',
  '62806324f6cf74c820bc060a',
  '62806324f6cf74c820bc0b2e',
  '62806324f6cf74c820bc0e23',
  '62806324f6cf74c820bc0d20',
  '62806324f6cf74c820bc0e50',
  '62806324f6cf74c820bc06a9',
  '62806324f6cf74c820bc091f',
  '62806324f6cf74c820bc0c75',
  '62806324f6cf74c820bc0dd3',
  '62806324f6cf74c820bc0acd',
  '62806324f6cf74c820bc0d29',
  '62806324f6cf74c820bc0d3a',
  '62806324f6cf74c820bc0c30',
  '62806324f6cf74c820bc07c1',
  '62806324f6cf74c820bc0987',
  '62806324f6cf74c820bc0ab9',
  '62806324f6cf74c820bc0b83',
  '62806324f6cf74c820bc0dc7',
  '62806324f6cf74c820bc0d4a',
  '62806324f6cf74c820bc0bfe',
  '62806324f6cf74c820bc0b79',
  '62806324f6cf74c820bc0b7a',
  '62806324f6cf74c820bc0dbb',
  '62806324f6cf74c820bc0cae',
  '62806324f6cf74c820bc0ec4',
  '62806324f6cf74c820bc0b13',
  '62806324f6cf74c820bc0b9e',
  '62806324f6cf74c820bc0bd0',
  '62806324f6cf74c820bc0844',
  '62806324f6cf74c820bc0901',
  '62806324f6cf74c820bc0b73',
  '62806324f6cf74c820bc0d5a',
  '62806324f6cf74c820bc0d60',
  '62806324f6cf74c820bc0910',
  '62806324f6cf74c820bc0ebc',
  '62806324f6cf74c820bc0d98',
  '62806324f6cf74c820bc0911',
  '62806324f6cf74c820bc0dc9',
  '62806324f6cf74c820bc0ee8',
  '62806324f6cf74c820bc0e0c',
  '62806324f6cf74c820bc0e1c',
  '62806324f6cf74c820bc0c03',
  '62806324f6cf74c820bc0df2',
  '62806324f6cf74c820bc0aa9',
  '62806324f6cf74c820bc0d51',
  '62806324f6cf74c820bc0de4',
  '62806324f6cf74c820bc0955',
  '62806324f6cf74c820bc0c45',
  '62806324f6cf74c820bc0ccb',
  '62806324f6cf74c820bc0c70',
  '62806324f6cf74c820bc0947',
  '62806324f6cf74c820bc0aad',
  '62806324f6cf74c820bc0a55',
  '62806324f6cf74c820bc09b6',
  '62806324f6cf74c820bc0b85',
  '62806324f6cf74c820bc0eb2',
  '62806324f6cf74c820bc0874',
  '62806324f6cf74c820bc0978',
  '62806324f6cf74c820bc0d6e',
  '62806324f6cf74c820bc0e8d',
  '62806324f6cf74c820bc0dd5',
  '62806324f6cf74c820bc0d3e',
  '62806324f6cf74c820bc0df5',
  '62806324f6cf74c820bc0a1b',
  '62806324f6cf74c820bc09fb',
  '62806324f6cf74c820bc0bd9',
  '62806324f6cf74c820bc0ea7',
  '62806324f6cf74c820bc0ba7',
  '62806324f6cf74c820bc0c8c',
  '62806324f6cf74c820bc0cb9',
  '62806324f6cf74c820bc0cfd',
  '62806324f6cf74c820bc0d27',
  '62806324f6cf74c820bc0ea3',
  '62806324f6cf74c820bc0ea0',
  '62806324f6cf74c820bc0d1b',
  '62806324f6cf74c820bc0af2',
  '62806324f6cf74c820bc05b6',
  '62806324f6cf74c820bc0ec5',
  '62806324f6cf74c820bc060b',
  '62806324f6cf74c820bc0cbe',
  '62806324f6cf74c820bc0ea2',
  '62806324f6cf74c820bc0a04',
  '62806324f6cf74c820bc0bde',
  '62806324f6cf74c820bc0ce5',
  '62806324f6cf74c820bc0d8a',
  '62806324f6cf74c820bc0b08',
  '62806324f6cf74c820bc0a15',
  '62806324f6cf74c820bc0e7a',
  '62806324f6cf74c820bc0ed6',
  '62806324f6cf74c820bc0e5d',
  '62806324f6cf74c820bc0a2b',
  '62806324f6cf74c820bc0ac6',
  '62806324f6cf74c820bc0d16',
  '62806324f6cf74c820bc0ca0',
  '62806324f6cf74c820bc0d17',
  '62806324f6cf74c820bc0edd',
  '62806324f6cf74c820bc0e6e',
  '62806324f6cf74c820bc0dcf',
  '62806324f6cf74c820bc0829',
  '62806324f6cf74c820bc0ea6',
  '62806324f6cf74c820bc0cbc',
  '62806324f6cf74c820bc0dcd',
  '62806324f6cf74c820bc0e1e',
  '62806324f6cf74c820bc0cb7',
  '62806324f6cf74c820bc0d2d',
  '62806324f6cf74c820bc0ea9',
  '62806324f6cf74c820bc0a54',
  '62806324f6cf74c820bc0870',
  '62806324f6cf74c820bc0a36',
  '62806324f6cf74c820bc0a6e',
  '62806324f6cf74c820bc09b4',
  '62806324f6cf74c820bc0b0b',
  '62806324f6cf74c820bc0b84',
  '62806324f6cf74c820bc095c',
  '62806324f6cf74c820bc0bff',
  '62806324f6cf74c820bc0b7b',
  '62806324f6cf74c820bc0c00',
  '62806324f6cf74c820bc0643',
  '62806324f6cf74c820bc0876',
  '62806324f6cf74c820bc0b48',
  '62806324f6cf74c820bc05c3',
  '62806324f6cf74c820bc0826',
  '62806324f6cf74c820bc0da5',
  '62806324f6cf74c820bc0842',
  '62806324f6cf74c820bc083c',
  '62806324f6cf74c820bc0d03',
  '62806324f6cf74c820bc0e4f',
  '62806324f6cf74c820bc0d22',
  '62806324f6cf74c820bc0ebf',
  '62806324f6cf74c820bc0d79',
  '62806324f6cf74c820bc0e01',
  '62806324f6cf74c820bc0e70',
  '62806324f6cf74c820bc0cc3',
  '62806324f6cf74c820bc0c7f',
  '62806324f6cf74c820bc0e78',
  '62806324f6cf74c820bc05fd',
  '62806324f6cf74c820bc0df8',
  '62806324f6cf74c820bc063e',
  '62806324f6cf74c820bc0c48',
  '62806324f6cf74c820bc0da9',
  '62806324f6cf74c820bc0904',
  '62806324f6cf74c820bc0c68',
  '62806324f6cf74c820bc0bfc',
  '62806324f6cf74c820bc0b06',
  '62806324f6cf74c820bc0bbc',
  '62806324f6cf74c820bc0bf9',
  '62806324f6cf74c820bc0c92',
  '62806324f6cf74c820bc05e5',
  '62806324f6cf74c820bc0cb4',
  '62806324f6cf74c820bc0d75',
  '62806324f6cf74c820bc0e99',
  '62806324f6cf74c820bc0ded',
  '62806324f6cf74c820bc0dce',
  '62806324f6cf74c820bc0dfe',
  '62806324f6cf74c820bc0d50',
  '62806324f6cf74c820bc0ec2',
  '62806324f6cf74c820bc0e0e',
  '62806324f6cf74c820bc0d68',
  '62806324f6cf74c820bc0c3f',
  '62806324f6cf74c820bc063f',
  '62806324f6cf74c820bc0aea',
  '62806324f6cf74c820bc05c8',
  '62806324f6cf74c820bc0996',
  '62806324f6cf74c820bc0df4',
  '62806324f6cf74c820bc0d96',
  '62806324f6cf74c820bc0eaa',
  '62806324f6cf74c820bc05dd',
  '62806324f6cf74c820bc0ec0',
  '62806324f6cf74c820bc0e33',
  '62806324f6cf74c820bc0c9b',
  '62806324f6cf74c820bc0ea1',
  '62806324f6cf74c820bc0e2a',
  '62806324f6cf74c820bc0c67',
  '62806324f6cf74c820bc0ebe',
  '62806324f6cf74c820bc05b1',
  '62806324f6cf74c820bc0c46',
  '62806324f6cf74c820bc0921',
  '62806324f6cf74c820bc0c05',
  '62806324f6cf74c820bc0db0',
  '62806324f6cf74c820bc0eb0',
  '62806324f6cf74c820bc0ab5',
  '62806324f6cf74c820bc0e46',
  '62806324f6cf74c820bc0d2a',
  '62806324f6cf74c820bc0eb6',
  '62806324f6cf74c820bc0c8d',
  '62806324f6cf74c820bc0b2b',
  '62806324f6cf74c820bc0da4',
  '62806324f6cf74c820bc0941',
  '62806324f6cf74c820bc09b2',
  '62806324f6cf74c820bc0a97',
  '62806324f6cf74c820bc0b03',
  '62806324f6cf74c820bc0bcc',
  '62806324f6cf74c820bc0dc0',
  '62806324f6cf74c820bc09b3',
  '62806324f6cf74c820bc0bdf',
  '62806324f6cf74c820bc0d37',
  '62806324f6cf74c820bc0dd4',
  '62806324f6cf74c820bc0af8',
  '62806324f6cf74c820bc05de',
  '62806324f6cf74c820bc0e68',
  '62806324f6cf74c820bc0a41',
  '62806324f6cf74c820bc0d49',
  '62806324f6cf74c820bc0c0b',
  '62806324f6cf74c820bc0bba',
  '62806324f6cf74c820bc0d54',
  '62806324f6cf74c820bc0dba',
  '62806324f6cf74c820bc0c84',
  '62806324f6cf74c820bc0bf8',
  '62806324f6cf74c820bc0e11',
  '62806324f6cf74c820bc0e8b',
  '62806324f6cf74c820bc0e85',
  '62806324f6cf74c820bc0721',
  '62806324f6cf74c820bc08ef',
  '62806324f6cf74c820bc0e8c',
  '62806324f6cf74c820bc0d6f',
  '62806324f6cf74c820bc0b14',
  '62806324f6cf74c820bc0a06',
  '62806324f6cf74c820bc0ec1',
  '62806324f6cf74c820bc0ba2',
  '62806324f6cf74c820bc0c7c',
  '62806324f6cf74c820bc0c83',
  '62806324f6cf74c820bc0e3f',
  '62806324f6cf74c820bc0eb7',
  '62806324f6cf74c820bc08af',
  '62806324f6cf74c820bc0c7a',
  '62806324f6cf74c820bc0d0e',
  '62806324f6cf74c820bc0dd0',
  '62806324f6cf74c820bc0c8b',
  '62806324f6cf74c820bc0ebb',
  '62806324f6cf74c820bc0daf',
  '62806324f6cf74c820bc0d3f',
  '62806324f6cf74c820bc0e53',
  '62806324f6cf74c820bc0bc3',
  '62806324f6cf74c820bc0eab',
  '62806324f6cf74c820bc0720',
  '62806324f6cf74c820bc0cc5',
  '62806324f6cf74c820bc0c02',
  '62806324f6cf74c820bc0d95',
  '62806324f6cf74c820bc0ead',
  '62806324f6cf74c820bc0ec9',
  '62806324f6cf74c820bc0cb2',
  '62806324f6cf74c820bc0cc0',
  '62806324f6cf74c820bc0c33',
  '62806324f6cf74c820bc0e73',
];

async function run2() {
  await Whisky.deleteMany({ _id: { $in: ids } });
}

// run();
