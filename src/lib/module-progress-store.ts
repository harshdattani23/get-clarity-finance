// Module Progress Store - Uses localStorage for persistence
// This provides a client-side persistent storage solution for module progress

interface ModuleProgress {
  moduleId: string;
  progress: number;
  completed: boolean;
  completedAt?: string;
  xpEarned?: number;
}

interface UserProgress {
  userId: string;
  modules: Record<string, ModuleProgress>;
  lastUpdated: string;
}

class ModuleProgressStore {
  private readonly STORAGE_KEY = 'fraud-awareness-progress';

  // Get progress for a specific user
  getUserProgress(userId: string): UserProgress | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return null;
      
      const allProgress: Record<string, UserProgress> = JSON.parse(stored);
      return allProgress[userId] || null;
    } catch (error) {
      console.error('Error reading progress from localStorage:', error);
      return null;
    }
  }

  // Save progress for a specific user
  saveUserProgress(userId: string, progress: UserProgress): void {
    if (typeof window === 'undefined') return;
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      const allProgress: Record<string, UserProgress> = stored ? JSON.parse(stored) : {};
      
      allProgress[userId] = {
        ...progress,
        lastUpdated: new Date().toISOString()
      };
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allProgress));
    } catch (error) {
      console.error('Error saving progress to localStorage:', error);
    }
  }

  // Mark a module as completed
  markModuleComplete(userId: string, moduleId: string, xpEarned: number = 0): void {
    const progress = this.getUserProgress(userId) || {
      userId,
      modules: {},
      lastUpdated: new Date().toISOString()
    };

    progress.modules[moduleId] = {
      moduleId,
      progress: 100,
      completed: true,
      completedAt: new Date().toISOString(),
      xpEarned
    };

    this.saveUserProgress(userId, progress);
  }

  // Update module progress
  updateModuleProgress(userId: string, moduleId: string, progressPercent: number): void {
    const progress = this.getUserProgress(userId) || {
      userId,
      modules: {},
      lastUpdated: new Date().toISOString()
    };

    progress.modules[moduleId] = {
      ...progress.modules[moduleId],
      moduleId,
      progress: progressPercent,
      completed: progressPercent >= 100,
      completedAt: progressPercent >= 100 ? new Date().toISOString() : undefined
    };

    this.saveUserProgress(userId, progress);
  }

  // Get unlocked modules based on completion
  getUnlockedModules(userId: string): Record<string, boolean> {
    const progress = this.getUserProgress(userId);
    const modules = progress?.modules || {};

    const unlocked: Record<string, boolean> = {
      'intro-to-frauds': true, // Always unlocked
      'intermediate-frauds': false,
      'ponzi-schemes': false,
      'pump-dump': false,
      'digital-frauds': false,
      'fake-advisors': false,
      'insider-trading': false,
      'spoofing-wash-trading': false
    };

    // Check if intro module is completed
    if (modules['intro-to-frauds']?.completed) {
      // Unlock all intermediate modules
      unlocked['intermediate-frauds'] = true;
      unlocked['ponzi-schemes'] = true;
      unlocked['pump-dump'] = true;
      unlocked['digital-frauds'] = true;
      unlocked['fake-advisors'] = true;
    }

    // Check if all intermediate modules are completed
    const intermediateModules = ['intermediate-frauds', 'ponzi-schemes', 'pump-dump', 'digital-frauds', 'fake-advisors'];
    const allIntermediateCompleted = intermediateModules.every(
      id => modules[id]?.completed === true
    );

    if (allIntermediateCompleted) {
      // Unlock advanced modules
      unlocked['insider-trading'] = true;
      unlocked['spoofing-wash-trading'] = true;
    }

    return unlocked;
  }

  // Clear all progress (for debugging/reset)
  clearAllProgress(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.STORAGE_KEY);
  }

  // Clear progress for a specific user
  clearUserProgress(userId: string): void {
    if (typeof window === 'undefined') return;
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return;
      
      const allProgress: Record<string, UserProgress> = JSON.parse(stored);
      delete allProgress[userId];
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allProgress));
    } catch (error) {
      console.error('Error clearing user progress:', error);
    }
  }
}

// Export a singleton instance
export const moduleProgressStore = new ModuleProgressStore();
