import crypto from 'crypto';

// ─── ICICI Orange PG Configuration ────────────────────────────────────────────

const ICICI_CONFIG = {
  merchantId: process.env.ICICI_MERCHANT_ID || '',
  aggregatorId: process.env.ICICI_AGGREGATOR_ID || '',
  apiKey: process.env.ICICI_API_KEY || '',
  initiateSaleUrl: process.env.ICICI_INITIATE_SALE_URL || 'https://pgpay.icicibank.com/pg/api/v2/initiateSale',
  statusCheckUrl: process.env.ICICI_STATUS_CHECK_URL || 'https://pgpay.icicibank.com/pg/api/command',
  returnUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/cne/payment/callback`,
};

export function getICICIConfig() {
  return { ...ICICI_CONFIG };
}

// ─── Response Codes ───────────────────────────────────────────────────────────

export const ICICI_SUCCESS_CODES = ['0000', '000'];

export function isPaymentSuccess(responseCode: string): boolean {
  return ICICI_SUCCESS_CODES.includes(responseCode);
}

// ─── Secure Hash Generation ───────────────────────────────────────────────────
// Per ICICI spec: sort params alphabetically by key name, concatenate values
// directly (no delimiter), then HMAC-SHA256 with the API key.

/**
 * Generates the secureHash for ICICI initiateSale request.
 *
 * Hash algorithm (from ICICI Orange PG spec):
 * 1. Take all request parameters (excluding secureHash itself)
 * 2. Sort parameter NAMES alphabetically (case-sensitive)
 * 3. Concatenate their VALUES directly (no delimiter)
 * 4. Generate HMAC-SHA256 of the concatenated string using the API key
 */
export function generateSecureHash(
  params: Record<string, string>,
  key?: string
): string {
  const secretKey = key || ICICI_CONFIG.apiKey;

  // Sort keys alphabetically and concatenate values (no delimiter)
  const sortedKeys = Object.keys(params).sort();
  const hashString = sortedKeys.map(k => params[k]).join('');

  const hash = crypto
    .createHmac('sha256', secretKey)
    .update(hashString)
    .digest('hex');

  return hash;
}

/**
 * Verifies the secureHash received in the ICICI callback response.
 *
 * For response verification: sort response param names alphabetically
 * (excluding 'securehash'/'secureHash'), concatenate values directly (no delimiter),
 * HMAC-SHA256 with key, then compare.
 */
export function verifySecureHash(
  responseParams: Record<string, string>,
  receivedHash: string,
  key?: string
): boolean {
  const secretKey = key || ICICI_CONFIG.apiKey;

  // Remove the secureHash/securehash from params before computation
  const paramsToHash: Record<string, string> = {};
  for (const [k, v] of Object.entries(responseParams)) {
    if (k.toLowerCase() !== 'securehash') {
      paramsToHash[k] = v;
    }
  }

  const computedHash = generateSecureHash(paramsToHash, secretKey);
  return computedHash.toLowerCase() === receivedHash.toLowerCase();
}

// ─── Transaction Helpers ──────────────────────────────────────────────────────

/**
 * Generates a unique merchant transaction number.
 * Format: SVS{timestamp}{random4chars} e.g. SVS20260303120000A3F1
 */
export function generateMerchantTxnNo(): string {
  const timestamp = formatTxnDate();
  const random = crypto.randomBytes(2).toString('hex').toUpperCase();
  return `SVS${timestamp}${random}`;
}

/**
 * Formats current date/time as YYYYMMDDHHmmss per ICICI requirement.
 */
export function formatTxnDate(date?: Date): string {
  const d = date || new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

// ─── API Calls ────────────────────────────────────────────────────────────────

export interface InitiateSaleParams {
  merchantTxnNo: string;
  amount: string; // e.g. "100.00"
  customerName: string;
  customerMobileNo: string;
  customerEmailID?: string;
  addlParam1?: string; // registrationId
  addlParam2?: string; // workshopId
}

export interface InitiateSaleResponse {
  responseCode: string;
  merchantId: string;
  aggregatorID: string;
  merchantTxnNo: string;
  redirectURI: string;
  tranCtx: string;
  showOTPCapturePage: string;
  generateOTPURI: string | null;
  verifyOTPURI: string | null;
  authorizeURI: string | null;
  secureHash: string;
}

/**
 * Calls ICICI initiateSale API.
 * Returns redirect URL + transaction context on success.
 */
export async function initiateSale(params: InitiateSaleParams): Promise<{
  success: boolean;
  redirectUrl?: string;
  tranCtx?: string;
  secureHashSent: string;
  rawRequest: string;
  rawResponse?: string;
  error?: string;
}> {
  const config = getICICIConfig();

  // Build request payload (all fields that go into hash must be here)
  const requestParams: Record<string, string> = {
    merchantId: config.merchantId,
    aggregatorID: config.aggregatorId,
    merchantTxnNo: params.merchantTxnNo,
    amount: params.amount,
    currencyCode: '356', // INR
    payType: '0', // All payment modes
    customerEmailID: params.customerEmailID || 'noreply@svsnursing.org',
    transactionType: 'SALE',
    returnURL: config.returnUrl,
    txnDate: formatTxnDate(),
    customerMobileNo: params.customerMobileNo,
    customerName: params.customerName,
  };

  // Add optional params only if provided (they affect hash)
  if (params.addlParam1) requestParams.addlParam1 = params.addlParam1;
  if (params.addlParam2) requestParams.addlParam2 = params.addlParam2;

  // Generate secure hash
  const secureHash = generateSecureHash(requestParams);
  const fullPayload = { ...requestParams, secureHash };
  const rawRequest = JSON.stringify(fullPayload);

  try {
    const response = await fetch(config.initiateSaleUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: rawRequest,
    });

    const responseText = await response.text();
    let data: InitiateSaleResponse;

    try {
      data = JSON.parse(responseText);
    } catch {
      return {
        success: false,
        secureHashSent: secureHash,
        rawRequest,
        rawResponse: responseText,
        error: 'Invalid JSON response from ICICI gateway',
      };
    }

    if (data.responseCode === 'R1000' && data.redirectURI && data.tranCtx) {
      return {
        success: true,
        redirectUrl: `${data.redirectURI}?tranCtx=${data.tranCtx}`,
        tranCtx: data.tranCtx,
        secureHashSent: secureHash,
        rawRequest,
        rawResponse: responseText,
      };
    }

    return {
      success: false,
      secureHashSent: secureHash,
      rawRequest,
      rawResponse: responseText,
      error: `ICICI responded with code: ${data.responseCode}`,
    };
  } catch (err: any) {
    return {
      success: false,
      secureHashSent: secureHash,
      rawRequest,
      error: `Network error calling ICICI: ${err.message}`,
    };
  }
}

/**
 * Calls ICICI status check API to verify a transaction.
 */
export async function checkTransactionStatus(merchantTxnNo: string): Promise<{
  success: boolean;
  data?: Record<string, any>;
  rawResponse?: string;
  error?: string;
}> {
  const config = getICICIConfig();

  const requestParams: Record<string, string> = {
    merchantId: config.merchantId,
    aggregatorID: config.aggregatorId,
    merchantTxnNo: merchantTxnNo,
    transactionType: 'STATUS',
    originalTxnNo: merchantTxnNo,
  };

  const secureHash = generateSecureHash(requestParams);
  const fullPayload = { ...requestParams, secureHash };

  try {
    const response = await fetch(config.statusCheckUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fullPayload),
    });

    const responseText = await response.text();
    let data: Record<string, any>;

    try {
      data = JSON.parse(responseText);
    } catch {
      return {
        success: false,
        rawResponse: responseText,
        error: 'Invalid JSON response from ICICI status check',
      };
    }

    return {
      success: true,
      data,
      rawResponse: responseText,
    };
  } catch (err: any) {
    return {
      success: false,
      error: `Network error calling ICICI status check: ${err.message}`,
    };
  }
}
