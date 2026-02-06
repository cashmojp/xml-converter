import { useState } from 'react';
import { transformXml } from '@/utils/xmlProcessor';
import { generatePdf } from '@/utils/pdfUtils';
import { logError } from '@/utils/logger';

export const useXmlConverter = () => {
  const [xmlContent, setXmlContent] = useState<string | null>(null);
  const [xslContent, setXslContent] = useState<string | null>(null);
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [xmlFileName, setXmlFileName] = useState<string | null>(null);
  const [xslFileName, setXslFileName] = useState<string | null>(null);
  
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const processContent = async (xml: string, xsl?: string) => {
    setIsProcessing(true);
    setErrorMsg(null);
    try {
      const generatedHtml = await transformXml(xml, xsl);
      setHtmlContent(generatedHtml);
    } catch (error) {
      logError(error, "変換処理");
      setHtmlContent(null);
      setErrorMsg(error instanceof Error ? error.message : "変換処理中にエラーが発生しました。");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleXmlLoaded = async (content: string, name: string) => {
    setXmlContent(content);
    setXmlFileName(name);
    await processContent(content, xslContent || undefined);
  };

  const handleXslLoaded = async (content: string, name: string) => {
    setXslContent(content);
    setXslFileName(name);
    if (xmlContent) {
      await processContent(xmlContent, content);
    }
  };

  const handleXslRemove = () => {
    setXslContent(null);
    setXslFileName(null);
    if (xmlContent) {
      processContent(xmlContent, undefined);
    }
  };

  const handleDownload = async () => {
    if (!xmlFileName) return;
    setIsGeneratingPdf(true);
    setTimeout(async () => {
      try {
        const pdfName = xmlFileName.replace(/\.xml$/i, '') + '.pdf';
        await generatePdf('pdf-content', pdfName);
      } catch (error) {
        logError(error, "PDF生成");
        alert("PDFの生成に失敗しました。");
      } finally {
        setIsGeneratingPdf(false);
      }
    }, 100);
  };

  const handleReset = () => {
    setXmlContent(null);
    setXslContent(null);
    setHtmlContent(null);
    setXmlFileName(null);
    setXslFileName(null);
    setErrorMsg(null);
  };

  return {
    xmlContent,
    xslContent,
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
  };
};
