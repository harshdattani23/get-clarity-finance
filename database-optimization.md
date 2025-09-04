# Database Optimization Recommendations

## Suggested Database Indexes

To optimize the performance of the investment security course API endpoints, consider adding the following database indexes:

### 1. Course Table Indexes

```sql
-- Index for finding courses by slug (used frequently)
CREATE INDEX idx_course_slug ON Course(slug);

-- Composite index for published courses by category
CREATE INDEX idx_course_category_published ON Course(category, isPublished);
```

### 2. CourseEnrollment Table Indexes

```sql
-- Composite index for user-course lookups (most important for performance)
CREATE INDEX idx_enrollment_user_course ON CourseEnrollment(userClerkId, courseId);

-- Index for finding enrollments by user
CREATE INDEX idx_enrollment_user ON CourseEnrollment(userClerkId);

-- Index for enrollment status queries
CREATE INDEX idx_enrollment_status ON CourseEnrollment(status);
```

### 3. CourseModule Table Indexes

```sql
-- Composite index for course modules ordered by sequence
CREATE INDEX idx_module_course_order ON CourseModule(courseId, "order");

-- Index for module slugs within courses
CREATE INDEX idx_module_course_slug ON CourseModule(courseId, slug);
```

### 4. ModuleProgress Table Indexes

```sql
-- Composite index for user module progress lookups
CREATE INDEX idx_module_progress_user_module ON ModuleProgress(userClerkId, moduleId);

-- Index for progress status queries
CREATE INDEX idx_module_progress_status ON ModuleProgress(status);
```

### 5. LessonProgress Table Indexes

```sql
-- Composite index for user lesson progress
CREATE INDEX idx_lesson_progress_user_lesson ON LessonProgress(userClerkId, lessonId);

-- Index for completed lessons
CREATE INDEX idx_lesson_progress_completed ON LessonProgress(status) WHERE status = 'COMPLETED';
```

### 6. CourseProgress Table (Legacy) Indexes

```sql
-- Composite index for legacy progress lookups
CREATE INDEX idx_course_progress_user_course_lesson ON CourseProgress(userClerkId, courseId, lessonId);

-- Index for completed legacy progress
CREATE INDEX idx_course_progress_completed ON CourseProgress(status) WHERE status = 'COMPLETED';
```

## Additional Performance Optimizations

### 1. Query Optimization
- ✅ **Implemented**: Single database queries instead of multiple sequential queries
- ✅ **Implemented**: Using `findFirst` with `in` operator instead of loops
- ✅ **Implemented**: Including related data in single queries to avoid N+1 problems

### 2. Caching Strategy
- Consider implementing Redis or similar caching for:
  - Course metadata (rarely changes)
  - User enrollment status
  - Module unlock status

### 3. Database Connection Pooling
- Ensure Prisma connection pooling is properly configured
- Monitor connection usage during peak loads

### 4. API Response Caching
- Implement HTTP caching headers for static course content
- Use conditional requests (ETag/Last-Modified) for course data

## Expected Performance Improvements

With these optimizations implemented, you should see:

- **Stats endpoint**: ~2-3x faster (from 8-10s to 3-4s)
- **Setup endpoint**: ~2-3x faster due to bulk operations
- **Modules endpoint**: ~3-4x faster due to single query and removed nested API calls
- **Overall page load**: Should reduce from 8-10 seconds to 2-3 seconds

## Monitoring

After implementing these changes, monitor:
- Database query execution times
- API endpoint response times
- Overall page load performance
- Database connection pool usage

## Implementation Priority

1. **High Priority**: CourseEnrollment indexes (biggest performance impact)
2. **High Priority**: Course slug index (frequently queried)
3. **Medium Priority**: Progress tracking indexes
4. **Low Priority**: Legacy CourseProgress indexes (only if still heavily used)
