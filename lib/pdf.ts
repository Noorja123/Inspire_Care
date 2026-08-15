import { jsPDF } from 'jspdf';

export interface ReceiptDetails {
  opNumber: string;
  patientName: string;
  doctorName: string;
  doctorSpecialization?: string;
  date: string;
  time: string;
  appointmentType?: string;
  visitReason?: string;
}

export function generateReceiptPdf(details: ReceiptDetails) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a5' // A5 size receipt
  });

  const primaryColor = [21, 101, 192]; // Teal/Blue #1565c0
  const darkTextColor = [33, 33, 33];
  const lightTextColor = [117, 117, 117];

  // Header Banner
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 148, 25, 'F');

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('INSPIRE CARE HOSPITAL', 74, 10, { align: 'center' });
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Appointment Confirmation Receipt', 74, 17, { align: 'center' });

  // Receipt details box
  doc.setDrawColor(224, 224, 224);
  doc.setFillColor(250, 250, 250);
  doc.roundedRect(10, 32, 128, 24, 2, 2, 'FD');

  // OP Number prominently
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text(details.opNumber, 74, 43, { align: 'center' });
  doc.setFontSize(9);
  doc.setTextColor(lightTextColor[0], lightTextColor[1], lightTextColor[2]);
  doc.text('OUTPATIENT (OP) NUMBER', 74, 50, { align: 'center' });

  // Divider
  doc.setLineDashPattern([1, 1], 0);
  doc.line(10, 62, 138, 62);
  doc.setLineDashPattern([], 0); // Reset

  // Patient Info details
  let y = 70;
  const drawRow = (label: string, value: string) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
    doc.text(label, 15, y);

    doc.setFont('helvetica', 'normal');
    doc.text(value, 50, y);
    y += 10;
  };

  const formattedDate = new Date(details.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  drawRow('Patient Name:', details.patientName);
  drawRow('Consulting Dr:', `Dr. ${details.doctorName} (${details.doctorSpecialization || 'Specialist'})`);
  drawRow('Schedule Date:', formattedDate);
  drawRow('Time Slot:', `${details.time}`);
  drawRow('Type:', details.appointmentType ? details.appointmentType.replace('_', ' ').toUpperCase() : 'CONSULTATION');
  if (details.visitReason) {
    drawRow('Reason:', details.visitReason);
  }

  // Footer Banner
  doc.setFillColor(245, 245, 245);
  doc.rect(0, 175, 148, 35, 'F');
  
  doc.setFontSize(8);
  doc.setTextColor(lightTextColor[0], lightTextColor[1], lightTextColor[2]);
  doc.text('Please show this receipt at the reception desk 10 minutes prior.', 74, 185, { align: 'center' });
  doc.text('Thank you for choosing Inspire Care Hospital.', 74, 190, { align: 'center' });
  doc.text('Contact: +91-91671-33346 | contact@teaminspirecare.com', 74, 195, { align: 'center' });

  // Save the PDF
  const filename = `receipt-${details.opNumber.toLowerCase()}.pdf`;
  doc.save(filename);
}
