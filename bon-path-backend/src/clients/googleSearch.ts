import { ERROR_MESSAGES } from "@lib/constants/errorMessages";
import { ClientError } from "@lib/error";
import { customsearch_v1 } from "googleapis";

export class GoogleSearchAPIClient extends customsearch_v1.Customsearch {
    private auth: string;
    private cx: string;

    constructor(option: { apiVersion: 'v1', apiKey: string, engineCx: string }) {
        const { apiKey, engineCx, ...options } = option
        super(options)
        this.auth = apiKey
        this.cx = engineCx
    }

    async searchImages(q: string, num?: number) {
        try {
            return await this.cse.list({
                auth: this.auth,
                cx: this.cx,
                q,
                searchType: 'image',
                num
            })
        } catch (e) {
            if (e instanceof Error) {
                throw new ClientError(
                    500,
                    ERROR_MESSAGES.client.googleSearch,
                    e.message,
                    this.constructor.name,
                    'searchImages',
                    q
                )
            } else {
                throw e
            }
        }
    }
}