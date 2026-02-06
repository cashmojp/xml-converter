export const transformXml = async (xmlString: string, xslString?: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, "text/xml");

      if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
        throw new Error("XMLの解析に失敗しました。ファイル形式を確認してください。");
      }

      if (xslString) {
        // XSLT processing mode
        const xslDoc = parser.parseFromString(xslString, "text/xml");
        
        if (xslDoc.getElementsByTagName("parsererror").length > 0) {
          throw new Error("XSLTの解析に失敗しました。ファイル形式を確認してください。");
        }

        const processor = new XSLTProcessor();
        processor.importStylesheet(xslDoc);
        
        const resultDoc = processor.transformToFragment(xmlDoc, document);
        const serializer = new XMLSerializer();
        const html = serializer.serializeToString(resultDoc);
        
        resolve(html);
      } else {
        // Default Strict Mode (No XSLT)
        // Generates a simple, strict table representation of the data
        let html = '<div class="strict-document">';
        html += '<h1 class="text-2xl font-bold mb-4 border-b-2 border-black pb-2">XMLデータ内容</h1>';
        html += renderNode(xmlDoc.documentElement);
        html += '</div>';
        resolve(html);
      }
    } catch (e) {
      reject(e);
    }
  });
};

function renderNode(node: Element): string {
  // Skip if no relevant content
  if (node.nodeType !== 1) return '';

  const children = Array.from(node.children);
  const hasChildren = children.length > 0;
  const firstChild = node.childNodes[0];
  const textContent = firstChild?.nodeType === 3 
    ? firstChild.nodeValue?.trim() || ''
    : '';

  let html = `<div class="mb-4 border border-gray-400 p-2 break-inside-avoid">`;
  
  // Tag Name Header
  html += `<div class="bg-gray-100 p-1 font-bold text-sm uppercase tracking-wide border-b border-gray-300 mb-2">${node.tagName}</div>`;

  if (textContent) {
    html += `<div class="p-1 mb-2 font-serif">${textContent}</div>`;
  }

  if (hasChildren) {
    html += '<div class="pl-2">';
    children.forEach(child => {
      html += renderNode(child);
    });
    html += '</div>';
  }

  html += '</div>';
  return html;
}
