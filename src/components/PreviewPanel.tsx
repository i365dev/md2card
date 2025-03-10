import React from 'react';

interface PreviewPanelProps {
  html: string;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ html }) => {
  return (
    <div className="preview-panel">
      <div id="card-preview" className="card-container">
        <div
          className="card-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
};

export default PreviewPanel;
