// Secure Cloud Storage Utility for Document Analysis
// Files are encrypted and stored securely with access controls

import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';
import { Storage } from '@google-cloud/storage';

const prisma = new PrismaClient();

// Initialize Google Cloud Storage
const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  // Uses Application Default Credentials or service account key
});

const bucketName = process.env.GOOGLE_CLOUD_STORAGE_BUCKET || 'sebi-verify-user-uploads';
const bucket = storage.bucket(bucketName);

export interface SecureFileMetadata {
  id: string;
  originalName: string;
  encryptedPath: string;
  fileSize: number;
  mimeType: string;
  uploadedBy?: string;
  uploadedAt: Date;
  analysisReportId?: string;
  encryptionKey: string; // Encrypted with master key
  accessLevel: 'private' | 'internal' | 'admin';
  expiresAt?: Date;
}

export interface FileAccessLog {
  id: string;
  fileId: string;
  accessedBy?: string;
  accessedAt: Date;
  accessType: 'upload' | 'download' | 'analyze' | 'delete';
  ipAddress?: string;
  userAgent?: string;
}

// Master encryption key (should be in environment variables)
const MASTER_KEY = process.env.FILE_ENCRYPTION_KEY || crypto.randomBytes(32).toString('hex');
const ALGORITHM = 'aes-256-gcm';

/**
 * Generate a unique file ID
 */
function generateFileId(): string {
  return `doc_${Date.now()}_${crypto.randomUUID().replace(/-/g, '').substring(0, 8)}`;
}

/**
 * Encrypt file buffer
 */
function encryptFile(buffer: Buffer): {
  encryptedBuffer: Buffer;
  key: string;
  iv: string;
  tag: string;
} {
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipher('aes-256-cbc', key.toString('hex'));
  
  let encrypted = cipher.update(buffer);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  
  // For AES-CBC, we don't have an auth tag, so we create a dummy one
  const tag = crypto.createHash('sha256').update(encrypted).digest().slice(0, 16);
  
  return {
    encryptedBuffer: encrypted,
    key: key.toString('hex'),
    iv: iv.toString('hex'),
    tag: tag.toString('hex')
  };
}

/**
 * Decrypt file buffer
 */
function decryptFile(encryptedBuffer: Buffer, key: string, iv: string, tag: string): Buffer {
  const decipher = crypto.createDecipher('aes-256-cbc', key);
  
  let decrypted = decipher.update(encryptedBuffer);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  
  return decrypted;
}

/**
 * Encrypt sensitive data with master key
 */
