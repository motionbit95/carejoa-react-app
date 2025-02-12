const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const db = admin.firestore();

require("dotenv").config();

/**
 * @route POST /complete
 * @description Handles payment completion and updates user cash
 */
router.post("/complete", async (req, res) => {
  try {
    const { paymentId, amount, uid, cash } = JSON.parse(req.body);

    console.log(paymentId, amount, uid, cash);

    // Call PortOne API to retrieve payment details
    const paymentResponse = await fetch(
      `https://api.portone.io/payments/${encodeURIComponent(paymentId)}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `PortOne ${process.env.PORTONE_API_KEY}`,
        },
      }
    );
    if (!paymentResponse.ok) {
      throw new Error(`paymentResponse: ${await paymentResponse.json()}`);
    }
    const payment = await paymentResponse.json();

    if (payment.amount.total === amount) {
      switch (payment.status) {
        case "VIRTUAL_ACCOUNT_ISSUED":
          // Handle virtual account issuance
          console.log("Virtual account issued:", payment);
          break;

        case "PAID":
          // Save payment data to Firestore
          const paymentDocRef = db
            .collection("database")
            .doc("carejoa")
            .collection("PAYMENTS")
            .doc(paymentId);

          await paymentDocRef.set(
            { ...payment, uid: uid, cash: cash },
            { merge: true }
          );
          console.log("Payment document saved.");

          // Update user cash
          const userDocRef = db
            .collection("database")
            .doc("carejoa")
            .collection("USERS")
            .doc(uid);

          const userInfo = (await userDocRef.get()).data();
          await userDocRef.update(
            { cash: (userInfo.cash || 0) + cash },
            { merge: true }
          );
          console.log("User document updated.");

          res.status(200).send(payment);
          break;

        default:
          console.error("Unhandled payment status:", payment.status);
          res.status(400).send("Invalid payment status.");
      }
    } else {
      console.error("Payment amount mismatch.");
      res.status(400).send("Payment amount mismatch.");
    }
  } catch (e) {
    console.error("Error processing payment:", e);
    res.status(400).send(e.message);
  }
});

/**
 * @route POST /identity-verifications
 * @description Handles identity verification via PortOne API
 */
router.post("/identity-verifications", async (req, res) => {
  try {
    const { identityVerificationId } = JSON.parse(req.body);

    console.log(
      `https://api.portone.io/identity-verifications/${encodeURIComponent(
        identityVerificationId
      )}`
    );

    // Call PortOne API to retrieve identity verification details
    const verificationResponse = await fetch(
      `https://api.portone.io/identity-verifications/${encodeURIComponent(
        identityVerificationId
      )}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `PortOne ${process.env.PORTONE_API_KEY}`,
        },
      }
    );
    if (!verificationResponse.ok) {
      throw new Error(
        `verificationResponse: ${await verificationResponse.json()}`
      );
    }
    const identityVerification = await verificationResponse.json();

    if (identityVerification.status !== "VERIFIED") {
      console.error("Identity verification failed.");
      res.status(400).send("Identity verification failed.");
      return;
    }

    console.log("Identity verification:", identityVerification);
    res.status(200).send(identityVerification);
  } catch (e) {
    console.error("Error processing identity verification:", e);
    res.status(400).send(e.message);
  }
});

module.exports = router;
