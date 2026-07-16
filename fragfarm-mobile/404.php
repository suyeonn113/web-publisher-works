<?php
require_once __DIR__ . '/includes/config.php';

http_response_code(404);

$pageTitle = '페이지를 찾을 수 없습니다 | Fragfarm';
?>

<!DOCTYPE html>
<html lang="ko">

<?php include __DIR__ . '/includes/head.php'; ?>

<body>
<?php include __DIR__ . '/includes/header.php'; ?>

<main id="main" class="not-found-page" role="status">
    <style>
        .not-found-page {
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

        .not-found-page h1 {
            margin: 0;
            font-size: 32px;
            font-weight: 700;
            line-height: 1.25;
            letter-spacing: 0;
        }

        .not-found-page p {
            max-width: 560px;
            margin: 18px 0 0;
            color: #5f5f5f;
            font-size: 16px;
            line-height: 1.7;
            letter-spacing: 0;
        }

        .not-found-page p span {
            display: block;
        }

        .not-found-page__actions {
            margin-top: 32px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
        }

        .not-found-page__actions a {
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

        .not-found-page__actions a:first-child {
            color: #ffffff;
            background: #171717;
        }

        .not-found-page__actions a:hover {
            color: #171717;
            background: rgb(23 23 23 / 8%);
        }

        .not-found-page__actions a:first-child:hover {
            color: #ffffff;
            background: rgb(23 23 23 / 72%);
        }

        @media (max-width: 640px) {
            .not-found-page {
                padding: 56px 20px;
            }

            .not-found-page h1 {
                font-size: 26px;
            }

            .not-found-page p {
                font-size: 15px;
            }

            .not-found-page__actions {
                width: 100%;
            }

            .not-found-page__actions a {
                width: 100%;
                max-width: 280px;
            }
        }
    </style>

    <h1>페이지를 찾을 수 없습니다</h1>
    <p>
        <span>요청한 페이지가 삭제되었거나 주소가 변경되었을 수 있습니다.</span>
        <span>실제 사이트를 확인하거나 메인으로 돌아가 주세요.</span>
    </p>
    <div class="not-found-page__actions">
        <a href="<?= BASE_URL ?>/index.php">메인으로 돌아가기</a>
        <a href="<?= BASE_URL ?>/pages/product.php">상품 보기</a>
    </div>
</main>

<?php include __DIR__ . '/includes/footer.php'; ?>

<script src="<?= BASE_URL ?>/js/header.js"></script>
</body>
</html>
