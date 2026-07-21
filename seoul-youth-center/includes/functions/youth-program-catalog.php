<?php

declare(strict_types=1);

function getYouthProgramCategoryMeta(): array
{
    return [
        'participation' => [
            'eyebrow' => 'PARTICIPATION',
            'description' => '청소년이 직접 의견을 내고 활동을 기획하며 센터와 지역사회의 변화를 만드는 참여 중심 프로그램입니다.',
        ],
        'training' => [
            'eyebrow' => 'TRAINING',
            'description' => '캠프와 공동체 활동을 통해 협력, 도전, 생활 역량을 기르는 체험형 프로그램입니다.',
        ],
        'community' => [
            'eyebrow' => 'COMMUNITY',
            'description' => '지역의 기관과 자원을 연결해 청소년의 생활권 안에서 관계와 참여 경험을 확장합니다.',
        ],
        'school' => [
            'eyebrow' => 'SCHOOL',
            'description' => '학교 교육과정과 연계해 리더십, 인권, 안전, 경제 등 교실 밖 배움의 기회를 제공합니다.',
        ],
        'career' => [
            'eyebrow' => 'CAREER',
            'description' => '다양한 진로와 직업 세계를 탐색하고 자신의 흥미와 가능성을 구체적으로 발견합니다.',
        ],
        'future' => [
            'eyebrow' => 'FUTURE',
            'description' => 'AI, 디지털, 메이커 활동을 통해 미래사회에 필요한 창의성과 문제해결 역량을 키웁니다.',
        ],
        'global' => [
            'eyebrow' => 'GLOBAL',
            'description' => '다른 문화와의 만남과 교류를 통해 세계시민 감수성과 열린 소통 역량을 높입니다.',
        ],
        'inclusive' => [
            'eyebrow' => 'INCLUSIVE',
            'description' => '장애청소년의 문화적 참여와 자립, 관계 형성을 지원하는 맞춤형 활동을 운영합니다.',
        ],
        'special' => [
            'eyebrow' => 'SPECIAL',
            'description' => '시립서울청소년센터의 공간과 전문성을 활용해 차별화된 문화·체험 활동을 제공합니다.',
        ],
        'donggeurami' => [
            'eyebrow' => 'DONGGEURAMI',
            'description' => '학업중단 위기 청소년에게 맞춤형 대안교육과 체험 중심의 성장 과정을 제공합니다.',
        ],
        'after-school' => [
            'eyebrow' => 'AFTER SCHOOL',
            'description' => '방과 후 돌봄이 필요한 청소년에게 학습, 체험, 생활지도를 통합적으로 지원합니다.',
        ],
        'culture-space' => [
            'eyebrow' => 'YOUTH SPACE',
            'description' => '청소년이 자유롭게 쉬고 만나고 표현할 수 있는 생활권 문화공간을 운영합니다.',
        ],
    ];
}

function getYouthProgramCatalog(): array
{
    static $catalog = null;

    if (is_array($catalog)) {
        return $catalog;
    }

    $jsonPath = dirname(__DIR__) . '/data/youth-program-catalog.json';
    $json = is_file($jsonPath) ? file_get_contents($jsonPath) : false;
    $decoded = is_string($json) ? json_decode($json, true) : null;
    $catalog = is_array($decoded) ? $decoded : ['categories' => []];
    $meta = getYouthProgramCategoryMeta();

    foreach ($catalog['categories'] as &$category) {
        $slug = (string) ($category['slug'] ?? '');
        $category = array_merge($meta[$slug] ?? [], $category);
        $category['program_count'] = count($category['programs'] ?? []);
    }
    unset($category);

    return $catalog;
}

function getYouthProgramCategories(): array
{
    return getYouthProgramCatalog()['categories'] ?? [];
}

function findYouthProgramCategory(string $slug): ?array
{
    foreach (getYouthProgramCategories() as $category) {
        if (($category['slug'] ?? '') === $slug) {
            return $category;
        }
    }

    return null;
}

function findYouthProgramEntry(array $category, int $programId): ?array
{
    foreach ($category['programs'] ?? [] as $program) {
        if ((int) ($program['id'] ?? 0) === $programId) {
            return $program;
        }
    }

    return null;
}

function getYouthProgramFact(array $program, string $label): string
{
    foreach ($program['facts'] ?? [] as $fact) {
        if (($fact['label'] ?? '') === $label) {
            return trim((string) ($fact['value'] ?? ''));
        }
    }

    return '';
}

function getYouthProgramSummary(array $program, array $category): string
{
    $description = trim((string) ($program['description'] ?? ''));

    if ($description !== '') {
        $description = preg_replace('/(?=<[^>]+>)/u', "\n", $description) ?? $description;
        $description = preg_replace('/(?=[○①②③④⑤※])/u', "\n", $description) ?? $description;

        return trim($description);
    }

    return (string) ($category['description'] ?? '청소년의 다양한 경험과 성장을 지원하는 프로그램입니다.');
}

function getYouthProgramSourceImage(array $program): string
{
    $image = trim((string) ($program['source_image'] ?? ''));

    if (!str_starts_with($image, 'http://www.youthc.or.kr/')) {
        return '';
    }

    $baseUrl = defined('BASE_URL') ? BASE_URL : '';

    return $baseUrl . '/api/youth-program-image.php?program=' . (int) ($program['id'] ?? 0);
}

function findYouthProgramEntryById(int $programId): ?array
{
    foreach (getYouthProgramCategories() as $category) {
        $program = findYouthProgramEntry($category, $programId);

        if ($program !== null) {
            return $program;
        }
    }

    return null;
}
