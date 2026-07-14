CREATE TABLE IF NOT EXISTS fragfarm_qna_posts (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(160) NOT NULL,
    content TEXT NOT NULL,
    image_src VARCHAR(255) NULL,
    is_notice TINYINT(1) NOT NULL DEFAULT 0,
    is_secret TINYINT(1) NOT NULL DEFAULT 0,
    comment_count INT UNSIGNED NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_qna_notice_created (is_notice, created_at),
    KEY idx_qna_title (title)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO fragfarm_qna_posts
    (title, content, image_src, is_notice, is_secret, comment_count, created_at)
VALUES
    ('Year-end Benefit ♥ 연말 세일 공지', '올해도 함께해주셔서 감사합니다.\n연말을 맞아 작은 마음을 담았어요.\n\nYear-end Benefit\n20-30% Discount\n\nOnly Website\n\n기간: 2025/12/14(일) 00:00 ~ 2025/12/24(수) 23:59', '/assets/images/popup.png', 1, 0, 0, '2025-12-01 10:00:00'),
    ('프래그팜 글로벌 사이트 안내', '해외 고객을 위한 글로벌 사이트 준비 안내입니다. 배송 가능 국가와 결제 수단은 순차적으로 확대됩니다.', NULL, 1, 0, 0, '2025-11-18 10:00:00'),
    ('프래그팜 성수 플래그십 스토어 운영 안내', '성수 플래그십 스토어는 예약 없이 방문 가능합니다. 시즌 룩북 제품은 현장 재고가 빠르게 변동될 수 있습니다.', NULL, 1, 0, 0, '2025-10-21 10:00:00'),
    ('교환 및 반품 안내', '상품 수령 후 7일 이내 QnA 게시판을 통해 접수해 주세요. 착용 흔적이 있거나 택이 제거된 상품은 처리가 어렵습니다.', NULL, 1, 0, 0, '2025-09-12 10:00:00'),
    ('배송비 안내', '기본 배송비는 3,000원이며 70,000원 이상 구매 시 무료 배송됩니다. 제주 및 도서산간 지역은 추가 배송비가 발생할 수 있습니다.', NULL, 1, 0, 0, '2025-08-28 10:00:00'),
    ('세탁 방법 안내', '프린팅 제품은 뒤집어서 단독 손세탁을 권장합니다. 건조기 사용은 피해주세요.', NULL, 1, 0, 0, '2025-08-01 10:00:00'),
    ('상품 관련 문의합니다.', 'Seashell Keyring Sleeveless 사이즈 문의드립니다.', NULL, 0, 1, 1, '2025-12-10 13:00:00'),
    ('상품 관련 문의합니다.', 'Trumpet Flower Wide Pants 재입고 일정 문의드립니다.', NULL, 0, 1, 1, '2025-12-09 14:30:00'),
    ('상품 관련 문의합니다.', 'Foliage Tee 소재가 많이 비치는지 궁금합니다.', NULL, 0, 1, 1, '2025-12-08 09:20:00'),
    ('상품 관련 문의합니다.', 'Magic Lily Midi Skirt S 사이즈 허리 단면 문의합니다.', NULL, 0, 1, 1, '2025-12-07 18:15:00'),
    ('상품 관련 문의합니다.', 'Sentimental Rose Wool Gloves 컬러 문의입니다.', NULL, 0, 1, 1, '2025-12-06 11:05:00'),
    ('상품 관련 문의합니다.', '배송 전 옵션 변경 가능한가요?', NULL, 0, 1, 1, '2025-12-05 15:40:00'),
    ('상품 관련 문의합니다.', '교환 접수 확인 부탁드립니다.', NULL, 0, 1, 1, '2025-12-04 12:10:00'),
    ('상품 관련 문의합니다.', '주문 취소 처리 문의합니다.', NULL, 0, 1, 1, '2025-12-03 19:00:00'),
    ('상품 관련 문의합니다.', '입금 확인 부탁드립니다.', NULL, 0, 1, 1, '2025-12-02 16:25:00'),
    ('상품 관련 문의합니다.', '선물 포장 가능한지 문의합니다.', NULL, 0, 1, 1, '2025-12-01 17:45:00');
