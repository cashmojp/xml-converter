import React, { useState } from 'react';
import JSZip from 'jszip';
import type { ExtractedFile } from '@/types';
import { logError } from '@/utils/logger';

export const useZipUpload = () => {
  const [isZipModalOpen, setIsZipModalOpen] = useState(false);
  const [zipXmlFiles, setZipXmlFiles] = useState<ExtractedFile[]>([]);
  const [zipXslFiles, setZipXslFiles] = useState<ExtractedFile[]>([]);
  const [zipOtherFiles, setZipOtherFiles] = useState<string[]>([]);
  const [isZipDragActive, setIsZipDragActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const loadZipFile = async (file: File) => {
    setIsProcessing(true);
    setErrorMsg(null);

    try {
      const zip = new JSZip();
      const loadedZip = await zip.loadAsync(file);
      
      const xmls: ExtractedFile[] = [];
      const xsls: ExtractedFile[] = [];
      const others: string[] = [];

      for (const [filename, fileData] of Object.entries(loadedZip.files)) {
        if (fileData.dir) continue;

        const lowerName = filename.toLowerCase();
        
        if (lowerName.endsWith('.xml')) {
          const content = await fileData.async('string');
          xmls.push({ name: filename, content });
        } else if (lowerName.endsWith('.xsl') || lowerName.endsWith('.xslt')) {
          const content = await fileData.async('string');
          xsls.push({ name: filename, content });
        } else {
          others.push(filename);
        }
      }

      setZipXmlFiles(xmls);
      setZipXslFiles(xsls);
      setZipOtherFiles(others);
      setIsZipModalOpen(true);

    } catch (error) {
      logError(error, "ZIP読み込み");
      setErrorMsg("ZIPファイルの読み込みに失敗しました。");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleZipInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await loadZipFile(file);
      e.target.value = '';
    }
  };

  const handleZipDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsZipDragActive(true);
  };

  const handleZipDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsZipDragActive(false);
  };

  const handleZipDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsZipDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.name.toLowerCase().endsWith('.zip')) {
        await loadZipFile(file);
      } else {
        setErrorMsg("ZIPファイルのみアップロード可能です。");
      }
    }
  };

  return {
    isZipModalOpen,
    setIsZipModalOpen,
    zipXmlFiles,
    zipXslFiles,
    zipOtherFiles,
    isZipDragActive,
    isProcessing,
    errorMsg,
    handleZipInputChange,
    handleZipDragOver,
    handleZipDragLeave,
    handleZipDrop,
  };
};
