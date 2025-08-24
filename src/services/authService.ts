// Serviço de autenticação (usa NocoDB diretamente com chaves hardcoded)
import axios from 'axios';

// WARNING: hardcoded values. Do NOT commit real tokens to public repos.
const NOCODB_BASE = 'https://dashboard.evgrupo.com/api/v2';
const NOCODB_USERS_TABLE_ID = 'mtqazhqh2cyvkug';
const NOCODB_TOKEN = '0UX34qYiSArgNo1zK0v06y4a_R7NMbhuS3g76V_e';

// NOTE: nocodb-sdk was removed from this service because some SDK methods
// expect a "base" (project) name and a table *name*, not a table ID. Using
// the REST endpoint `/tables/{tableId}/records` via axios is more reliable
// when we only have the table ID.

export interface RegisterPayload {
	name: string;
	email: string;
	password: string;
}

export interface LoginResponse {
	success: boolean;
	message: string;
	data?: unknown;
}

/**
 * Register a new user in NocoDB users table.
 * This will create a new record with fields matching the payload keys.
 */
export async function register(payload: RegisterPayload): Promise<LoginResponse> {
	const url = `${NOCODB_BASE}/tables/${NOCODB_USERS_TABLE_ID}/records`;
	try {
	  const body = {
	    email: payload.email,
	    name: payload.name,
	    password: payload.password,
	    provider: 'LOCAL',
	    role: 'PUBLIC',
	  };

			// Use axios directly to POST to the table records endpoint. Try both the
			// simple body and the wrapped `{ records: [...] }` shape which NocoDB
			// sometimes expects.
			try {
				const res = await axios.post(url, body, { headers: { 'xc-token': NOCODB_TOKEN, 'Content-Type': 'application/json' } });
				return { success: true, message: 'Utilizador criado', data: res.data };
			} catch (err: unknown) {
				// narrow error for access to response
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const _err: any = err;
				const status = _err?.response?.status;
				if (status === 400) {
					try {
						const wrapper = { records: [body] };
						const res2 = await axios.post(url, wrapper, { headers: { 'xc-token': NOCODB_TOKEN, 'Content-Type': 'application/json' } });
						return { success: true, message: 'Utilizador criado (via wrapper)', data: res2.data };
					} catch (_) {
						// fallthrough to outer error handler
					}
				}
				throw err;
			}
    
		} catch (err: unknown) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const _err: any = err;
			const respData = _err?.response?.data;
		// try to fetch a sample record to help debug which fields are accepted
		let sampleRecord: unknown = null;
		try {
			const sampleRes = await axios.get(`${NOCODB_BASE}/tables/${NOCODB_USERS_TABLE_ID}/records`, {
				headers: { 'xc-token': NOCODB_TOKEN },
				params: { limit: '1' },
			});
			sampleRecord = sampleRes.data;
		} catch (sampleErr) {
			// ignore
		}

		const message = respData?.message || (typeof respData === 'object' ? JSON.stringify(respData) : _err?.message) || 'Erro ao registar';
		return { success: false, message: `${message}. sample:${JSON.stringify(sampleRecord)}`, data: { resp: respData, sample: sampleRecord } };
	}
}

/**
 * Login: query the users table for a matching email/password record.
 * Note: Storing passwords in plaintext is insecure; this follows the user's request to use NocoDB directly.
 */
export async function login(email: string, password: string): Promise<LoginResponse> {
	const url = `${NOCODB_BASE}/tables/${NOCODB_USERS_TABLE_ID}/records`;
	const params = {
		where: `email='${email}' AND password='${password}'`,
		limit: '1',
	};

	try {
		const res = await axios.get(url, { headers: { 'xc-token': NOCODB_TOKEN }, params });
		const records = res.data?.list || res.data?.data || res.data?.records || res.data;
		if (Array.isArray(records) && records.length > 0) {
			return { success: true, message: 'Login bem sucedido', data: records[0] };
		}
		return { success: false, message: 'Credenciais inválidas' };
	} catch (err: unknown) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const e = err as any;
		return { success: false, message: e?.response?.data?.message || e?.message || 'Erro ao autenticar' };
	}
}
