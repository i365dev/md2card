import React from 'react';

interface Theme {
  id: string;
  name: string;
}

interface ThemeSelectorProps {
  themes: Theme[];
  currentTheme: string;
  onThemeChange: (themeId: string) => void;
  onRandomTheme: () => void;
  onExport: () => void;
  isExporting: boolean;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  themes,
  currentTheme,
  onThemeChange,
  onRandomTheme,
  onExport,
  isExporting
}) => {
  return (
    <div className="theme-controls">
      <select
        className="px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
        value={currentTheme}
        onChange={(e) => onThemeChange(e.target.value)}
      >
        {themes.map((theme) => (
          <option key={theme.id} value={theme.id}>
            {theme.name}
          </option>
        ))}
      </select>
      
      <button
        className="px-4 py-2 bg-primary text-white rounded hover:opacity-90 transition-opacity"
        onClick={onRandomTheme}
      >
        随机主题
      </button>
      
      <button
        className="px-4 py-2 bg-accent text-white rounded hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onExport}
        disabled={isExporting}
      >
        {isExporting ? '导出中...' : '导出 PNG'}
      </button>
    </div>
  );
};

export default ThemeSelector;
