<?php
include __DIR__ . '/includes/config.php';

$pageTitle = '평생교육 접수안내 | 시립서울청소년센터';
$pageCss = ['info-pages.css', 'service-pages.css'];
$serviceSection = 'education';
$serviceCurrent = 'guide';

$refundGroups = [
    'before' => [
        'label' => '시작 전',
        'items' => [
            [
                'target' => '헬스·시설대관',
                'rules' => [
                    ['time' => '개시일 이전', 'refund' => '총금액의 10% 공제 후 환불'],
                ],
            ],
            [
                'target' => '평생교육',
                'rules' => [
                    ['time' => '개강 전', 'refund' => '수강료 전액 환불'],
                ],
            ],
        ],
    ],
    'during' => [
        'label' => '진행 중',
        'items' => [
            [
                'target' => '헬스·시설대관',
                'rules' => [
                    ['time' => '개시일 이후', 'refund' => '총금액의 10%와 이용 일수에 해당하는 금액을 공제 후 환불'],
                ],
            ],
            [
                'target' => '평생교육',
                'rules' => [
                    ['time' => '수업 1/3 경과 전', 'refund' => '수강료의 2/3 환불'],
                    ['time' => '수업 1/2 경과 전', 'refund' => '수강료의 1/2 환불'],
                ],
            ],
        ],
    ],
    'after' => [
        'label' => '진행 후',
        'items' => [
            [
                'target' => '평생교육',
                'rules' => [
                    ['time' => '수업 1/2 경과 후', 'refund' => '환불 불가'],
                ],
            ],
        ],
    ],
];
?>

<!DOCTYPE html>
<html lang="ko">

<?php include __DIR__ . '/includes/head.php'; ?>

<body>
<?php include __DIR__ . '/includes/global-nav.php'; ?>

