import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";

const TestOne = () => {
  // process.env.REACT_APP_CLIENT_ID
  const [isPaid, setIsPaid] = useState(false);
  const [orderId, setOrderId] = useState("");

  return (
    <>
      <PayPalScriptProvider
        options={{
          "client-id": "AXC33PNxFQtif-uOTneXmqMa2yh36VplEy2rJYOuMkF1RMxj7XysglDpDja7iuCdRoMb7DtP5NADN3Gq",
          currency: "USD",
        }}
      >
        <div>
          <PayPalButtons
            style={{
              color: 'gold',
              layout: 'horizontal',
              height: 55,
              tagline: 'false',
              shape: 'pill'
            }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: "50",
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              setIsPaid(true);
              setOrderId(data.orderID);

              // save payment details to database
              fetch("http://192.168.1.10:3303/api/save-payment-details", {
                method: "POST",
                body: JSON.stringify({
                  orderId: data.orderID,
                  amount: "50",
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              });
            }}
          />
        </div>
      </PayPalScriptProvider>

    </>
  )
}

export default TestOne