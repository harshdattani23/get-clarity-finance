import { v4 as uuidv4 } from 'uuid';

// Type definitions
export interface Course {
  id: string;
  name: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
}

export interface AudioUpload {
  id: string;
  course_id: string;
  language_code: string;
  language_name: string;
  original_filename: string;
  file_path: string;
  file_url: string;
  file_size: number;
  duration_seconds?: number;
  status: 'uploaded' | 'processing' | 'completed' | 'failed';
  uploaded_by: string;
  uploaded_at: Date;
  processed_at?: Date;
  metadata?: any;
}

export interface ChapterSegment {
  title: string;
  start: number;
  duration: number;
  confidence: number;
}

export interface AIGeneratedChapters {
  id: string;
  audio_upload_id: string;
  chapter_data: ChapterSegment[];
  overall_confidence: number;
  processing_time_ms: number;
  ai_model: string;
  generation_method: string;
  status: 'generated' | 'approved' | 'rejected' | 'live';
  generated_at: Date;
  reviewed_by?: string;
  reviewed_at?: Date;
  review_notes?: string;
}

export interface ManualChapterEdit {
  id: string;
  ai_chapter_id: string;
  original_chapter_data: ChapterSegment[];
  edited_chapter_data: ChapterSegment[];
  edited_by: string;
  edited_at: Date;
  edit_notes?: string;
}

export interface LiveAudioConfig {
  id: string;
  course_id: string;
  language_code: string;
  config_data: {
    code: string;
    name: string;
    file: string;
    segments: ChapterSegment[];
  };
  source_type: 'ai_generated' | 'manual' | 'hybrid';
  source_id?: string;
  deployed_by: string;
  deployed_at: Date;
  is_active: boolean;
  version: number;
}

export interface AudioManagementAuditLog {
  id: string;
  entity_type: string;
  entity_id: string;
  action: string;
  old_data?: any;
  new_data?: any;
  performed_by: string;
  performed_at: Date;
  notes?: string;
}

// Service class for audio management operations
export class AudioManagementService {
  private db: any; // Your database connection

  constructor(db: any) {
    this.db = db;
  }

  // Course operations
  async getCourses(): Promise<Course[]> {
    const query = 'SELECT * FROM courses ORDER BY name';
    const results = await this.db.execute(query);
    return results.rows || results;
  }

  async getCourse(id: string): Promise<Course | null> {
    const query = 'SELECT * FROM courses WHERE id = ?';
    const results = await this.db.execute(query, [id]);
    const courses = results.rows || results;
    return courses.length > 0 ? courses[0] : null;
  }