<main id="main" class="info-page">
    <section class="info-hero" aria-labelledby="education-guide-title">
        <div class="info-hero__inner inner">
            <nav class="info-breadcrumb" aria-label="현재 위치">
                <ol>
                    <li><a href="<?= BASE_URL ?>/index.php">홈</a></li>
                    <li>평생교육 프로그램</li>
                    <li aria-current="page">접수안내</li>
                </ol>
            </nav>
            <div class="info-hero__copy">
                <p class="info-eyebrow">LIFELONG EDUCATION</p>
                <h1 id="education-guide-title">평생교육 접수안내</h1>
                <p>수강 신청부터 환불 기준까지, 평생교육 프로그램 이용에 필요한 내용을 한곳에 정리했습니다.</p>
            </div>
        </div>
    </section>

    <div class="info-layout inner">
        <?php include __DIR__ . '/includes/components/service-local-nav.php'; ?>

        <div class="info-content">
            <section class="info-section" aria-labelledby="education-process-title">
                <header class="info-section-heading">
                    <p>REGISTRATION</p>
                    <h2 id="education-process-title">수강 신청 절차</h2>
                </header>
                <ol class="service-process">
                    <li>
                        <div><strong>강좌 선택</strong><p>온라인 신청 페이지 또는 센터 안내데스크에서 접수 가능한 강좌를 확인합니다.</p></div>
                        <svg class="service-process__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg>
                    </li>
                    <li>
                        <div><strong>신청서 작성</strong><p>온라인 신청서에 수강생 정보와 연락처를 정확하게 작성합니다.</p></div>
                        <svg class="service-process__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg>
                    </li>
                    <li>
                        <div><strong>이용료 납부</strong><p>현금 또는 카드로 수강료를 납부합니다.</p></div>
                        <svg class="service-process__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg>
                    </li>
                    <li><div><strong>등록 확정</strong><p>납부 확인 후 수강 등록이 최종 확정됩니다.</p></div></li>
                </ol>
            </section>

            <section class="info-section" aria-labelledby="education-summary-title">
                <header class="info-section-heading">
                    <p>INFORMATION</p>
                    <h2 id="education-summary-title">접수 정보</h2>
                </header>
                <dl class="service-summary service-summary--plain">
                    <div>
                        <dt>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <path d="M9 5H6a2 2 0 0 0-2 2v13h16V7a2 2 0 0 0-2-2h-3"></path><rect x="8" y="2" width="8" height="5" rx="1"></rect><path d="M8 12h8M8 16h5"></path>
                            </svg>
                            <span>접수 방법</span>
                        </dt>
                        <dd>온라인·방문 접수 · 선착순 마감</dd>
                    </div>
                    <div>
                        <dt>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path>
                            </svg>
                            <span>접수 시간</span>
                        </dt>
                        <dd>평일 06:00~21:00 · 수시 접수</dd>
                    </div>
                    <div>
                        <dt>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <path d="M7.2 3.8 9.7 8l-2 1.7a15 15 0 0 0 6.6 6.6l1.7-2 4.2 2.5-.8 3A2 2 0 0 1 17.5 21C9.5 20.2 3.8 14.5 3 6.5a2 2 0 0 1 1.2-1.9z"></path>
                            </svg>
                            <span>접수 문의</span>
                        </dt>
                        <dd><a href="tel:0222672113">02-2267-2113</a></dd>
                    </div>
                </dl>
            </section>

            <section class="info-section" aria-labelledby="refund-policy-title">
                <header class="info-section-heading">
                    <p>REFUND POLICY</p>
                    <h2 id="refund-policy-title">환불 기준</h2>
                    <span>환불 금액은 신청 시점과 프로그램 진행 정도에 따라 달라집니다.</span>
                </header>
                <div class="service-table-wrap service-table-wrap--refund">
                    <table class="service-table">
                        <caption class="visually-hidden">시설 및 평생교육 프로그램 환불 기준</caption>
                        <thead>
                            <tr><th scope="col">대상</th><th scope="col">신청 시점</th><th scope="col">환불 내용</th></tr>
                        </thead>
                        <tbody>
                            <?php foreach ($refundGroups as $group): ?>
                                <?php foreach ($group['items'] as $item): ?>
                                    <?php foreach ($item['rules'] as $rule): ?>
                                        <tr>
                                            <th scope="row" data-label="대상"><?= htmlspecialchars($item['target']) ?></th>
                                            <td data-label="신청 시점"><?= htmlspecialchars($rule['time']) ?></td>
                                            <td data-label="환불 내용"><?= htmlspecialchars($rule['refund']) ?></td>
                                        </tr>
                                    <?php endforeach; ?>
                                <?php endforeach; ?>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>

                <div class="refund-mobile" data-refund-tabs>
                    <div class="refund-tabs" role="tablist" aria-label="환불 신청 시점">
                        <?php foreach ($refundGroups as $groupKey => $group): ?>
                            <button
                                type="button"
                                id="refund-tab-<?= $groupKey ?>"
                                class="refund-tabs__button"
                                role="tab"
                                aria-selected="<?= $groupKey === 'before' ? 'true' : 'false' ?>"
                                aria-controls="refund-panel-<?= $groupKey ?>"
                                tabindex="<?= $groupKey === 'before' ? '0' : '-1' ?>"
                                data-refund-tab="<?= $groupKey ?>"
                            ><?= htmlspecialchars($group['label']) ?></button>
                        <?php endforeach; ?>
                    </div>

                    <?php foreach ($refundGroups as $groupKey => $group): ?>
                        <div
                            id="refund-panel-<?= $groupKey ?>"
                            class="refund-panel"
                            role="tabpanel"
                            aria-labelledby="refund-tab-<?= $groupKey ?>"
                            tabindex="0"
                            <?= $groupKey === 'before' ? '' : 'hidden' ?>
                            data-refund-panel="<?= $groupKey ?>"
                        >
                            <?php foreach ($group['items'] as $item): ?>
                                <article class="refund-card">
                                    <h3><?= htmlspecialchars($item['target']) ?></h3>
                                    <dl>
                                        <?php foreach ($item['rules'] as $rule): ?>
                                            <div>
                                                <dt><?= htmlspecialchars($rule['time']) ?></dt>
                                                <dd><?= htmlspecialchars($rule['refund']) ?></dd>
                                            </div>
                                        <?php endforeach; ?>
                                    </dl>
                                </article>
                            <?php endforeach; ?>
                        </div>
                    <?php endforeach; ?>
                </div>
            </section>

            <section class="info-section" aria-labelledby="refund-guide-title">
                <header class="info-section-heading">
                    <p>CHECKLIST</p>
                    <h2 id="refund-guide-title">환불 신청 전 확인해주세요</h2>
                </header>
                <div class="service-policy-grid">
                    <article class="service-policy-card service-policy-card--documents">
                        <h3>준비 서류</h3>
                        <ul class="refund-documents">
                            <li>
                                <span class="refund-documents__icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M6 2h9l3 3v17H6z"></path><path d="M14 2v5h5"></path><path d="M9 12h6M9 16h6"></path>
                                    </svg>
                                </span>
                                <span>환불신청서와<br>본인 계좌번호</span>
                            </li>
                            <li>
                                <span class="refund-documents__icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M6 3h12v18l-2-1.5L14 21l-2-1.5L10 21l-2-1.5L6 21z"></path><path d="M9 8h6M9 12h6"></path>
                                    </svg>
                                </span>
                                <span>영수증 또는<br>매출전표</span>
                            </li>
                            <li>
                                <span class="refund-documents__icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                        <rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M3 10h18M7 15h3"></path>
                                    </svg>
                                </span>
                                <span>카드 결제 환불 시<br>결제 카드</span>
                            </li>
                        </ul>
                    </article>
                    <article class="service-policy-card">
                        <h3>유의사항</h3>
                        <ul>
                            <li>마감일은 프로그램 개강 전까지입니다.</li>
                            <li>선착순 접수로 조기 마감될 수 있습니다.</li>
                            <li>수강권은 타인에게 양도할 수 없습니다.</li>
                            <li>19세 이하 청소년은 증빙 시 할인 혜택을 받을 수 있습니다.</li>
                        </ul>
                    </article>
                </div>
            </section>

            <section class="info-section" aria-label="평생교육 강좌 이동">
                <div class="service-contact">
                    <div>
                        <strong>접수 가능한 강좌를 바로 확인하세요</strong>
                        <p>요일, 대상, 수강료와 잔여 정원을 비교하고 온라인으로 신청할 수 있습니다.</p>
                    </div>
                    <div class="service-contact__actions">
                        <a class="info-button" href="<?= BASE_URL ?>/lifelong-education-apply.php">평생교육 신청하기</a>
                        <a class="info-button info-button--line" href="<?= BASE_URL ?>/lifelong-education-classes.php">전체 강좌 안내</a>
                    </div>
                </div>
            </section>
        </div>
    </div>
</main>

<?php include __DIR__ . '/includes/footer.php'; ?>
<script src="<?= BASE_URL ?>/js/global-nav.js"></script>
<script src="<?= BASE_URL ?>/js/header-search.js"></script>
<script src="<?= BASE_URL ?>/js/refund-tabs.js"></script>
</body>
</html>
