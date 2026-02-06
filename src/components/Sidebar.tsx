import React from 'react';
import { FileUploader } from '@/components/FileUploader';
import { FileCodeArrowIcon } from '@/components/Icons';
import { 
  FileJson, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  FolderArchive, 
  FileCode,
  Trash2
} from 'lucide-react';

interface SidebarProps {
  xmlFileName: string | null;
  xslFileName: string | null;
  xmlContent: string | null;
  isProcessing: boolean;
  isZipDragActive: boolean;
  onXmlLoaded: (content: string, name: string) => void;
  onXslLoaded: (content: string, name: string) => void;
  onXslRemove: () => void;
  onXmlRemove: () => void;
  onReset: () => void;
  onZipInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onZipDragOver: (e: React.DragEvent) => void;
  onZipDragLeave: (e: React.DragEvent) => void;
  onZipDrop: (e: React.DragEvent) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  xmlFileName,
  xslFileName,
  xmlContent,
  isProcessing,
  isZipDragActive,
  onXmlLoaded,
  onXslLoaded,
  onXslRemove,
  onXmlRemove,
  onReset,
  onZipInputChange,
  onZipDragOver,
  onZipDragLeave,
  onZipDrop,
}) => {
  return (
    <aside className="w-full md:w-80 lg:w-96 bg-white border-r border-slate-200 flex flex-col shadow-xl z-20 flex-shrink-0 transition-all duration-300">
      {/* Header */}
      <div className="h-16 flex items-center px-6 bg-slate-900 border-b border-slate-800 flex-shrink-0">
        <div className="flex items-center space-x-2 text-white">
          <FileCodeArrowIcon className="w-6 h-6 text-indigo-400" />
          <span className="font-bold text-lg tracking-wide">XML Converter</span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        
        {/* Quick Action: ZIP Upload (Drag & Drop) */}
        <div 
          className={`
            relative rounded-xl border-2 border-dashed p-4 transition-all duration-200 ease-in-out cursor-pointer group
            ${isZipDragActive 
              ? 'border-indigo-500 bg-indigo-100' 
              : 'border-indigo-200 bg-indigo-50 hover:border-indigo-400 hover:bg-indigo-50/80'
            }
          `}
          onDragOver={onZipDragOver}
          onDragLeave={onZipDragLeave}
          onDrop={onZipDrop}
        >
          <input 
            type="file" 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
            accept=".zip" 
            onChange={onZipInputChange}
            disabled={isProcessing}
          />
          
          <div className="flex flex-col items-center justify-center text-center">
            <div className={`p-2 rounded-lg mb-2 transition-colors ${isZipDragActive ? 'bg-indigo-200' : 'bg-white text-indigo-600 shadow-sm'}`}>
              <FolderArchive className={`w-6 h-6 ${isZipDragActive ? 'text-indigo-700' : 'text-indigo-600'}`} />
            </div>
            
            <h3 className="text-sm font-bold text-indigo-900 mb-1 flex items-center">
              プロジェクト一括読み込み
            </h3>
            <p className="text-xs text-indigo-600 leading-relaxed px-2">
              {isZipDragActive ? 'ここにZIPをドロップ' : 'ZIPをドラッグ＆ドロップ、またはクリック'}
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-2 text-xs text-slate-400">または個別選択</span>
          </div>
        </div>
        
        {/* Step 1: XSLT */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center">
              <span className="bg-slate-200 text-slate-600 w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2">1</span>
              レイアウト (XSLT)
              <span className="ml-2 text-[10px] bg-slate-100 px-1.5 rounded text-slate-400 border border-slate-200">任意</span>
            </h2>
            {xslFileName && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
          </div>

          <div>
            {!xslFileName ? (
              <FileUploader 
                onFileLoaded={onXslLoaded} 
                isLoading={isProcessing} 
                accept=".xsl,.xslt"
                label="XSLTを選択"
                description="スタイル定義 (推奨)"
                icon={<FileJson className="w-5 h-5" />}
                compact
              />
            ) : (
              <div className="bg-white border border-emerald-100 rounded-lg p-3 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-50 rounded-bl-full -mr-8 -mt-8 z-0"></div>
                <div className="relative z-10">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="bg-emerald-100 p-2 rounded">
                      <FileJson className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate" title={xslFileName}>{xslFileName}</p>
                      <p className="text-xs text-emerald-600">スタイル適用中</p>
                    </div>
                  </div>
                  <div className="flex justify-end items-center space-x-3">
                     <label className="text-xs text-emerald-600 hover:text-emerald-800 font-medium cursor-pointer transition-colors">
                        ファイルを変更
                        <input type="file" className="hidden" accept=".xsl,.xslt" onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (ev) => {
                              const result = ev.target?.result;
                              if (result) onXslLoaded(result as string, file.name);
                            };
                            reader.readAsText(file);
                          }
                        }} />
                     </label>
                     <button 
                       onClick={onXslRemove}
                       className="text-slate-400 hover:text-red-500 transition-colors"
                       title="削除"
                     >
                       <Trash2 className="w-3.5 h-3.5" />
                     </button>
                  </div>
                </div>
              </div>
            )}
            
            {!xslFileName && xmlContent && (
              <div className="mt-2 p-2 bg-amber-50 border border-amber-100 rounded text-xs text-amber-700 flex items-start">
                <AlertCircle className="w-3 h-3 mr-1 mt-0.5 flex-shrink-0" />
                XSLT未指定のため、簡易表示モードでプレビューしています。
              </div>
            )}
          </div>
        </div>

        {/* Step 2: XML */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center">
              <span className="bg-slate-200 text-slate-600 w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2">2</span>
              データソース (XML)
            </h2>
            {xmlFileName && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
          </div>
          
          <div className={`transition-all duration-300 ${xmlFileName ? 'bg-slate-50 border-slate-200' : ''}`}>
            {!xmlFileName ? (
              <FileUploader 
                onFileLoaded={onXmlLoaded} 
                isLoading={isProcessing} 
                accept=".xml"
                label="XMLを選択"
                description="データファイルをドラッグ"
                icon={<FileCode className="w-5 h-5" />}
                compact
              />
            ) : (
              <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="bg-blue-100 p-2 rounded">
                    <FileCode className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate" title={xmlFileName}>{xmlFileName}</p>
                    <p className="text-xs text-slate-500">読み込み完了</p>
                  </div>
                </div>
                <div className="flex justify-end items-center space-x-3">
                   <label className="text-xs text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition-colors">
                      ファイルを変更
                      <input type="file" className="hidden" accept=".xml" onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            const result = ev.target?.result;
                            if (result) onXmlLoaded(result as string, file.name);
                          };
                          reader.readAsText(file);
                        }
                      }} />
                   </label>
                   <button 
                     onClick={onXmlRemove}
                     className="text-slate-400 hover:text-red-500 transition-colors"
                     title="削除"
                   >
                     <Trash2 className="w-3.5 h-3.5" />
                   </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-3 flex-shrink-0">
        <button
          onClick={onReset}
          disabled={!xmlContent}
          className="w-full flex items-center justify-center px-4 py-2.5 text-slate-600 text-sm font-medium border border-slate-300 rounded-lg hover:bg-slate-100 hover:border-slate-400 hover:text-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-50"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          全てリセット
        </button>
      </div>
    </aside>
  );
};
