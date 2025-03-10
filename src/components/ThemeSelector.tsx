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
        className="px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2"
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
        className="theme-button"
        onClick={onRandomTheme}
      >
        随机主题
      </button>
      
      <button
        className="export-button disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onExport}
        disabled={isExporting}
      >
        {isExporting ? '导出中...' : '导出 PNG'}
      </button>
    </div>
  );
};

export default ThemeSelector;
