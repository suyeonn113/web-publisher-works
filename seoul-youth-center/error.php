<?php
include __DIR__ . '/includes/config.php';

$pageTitle = '페이지를 불러올 수 없습니다 | 서울시립청소년센터';
?>

<!DOCTYPE html>
<html lang="ko">

<?php include __DIR__ . '/includes/head.php'; ?>

<body>
<?php include __DIR__ . '/includes/global-nav.php'; ?>

<main id="main" class="error-page" role="status">
    <style>
        .error-page {
            min-height: 72vh;
            padding: 80px 24px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: #171717;
            background: #f2f2f2;
        }

        .error-page h1 {
            margin: 0;
            font-size: 32px;
            font-weight: 700;
            line-height: 1.25;
            letter-spacing: 0;
        }

        .error-page p {
            max-width: 560px;
            margin: 18px 0 0;
            color: #5f5f5f;
            font-size: 16px;
            line-height: 1.7;
            letter-spacing: 0;
        }

        .error-page p span {
            display: block;
        }

        .error-page__actions {
            margin-top: 32px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
        }

        .error-page__actions a {
            min-width: 150px;
            padding: 13px 18px;
            border: 0;
            border-radius: 999px;
            color: #171717;
            background: #ffffff;
            font-size: 15px;
            font-weight: 600;
            line-height: 1.2;
            text-decoration: none;
        }

        .error-page__actions a:first-child {
            color: #ffffff;
            background: #171717;
        }

        .error-page__actions a:hover {
            color: #171717;
            background: rgb(23 23 23 / 8%);
        }

        .error-page__actions a:first-child:hover {
            color: #ffffff;
            background: rgb(23 23 23 / 72%);
        }

        @media (max-width: 640px) {
            .error-page {
                padding: 56px 20px;
            }

            .error-page h1 {
                font-size: 26px;
            }

            .error-page p {
                font-size: 15px;
            }

            .error-page__actions {
                width: 100%;
            }

            .error-page__actions a {
                width: 100%;
                max-width: 280px;
            }
        }
    </style>

    <h1>페이지를 불러올 수 없습니다</h1>
    <p>
        <span>일시적인 오류로 요청한 화면을 표시하지 못했습니다.</span>
        <span>잠시 후 다시 시도하거나 메인으로 돌아가 주세요.</span>
    </p>
    <div class="error-page__actions">
        <a href="<?= BASE_URL ?>/index.php">메인으로 돌아가기</a>
        <a href="<?= BASE_URL ?>/programs.php">프로그램 보기</a>
    </div>
</main>

<?php include __DIR__ . '/includes/footer.php'; ?>

<script src="<?= BASE_URL ?>/js/global-nav.js"></script>
<script src="<?= BASE_URL ?>/js/header-search.js"></script>
</body>
</html>
