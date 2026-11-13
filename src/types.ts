export type ModuleId = 'home' | 'lab' | 'lessons' | 'calculator' | 'practice';

export interface StudentProfile {
  fullName: string;
  gradeClass: string;
  schoolName: string;
  loggedInAt: string;
}

export interface CirclePart {
  id: 'center' | 'radius' | 'diameter' | 'chord' | 'arc' | 'sector' | 'segment';
  name: string;
  symbol?: string;
  shortDesc: string;
  dailyAnalogy: string;
  tip: string;
}

export interface LessonStep {
  id: string;
  title: string;
  explanation: string;
  visualFocus: 'd-vs-r' | 'pi-choice' | 'perimeter-vs-area' | 'story-clue';
  keyTakeaway: string;
  quickExample: {
    prompt: string;
    steps: string[];
    result: string;
  };
}

export interface LessonChapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  targetIssue: string;
  steps: LessonStep[];
}

export interface StorySegment {
  text: string;
  role: 'normal' | 'known' | 'context' | 'asked';
}

export interface QuestionOption {
  id: string;
  label: string;
  isCorrect: boolean;
  diagnosticFeedback: string;
  misconceptionTag?: string;
}

export interface PracticeQuestion {
  id: string;
  level: 1 | 2 | 3;
  levelLabel: string;
  topicTag: string;
  questionText: string;
  storySegments?: StorySegment[];
  clueHint?: string;
  options: QuestionOption[];
  solutionSteps: string[];
}

export interface ProgressState {
  completedLessons: string[];
  answeredQuestions: Record<
    string,
    {
      selectedOptionId: string;
      isCorrect: boolean;
      attempts: number;
    }
  >;
  exploredLabModes: string[];
}
