<?php

declare(strict_types=1);

/**
 * 프로그램 상태 상수 (PHP 7 호환 enum 대체)
 */
final class ProgramStatus
{
    public const ALWAYS = 'always';
    public const ONGOING = 'ongoing';
    public const UPCOMING = 'upcoming';
    public const CLOSED = 'closed';
}

function getProgramAgeLabel(array $program): string
{
    $labels = [
        'infant' => '유아',
        'elementary-low' => '초등 저학년',
        'elementary-high' => '초등 고학년',
        'early-youth' => '초기 청소년',
        'mid-youth' => '중기 청소년',
        'late-youth' => '후기 청소년',
        'citizen' => '시민',
    ];

    $codes = $program['age_group_codes'] ?? [];
    $names = array_map(
        static fn(string $code): string => $labels[$code] ?? $code,
        $codes
    );

    return implode(', ', $names);
}

function getProgramFieldLabel(array $program): string
{
    $labels = [
        'career' => '진로직업',
        'culture-art' => '문화예술',
        'emotional' => '정서관계',
        'competency' => '역량성장',
        'citizen' => '시민참여',
    ];

    $fieldCode = (string) ($program['field_code'] ?? '');

    return $labels[$fieldCode] ?? '청소년활동';
}

function findProgramById(array $programs, int $id): ?array
{
    foreach ($programs as $program) {
        if ((int) ($program['id'] ?? 0) === $id) {
            return $program;
        }
    }

    return null;
}

/**
 * 프로그램 자동화 계산 함수
 * - DB 연결 전: 현재 PHP 배열 데이터에 그대로 사용
 * - DB 연결 후: fetch 결과 배열에도 그대로 사용 가능
 */

/**
 * 안전한 DateTime 생성
 */
function createProgramDate(?string $date): ?DateTime
{
    if (empty($date)) {
        return null;
    }

    try {
        return new DateTime($date);
    } catch (Exception $e) {
        return null;
    }
}

/**
 * 기준일 반환
 * 운영에서는 new DateTime('today') 그대로 써도 됨
 * 테스트 시 날짜 고정하고 싶으면 인자로 넣어서 사용
 */
function getProgramToday(?DateTime $today = null): DateTime
{
    return $today ?? new DateTime('today');
}

/**
 * 모집 상태 코드
 * always   : 상시모집
 * ongoing  : 접수중
 * upcoming : 예정
 * closed   : 마감
 */
function getProgramStatus(array $program, ?DateTime $today = null): string
{
    $today = getProgramToday($today);

    if (!empty($program['is_ongoing'])) {
        return 'always';
    }

    $start = createProgramDate($program['recruitment_start_date'] ?? null);
    $end = createProgramDate($program['recruitment_end_date'] ?? null);

    if (!$start || !$end) {
        return 'closed';
    }

    if ($start > $today) {
        return 'upcoming';
    }

    if ($end < $today) {
        return 'closed';
    }

    return 'ongoing';
}

/**
 * 모집 상태 한글 라벨
 */
function getProgramStatusLabel(array $program, ?DateTime $today = null): string
{
    $status = getProgramStatus($program, $today);

    switch ($status) {
        case 'always':
            return '상시';
        case 'ongoing':
            return '접수중';
        case 'upcoming':
            return '예정';
        default:
            return '모집마감';
    }
}

/**
 * 가격 타입
 * free / paid
 */
function getProgramPriceType(array $program): string
{
    $price = (int) ($program['price'] ?? 0);

    return $price > 0 ? 'paid' : 'free';
}

/**
 * 가격 한글 라벨
 */
function getProgramPriceLabel(array $program): string
{
    return getProgramPriceType($program) === 'paid' ? '유료' : '무료';
}

/**
 * 활동일 수 계산
 * 시작/종료일 모두 포함해서 +1
 * 상시 운영(activity_end_date = null)은 0 반환
 */
function getProgramActivityDays(array $program): int
{
    $start = createProgramDate($program['activity_start_date'] ?? null);
    $end = createProgramDate($program['activity_end_date'] ?? null);

    if (!$start || !$end) {
        return 0;
    }

    $diff = $start->diff($end);

    return max(0, (int) $diff->days + 1);
}

/**
 * 활동기간 타입
 * short : 단기 (7일 이하)
 * mid   : 중기 (30일 이하)
 * long  : 장기 (31일 이상)
 *
 * 상시 운영은 일수 계산이 불가능하므로 기본값 mid 반환
 */
function getProgramDurationType(array $program): string
{
    $days = getProgramActivityDays($program);

    if ($days <= 0) {
        return 'mid';
    }

    if ($days <= 7) {
        return 'short';
    }

    if ($days <= 30) {
        return 'mid';
    }

    return 'long';
}

/**
 * 활동기간 한글 라벨
 */
function getProgramDurationLabel(array $program): string
{
    switch (getProgramDurationType($program)) {
        case 'short':
            return '단기';
        case 'mid':
            return '중기';
        default:
            return '장기';
    }
}

/**
 * 모집기간 출력용 포맷
 * 상시는 '상시 모집'으로 표시
 * 일반은 2026.03.10 ~ 2026.04.25
 */
