function BookingTimeline({ status }) {
  const steps = [
    "Booked",
    "Started",
    "Completed",
  ];

  const current = steps.indexOf(status);

  if (status === "Cancelled") {
    return (
      <div className="mt-3">
        <div className="alert alert-danger text-center fw-bold">
          ❌ Ride Cancelled
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3">
      {steps.map((step, index) => (
        <div
          key={step}
          className="d-flex align-items-center mb-2"
        >
          <div
            className={`rounded-circle text-white d-flex justify-content-center align-items-center ${
              index <= current
                ? "bg-success"
                : "bg-secondary"
            }`}
            style={{
              width: 35,
              height: 35,
            }}
          >
            {index <= current ? "✓" : index + 1}
          </div>

          <div className="ms-3 fw-bold">
            {step}
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookingTimeline;