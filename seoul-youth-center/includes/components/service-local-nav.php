<?php
$serviceSection = $serviceSection ?? 'education';
$serviceCurrent = $serviceCurrent ?? '';

$serviceNavigation = $serviceSection === 'facility'
    ? [
        'title' => '이용 안내',
        'label' => '이용 안내 메뉴',
        'items' => [
            ['key' => 'culture', 'label' => '문화공간', 'href' => BASE_URL . '/culture-space.php'],
            ['key' => 'fitness', 'label' => '종합체력실', 'href' => BASE_URL . '/fitness-center.php'],
            ['key' => 'rental', 'label' => '시설대관', 'href' => BASE_URL . '/facility-rental.php'],
            ['key' => 'visit', 'label' => '기관방문', 'href' => BASE_URL . '/visit.php'],
        ],
    ]
    : [
        'title' => '평생교육 프로그램',
        'label' => '평생교육 프로그램 메뉴',
        'items' => [
            ['key' => 'guide', 'label' => '접수안내', 'href' => BASE_URL . '/lifelong-education-guide.php'],
            ['key' => 'classes', 'label' => '교육강좌', 'href' => BASE_URL . '/lifelong-education-classes.php'],
        ],
    ];
?>

<aside class="info-local-nav" aria-label="<?= htmlspecialchars($serviceNavigation['label'], ENT_QUOTES, 'UTF-8') ?>">
    <h2><?= htmlspecialchars($serviceNavigation['title'], ENT_QUOTES, 'UTF-8') ?></h2>
    <nav>
        <?php foreach ($serviceNavigation['items'] as $item): ?>
            <?php if (!empty($item['disabled'])): ?>
                <span class="info-local-nav__item is-disabled" aria-disabled="true"><?= htmlspecialchars($item['label'], ENT_QUOTES, 'UTF-8') ?></span>
            <?php else: ?>
                <a href="<?= htmlspecialchars($item['href'], ENT_QUOTES, 'UTF-8') ?>"<?= $serviceCurrent === $item['key'] ? ' aria-current="page"' : '' ?>><?= htmlspecialchars($item['label'], ENT_QUOTES, 'UTF-8') ?></a>
            <?php endif; ?>
        <?php endforeach; ?>
    </nav>
</aside>
