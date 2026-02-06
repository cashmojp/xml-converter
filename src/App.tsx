import React from 'react';
import { ZipSelectionModal } from '@/components/ZipSelectionModal';
import { Sidebar } from '@/components/Sidebar';
import { PreviewSection } from '@/components/PreviewSection';
import { useXmlConverter } from '@/hooks/useXmlConverter';
import { useZipUpload } from '@/hooks/useZipUpload';
import type { ExtractedFile } from '@/types';

const App: React.FC = () => {
  const {
    xmlContent,
    htmlContent,
    xmlFileName,
    xslFileName,
    isProcessing,
    isGeneratingPdf,
    errorMsg,
    handleXmlLoaded,
    handleXslLoaded,
    handleXslRemove,
    handleDownload,
    handleReset,
    processContent,
    setXmlContent,
    setXslContent,
    setXmlFileName,
    setXslFileName,
  } = useXmlConverter();

  const {
    isZipModalOpen,
    setIsZipModalOpen,
    zipXmlFiles,
    zipXslFiles,
    zipOtherFiles,
    isZipDragActive,
    handleZipInputChange,
    handleZipDragOver,
    handleZipDragLeave,
    handleZipDrop,
  } = useZipUpload();

  const handleZipConfirm = async (xml: ExtractedFile, xsl: ExtractedFile | null) => {
    setIsZipModalOpen(false);
    
    setXmlFileName(xml.name);
    setXmlContent(xml.content);
    
    if (xsl) {
      setXslFileName(xsl.name);
      setXslContent(xsl.content);
      await processContent(xml.content, xsl.content);
    } else {
      setXslFileName(null);
      setXslContent(null);
      await processContent(xml.content, undefined);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden font-sans bg-slate-50 text-slate-900">
      <ZipSelectionModal 
        isOpen={isZipModalOpen}
        onClose={() => setIsZipModalOpen(false)}
        onConfirm={handleZipConfirm}
        xmlFiles={zipXmlFiles}
        xslFiles={zipXslFiles}
        otherFiles={zipOtherFiles}
      />

      <Sidebar
        xmlFileName={xmlFileName}
        xslFileName={xslFileName}
        xmlContent={xmlContent}
        isProcessing={isProcessing}
        isZipDragActive={isZipDragActive}
        onXmlLoaded={handleXmlLoaded}
        onXslLoaded={handleXslLoaded}
        onXslRemove={handleXslRemove}
        onReset={handleReset}
        onZipInputChange={handleZipInputChange}
        onZipDragOver={handleZipDragOver}
        onZipDragLeave={handleZipDragLeave}
        onZipDrop={handleZipDrop}
      />

      <PreviewSection
        htmlContent={htmlContent}
        errorMsg={errorMsg}
        isGeneratingPdf={isGeneratingPdf}
        onDownload={handleDownload}
      />
    </div>
  );
};

export default App;
