# Secure Cloud Storage Implementation

## Overview

This document describes the secure file storage system implemented for the SEBI Verify Document Analyzer. The system ensures that uploaded documents are encrypted, access-controlled, and stored securely with comprehensive audit logging.

## Architecture

### Components

1. **Secure Storage Utility** (`src/lib/secureStorage.ts`)
   - File encryption/decryption using AES-256-GCM
   - Access control and permissions
   - Audit logging
   - Metadata management

2. **Document Analyzer API** (`src/app/api/agents/document-analyzer/route.ts`)
   - Integrated with secure storage for high-risk documents
   - Automatic secure storage for critical/high-risk files

3. **Secure Download API** (`src/app/api/secure/download/[fileId]/route.ts`)
   - Controlled file access with authentication
   - Temporary download links
   - Access logging

## Security Features

### Encryption
- **File-level encryption**: Each file is encrypted with a unique AES-256-GCM key
- **Master key encryption**: File encryption keys are encrypted with a master key
- **Key rotation**: Support for key rotation (implement in production)

### Access Control
- **User-based permissions**: Files can only be accessed by authorized users
- **Access levels**: Private, Internal, Admin
- **Time-based expiration**: Files automatically expire after a set period
- **Token-based temporary access**: Secure temporary download links

### Audit Trail
- **Comprehensive logging**: All file operations are logged
- **User tracking**: Track who accessed what and when
- **IP and user agent logging**: Full request context
- **Access analytics**: Monitor usage patterns

## Configuration

### Environment Variables

Copy `.env.secure.example` to `.env.local` and configure:

```bash
# Required: Master encryption key (generate random 64-char hex)
FILE_ENCRYPTION_KEY=your-secure-encryption-key

# Optional: Cloud storage provider
SECURE_STORAGE_PROVIDER=local # or aws-s3, google-cloud, azure-blob

# Security settings
REQUIRE_AUTH_FOR_DOWNLOAD=true
MAX_FILE_RETENTION_DAYS=90
```

### Generate Encryption Key

```javascript
// Run this once to generate a secure key
const crypto = require('crypto');
console.log(crypto.randomBytes(32).toString('hex'));
```

## Usage

### Storing Files Securely

```typescript
import { storeFileSecurely } from '@/lib/secureStorage';

const metadata = await storeFileSecurely(
  fileBuffer,           // File content as Buffer
  'document.pdf',       // Original filename
  'application/pdf',    // MIME type
  userId,              // User ID (optional)
  analysisReportId     // Associated report ID (optional)
);

console.log('File stored with ID:', metadata.id);
```

### Retrieving Files

```typescript
import { retrieveFileSecurely } from '@/lib/secureStorage';

const result = await retrieveFileSecurely(
  fileId,              // File ID
  userId,              // Requesting user ID
  true                 // Require authentication
);

if (result) {
  const { buffer, metadata } = result;
  // Use the file buffer
}
```

### Generating Secure Download Links

```typescript
import { generateSecureDownloadUrl } from '@/lib/secureStorage';

const downloadUrl = await generateSecureDownloadUrl(
  fileId,              // File ID
  3600,               // Expires in 1 hour
  userId              // User ID
);

// Share the downloadUrl (valid for 1 hour)
```

## API Endpoints

### Document Upload & Analysis
```
POST /api/agents/document-analyzer
Content-Type: multipart/form-data

Body:
- document: File (PDF, image, or text)
```

Response includes analysis results. High-risk documents are automatically stored securely.

### Secure File Download
```
GET /api/secure/download/[fileId]
```

Query parameters:
- `token`: Temporary access token (optional)
- `expires`: Token expiration timestamp (optional)
- `download=true`: Force download vs inline display

### Generate Temporary Download Link
```
POST /api/secure/download/[fileId]
Content-Type: application/json

Body:
{
  "expiresIn": 3600  // Optional: seconds until expiry
}
```

### Access Logs (Admin)
```
PATCH /api/secure/download/[fileId]
Content-Type: application/json

Body:
{
  "limit": 100  // Optional: max number of logs
}
```

## Integration with Document Analyzer

The Document Analyzer automatically stores files securely when:
- Risk level is "high" or "critical"
- Document contains suspicious patterns
- Regulatory compliance requires retention

Integration code in the analyzer:

