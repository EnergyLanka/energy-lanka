import md5 from "md5";

export function payHereCheckoutHash(
  orderId: string,
  amount: number,
  currency = "LKR"
) {
  const merchantId = process.env.PAYHERE_MERCHANT_ID || "";
  const secret = process.env.PAYHERE_MERCHANT_SECRET || "";

  // 1. Create the hashed secret (Uppercase MD5)
  const hashedSecret = md5(secret).toUpperCase();

  // 2. Format the amount to exactly two decimal places
  const amountFormatted = amount.toFixed(2);

  // 3. Concatenate the string in the exact order PayHere requires
  const stringToHash = merchantId + orderId + amountFormatted + currency + hashedSecret;

  // 4. Return the final hash in Uppercase
  return md5(stringToHash).toUpperCase();
}

export function verifyPayHereNotify(body: Record<string, string>) {
  const secret = process.env.PAYHERE_MERCHANT_SECRET || "";
  const hashedSecret = md5(secret).toUpperCase();
  
  const localString = body.merchant_id + body.order_id + body.payhere_amount + body.payhere_currency + body.status_code + hashedSecret;
  const localHash = md5(localString).toUpperCase();
  
  return localHash === body.md5sig;
}

export const PAYHERE_CHECKOUT_URL = (sandbox: boolean) =>
  sandbox
    ? "https://sandbox.payhere.lk/pay/checkout"
    : "https://www.payhere.lk/pay/checkout";
