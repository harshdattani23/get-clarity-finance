-- Audio Management System Database Schema

-- Courses/Modules table
CREATE TABLE IF NOT EXISTS courses (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Audio uploads table
CREATE TABLE IF NOT EXISTS audio_uploads (
    id VARCHAR(36) PRIMARY KEY,
    course_id VARCHAR(50) NOT NULL,
    language_code VARCHAR(10) NOT NULL,
    language_name VARCHAR(100) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    file_size BIGINT NOT NULL,
    duration_seconds INTEGER,
    status ENUM('uploaded', 'processing', 'completed', 'failed') DEFAULT 'uploaded',
    uploaded_by VARCHAR(36) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP NULL,
    metadata JSON,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    INDEX idx_course_language (course_id, language_code),
    INDEX idx_status (status),
    INDEX idx_uploaded_by (uploaded_by)
);

-- AI-generated chapters table
CREATE TABLE IF NOT EXISTS ai_generated_chapters (
    id VARCHAR(36) PRIMARY KEY,
    audio_upload_id VARCHAR(36) NOT NULL,
    chapter_data JSON NOT NULL, -- Array of chapter objects with title, start, duration, confidence
    overall_confidence DECIMAL(5,2) NOT NULL,
    processing_time_ms INTEGER NOT NULL,
    ai_model VARCHAR(50) NOT NULL, -- 'gemini', 'openai', etc.
    generation_method VARCHAR(100) NOT NULL, -- 'audio-transcription', 'pattern-analysis', etc.
    status ENUM('generated', 'approved', 'rejected', 'live') DEFAULT 'generated',
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_by VARCHAR(36) NULL,
    reviewed_at TIMESTAMP NULL,
    review_notes TEXT,
    FOREIGN KEY (audio_upload_id) REFERENCES audio_uploads(id) ON DELETE CASCADE,
    INDEX idx_audio_upload (audio_upload_id),
    INDEX idx_status (status),
    INDEX idx_confidence (overall_confidence)
);

-- Manual chapter overrides (when admins manually edit AI chapters)
CREATE TABLE IF NOT EXISTS manual_chapter_edits (
    id VARCHAR(36) PRIMARY KEY,
    ai_chapter_id VARCHAR(36) NOT NULL,
    original_chapter_data JSON NOT NULL,
    edited_chapter_data JSON NOT NULL,
    edited_by VARCHAR(36) NOT NULL,
    edited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    edit_notes TEXT,
    FOREIGN KEY (ai_chapter_id) REFERENCES ai_generated_chapters(id) ON DELETE CASCADE,
    INDEX idx_ai_chapter (ai_chapter_id),
    INDEX idx_edited_by (edited_by)
);

-- Live audio configurations (what's currently serving in production)
CREATE TABLE IF NOT EXISTS live_audio_configs (
    id VARCHAR(36) PRIMARY KEY,
    course_id VARCHAR(50) NOT NULL,
    language_code VARCHAR(10) NOT NULL,
    config_data JSON NOT NULL, -- Full audio config for the player
    source_type ENUM('ai_generated', 'manual', 'hybrid') NOT NULL,
    source_id VARCHAR(36), -- References ai_generated_chapters.id or manual edit
    deployed_by VARCHAR(36) NOT NULL,
    deployed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    version INTEGER DEFAULT 1,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY unique_active_config (course_id, language_code, is_active),
    INDEX idx_course_language (course_id, language_code),
    INDEX idx_active (is_active)
);

-- Seed initial courses
INSERT INTO courses (id, name, description) VALUES 
('investment-security', 'Investment Security Course', 'Course about stock market fraud detection and investment security'),
('stock-market-basics', 'Stock Market Basics', 'Fundamental stock market concepts and trading basics')
ON DUPLICATE KEY UPDATE name = VALUES(name), description = VALUES(description);

-- Audit log for all changes
CREATE TABLE IF NOT EXISTS audio_management_audit_log (
    id VARCHAR(36) PRIMARY KEY,
    entity_type VARCHAR(50) NOT NULL, -- 'audio_upload', 'ai_chapters', 'manual_edit', 'live_config'
    entity_id VARCHAR(36) NOT NULL,
    action VARCHAR(50) NOT NULL, -- 'created', 'updated', 'approved', 'deployed', etc.
    old_data JSON,
    new_data JSON,
    performed_by VARCHAR(36) NOT NULL,
    performed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    INDEX idx_entity (entity_type, entity_id),
    INDEX idx_performed_by (performed_by),
    INDEX idx_performed_at (performed_at)
);
