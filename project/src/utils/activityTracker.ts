import { ActivityData, SessionData } from '../types/tracking';
import { calculateActivityScore } from './activityScoreCalculator';

class ActivityTracker {
  private activities: ActivityData[] = [];
  private sessionStart: number;
  private mouseClicks: number = 0;
  private keystrokes: number = 0;
  private lastActivity: number;
  private mouseEvents: number = 0;
  private keyboardEvents: number = 0;
  private idleTime: number = 0;
  private activityScore: number = 0;

  constructor() {
    this.sessionStart = Date.now();
    this.lastActivity = this.sessionStart;
    this.initializeTracking();
    this.loadPreviousSession();
    this.startActivityTracking();
  }

  private initializeTracking(): void {
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    document.addEventListener('click', this.handleClick.bind(this));
    document.addEventListener('keypress', this.handleKeypress.bind(this));
    window.addEventListener('beforeunload', this.saveSession.bind(this));
  }

  private startActivityTracking(): void {
    setInterval(() => {
      this.idleTime++;
      this.activityScore = calculateActivityScore(
        this.mouseEvents,
        this.keyboardEvents,
        this.idleTime
      );
      
      // Reset counters for the next interval
      this.mouseEvents = 0;
      this.keyboardEvents = 0;
    }, 1000);
  }

  private handleMouseMove(event: MouseEvent): void {
    this.mouseEvents++;
    this.activities.push({
      timestamp: Date.now(),
      type: 'mouse',
      details: { x: event.clientX, y: event.clientY }
    });
    this.updateLastActivity();
  }

  private handleClick(): void {
    this.mouseClicks++;
    this.mouseEvents++;
    this.updateLastActivity();
  }

  private handleKeypress(): void {
    this.keystrokes++;
    this.keyboardEvents++;
    this.updateLastActivity();
  }

  private updateLastActivity(): void {
    this.lastActivity = Date.now();
    this.idleTime = 0;
  }

  private loadPreviousSession(): void {
    const savedSessions = localStorage.getItem('previousSessions');
    if (!savedSessions) {
      localStorage.setItem('previousSessions', JSON.stringify([]));
    }
  }

  private saveSession(): void {
    const currentSession = this.getSessionData();
    const savedSessions = JSON.parse(localStorage.getItem('previousSessions') || '[]');
    savedSessions.push(currentSession);
    localStorage.setItem('previousSessions', JSON.stringify(savedSessions));
  }

  public getSessionData(): SessionData {
    return {
      startTime: this.sessionStart,
      endTime: Date.now(),
      mouseClicks: this.mouseClicks,
      keystrokes: this.keystrokes,
      activeTime: this.calculateActiveTime(),
      pageTitle: document.title,
      url: window.location.href,
      activityScore: this.activityScore
    };
  }

  private calculateActiveTime(): number {
    return this.lastActivity - this.sessionStart;
  }

  public getActivities(): ActivityData[] {
    return this.activities;
  }

  public getActivityScore(): number {
    return this.activityScore;
  }
}

export const tracker = new ActivityTracker();