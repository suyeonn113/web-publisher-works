<?php

/**
 * youth-programs mock data
 *
 * field_code:
 * - career       → 진로직업
 * - culture-art  → 문화예술
 * - emotional    → 정서관계
 * - competency   → 역량성장
 * - citizen      → 시민참여
 *
 * age_group_codes (복수 가능):
 * - infant            → 유아
 * - elementary-low    → 초등 저학년
 * - elementary-high   → 초등 고학년
 * - early-youth       → 초기청소년
 * - mid-youth         → 중기청소년
 * - late-youth        → 후기청소년
 * - citizen           → 시민
 */

$youthPrograms = [

    // ========================
    // 접수중 (상시)
    // ========================
    [
        'id' => 1, // 접수중(상시)
        'title' => '2026년 청소년 시민참여 기획 워크숍 「로컬체인지 메이커」 참여자 모집',
        'image' => [
            'src' => '/assets/images/youth-programs/program-01-local-change-v2.png',
            'alt' => '청소년 시민참여 기획 워크숍 안내 이미지',
        ],
        'url' => '#',

        'recruitment_start_date' => '2026-01-01',
        'recruitment_end_date' => null,
        'is_ongoing' => true,

        'activity_start_date' => '2026-04-12',
        'activity_end_date' => null,

        'price' => 0,

        'hashtags' => ['시민참여', '기획', '후기청소년'],
        'search_keywords' => ['시민참여', '기획활동', '청소년 워크숍', '후기청소년', '상시모집'],

        'field_code' => 'citizen',
        'age_group_codes' => ['late-youth'],

        'is_active' => true,
        'sort_order' => 1,
    ],
    [
        'id' => 2, // 접수중(상시)
        'title' => '2026학년도 우리동네 참여 프로젝트 「청소년 체인지업 메이킹」 참가자 모집',
        'image' => [
            'src' => '/assets/images/youth-programs/program-02-changeup-making-v2.png',
            'alt' => '우리동네 참여 프로젝트 메이킹 안내 이미지',
        ],
        'url' => '#',

        'recruitment_start_date' => '2026-01-01',
        'recruitment_end_date' => null,
        'is_ongoing' => true,

        'activity_start_date' => '2026-04-18',
        'activity_end_date' => null,

        'price' => 10000,

        'hashtags' => ['시민참여', '프로젝트', '중기청소년'],
        'search_keywords' => ['시민참여', '프로젝트 활동', '동네 참여', '중기청소년', '상시모집'],

        'field_code' => 'citizen',
        'age_group_codes' => ['mid-youth'],

        'is_active' => true,
        'sort_order' => 2,
    ],

    // ========================
    // 접수중
    // ========================
    [
        'id' => 3, // 접수중
        'title' => '2026년 청소년 공공캠페인 기획단 「우리동네 체인지메이커 3기」 단원 모집',
        'image' => [
            'src' => '/assets/images/youth-programs/program-03-campaign-v2.png',
            'alt' => '청소년 공공캠페인 기획단 안내 이미지',
        ],
        'url' => '#',

        'recruitment_start_date' => '2026-03-20',
        'recruitment_end_date' => '2126-04-11',
        'is_ongoing' => false,

        'activity_start_date' => '2026-04-19',
        'activity_end_date' => '2026-06-28',

        'price' => 0,

        'hashtags' => ['캠페인', '시민참여', '초기청소년'],
        'search_keywords' => ['공공캠페인', '기획단', '시민참여', '초기청소년', '중기청소년'],

        'field_code' => 'citizen',
        'age_group_codes' => ['early-youth', 'mid-youth'],

        'is_active' => true,
        'sort_order' => 3,
    ],
    [
        'id' => 4, // 접수중
        'title' => '2026년 청소년 성장역량 부트캠프 「스스로 업 프로젝트」 참가자 모집',
        'image' => [
            'src' => '/assets/images/youth-programs/program-04-stepup-v2.png',
            'alt' => '성장 역량 부트캠프 안내 이미지',
        ],
        'url' => '#',

        'recruitment_start_date' => '2026-03-24',
        'recruitment_end_date' => '2126-04-08',
        'is_ongoing' => false,

        'activity_start_date' => '2026-04-14',
        'activity_end_date' => '2026-04-19',

        'price' => 0,

        'hashtags' => ['역량성장', '부트캠프', '초등고학년'],
        'search_keywords' => ['역량성장', '부트캠프', '자기개발', '초등 고학년'],

        'field_code' => 'competency',
        'age_group_codes' => ['elementary-high'],

        'is_active' => true,
        'sort_order' => 4,
    ],
    [
        'id' => 5, // 접수중
        'title' => '2026년 청소년 리더십 트레이닝 「유스리더 아카데미 5기」 참여자 추가 모집',
        'image' => [
            'src' => '/assets/images/youth-programs/program-05-youthleader-v2.png',
            'alt' => '청소년 리더십 트레이닝 안내 이미지',
        ],
        'url' => '#',

        'recruitment_start_date' => '2026-03-18',
        'recruitment_end_date' => '2126-04-13',
        'is_ongoing' => false,

        'activity_start_date' => '2026-04-21',
        'activity_end_date' => '2026-06-05',

        'price' => 20000,

        'hashtags' => ['리더십', '역량성장', '후기청소년'],
        'search_keywords' => ['리더십', '역량강화', '성장 프로그램', '후기청소년'],

        'field_code' => 'competency',
        'age_group_codes' => ['late-youth'],

        'is_active' => true,
        'sort_order' => 5,
    ],
    [
        'id' => 6, // 접수중
        'title' => '2026년 문화예술 창작 스튜디오 「드로잉 앤 메이킹 클래스」 참가자 모집',
        'image' => [
            'src' => '/assets/images/youth-programs/program-06-drawing-making-v2.png',
            'alt' => '문화예술 창작 스튜디오 안내 이미지',
        ],
        'url' => '#',

        'recruitment_start_date' => '2026-03-27',
        'recruitment_end_date' => '2126-04-15',
        'is_ongoing' => false,

        'activity_start_date' => '2026-04-25',
        'activity_end_date' => '2026-05-24',

        'price' => 15000,

        'hashtags' => ['문화예술', '창작', '초등저학년'],
        'search_keywords' => ['문화예술', '창작 활동', '예술 체험', '초등 저학년'],

        'field_code' => 'culture-art',
        'age_group_codes' => ['elementary-low'],

        'is_active' => true,
        'sort_order' => 6,
    ],
    [
        'id' => 7, // 접수중
        'title' => '2026년 마음성장 관계소통 교실 「마음 잇기 프로젝트」 참가 청소년 모집',
        'image' => [
            'src' => '/assets/images/youth-programs/7.png',
            'alt' => '마음성장 관계소통 교실 안내 이미지',
        ],
        'url' => '#',

        'recruitment_start_date' => '2026-03-22',
        'recruitment_end_date' => '2026-04-09',
        'is_ongoing' => false,

        'activity_start_date' => '2026-04-18',
        'activity_end_date' => '2026-05-23',

        'price' => 0,

        'hashtags' => ['정서관계', '소통', '초기청소년'],
        'search_keywords' => ['정서관계', '관계소통', '마음성장', '초기청소년'],

        'field_code' => 'emotional',
        'age_group_codes' => ['early-youth'],

        'is_active' => true,
        'sort_order' => 7,
    ],
    [
        'id' => 8, // 접수중
        'title' => '2026년 진로직업 탐색 클래스 「미래직업 오픈랩」 참가자 모집(4월)',
        'image' => [
            'src' => '/assets/images/youth-programs/8.png',
            'alt' => '진로직업 탐색 클래스 안내 이미지',
        ],
        'url' => '#',

        'recruitment_start_date' => '2026-03-28',
        'recruitment_end_date' => '2026-04-17',
        'is_ongoing' => false,

        'activity_start_date' => '2026-04-29',
        'activity_end_date' => '2026-05-12',

        'price' => 0,

        'hashtags' => ['진로직업', '탐색', '시민'],
        'search_keywords' => ['진로직업', '직업체험', '진로 탐색', '시민 대상'],

        'field_code' => 'career',
        'age_group_codes' => ['citizen'],

        'is_active' => true,
        'sort_order' => 8,
    ],

    // ========================
    // 마감
    // ========================
    [
        'id' => 11, // 마감
        'title' => '2026년 청소년 성장 챌린지 프로젝트 「스텝업 챌린지 1기」 참가자 모집',
        'image' => [
            'src' => '/assets/images/youth-programs/11.png',
            'alt' => '청소년 성장 챌린지 프로젝트 안내 이미지',
        ],
        'url' => '#',

        'recruitment_start_date' => '2026-02-10',
        'recruitment_end_date' => '2026-03-12',
        'is_ongoing' => false,

        'activity_start_date' => '2026-03-21',
        'activity_end_date' => '2026-05-28',

        'price' => 0,

        'hashtags' => ['역량성장', '챌린지', '중기청소년'],
        'search_keywords' => ['역량성장', '챌린지', '성장 프로젝트', '중기청소년'],

        'field_code' => 'competency',
        'age_group_codes' => ['mid-youth'],

        'is_active' => true,
        'sort_order' => 11,
    ],
    [
        'id' => 12, // 마감
        'title' => '2026년 시민참여 네트워크 포럼 「유스 보이스 라운드테이블」 참여자 모집',
        'image' => [
            'src' => '/assets/images/youth-programs/12.png',
            'alt' => '시민참여 네트워크 포럼 안내 이미지',
        ],
        'url' => '#',

        'recruitment_start_date' => '2026-02-18',
        'recruitment_end_date' => '2026-03-20',
        'is_ongoing' => false,

        'activity_start_date' => '2026-04-01',
        'activity_end_date' => '2026-06-20',

        'price' => 30000,

        'hashtags' => ['시민참여', '포럼', '후기청소년'],
        'search_keywords' => ['시민참여', '네트워크 포럼', '의견 나눔', '후기청소년'],

        'field_code' => 'citizen',
        'age_group_codes' => ['late-youth'],

        'is_active' => true,
        'sort_order' => 12,
    ],

    // ========================
    // 필터용 보강 카드
    // - 연령 전체 커버 1개
    // - 분야 보강 1개
    // - 랜덤 보강 2개
    // ========================
    [
        'id' => 13, // 접수중(필터용)
        'title' => '2026년 청소년 성장탐색 통합 프로그램 「모두의 스텝업 랩」 참가자 모집',
        'image' => [
            'src' => '/assets/images/youth-programs/13.png',
            'alt' => '청소년 성장탐색 통합 프로그램 안내 이미지',
        ],
        'url' => '#',

        'recruitment_start_date' => '2026-03-30',
        'recruitment_end_date' => '2026-04-19',
        'is_ongoing' => false,

        'activity_start_date' => '2026-04-27',
        'activity_end_date' => '2026-06-14',

        'price' => 0,

        'hashtags' => ['역량성장', '통합활동', '전연령'],
        'search_keywords' => ['역량성장', '통합 프로그램', '전연령', '성장탐색', '필터 보강'],

        'field_code' => 'competency',
        'age_group_codes' => ['infant', 'elementary-low', 'elementary-high', 'early-youth', 'mid-youth', 'late-youth', 'citizen'],

        'is_active' => true,
        'sort_order' => 13,
    ],
    [
        'id' => 14, // 접수중(필터용)
        'title' => '2026년 진로직업 확장 프로그램 「미래탐색 커리어 브릿지」 참가자 모집',
        'image' => [
            'src' => '/assets/images/youth-programs/14.png',
            'alt' => '진로직업 확장 프로그램 안내 이미지',
        ],
        'url' => '#',

        'recruitment_start_date' => '2026-03-31',
        'recruitment_end_date' => '2026-04-20',
        'is_ongoing' => false,

        'activity_start_date' => '2026-04-30',
        'activity_end_date' => '2026-06-08',

        'price' => 10000,

        'hashtags' => ['진로직업', '탐색', '중기청소년'],
        'search_keywords' => ['진로직업', '커리어 탐색', '직업 확장', '중기청소년', '필터 보강'],

        'field_code' => 'career',
        'age_group_codes' => ['elementary-high', 'early-youth', 'mid-youth'],

        'is_active' => true,
        'sort_order' => 14,
    ],
    [
        'id' => 15, // 접수중(필터용)
        'title' => '2026년 문화예술 융합 체험 「컬러 플레이 스튜디오」 참가자 모집',
        'image' => [
            'src' => '/assets/images/youth-programs/15.png',
            'alt' => '문화예술 융합 체험 프로그램 안내 이미지',
        ],
        'url' => '#',

        'recruitment_start_date' => '2026-04-01',
        'recruitment_end_date' => '2026-04-21',
        'is_ongoing' => false,

        'activity_start_date' => '2026-05-03',
        'activity_end_date' => '2026-05-31',

        'price' => 15000,

        'hashtags' => ['문화예술', '체험', '초등저학년'],
        'search_keywords' => ['문화예술', '융합 체험', '창작 놀이', '초등 저학년', '초등 고학년'],

        'field_code' => 'culture-art',
        'age_group_codes' => ['elementary-low', 'elementary-high'],

        'is_active' => true,
        'sort_order' => 15,
    ],
    [
        'id' => 16, // 접수중(필터용)
        'title' => '2026년 관계소통 공감 프로그램 「마음 연결 테이블」 참여자 모집',
        'image' => [
            'src' => '/assets/images/youth-programs/16.png',
            'alt' => '관계소통 공감 프로그램 안내 이미지',
        ],
        'url' => '#',

        'recruitment_start_date' => '2026-04-02',
        'recruitment_end_date' => '2026-04-22',
        'is_ongoing' => false,

        'activity_start_date' => '2026-05-08',
        'activity_end_date' => '2026-06-12',

        'price' => 0,

        'hashtags' => ['정서관계', '소통', '시민'],
        'search_keywords' => ['정서관계', '관계소통', '공감 활동', '후기청소년', '시민 대상'],

        'field_code' => 'emotional',
        'age_group_codes' => ['late-youth', 'citizen'],

        'is_active' => true,
        'sort_order' => 16,
    ],

];
