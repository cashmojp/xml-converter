import React, { useState, useEffect } from 'react';
import { X, FileText, FileJson, Check, FolderArchive } from 'lucide-react';
import type { ExtractedFile } from '../types';

interface ZipSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (xmlFile: ExtractedFile, xslFile: ExtractedFile | null) => void;
  xmlFiles: ExtractedFile[];
  xslFiles: ExtractedFile[];
  otherFiles: string[];
}

export const ZipSelectionModal: React.FC<ZipSelectionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  xmlFiles,
  xslFiles,
  otherFiles
}) => {
  const [selectedXmlIndex, setSelectedXmlIndex] = useState<number | null>(null);
  const [selectedXslIndex, setSelectedXslIndex] = useState<number | null>(null);

  // Auto-select if there's only one option (calculated on each render)
  const autoSelectedXmlIndex = xmlFiles.length === 1 ? 0 : null;
  const autoSelectedXslIndex = xslFiles.length === 1 ? 0 : null;

  // Reset selection when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedXmlIndex(autoSelectedXmlIndex);
      setSelectedXslIndex(autoSelectedXslIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (selectedXmlIndex === null) return;
    
    const xml = xmlFiles[selectedXmlIndex];
    if (!xml) return;
    
    const xsl = selectedXslIndex !== null ? (xslFiles[selectedXslIndex] || null) : null;
    
    onConfirm(xml, xsl);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <FolderArchive className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">ZIPファイルの内容確認</h3>
              <p className="text-xs text-slate-500">使用するファイルを選択してください</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar space-y-6 flex-1">
          
          {/* XML Section */}
          <div>
            <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3 flex items-center">
              <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
              データソース (XML) <span className="text-red-500 ml-1">*</span>
            </h4>
            <div className="space-y-2">
              {xmlFiles.length === 0 ? (
                <p className="text-sm text-red-500 bg-red-50 p-3 rounded border border-red-100">
                  有効なXMLファイルが見つかりませんでした。
                </p>
              ) : (
                xmlFiles.map((file, idx) => (
                  <label 
                    key={idx}
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all
                      ${selectedXmlIndex === idx 
                        ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' 
                        : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                      }`}
                  >
                    <input 
                      type="radio" 
                      name="xml-select" 
                      className="hidden"
                      checked={selectedXmlIndex === idx}
                      onChange={() => setSelectedXmlIndex(idx)}
                    />
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3
                      ${selectedXmlIndex === idx ? 'border-blue-500 bg-blue-500' : 'border-slate-300 bg-white'}`}>
                      {selectedXmlIndex === idx && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <FileText className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-slate-700">{file.name}</span>
                  </label>
                ))
              )}
            </div>
          </div>

          {/* XSL Section */}
          <div>
            <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3 flex items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
              レイアウト (XSLT)
            </h4>
            <div className="space-y-2">
              <label 
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all
                  ${selectedXslIndex === null 
                    ? 'border-slate-400 bg-slate-50 ring-1 ring-slate-400' 
                    : 'border-slate-200 hover:border-slate-300'
                  }`}
              >
                <input 
                  type="radio" 
                  name="xsl-select" 
                  className="hidden"
                  checked={selectedXslIndex === null}
                  onChange={() => setSelectedXslIndex(null)}
                />
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3
                  ${selectedXslIndex === null ? 'border-slate-500 bg-slate-500' : 'border-slate-300 bg-white'}`}>
                  {selectedXslIndex === null && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-sm font-medium text-slate-600">使用しない（簡易表示）</span>
              </label>

              {xslFiles.map((file, idx) => (
                <label 
                  key={idx}
                  className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all
                    ${selectedXslIndex === idx 
                      ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500' 
                      : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                    }`}
                >
                  <input 
                    type="radio" 
                    name="xsl-select" 
                    className="hidden"
                    checked={selectedXslIndex === idx}
                    onChange={() => setSelectedXslIndex(idx)}
                  />
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3
                    ${selectedXslIndex === idx ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300 bg-white'}`}>
                    {selectedXslIndex === idx && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <FileJson className="w-5 h-5 text-emerald-600 mr-2" />
                  <span className="text-sm font-medium text-slate-700">{file.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Other Files (Information only) */}
          {otherFiles.length > 0 && (
            <div className="pt-4 border-t border-slate-100">
              <details className="text-xs text-slate-400">
                <summary className="cursor-pointer hover:text-slate-600 mb-2">
                  その他のファイル ({otherFiles.length})
                </summary>
                <ul className="pl-4 list-disc space-y-1">
                  {otherFiles.map((name, i) => (
                    <li key={i} className="truncate">{name}</li>
                  ))}
                </ul>
              </details>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end space-x-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-slate-600 text-sm font-medium hover:bg-slate-200 rounded-lg transition-colors"
          >
            キャンセル
          </button>
          <button 
            onClick={handleConfirm}
            disabled={selectedXmlIndex === null}
            className="px-6 py-2 bg-indigo-600 text-white text-sm font-bold rounded-lg shadow-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            読み込む
          </button>
        </div>
      </div>
    </div>
  );
};
