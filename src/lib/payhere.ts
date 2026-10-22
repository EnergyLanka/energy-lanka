import crypto from "crypto";

const md5 = (s: string) =>
  crypto.createHash("md5").update(s).digest("hex").toUpperCase();

export function payHereCheckoutHash(
  orderId: string,
  amount: number,
  currency = "LKR"
) {
  const merchantId = process.env.PAYHERE_MERCHANT_ID || "";
  const secret = process.env.PAYHERE_MERCHANT_SECRET || "";
  return md5(merchantId + orderId + amount.toFixed(2) + currency + md5(secret));
}

export function verifyPayHereNotify(body: Record<string, string>) {
  const secret = process.env.PAYHERE_MERCHANT_SECRET || "";
  const local = md5(
    body.merchant_id +
      body.order_id +
      body.payhere_amount +
      body.payhere_currency +
      body.status_code +
      md5(secret)
  );
  return local === body.md5sig;
}

export const PAYHERE_CHECKOUT_URL = (sandbox: boolean) =>
  sandbox
    ? "https://sandbox.payhere.lk/pay/checkout"
    : "https://www.payhere.lk/pay/checkout";
