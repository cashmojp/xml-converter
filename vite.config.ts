import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    host: '0.0.0.0',
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  build: {
        // 本番ビルドの最適化設定
        target: 'esnext',
        minify: 'esbuild',
        cssMinify: true,
        rollupOptions: {
          output: {
            manualChunks: {
              // ベンダーコードを分離してキャッシュ効率を向上
              'react-vendor': ['react', 'react-dom'],
              'pdf-vendor': ['html2canvas', 'jspdf'],
              'utils-vendor': ['dompurify', 'jszip']
            }
          }
        },
    // チャンクサイズ警告のしきい値を調整
    chunkSizeWarningLimit: 1000,
  }
});
