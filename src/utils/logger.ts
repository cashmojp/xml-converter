/**
 * エラーログを記録する
 * console.errorの代わりに使用
 */
export const logError = (error: unknown, context?: string): void => {
  const prefix = context ? `[${context}]` : '';
  const message = error instanceof Error ? error.message : String(error);
  
  console.error(`${prefix} エラー:`, message, error);
};
