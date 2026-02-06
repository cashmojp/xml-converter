import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generatePdf = async (elementId: string, fileName: string = 'document.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Element not found');
  }

  // Create canvas from the element
  const canvas = await html2canvas(element, {
    scale: 2, // Higher scale for better quality
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff'
  });

  const imgData = canvas.toDataURL('image/png');
  
  // A4 dimensions in mm
  const pdfWidth = 210;
  const pdfHeight = 297;
  const imgProps = canvas.width / canvas.height;
  
  // Calculate image height based on A4 width
  const imgHeight = pdfWidth / imgProps;

  const pdf = new jsPDF('p', 'mm', 'a4');
  
  // If the content fits within one page (allowing for a small margin of error due to rendering),
  // just print it on one page.
  // 5mm threshold to prevent empty second pages caused by tiny layout overflows.
  if (imgHeight <= pdfHeight + 5) {
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
  } else {
    // Multi-page logic for strictly long content
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
    heightLeft -= pdfHeight;

    // Only add a new page if there is significant content left (> 1mm)
    while (heightLeft > 1) {
      position = heightLeft - imgHeight; // This sets position to -297, -594, etc.
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;
    }
  }

  pdf.save(fileName);
};
