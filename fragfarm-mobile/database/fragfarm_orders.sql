-- Fragfarm 모의 주문 테이블
-- fragfarm_members.sql을 먼저 실행한 뒤 이 파일을 가져오세요.

CREATE TABLE IF NOT EXISTS fragfarm_orders (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    order_number VARCHAR(30) NOT NULL,
    member_id INT UNSIGNED NOT NULL,
    recipient_name VARCHAR(50) NOT NULL,
    recipient_phone VARCHAR(20) NOT NULL,
    postcode VARCHAR(10) NOT NULL,
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255) NOT NULL,
    delivery_message VARCHAR(255) NULL,
    product_amount INT UNSIGNED NOT NULL DEFAULT 0,
    shipping_fee INT UNSIGNED NOT NULL DEFAULT 0,
    total_amount INT UNSIGNED NOT NULL DEFAULT 0,
    payment_method VARCHAR(30) NOT NULL DEFAULT 'demo_card',
    payment_status ENUM('demo_paid', 'pending', 'cancelled', 'refunded') NOT NULL DEFAULT 'demo_paid',
    order_status ENUM('ordered', 'preparing', 'shipping', 'delivered', 'cancelled', 'exchanged', 'returned') NOT NULL DEFAULT 'ordered',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_orders_order_number (order_number),
    KEY idx_orders_member_created (member_id, created_at),
    KEY idx_orders_status_created (order_status, created_at),
    CONSTRAINT fk_orders_member
        FOREIGN KEY (member_id) REFERENCES fragfarm_members (id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS fragfarm_order_items (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    order_id INT UNSIGNED NOT NULL,
    product_id VARCHAR(50) NOT NULL,
    product_name VARCHAR(160) NOT NULL,
    product_image VARCHAR(255) NULL,
    product_option VARCHAR(100) NULL,
    size VARCHAR(50) NULL,
    quantity INT UNSIGNED NOT NULL DEFAULT 1,
    unit_price INT UNSIGNED NOT NULL DEFAULT 0,
    original_unit_price INT UNSIGNED NOT NULL DEFAULT 0,
    line_total INT UNSIGNED NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_order_items_order (order_id),
    KEY idx_order_items_product (product_id),
    CONSTRAINT fk_order_items_order
        FOREIGN KEY (order_id) REFERENCES fragfarm_orders (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
