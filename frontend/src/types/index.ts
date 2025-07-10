export interface Task {
  id?: number;
  task_name: string;
  importance: 1 | 2 | 3; // 1: Most important, 2: Secondary, 3: Additional
  estimate: 1 | 2 | 3 | 4 | 5; // Pomodoros
  created_at?: string;
  updated_at?: string;
}

export interface WorkingDay {
  id?: number;
  date: string;
  notes?: string;
  mood: 1 | 2 | 3 | 4 | 5;
  productivity_rating: 1 | 2 | 3 | 4 | 5;
  tasks: Task[];
  created_at?: string;
  updated_at?: string;
}

export interface DailyReflection {
  gratitude?: string;
  intention?: string;
  highlight?: string;
  learned?: string;
  remember?: string;
}

export const MOOD_LABELS = {
  1: 'Very Bad',
  2: 'Bad',
  3: 'Neutral',
  4: 'Good',
  5: 'Very Good',
} as const;

export const PRODUCTIVITY_LABELS = {
  1: 'Very Low',
  2: 'Low',
  3: 'Average',
  4: 'High',
  5: 'Very High',
} as const;

export const IMPORTANCE_LABELS = {
  1: 'Most important task of the day',
  2: 'Secondary tasks of importance',
  3: 'Additional tasks',
} as const;