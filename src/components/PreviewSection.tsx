import React from 'react';
import { DocumentPreview } from '@/components/DocumentPreview';
import { 
  Printer, 
  ChevronRight, 
  AlertCircle, 
  RefreshCw, 
  Download, 
  FileText 
} from 'lucide-react';

interface PreviewSectionProps {
  htmlContent: string | null;
  errorMsg: string | null;
  isGeneratingPdf: boolean;
  onDownload: () => void;
}

export const PreviewSection: React.FC<PreviewSectionProps> = ({
  htmlContent,
  errorMsg,
  isGeneratingPdf,
  onDownload,
}) => {
  return (
    <main className="flex-1 relative flex flex-col bg-slate-100/50 overflow-hidden">
      {/* Top Bar */}
      <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm flex-shrink-0">
         <div className="flex items-center text-sm text-slate-500">
           <Printer className="w-4 h-4 mr-2" />
           <span>プレビュー</span>
           {htmlContent && (
             <>
              <ChevronRight className="w-4 h-4 mx-2 text-slate-300" />
              <span className="font-medium text-slate-900">A4 レポート</span>
             </>
           )}
         </div>
         <div className="flex items-center space-x-3">
           {errorMsg && (
             <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded border border-red-100 flex items-center">
               <AlertCircle className="w-3 h-3 mr-1" />
               {errorMsg}
             </span>
           )}
           <button
             onClick={onDownload}
             disabled={!htmlContent || isGeneratingPdf}
             className="flex items-center justify-center px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
           >
             {isGeneratingPdf ? (
               <span className="flex items-center">
                 <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                 生成中...
               </span>
             ) : (
               <span className="flex items-center">
                 <Download className="w-4 h-4 mr-2" />
                 PDFダウンロード
               </span>
             )}
           </button>
         </div>
      </div>

      {/* Preview Container */}
      <div className="flex-1 overflow-auto p-4 md:p-8 bg-slate-200/50 flex justify-center items-start custom-scrollbar">
        {htmlContent ? (
           <DocumentPreview htmlContent={htmlContent} />
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 select-none">
             <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4">
               <FileText className="w-10 h-10 text-slate-300" />
             </div>
             <p className="text-lg font-medium text-slate-500">ドキュメントプレビュー</p>
             <p className="text-sm mt-2 max-w-xs text-center text-slate-400">
               左側のパネルからXML/XSLをアップロードするか、<br/>ZIPファイルを読み込んでください。
             </p>
          </div>
        )}
      </div>
    </main>
  );
};
