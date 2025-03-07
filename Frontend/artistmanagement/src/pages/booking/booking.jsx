import React from "react";

const EsewaPayment = () => {
  // You should replace these values with actual dynamic values from your application
  const paymentData = {
    amount: "100",
    tax_amount: "10",
    total_amount: "110",
    transaction_uuid: "241028", // This should be unique for each transaction
    product_code: "EPAYTEST",
    product_service_charge: "0",
    product_delivery_charge: "0",
    success_url: "https://developer.esewa.com.np/success",
    failure_url: "https://developer.esewa.com.np/failure",
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature: "i94zsd3oXF6ZsSr/kGqT4sSzYQzjj1W/waxjWyRwaME=",
  };

  return (
    <div className="esewa-payment-container">
      <form
        action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
        method="POST"
      >
        {Object.entries(paymentData).map(([key, value]) => (
          <input
            key={key}
            type="text"
            id={key}
            name={key}
            value={value}
            required
            readOnly
          />
        ))}
        <button type="submit" className="submit-button">
          Pay with eSewa
        </button>
      </form>
    </div>
  );
};

const Bookings = () => {
  return (
    <div className="bookings-container">
      <h2>Make Payment</h2>
      <EsewaPayment />
    </div>
  );
};

export default Bookings;
