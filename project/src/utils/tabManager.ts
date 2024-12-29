import { TabData } from '../types/tracking';

class TabManager {
  private tabs: Map<string, TabData> = new Map();
  private currentTabId: string = '';

  constructor() {
    this.initializeTab();
    this.setupTabTracking();
  }

  private initializeTab() {
    const tabId = this.generateTabId();
    this.currentTabId = tabId;
    this.tabs.set(tabId, {
      id: tabId,
      title: document.title,
      url: window.location.href,
      startTime: Date.now(),
      activityScore: 0
    });
  }

  private setupTabTracking() {
    // Update title when it changes
    const observer = new MutationObserver(() => {
      this.updateCurrentTab({ title: document.title });
    });
    observer.observe(document.querySelector('title')!, { childList: true });
  }

  private generateTabId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  public getCurrentTabId(): string {
    return this.currentTabId;
  }

  public updateCurrentTab(data: Partial<TabData>) {
    const currentTab = this.tabs.get(this.currentTabId);
    if (currentTab) {
      this.tabs.set(this.currentTabId, { ...currentTab, ...data });
    }
  }

  public getAllTabs(): TabData[] {
    return Array.from(this.tabs.values());
  }
}

export const tabManager = new TabManager();