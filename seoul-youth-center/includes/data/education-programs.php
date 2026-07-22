<?php
/**
 * =========================================
 * 평생교육 프로그램 임시 데이터
 * =========================================
 *
 * [목적]
 * - recommend 필터에서 청소년 프로그램과 동일하게 사용
 * - CSR → DB 치환 가능한 구조 유지
 *
 * [필터 공통 필드]
 * - field_code
 * - age_group_codes
 * - is_active
 * - sort_order
 *
 * [상태 계산 규칙]
 * - 접수중: recruitment_start_date <= today <= recruitment_end_date
 * - 상시: is_ongoing === true
 *
 * [평생교육 특이점]
 * - 이미지 없음
 * - 텍스트 카드 기반
 * - 활동기간은 존재하지만 UI에서는 간략 표현 가능
 *
 * [field_code]
 * - career       : 진로직업
 * - culture-art  : 문화예술
 * - emotional    : 정서관계
 * - competency   : 역량성장
 * - citizen      : 시민참여
 *
 * [age_group_codes]
 * - infant
 * - elementary-low
 * - elementary-high
 * - early-youth
 * - mid-youth
 * - late-youth
 * - citizen
 */

$educationPrograms = [

    // ========================
    // 접수중
    // ========================
    [
        'id' => 201,
        'type' => 'education',
        'title' => '2026년 상반기 생활도예 클래스 수강생 모집',
        'url' => '#',

        'recruitment_start_date' => '2026-03-25',
        'recruitment_end_date' => '2126-04-18',
        'is_ongoing' => false,

        'activity_start_date' => '2026-04-28',
        'activity_end_date' => '2026-06-27',

        'price' => 45000,

        'search_keywords' => ['도예', '공예', '문화예술', '시민강좌'],
        'field_code' => 'culture-art',
        'age_group_codes' => ['citizen', 'late-youth'],

        'is_active' => true,
        'sort_order' => 201,
    ],

    [
        'id' => 202,
        'type' => 'education',
        'title' => '2026년 디지털 생활문해 교실 3기 참여자 모집',
        'url' => '#',

        'recruitment_start_date' => '2026-03-29',
        'recruitment_end_date' => '2126-04-22',
        'is_ongoing' => false,

        'activity_start_date' => '2026-05-03',
        'activity_end_date' => '2026-06-14',

        'price' => 30000,

        'search_keywords' => ['디지털', '스마트폰', '생활문해', '키오스크'],
        'field_code' => 'competency',
        'age_group_codes' => ['citizen', 'late-youth', 'mid-youth'],

        'is_active' => true,
        'sort_order' => 202,
    ],

    [
        'id' => 203,
        'type' => 'education',
        'title' => '2026년 시민 사진 기초 클래스 참여자 모집',
        'url' => '#',

        'recruitment_start_date' => '2026-03-27',
        'recruitment_end_date' => '2126-04-16',
        'is_ongoing' => false,

        'activity_start_date' => '2026-04-30',
        'activity_end_date' => '2026-06-05',

        'price' => 50000,

        'search_keywords' => ['사진', '촬영', '기초교육', '문화예술'],
        'field_code' => 'culture-art',
        'age_group_codes' => ['citizen', 'mid-youth'],

        'is_active' => true,
        'sort_order' => 203,
    ],

    [
        'id' => 204,
        'type' => 'education',
        'title' => '2026년 시민 글쓰기 입문 워크숍 참여자 모집',
        'url' => '#',

        'recruitment_start_date' => '2026-03-30',
        'recruitment_end_date' => '2126-04-25',
        'is_ongoing' => false,

        'activity_start_date' => '2026-05-07',
        'activity_end_date' => '2026-06-20',

        'price' => 40000,

        'search_keywords' => ['글쓰기', '에세이', '표현', '역량성장'],
        'field_code' => 'competency',
        'age_group_codes' => ['citizen', 'late-youth'],

        'is_active' => true,
        'sort_order' => 204,
    ],

    [
        'id' => 205,
        'type' => 'education',
        'title' => '2026년 진로설계 입문 클래스 「커리어 스타트 랩」 수강생 모집',
        'url' => '#',

        'recruitment_start_date' => '2026-03-28',
        'recruitment_end_date' => '2126-04-19',
        'is_ongoing' => false,

        'activity_start_date' => '2026-05-02',
        'activity_end_date' => '2026-06-18',

        'price' => 35000,

        'search_keywords' => ['진로', '직업', '커리어', '진로설계'],
        'field_code' => 'career',
        'age_group_codes' => ['early-youth', 'mid-youth', 'late-youth'],

        'is_active' => true,
        'sort_order' => 205,
    ],

    [
        'id' => 206,
        'type' => 'education',
        'title' => '2026년 부모-자녀 감정소통 워크숍 참여자 모집',
        'url' => '#',

        'recruitment_start_date' => '2026-03-26',
        'recruitment_end_date' => '2126-04-17',
        'is_ongoing' => false,

        'activity_start_date' => '2026-04-29',
        'activity_end_date' => '2026-06-01',

        'price' => 25000,

        'search_keywords' => ['정서', '관계', '소통', '감정표현'],
        'field_code' => 'emotional',
        'age_group_codes' => ['elementary-high', 'early-youth', 'citizen'],

        'is_active' => true,
        'sort_order' => 206,
    ],

    [
        'id' => 207,
        'type' => 'education',
        'title' => '2026년 마을참여 시민교육 「우리동네 공론장」 참여자 모집',
        'url' => '#',

        'recruitment_start_date' => '2026-03-31',
        'recruitment_end_date' => '2126-04-24',
        'is_ongoing' => false,

        'activity_start_date' => '2026-05-10',
        'activity_end_date' => '2026-06-22',

        'price' => 20000,

        'search_keywords' => ['시민참여', '마을', '공론장', '토론'],
        'field_code' => 'citizen',
        'age_group_codes' => ['late-youth', 'citizen'],

        'is_active' => true,
        'sort_order' => 207,
    ],

    [
        'id' => 208,
        'type' => 'education',
        'title' => '2026년 어린이 창의미술 교실 수강생 모집',
        'url' => '#',

        'recruitment_start_date' => '2026-03-24',
        'recruitment_end_date' => '2126-04-15',
        'is_ongoing' => false,

        'activity_start_date' => '2026-04-27',
        'activity_end_date' => '2026-06-08',

        'price' => 28000,

        'search_keywords' => ['어린이', '미술', '창의활동', '문화예술'],
        'field_code' => 'culture-art',
        'age_group_codes' => ['elementary-low', 'elementary-high'],

        'is_active' => true,
        'sort_order' => 208,
    ],

    [
        'id' => 209,
        'type' => 'education',
        'title' => '2026년 유아 감각놀이 예술교실 참여가정 모집',
        'url' => '#',

        'recruitment_start_date' => '2026-03-22',
        'recruitment_end_date' => '2126-04-14',
        'is_ongoing' => false,

        'activity_start_date' => '2026-04-26',
        'activity_end_date' => '2026-05-31',

        'price' => 24000,

        'search_keywords' => ['유아', '감각놀이', '예술체험', '오감놀이'],
        'field_code' => 'culture-art',
        'age_group_codes' => ['infant', 'citizen'],

        'is_active' => true,
        'sort_order' => 209,
    ],

    [
        'id' => 210,
        'type' => 'education',
        'title' => '2026년 청소년 발표력 향상 클래스 참여자 모집',
        'url' => '#',

        'recruitment_start_date' => '2026-04-01',
        'recruitment_end_date' => '2126-04-23',
        'is_ongoing' => false,

        'activity_start_date' => '2026-05-12',
        'activity_end_date' => '2026-06-26',

        'price' => 32000,

        'search_keywords' => ['발표', '스피치', '표현력', '역량성장'],
        'field_code' => 'competency',
        'age_group_codes' => ['early-youth', 'mid-youth', 'late-youth'],

        'is_active' => true,
        'sort_order' => 210,
    ],

    [
        'id' => 211,
        'type' => 'education',
        'title' => '2026년 초등 진로탐색 교실 「미래직업 첫걸음」 참여자 모집',
        'url' => '#',

        'recruitment_start_date' => '2026-03-23',
        'recruitment_end_date' => '2126-04-20',
        'is_ongoing' => false,

        'activity_start_date' => '2026-05-01',
        'activity_end_date' => '2026-06-13',

        'price' => 30000,

        'search_keywords' => ['초등', '진로탐색', '직업체험', '커리어'],
        'field_code' => 'career',
        'age_group_codes' => ['elementary-low', 'elementary-high'],

        'is_active' => true,
        'sort_order' => 211,
    ],

    [
        'id' => 212,
        'type' => 'education',
        'title' => '2026년 관계회복 집단상담 프로그램 참여자 모집',
        'url' => '#',

        'recruitment_start_date' => '2026-03-21',
        'recruitment_end_date' => '2126-04-13',
        'is_ongoing' => false,

        'activity_start_date' => '2026-04-24',
        'activity_end_date' => '2026-06-07',

        'price' => 27000,

        'search_keywords' => ['관계회복', '상담', '정서지원', '소통'],
        'field_code' => 'emotional',
        'age_group_codes' => ['mid-youth', 'late-youth', 'citizen'],

        'is_active' => true,
        'sort_order' => 212,
    ],

    // ========================
    // 상시
    // ========================
    [
        'id' => 219,
        'type' => 'education',
        'title' => '2026년 연중 시민 문화살롱 참여자 모집',
        'url' => '#',

        'recruitment_start_date' => '2026-01-01',
        'recruitment_end_date' => null,
        'is_ongoing' => true,

        'activity_start_date' => '2026-01-15',
        'activity_end_date' => null,

        'price' => 10000,

        'search_keywords' => ['문화', '강연', '커뮤니티', '시민참여'],
        'field_code' => 'citizen',
        'age_group_codes' => ['citizen', 'late-youth'],

        'is_active' => true,
        'sort_order' => 219,
    ],

    [
        'id' => 220,
        'type' => 'education',
        'title' => '2026년 시민 취미 클래스 자유참여 프로그램',
        'url' => '#',

        'recruitment_start_date' => '2026-01-01',
        'recruitment_end_date' => null,
        'is_ongoing' => true,

        'activity_start_date' => '2026-02-01',
        'activity_end_date' => null,

        'price' => 20000,

        'search_keywords' => ['취미', '자율참여', '생활교육'],
        'field_code' => 'competency',
        'age_group_codes' => ['citizen', 'late-youth'],

        'is_active' => true,
        'sort_order' => 220,
    ],

    [
        'id' => 221,
        'type' => 'education',
        'title' => '2026년 연중 진로상담 오픈클래스 참여자 모집',
        'url' => '#',

        'recruitment_start_date' => '2026-01-01',
        'recruitment_end_date' => null,
        'is_ongoing' => true,

        'activity_start_date' => '2026-01-20',
        'activity_end_date' => null,

        'price' => 15000,

        'search_keywords' => ['진로상담', '커리어', '오픈클래스', '진로'],
        'field_code' => 'career',
        'age_group_codes' => ['early-youth', 'mid-youth', 'late-youth', 'citizen'],

        'is_active' => true,
        'sort_order' => 221,
    ],

    [
        'id' => 222,
        'type' => 'education',
        'title' => '2026년 상시 감정회복 힐링워크숍 참여자 모집',
        'url' => '#',

        'recruitment_start_date' => '2026-01-01',
        'recruitment_end_date' => null,
        'is_ongoing' => true,

        'activity_start_date' => '2026-02-10',
        'activity_end_date' => null,

        'price' => 18000,

        'search_keywords' => ['힐링', '감정회복', '정서지원', '마음돌봄'],
        'field_code' => 'emotional',
        'age_group_codes' => ['mid-youth', 'late-youth', 'citizen'],

        'is_active' => true,
        'sort_order' => 222,
    ],
];
