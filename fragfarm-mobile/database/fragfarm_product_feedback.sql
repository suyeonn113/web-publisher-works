-- 상품별 리뷰와 문의 테이블
-- fragfarm_members.sql을 먼저 실행한 뒤 이 파일을 가져오세요.

CREATE TABLE IF NOT EXISTS fragfarm_product_reviews (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    product_id VARCHAR(50) NOT NULL,
    member_id INT UNSIGNED NOT NULL,
    rating TINYINT UNSIGNED NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_product_reviews_product_created (product_id, created_at),
    KEY idx_product_reviews_member (member_id),
    CONSTRAINT fk_product_reviews_member
        FOREIGN KEY (member_id) REFERENCES fragfarm_members (id)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS fragfarm_review_comments (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    product_id VARCHAR(50) NOT NULL,
    review_key VARCHAR(80) NOT NULL,
    member_id INT UNSIGNED NOT NULL,
    content VARCHAR(500) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_review_comments_target_created (product_id, review_key, created_at),
    KEY idx_review_comments_member (member_id),
    CONSTRAINT fk_review_comments_member
        FOREIGN KEY (member_id) REFERENCES fragfarm_members (id)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS fragfarm_product_qna (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    product_id VARCHAR(50) NOT NULL,
    member_id INT UNSIGNED NOT NULL,
    content TEXT NOT NULL,
    is_secret TINYINT(1) NOT NULL DEFAULT 0,
    answer_content TEXT NULL,
    answered_at DATETIME NULL DEFAULT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_product_qna_product_created (product_id, created_at),
    KEY idx_product_qna_member (member_id),
    CONSTRAINT fk_product_qna_member
        FOREIGN KEY (member_id) REFERENCES fragfarm_members (id)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
