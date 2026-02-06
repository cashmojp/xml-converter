import React from 'react';

interface DocumentPreviewProps {
  htmlContent: string;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({ htmlContent }) => {
  return (
    <div className="animate-fade-in-up w-full flex justify-center pb-12">
      <div 
        id="pdf-content"
        className="bg-white shadow-xl text-black box-border mx-auto transition-transform origin-top"
        style={{ 
          width: '210mm', 
          minHeight: '297mm',
          padding: '20mm',
          fontSize: '10.5pt',
          fontFamily: '"Times New Roman", "YuMincho", "Hiragino Mincho ProN", serif',
          lineHeight: '1.6'
        }}
      >
        <div 
          className="w-full h-full preview-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }} 
        />
      </div>
    </div>
  );
};
