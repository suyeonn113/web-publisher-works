-- 기존 fragfarm_product_qna 테이블에 관리자 답변 컬럼을 추가합니다.
-- 이미 컬럼이 있는 경우에는 아무 변경도 하지 않습니다.

SET @current_schema = DATABASE();

SET @add_answer_content = IF(
    (SELECT COUNT(*) FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = @current_schema
       AND TABLE_NAME = 'fragfarm_product_qna'
       AND COLUMN_NAME = 'answer_content') = 0,
    'ALTER TABLE fragfarm_product_qna ADD COLUMN answer_content TEXT NULL AFTER is_secret',
    'SELECT 1'
);
PREPARE stmt FROM @add_answer_content;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @add_answered_at = IF(
    (SELECT COUNT(*) FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = @current_schema
       AND TABLE_NAME = 'fragfarm_product_qna'
       AND COLUMN_NAME = 'answered_at') = 0,
    'ALTER TABLE fragfarm_product_qna ADD COLUMN answered_at DATETIME NULL DEFAULT NULL AFTER answer_content',
    'SELECT 1'
);
PREPARE stmt FROM @add_answered_at;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
