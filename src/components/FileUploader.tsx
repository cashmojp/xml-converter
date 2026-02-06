import React, { useCallback, useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';

interface FileUploaderProps {
  onFileLoaded: (content: string, fileName: string) => void;
  isLoading: boolean;
  accept?: string;
  label?: string;
  description?: string;
  icon?: React.ReactNode;
  compact?: boolean;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ 
  onFileLoaded, 
  isLoading, 
  accept = ".xml", 
  label = "ファイルをアップロード", 
  description = "ドラッグ＆ドロップ",
  icon,
  compact: _compact = false
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback((file: File) => {
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    const acceptedExtensions = accept.split(',').map(ext => ext.trim().toLowerCase());
    const isValid = acceptedExtensions.some(ext => fileExtension === ext || file.name.toLowerCase().endsWith(ext));

    if (!isValid) {
      setError(`エラー: ${accept} 形式のみ対応`);
      return;
    }
    
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      onFileLoaded(content, file.name);
    };
    reader.readAsText(file);
  }, [accept, onFileLoaded]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }, [handleFile]);

  return (
    <div className="w-full">
      <div 
        className={`relative group rounded-xl border-2 border-dashed transition-all duration-200 ease-in-out
        ${dragActive 
          ? 'border-indigo-500 bg-indigo-50/50' 
          : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50'
        }
        p-4 cursor-pointer`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          onChange={handleChange}
          accept={accept}
          disabled={isLoading}
        />
        
        <div className="flex flex-col items-center justify-center text-center">
          <div className={`rounded-full p-2 mb-2 transition-colors ${dragActive ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400 group-hover:text-indigo-500 group-hover:bg-indigo-50'}`}>
            {isLoading ? (
              <div className="animate-spin rounded-full border-2 border-t-transparent border-indigo-600 w-5 h-5"></div>
            ) : (
              icon || <Upload className="w-5 h-5" />
            )}
          </div>
          
          <h3 className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors">
            {label}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {description}
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-2 p-2 bg-red-50 text-red-600 rounded text-xs flex items-center animate-fade-in">
          <AlertCircle className="w-3 h-3 mr-1.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
