import { Theme, ThemeRecord } from './types';

class ThemeManager {
  private themes: ThemeRecord;
  private currentTheme: string;

  constructor() {
    this.themes = {
      default: {
        name: 'Default',
        background: '#ffffff',
        primaryColor: '#3498db',
        textColor: '#333333',
        accentColor: '#e74c3c',
        fontFamily: 'Arial, sans-serif',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      },
      dark: {
        name: 'Dark Mode',
        background: '#2d3436',
        primaryColor: '#74b9ff',
        textColor: '#dfe6e9',
        accentColor: '#ff7675',
        fontFamily: 'Roboto, sans-serif',
        borderRadius: '4px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
      },
      instagram: {
        name: 'Instagram',
        background: 'linear-gradient(45deg, #833ab4, #fd1d1d, #fcb045)',
        primaryColor: '#ffffff',
        textColor: '#ffffff',
        accentColor: '#ffffff',
        fontFamily: '"Segoe UI", sans-serif',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
      },
      twitter: {
        name: 'Twitter',
        background: '#ffffff',
        primaryColor: '#1da1f2',
        textColor: '#14171a',
        accentColor: '#f45d22',
        fontFamily: '"Helvetica Neue", sans-serif',
        borderRadius: '16px',
        boxShadow: '0 2px 10px rgba(29, 161, 242, 0.1)'
      },
      pinterest: {
        name: 'Pinterest',
        background: '#ffffff',
        primaryColor: '#e60023',
        textColor: '#333333',
        accentColor: '#6e0f19',
        fontFamily: '"Helvetica Neue", sans-serif',
        borderRadius: '24px',
        boxShadow: '0 8px 16px rgba(230, 0, 35, 0.1)'
      }
    };
    
    this.currentTheme = 'default';
    this.applyTheme();
  }

  public getCurrentTheme(): string {
    return this.currentTheme;
  }

  public getTheme(themeName: string): Theme | null {
    return this.themes[themeName] || null;
  }

  public setTheme(themeName: string): boolean {
    if (this.themes[themeName]) {
      this.currentTheme = themeName;
      this.applyTheme();
      return true;
    }
    return false;
  }

  public setRandomTheme(): string {
    const themeNames = Object.keys(this.themes);
    const randomIndex = Math.floor(Math.random() * themeNames.length);
    const newTheme = themeNames[randomIndex];
    this.setTheme(newTheme);
    return newTheme;
  }

  public applyTheme(): void {
    const theme = this.themes[this.currentTheme];
    const root = document.documentElement;
    
    root.style.setProperty('--background', theme.background);
    root.style.setProperty('--primary-color', theme.primaryColor);
    root.style.setProperty('--text-color', theme.textColor);
    root.style.setProperty('--accent-color', theme.accentColor);
    root.style.setProperty('--font-family', theme.fontFamily);
    root.style.setProperty('--border-radius', theme.borderRadius);
    root.style.setProperty('--box-shadow', theme.boxShadow);
  }

  public getAllThemes(): Array<{id: string, name: string}> {
    return Object.entries(this.themes).map(([id, theme]) => ({
      id,
      name: theme.name
    }));
  }

  public addTheme(id: string, themeConfig: Partial<Theme>): boolean {
    if (this.themes[id]) {
      return false;
    }

    this.themes[id] = {
      name: themeConfig.name || id,
      background: themeConfig.background || '#ffffff',
      primaryColor: themeConfig.primaryColor || '#000000',
      textColor: themeConfig.textColor || '#333333',
      accentColor: themeConfig.accentColor || '#ff0000',
      fontFamily: themeConfig.fontFamily || 'Arial, sans-serif',
      borderRadius: themeConfig.borderRadius || '0px',
      boxShadow: themeConfig.boxShadow || 'none'
    };

    return true;
  }
}

export default ThemeManager;
