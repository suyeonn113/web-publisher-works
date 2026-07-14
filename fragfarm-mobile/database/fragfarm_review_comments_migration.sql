-- 기존 프래그팜 DB에 리뷰 댓글 기능을 추가할 때 한 번만 실행하세요.
-- fragfarm_members 테이블이 먼저 존재해야 합니다.

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
