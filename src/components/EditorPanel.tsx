import React from 'react';

interface EditorPanelProps {
  value: string;
  onChange: (value: string) => void;
}

const EditorPanel: React.FC<EditorPanelProps> = ({ value, onChange }) => {
  return (
    <div className="editor-panel">
      <textarea
        className="w-full h-full p-4 font-mono text-sm bg-white border-0 resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="# Type your Markdown here..."
      />
    </div>
  );
};

export default EditorPanel;