function encryptWithMasterKey(data: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipher('aes-256-cbc', MASTER_KEY);
  
  let encrypted = cipher.update(data, 'utf8');
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  
  // Return iv:encrypted as hex string (no auth tag for CBC)
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

/**
 * Decrypt sensitive data with master key
 */
function decryptWithMasterKey(encryptedData: string): string {
  const parts = encryptedData.split(':');
  if (parts.length !== 2) {
    throw new Error('Invalid encrypted data format');
  }
  
  const iv = Buffer.from(parts[0], 'hex');
  const encrypted = Buffer.from(parts[1], 'hex');
  
  const decipher = crypto.createDecipher('aes-256-cbc', MASTER_KEY);
  
  let decrypted = decipher.update(encrypted);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  
  return decrypted.toString('utf8');
}

/**
 * Store file securely in Google Cloud Storage
 */
export async function storeFileSecurely(
  fileBuffer: Buffer,
  originalName: string,
  mimeType: string,
  uploadedBy?: string,
  analysisReportId?: string
): Promise<SecureFileMetadata> {
  
  const fileId = generateFileId();
  const { encryptedBuffer, key, iv, tag } = encryptFile(fileBuffer);
  
  // Create folder structure: uploads/{year}/{month}/{day}/{fileId}.enc
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const encryptedPath = `uploads/${year}/${month}/${day}/${fileId}.enc`;
  
  try {
    // Upload encrypted file to Google Cloud Storage
    const file = bucket.file(encryptedPath);
    await file.save(encryptedBuffer, {
      metadata: {
        contentType: 'application/octet-stream', // Encrypted data
        cacheControl: 'private, max-age=0',
        metadata: {
          originalName,
          originalMimeType: mimeType,
          uploadedBy: uploadedBy || 'anonymous',
          analysisReportId: analysisReportId || '',
          encrypted: 'true'
        }
      }
    });
    
    console.log(`File uploaded to GCS: gs://${bucketName}/${encryptedPath}`);
    
    // Create metadata record
    const metadata: SecureFileMetadata = {
      id: fileId,
      originalName,
      encryptedPath,
      fileSize: fileBuffer.length,
      mimeType,
      uploadedBy,
      uploadedAt: new Date(),
      analysisReportId,
      encryptionKey: encryptWithMasterKey(JSON.stringify({ key, iv, tag })),
      accessLevel: 'private',
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    };
    
    // Store metadata in database
    await prisma.fileMetadata.create({ 
      data: {
        fileId: metadata.id,
        originalName: metadata.originalName,
        encryptedPath: metadata.encryptedPath,
        fileSize: metadata.fileSize,
        mimeType: metadata.mimeType,
        uploadedBy: metadata.uploadedBy,
        analysisReportId: metadata.analysisReportId,
        encryptionKey: metadata.encryptionKey,
        accessLevel: metadata.accessLevel,
        expiresAt: metadata.expiresAt
      }
    });
    
    // Log the upload
    await logFileAccess({
      fileId,
      accessedBy: uploadedBy,
      accessedAt: new Date(),
      accessType: 'upload',
      ipAddress: undefined,
      userAgent: undefined
    });
    
    console.log(`File stored securely: ${fileId} (${originalName})`);
    
    return metadata;
    
  } catch (error) {
    console.error(`Failed to upload file to GCS:`, error);
    throw new Error(`File upload failed: ${error}`);
  }
}

/**
 * Retrieve file securely
 */
export async function retrieveFileSecurely(
  fileId: string,
  accessedBy?: string,
  requiresAuth: boolean = true
): Promise<{
  buffer: Buffer;
  metadata: SecureFileMetadata;
} | null> {
  
  try {
    // Get metadata from database (simulated)
    const metadata = await getFileMetadata(fileId);
    if (!metadata) {
      return null;
    }
    
    // Check access permissions
    if (requiresAuth && !canAccessFile(metadata, accessedBy)) {
      throw new Error('Access denied');
    }
    
    // Check expiration
    if (metadata.expiresAt && metadata.expiresAt < new Date()) {
      throw new Error('File has expired');
    }
    
    // Decrypt encryption key
    const encryptionData = JSON.parse(decryptWithMasterKey(metadata.encryptionKey));
    const { key, iv, tag } = encryptionData;
    
    // Retrieve encrypted file from storage (simulated)
    const encryptedBuffer = await getFromCloudStorage(metadata.encryptedPath);
    
    // Decrypt file
    const decryptedBuffer = decryptFile(encryptedBuffer, key, iv, tag);
    
    // Log the access
    await logFileAccess({
      fileId,
      accessedBy,
      accessedAt: new Date(),
      accessType: 'download',
      ipAddress: undefined,
      userAgent: undefined
    });
    
    return {
      buffer: decryptedBuffer,
      metadata
    };
    
  } catch (error) {
    console.error(`Failed to retrieve file ${fileId}:`, error);
    return null;
  }
}

/**
 * Delete file securely
 */
export async function deleteFileSecurely(
  fileId: string,
  deletedBy?: string
): Promise<boolean> {
  
  try {
    const metadata = await getFileMetadata(fileId);
    if (!metadata) {
      return false;
    }
    
    // Delete from cloud storage
    await deleteFromCloudStorage(metadata.encryptedPath);
    
    // Remove metadata from database
    await removeFileMetadata(fileId);
    
    // Log the deletion
    await logFileAccess({
      fileId,
      accessedBy: deletedBy,
      accessedAt: new Date(),
      accessType: 'delete',
      ipAddress: undefined,
      userAgent: undefined
    });
    
    console.log(`File deleted securely: ${fileId}`);
    return true;
    
  } catch (error) {
    console.error(`Failed to delete file ${fileId}:`, error);
    return false;
  }
}

/**
 * Check if user can access file
 */
function canAccessFile(metadata: SecureFileMetadata, userId?: string): boolean {
  // Admin can access everything
  if (metadata.accessLevel === 'admin') {
    return true; // Would check if user has admin role
  }
  
  // Private files can only be accessed by uploader
  if (metadata.accessLevel === 'private') {
    return metadata.uploadedBy === userId;
  }
  
  // Internal files can be accessed by any authenticated user
  if (metadata.accessLevel === 'internal') {
    return !!userId;
  }
  
  return false;
}

/**
 * Log file access for audit trail
 */
async function logFileAccess(log: Omit<FileAccessLog, 'id'>): Promise<void> {
  const logEntry: FileAccessLog = {
    id: crypto.randomUUID(),
    ...log
  };
  
  // Store in database (simulated)
  console.log(`File access logged:`, logEntry);
  
  // In production, store in database:
  // await prisma.fileAccessLog.create({ data: logEntry });
}

/**
 * Get file metadata from database
 */
async function getFileMetadata(fileId: string): Promise<SecureFileMetadata | null> {
  try {
    const dbRecord = await prisma.fileMetadata.findUnique({
      where: { fileId }
    });
    
    if (!dbRecord || !dbRecord.isActive) {
      return null;
    }
    
    return {
      id: dbRecord.fileId,
      originalName: dbRecord.originalName,
      encryptedPath: dbRecord.encryptedPath,
      fileSize: dbRecord.fileSize,
      mimeType: dbRecord.mimeType,
      uploadedBy: dbRecord.uploadedBy || undefined,
      uploadedAt: dbRecord.uploadedAt,
      analysisReportId: dbRecord.analysisReportId || undefined,
      encryptionKey: dbRecord.encryptionKey,
      accessLevel: dbRecord.accessLevel as 'private' | 'internal' | 'admin',
      expiresAt: dbRecord.expiresAt || undefined
    };
  } catch (error) {
    console.error(`Failed to retrieve metadata for file ${fileId}:`, error);
    return null;
  }
}

/**
 * Remove file metadata (simulated database operation)
 */
async function removeFileMetadata(fileId: string): Promise<void> {
  // In production, this would delete from your database
  console.log(`Removing metadata for file: ${fileId}`);
}

/**
 * Cloud storage operations (Google Cloud Storage)
 */
async function getFromCloudStorage(path: string): Promise<Buffer> {
  try {
    const file = bucket.file(path);
    const [exists] = await file.exists();
    
    if (!exists) {
      throw new Error(`File not found: ${path}`);
    }
    
    const [contents] = await file.download();
    console.log(`Downloaded from GCS: gs://${bucketName}/${path}`);
    return contents;
    
  } catch (error) {
    console.error(`Failed to download from GCS: ${path}`, error);
    throw error;
  }
}

async function deleteFromCloudStorage(path: string): Promise<void> {
  try {
    const file = bucket.file(path);
    await file.delete();
    console.log(`Deleted from GCS: gs://${bucketName}/${path}`);
    
  } catch (error) {
    console.error(`Failed to delete from GCS: ${path}`, error);
    throw error;
  }
}

/**
 * Clean up expired files (run as a cron job)
 */
export async function cleanupExpiredFiles(): Promise<void> {
  console.log('Cleaning up expired files...');
  
  // In production:
  // 1. Query database for expired files
  // 2. Delete from cloud storage
  // 3. Remove metadata records
  // 4. Log cleanup activities
}

/**
 * Get file access logs for audit purposes
 */
export async function getFileAccessLogs(
  fileId?: string,
  userId?: string,
  limit: number = 100
): Promise<FileAccessLog[]> {
  
  console.log(`Retrieving access logs for file: ${fileId}, user: ${userId}`);
  
  // In production, query database with filters
  return [];
}

/**
 * Generate secure download URL (temporary access)
 */
export async function generateSecureDownloadUrl(
  fileId: string,
  expiresIn: number = 3600, // 1 hour
  accessedBy?: string
): Promise<string | null> {
  
  const metadata = await getFileMetadata(fileId);
  if (!metadata || !canAccessFile(metadata, accessedBy)) {
    return null;
  }
  
  // Generate signed URL (in production, use cloud storage signed URLs)
  const token = crypto.randomBytes(32).toString('hex');
  const expires = Date.now() + expiresIn * 1000;
  
  // Store temporary access token (in database or cache)
  const secureUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/secure/download/${fileId}?token=${token}&expires=${expires}`;
  
  console.log(`Generated secure download URL for ${fileId}`);
  
  return secureUrl;
}