function formatProgramRecruitmentPeriod(array $program): string
{
    if (!empty($program['is_ongoing'])) {
        return '상시 모집';
    }

    $start = createProgramDate($program['recruitment_start_date'] ?? null);
    $end = createProgramDate($program['recruitment_end_date'] ?? null);

    if (!$start || !$end) {
        return '';
    }

    return $start->format('Y.m.d') . ' ~ ' . $end->format('Y.m.d');
}

/**
 * 활동기간 출력용 포맷
 * 상시 운영이면 출력 안함
 * 일반은 2026.04.01 ~ 2026.05.01
 */
function formatProgramActivityPeriod(array $program): string
{
    $start = createProgramDate($program['activity_start_date'] ?? null);
    $end = createProgramDate($program['activity_end_date'] ?? null);

    if (!$start || !$end) {
        return '';
    }

    return $start->format('Y.m.d') . ' ~ ' . $end->format('Y.m.d');
}

/**
 * 카드/필터용 data-* 속성 묶음
 * JS에서 그대로 읽어 쓰기 좋게 정리
 */
function getProgramDataAttributes(array $program, ?DateTime $today = null): array
{
    return [
        'data-status' => getProgramStatus($program, $today),
        'data-price' => getProgramPriceType($program),
        'data-duration' => getProgramDurationType($program),
        'data-field' => (string) ($program['field_code'] ?? ''),
        'data-sort-order' => (string) ($program['sort_order'] ?? 0),
    ];
}

/**
 * 카드 렌더링 전에 필요한 파생값 한 번에 반환
 */
function getProgramCardMeta(array $program, ?DateTime $today = null): array
{
    return [
        'status' => getProgramStatus($program, $today),
        'status_label' => getProgramStatusLabel($program, $today),
        'price_type' => getProgramPriceType($program),
        'price_label' => getProgramPriceLabel($program),
        'duration_type' => getProgramDurationType($program),
        'duration_label' => getProgramDurationLabel($program),
        'recruitment_period' => formatProgramRecruitmentPeriod($program),
        'activity_period' => formatProgramActivityPeriod($program),
        'activity_days' => getProgramActivityDays($program),
        'data_attributes' => getProgramDataAttributes($program, $today),
    ];
}

function getProgramDetailContent(array $program, ?DateTime $today = null): array
{
    $meta = getProgramCardMeta($program, $today);
    $fieldLabel = getProgramFieldLabel($program);
    $ageLabel = getProgramAgeLabel($program);
    $title = (string) ($program['title'] ?? '청소년 프로그램');
    $hashtags = $program['hashtags'] ?? [];
    $tagText = !empty($hashtags) ? implode(', ', $hashtags) : $fieldLabel;
    $capacity = (int) ($program['capacity'] ?? (18 + (((int) ($program['id'] ?? 0) % 5) * 4)));
    $applied = (int) ($program['applied_count'] ?? min($capacity, 6 + (((int) ($program['id'] ?? 0) % 7) * 2)));

    return [
        'description' => $program['description'] ?? "{$fieldLabel} 분야에 관심 있는 {$ageLabel}을 위한 참여형 프로그램입니다. {$tagText}를 주제로 직접 경험하고 협업하며 자신의 생각을 구체적인 활동으로 확장해 볼 수 있습니다.",
        'location' => $program['location'] ?? '시립서울청소년센터 활동실',
        'capacity' => $capacity,
        'applied_count' => $applied,
        'waiting_count' => (int) ($program['waiting_count'] ?? 0),
        'contact' => $program['contact'] ?? '청소년활동팀 02-1234-5678',
        'attachment' => $program['attachment'] ?? "{$fieldLabel} 프로그램 안내문.pdf",
        'schedule' => $program['schedule'] ?? [
            '오리엔테이션 및 활동 안내',
            "{$fieldLabel} 주제 탐색과 팀별 기획",
            '결과 공유 및 활동 마무리',
        ],
        'benefits' => $program['benefits'] ?? [
            '활동 확인서 발급',
            '프로그램 자료 제공',
            '우수 참여자 소정의 기념품 증정',
        ],
        'notes' => $program['notes'] ?? [
            '신청 후 담당자 확인 연락이 진행될 수 있습니다.',
            '세부 일정은 센터 운영 상황에 따라 일부 조정될 수 있습니다.',
            '무단 불참 시 이후 프로그램 신청이 제한될 수 있습니다.',
        ],
        'summary_label' => $meta['activity_period'] !== '' ? $meta['activity_period'] : '상시 운영',
        'title' => $title,
    ];
}

/**
 * 현재 노출 가능한 프로그램만 필터
 */
function filterActivePrograms(array $programs): array
{
    return array_values(array_filter(
        $programs,
        static fn(array $program): bool => !empty($program['is_active'])
    ));
}

/**
 * 접수중(ongoing) 상태인 프로그램만 필터
 * - 상시(always), 예정(upcoming), 마감(closed) 제외
 */
