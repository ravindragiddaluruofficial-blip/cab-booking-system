import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const generateInvoice = (booking) => {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.setTextColor(255, 193, 7);
  doc.text("UCAB BOOKING INVOICE", 20, 20);

  doc.setFontSize(12);
  doc.setTextColor(0);

  autoTable(doc, {
    startY: 35,
    head: [["Field", "Value"]],
    body: [
      ["Booking ID", booking._id],
      ["Customer", booking.userId?.name || booking.userName],
      ["Cab", booking.carId?.carName || booking.carName],
      ["Pickup", booking.pickup],
      ["Destination", booking.destination],
      ["Booking Date", booking.bookingDate?.substring(0, 10)],
      ["Pickup Time", booking.pickupTime || "-"],
      ["Distance", `${booking.distance} KM`],
      ["Amount", `₹${booking.amount}`],
      ["Status", booking.status],
    ],
  });

  doc.setFontSize(11);
  doc.text("Thank you for choosing UCAB!", 20, doc.lastAutoTable.finalY + 20);

  doc.save(`Invoice-${booking._id}.pdf`);
};

export default generateInvoice;