  // Audio upload operations
  async createAudioUpload(upload: Omit<AudioUpload, 'id' | 'uploaded_at'>): Promise<string> {
    const id = uuidv4();
    const query = `
      INSERT INTO audio_uploads (
        id, course_id, language_code, language_name, original_filename,
        file_path, file_url, file_size, duration_seconds, status,
        uploaded_by, metadata
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    await this.db.execute(query, [
      id, upload.course_id, upload.language_code, upload.language_name,
      upload.original_filename, upload.file_path, upload.file_url,
      upload.file_size, upload.duration_seconds, upload.status,
      upload.uploaded_by, JSON.stringify(upload.metadata)
    ]);

    // Log the action
    await this.logAuditAction('audio_upload', id, 'created', null, upload, upload.uploaded_by);

    return id;
  }

  async getAudioUploads(courseId?: string, languageCode?: string): Promise<AudioUpload[]> {
    let query = 'SELECT * FROM audio_uploads WHERE 1=1';
    const params: any[] = [];

    if (courseId) {
      query += ' AND course_id = ?';
      params.push(courseId);
    }

    if (languageCode) {
      query += ' AND language_code = ?';
      params.push(languageCode);
    }

    query += ' ORDER BY uploaded_at DESC';

    const results = await this.db.execute(query, params);
    return (results.rows || results).map((row: any) => ({
      ...row,
      metadata: row.metadata ? JSON.parse(row.metadata) : null
    }));
  }

  async getAudioUpload(id: string): Promise<AudioUpload | null> {
    const query = 'SELECT * FROM audio_uploads WHERE id = ?';
    const results = await this.db.execute(query, [id]);
    const uploads = results.rows || results;
    
    if (uploads.length === 0) return null;
    
    const upload = uploads[0];
    return {
      ...upload,
      metadata: upload.metadata ? JSON.parse(upload.metadata) : null
    };
  }

  async updateAudioUploadStatus(id: string, status: AudioUpload['status'], processedAt?: Date): Promise<void> {
    const oldUpload = await this.getAudioUpload(id);
    
    const query = 'UPDATE audio_uploads SET status = ?, processed_at = ? WHERE id = ?';
    await this.db.execute(query, [status, processedAt || null, id]);

    // Log the action
    await this.logAuditAction('audio_upload', id, 'status_updated', oldUpload, { status, processed_at: processedAt }, 'system');
  }

  // AI chapters operations
  async createAIChapters(chapters: Omit<AIGeneratedChapters, 'id' | 'generated_at'>): Promise<string> {
    const id = uuidv4();
    const query = `
      INSERT INTO ai_generated_chapters (
        id, audio_upload_id, chapter_data, overall_confidence, processing_time_ms,
        ai_model, generation_method, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    await this.db.execute(query, [
      id, chapters.audio_upload_id, JSON.stringify(chapters.chapter_data),
      chapters.overall_confidence, chapters.processing_time_ms,
      chapters.ai_model, chapters.generation_method, chapters.status
    ]);

    // Log the action
    await this.logAuditAction('ai_chapters', id, 'created', null, chapters, 'system');

    return id;
  }

  async getAIChapters(audioUploadId?: string, status?: AIGeneratedChapters['status']): Promise<AIGeneratedChapters[]> {
    let query = 'SELECT * FROM ai_generated_chapters WHERE 1=1';
    const params: any[] = [];

    if (audioUploadId) {
      query += ' AND audio_upload_id = ?';
      params.push(audioUploadId);
    }

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    query += ' ORDER BY generated_at DESC';

    const results = await this.db.execute(query, params);
    return (results.rows || results).map((row: any) => ({
      ...row,
      chapter_data: JSON.parse(row.chapter_data)
    }));
  }

  async updateAIChapterStatus(
    id: string, 
    status: AIGeneratedChapters['status'], 
    reviewedBy: string, 
    reviewNotes?: string
  ): Promise<void> {
    const oldChapters = await this.getAIChapter(id);
    
    const query = `
      UPDATE ai_generated_chapters 
      SET status = ?, reviewed_by = ?, reviewed_at = CURRENT_TIMESTAMP, review_notes = ? 
      WHERE id = ?
    `;
    await this.db.execute(query, [status, reviewedBy, reviewNotes || null, id]);

    // Log the action
    await this.logAuditAction('ai_chapters', id, 'status_updated', oldChapters, 
      { status, reviewed_by: reviewedBy, review_notes: reviewNotes }, reviewedBy);
  }

  async getAIChapter(id: string): Promise<AIGeneratedChapters | null> {
    const query = 'SELECT * FROM ai_generated_chapters WHERE id = ?';
    const results = await this.db.execute(query, [id]);
    const chapters = results.rows || results;
    
    if (chapters.length === 0) return null;
    
    const chapter = chapters[0];
    return {
      ...chapter,
      chapter_data: JSON.parse(chapter.chapter_data)
    };
  }

  // Manual chapter edits
  async createManualEdit(edit: Omit<ManualChapterEdit, 'id' | 'edited_at'>): Promise<string> {
    const id = uuidv4();
    const query = `
      INSERT INTO manual_chapter_edits (
        id, ai_chapter_id, original_chapter_data, edited_chapter_data,
        edited_by, edit_notes
      ) VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    await this.db.execute(query, [
      id, edit.ai_chapter_id, JSON.stringify(edit.original_chapter_data),
      JSON.stringify(edit.edited_chapter_data), edit.edited_by, edit.edit_notes
    ]);

    // Log the action
    await this.logAuditAction('manual_edit', id, 'created', null, edit, edit.edited_by);

    return id;
  }

  // Live configuration operations
  async deployLiveConfig(config: Omit<LiveAudioConfig, 'id' | 'deployed_at' | 'is_active' | 'version'>): Promise<string> {
    const id = uuidv4();
    
    // First, deactivate any existing active config for this course/language
    await this.db.execute(
      'UPDATE live_audio_configs SET is_active = FALSE WHERE course_id = ? AND language_code = ? AND is_active = TRUE',
      [config.course_id, config.language_code]
    );

    // Get the next version number
    const versionResult = await this.db.execute(
      'SELECT MAX(version) as max_version FROM live_audio_configs WHERE course_id = ? AND language_code = ?',
      [config.course_id, config.language_code]
    );
    const version = (versionResult.rows?.[0]?.max_version || versionResult[0]?.max_version || 0) + 1;

    // Insert new active config
    const query = `
      INSERT INTO live_audio_configs (
        id, course_id, language_code, config_data, source_type,
        source_id, deployed_by, is_active, version
      ) VALUES (?, ?, ?, ?, ?, ?, ?, TRUE, ?)
    `;
    
    await this.db.execute(query, [
      id, config.course_id, config.language_code, JSON.stringify(config.config_data),
      config.source_type, config.source_id, config.deployed_by, version
    ]);

    // Log the action
    await this.logAuditAction('live_config', id, 'deployed', null, config, config.deployed_by);

    return id;
  }

  async getLiveConfig(courseId: string, languageCode: string): Promise<LiveAudioConfig | null> {
    const query = `
      SELECT * FROM live_audio_configs 
      WHERE course_id = ? AND language_code = ? AND is_active = TRUE
    `;
    const results = await this.db.execute(query, [courseId, languageCode]);
    const configs = results.rows || results;
    
    if (configs.length === 0) return null;
    
    const config = configs[0];
    return {
      ...config,
      config_data: JSON.parse(config.config_data)
    };
  }

  async getLiveConfigs(courseId?: string): Promise<LiveAudioConfig[]> {
    let query = 'SELECT * FROM live_audio_configs WHERE is_active = TRUE';
    const params: any[] = [];

    if (courseId) {
      query += ' AND course_id = ?';
      params.push(courseId);
    }

    query += ' ORDER BY language_code';

    const results = await this.db.execute(query, params);
    return (results.rows || results).map((row: any) => ({
      ...row,
      config_data: JSON.parse(row.config_data)
    }));
  }

  // Audit logging
  private async logAuditAction(
    entityType: string,
    entityId: string,
    action: string,
    oldData: any,
    newData: any,
    performedBy: string,
    notes?: string
  ): Promise<void> {
    const query = `
      INSERT INTO audio_management_audit_log (
        id, entity_type, entity_id, action, old_data, new_data, performed_by, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    await this.db.execute(query, [
      uuidv4(), entityType, entityId, action,
      oldData ? JSON.stringify(oldData) : null,
      newData ? JSON.stringify(newData) : null,
      performedBy, notes
    ]);
  }

  // Get comprehensive audit trail
  async getAuditTrail(entityType?: string, entityId?: string): Promise<AudioManagementAuditLog[]> {
    let query = 'SELECT * FROM audio_management_audit_log WHERE 1=1';
    const params: any[] = [];

    if (entityType) {
      query += ' AND entity_type = ?';
      params.push(entityType);
    }

    if (entityId) {
      query += ' AND entity_id = ?';
      params.push(entityId);
    }

    query += ' ORDER BY performed_at DESC LIMIT 100';

    const results = await this.db.execute(query, params);
    return (results.rows || results).map((row: any) => ({
      ...row,
      old_data: row.old_data ? JSON.parse(row.old_data) : null,
      new_data: row.new_data ? JSON.parse(row.new_data) : null
    }));
  }
}
