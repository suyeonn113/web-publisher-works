ALTER TABLE seoul_youth_center_program_applications
    ADD COLUMN program_type ENUM('youth', 'lifelong') NOT NULL DEFAULT 'youth' AFTER id,
    ADD INDEX idx_syc_program_applications_program_type (program_type);
