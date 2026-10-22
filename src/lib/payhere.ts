import crypto from "crypto";

export function payHereCheckoutHash(
  orderId: string,
  amount: number,
  currency = "LKR"
) {
  const merchantId = process.env.PAYHERE_MERCHANT_ID || "";
  const secret = process.env.PAYHERE_MERCHANT_SECRET || "";

  // Create the hashed secret
  const hashedSecret = crypto
    .createHash("md5")
    .update(secret)
    .digest("hex")
    .toUpperCase();

  // Format the amount
  const amountFormatted = amount.toFixed(2);

  // Concatenate the string in the exact order PayHere requires
  const stringToHash = merchantId + orderId + amountFormatted + currency + hashedSecret;

  // Return the final hash
  return crypto
    .createHash("md5")
    .update(stringToHash)
    .digest("hex")
    .toUpperCase();
}

export function verifyPayHereNotify(body: Record<string, string>) {
  const secret = process.env.PAYHERE_MERCHANT_SECRET || "";
  const hashedSecret = crypto.createHash("md5").update(secret).digest("hex").toUpperCase();
  
  const localString = body.merchant_id + body.order_id + body.payhere_amount + body.payhere_currency + body.status_code + hashedSecret;
  const localHash = crypto.createHash("md5").update(localString).digest("hex").toUpperCase();
  
  return localHash === body.md5sig;
}

export const PAYHERE_CHECKOUT_URL = (sandbox: boolean) =>
  sandbox
    ? "https://sandbox.payhere.lk/pay/checkout"
    : "https://www.payhere.lk/pay/checkout";
