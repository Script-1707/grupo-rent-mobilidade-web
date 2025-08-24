import axios from 'axios';

const NOCODB_BASE = 'https://dashboard.evgrupo.com/api/v2';
const NOCODB_CONTACTS_TABLE_ID = 'm4b05nd6ygz7lgm';
const NOCODB_TOKEN = '0UX34qYiSArgNo1zK0v06y4a_R7NMbhuS3g76V_e';

export interface ContactInquiryPayload {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface PersistContactResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export async function listNocoRecords(options?: { offset?: number; limit?: number; where?: string; viewId?: string; }) {
  const url = `${NOCODB_BASE}/tables/${NOCODB_CONTACTS_TABLE_ID}/records`;
  const params: Record<string, string> = {};
  if (options?.offset !== undefined) params.offset = String(options.offset);
  if (options?.limit !== undefined) params.limit = String(options.limit);
  if (options?.where !== undefined) params.where = options.where;
  if (options?.viewId !== undefined) params.viewId = options.viewId;

  const res = await axios.get(url, {
    headers: { 'xc-token': NOCODB_TOKEN },
    params,
  });
  return res.data;
}

export async function createContactRecord(payload: ContactInquiryPayload): Promise<PersistContactResponse> {
  try {
    const url = `${NOCODB_BASE}/tables/${NOCODB_CONTACTS_TABLE_ID}/records`;
    const res = await axios.post(url, payload, {
      headers: {
        'xc-token': NOCODB_TOKEN,
        'Content-Type': 'application/json',
      },
    });

    return {
      success: true,
      message: 'Registro criado com sucesso no NocoDB',
      data: res.data,
    };
  } catch (err: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const e = err as any;
    const message = e?.response?.data?.message || e?.message || 'Erro desconhecido';
    return { success: false, message };
  }
}