function filterOpenPrograms(array $programs, ?DateTime $today = null): array
{
    $today = getProgramToday($today);

    return array_values(array_filter(
        $programs,
        static fn(array $program): bool =>
            in_array(getProgramStatus($program, $today), ['ongoing', 'always'], true)
    ));
}

/**
 * 상태 우선순위 정렬
 * ongoing → always → upcoming → closed
 * 같은 상태면 모집 종료일 빠른 순
 * 종료일도 같으면 sort_order 오름차순
 */
function sortProgramsForDisplay(array $programs, ?DateTime $today = null): array
{
    $today = getProgramToday($today);

    $priorityMap = [
        'ongoing' => 1,
        'always' => 2,
        'upcoming' => 3,
        'closed' => 4,
    ];

    usort($programs, static function (array $a, array $b) use ($today, $priorityMap): int {
        $statusA = getProgramStatus($a, $today);
        $statusB = getProgramStatus($b, $today);

        $priorityA = $priorityMap[$statusA] ?? 99;
        $priorityB = $priorityMap[$statusB] ?? 99;

        if ($priorityA !== $priorityB) {
            return $priorityA <=> $priorityB;
        }

        $endA = createProgramDate($a['recruitment_end_date'] ?? null);
        $endB = createProgramDate($b['recruitment_end_date'] ?? null);

        if ($endA && $endB) {
            $endTimestampA = $endA->getTimestamp();
            $endTimestampB = $endB->getTimestamp();

            if ($endTimestampA !== $endTimestampB) {
                return $endTimestampA <=> $endTimestampB;
            }
        }

        if ($endA && !$endB) {
            return -1;
        }

        if (!$endA && $endB) {
            return 1;
        }

        $sortA = (int) ($a['sort_order'] ?? 9999);
        $sortB = (int) ($b['sort_order'] ?? 9999);

        if ($sortA !== $sortB) {
            return $sortA <=> $sortB;
        }

        return (int) ($a['id'] ?? 0) <=> (int) ($b['id'] ?? 0);
    });

    return $programs;
}

/**
 * 메인 "접수 중인 프로그램" 섹션 전용 준비 함수
 * 1) is_active 필터
 * 2) 접수중(ongoing)만 필터
 * 3) 정렬
 *
 * DB 연결 후에는
 * - WHERE is_active = 1
 * - AND status = 'ongoing'
 * 같은 조건으로 치환 가능
 */
function getOpenProgramsForDisplay(array $programs, ?DateTime $today = null): array
{
    $today = getProgramToday($today);

    $programs = filterActivePrograms($programs);
    $programs = filterOpenPrograms($programs, $today);
    $programs = sortProgramsForDisplay($programs, $today);

    return array_values($programs);
}

/**
 * ========================================
 * Recommend Filter
 * ========================================
 */

/**
 * 추천 필터 상태 정규화
 * - URL/GET 값 기반
 * - 허용된 값만 유지
 */
function normalizeRecommendFilterState(array $input): array
{
    $allowedAgeCodes = [
        'infant',
        'elementary-low',
        'elementary-high',
        'early-youth',
        'mid-youth',
        'late-youth',
        'citizen',
    ];

    $allowedFieldCodes = [
        'career',
        'culture-art',
        'emotional',
        'competency',
        'citizen',
    ];

    $age = isset($input['age']) ? trim((string) $input['age']) : '';
    $field = isset($input['field']) ? trim((string) $input['field']) : '';

    if ($age === '' || !in_array($age, $allowedAgeCodes, true)) {
        $age = null;
    }

    if ($field === '' || !in_array($field, $allowedFieldCodes, true)) {
        $field = null;
    }

    return [
        'age' => $age,
        'field' => $field,
    ];
}

/**
 * 프로그램 1개 필터 매칭
 */
function matchesRecommendProgram(array $program, array $state): bool
{
    $selectedAge = $state['age'] ?? null;
    $selectedField = $state['field'] ?? null;

    $programAgeGroups = $program['age_group_codes'] ?? [];
    $programFieldCode = $program['field_code'] ?? null;

    $matchesAge = true;
    $matchesField = true;

    if ($selectedAge !== null) {
        $matchesAge = in_array($selectedAge, $programAgeGroups, true);
    }

    if ($selectedField !== null) {
        $matchesField = $programFieldCode === $selectedField;
    }

    return $matchesAge && $matchesField;
}

/**
 * 추천 프로그램 필터링 (최종)
 *
 * 흐름:
 * 1) 활성
 * 2) 접수중
 * 3) 추천 필터 (age + field)
 * 4) 정렬
 */
function getRecommendPrograms(array $programs, array $input, ?DateTime $today = null): array
{
    $today = getProgramToday($today);

    // 1) 상태 정규화
    $state = normalizeRecommendFilterState($input);

    // 2) 기본 필터
    $programs = filterActivePrograms($programs);
    $programs = filterOpenPrograms($programs, $today);

    // 3) 추천 필터 적용
    $programs = array_values(array_filter(
        $programs,
        static fn(array $program): bool => matchesRecommendProgram($program, $state)
    ));

    // 4) 정렬
    $programs = sortProgramsForDisplay($programs, $today);

    return $programs;
}