```typescript
// Store file securely for high-risk documents
if (riskLevel === 'high' || riskLevel === 'critical') {
  const secureFileMetadata = await storeFileSecurely(
    fileBuffer,
    file.name,
    mimeType,
    userId || 'anonymous',
    reportId
  );
}
```

## Production Considerations

### Cloud Storage Integration

For production, integrate with a cloud storage provider:

#### AWS S3 Example
```typescript
// Replace the local storage functions with S3 calls
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

async function uploadToCloudStorage(path: string, buffer: Buffer) {
  return s3.upload({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: path,
    Body: buffer,
    ServerSideEncryption: 'AES256',
    StorageClass: 'STANDARD_IA' // Infrequent access
  }).promise();
}
```

### Database Schema

Add these tables to your database:

```sql
-- File metadata
CREATE TABLE secure_files (
  id VARCHAR(255) PRIMARY KEY,
  original_name VARCHAR(500) NOT NULL,
  encrypted_path VARCHAR(1000) NOT NULL,
  file_size INTEGER NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  uploaded_by VARCHAR(255),
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  analysis_report_id VARCHAR(255),
  encryption_key TEXT NOT NULL, -- Encrypted with master key
  access_level VARCHAR(20) DEFAULT 'private',
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Access logs
CREATE TABLE file_access_logs (
  id VARCHAR(255) PRIMARY KEY,
  file_id VARCHAR(255) NOT NULL,
  accessed_by VARCHAR(255),
  accessed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  access_type VARCHAR(20) NOT NULL, -- 'upload', 'download', 'analyze', 'delete'
  ip_address VARCHAR(45),
  user_agent TEXT,
  success BOOLEAN DEFAULT true,
  error_message TEXT
);

-- Indexes
CREATE INDEX idx_secure_files_uploaded_by ON secure_files(uploaded_by);
CREATE INDEX idx_secure_files_expires_at ON secure_files(expires_at);
CREATE INDEX idx_file_access_logs_file_id ON file_access_logs(file_id);
CREATE INDEX idx_file_access_logs_accessed_at ON file_access_logs(accessed_at);
```

### Security Best Practices

1. **Key Management**
   - Use AWS KMS, Azure Key Vault, or Google Cloud KMS for key management
   - Implement key rotation policies
   - Never log encryption keys

2. **Access Control**
   - Implement role-based access control (RBAC)
   - Use OAuth 2.0 or similar for authentication
   - Audit access patterns regularly

3. **Monitoring**
   - Set up alerts for suspicious access patterns
   - Monitor failed access attempts
   - Log all administrative actions

4. **Compliance**
   - Implement data retention policies
   - Ensure GDPR/privacy compliance
   - Regular security audits

### Performance Optimization

1. **Caching**
   - Use Redis for temporary tokens
   - Cache file metadata for quick access checks

2. **CDN Integration**
   - Use CloudFront, CloudFlare, or similar for secure downloads
   - Implement signed URLs for temporary access

3. **Async Processing**
   - Use job queues for file operations
   - Background processing for large files

## Maintenance

### Regular Tasks

1. **Cleanup Expired Files**
   ```typescript
   import { cleanupExpiredFiles } from '@/lib/secureStorage';
   
   // Run daily via cron job
   await cleanupExpiredFiles();
   ```

2. **Audit Access Logs**
   ```typescript
   import { getFileAccessLogs } from '@/lib/secureStorage';
   
   // Generate monthly access reports
   const logs = await getFileAccessLogs(undefined, undefined, 1000);
   ```

3. **Monitor Storage Usage**
   - Track storage costs
   - Analyze usage patterns
   - Optimize retention policies

### Troubleshooting

Common issues and solutions:

1. **File Not Found Errors**
   - Check file expiration dates
   - Verify access permissions
   - Check cloud storage connectivity

2. **Decryption Failures**
   - Verify master key configuration
   - Check encryption key integrity
   - Ensure proper key rotation

3. **Access Denied**
   - Verify user authentication
   - Check access level permissions
   - Review audit logs for patterns

## Support

For technical support or questions about the secure storage implementation:

1. Check the error logs in your application
2. Review the audit trail in `file_access_logs`
3. Verify configuration in `.env.local`
4. Test with a minimal example

This implementation provides enterprise-grade security for document storage while maintaining ease of use and comprehensive audit capabilities.
