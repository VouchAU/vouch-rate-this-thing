import { createHmac, timingSafeEqual } from 'crypto';

type AssertSignatureParams = {
  secret: string;
  signature: string;
  payload: any;
}

export function assertSignature(params: AssertSignatureParams) {
    const { secret, signature, payload } = params;
    const [_algorithm, _signature] = (signature).toString().split('=');

    if (!_signature) {
      if ((secret || '').length === 0) {
        return true; // unsigned
      }
      return false; // misconfigured
    }

    const selfSignedSignature = createHmac(_algorithm, secret)
        .update(payload).digest('hex');

    return timingSafeEqual(Buffer.from(_signature),
                           Buffer.from(selfSignedSignature));
}