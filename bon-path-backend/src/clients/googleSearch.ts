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

    async searchImages(q: string) {
        return await this.cse.list({
            auth: this.auth,
            cx: this.cx,
            q,
            searchType: 'image',
            num: 10
        })
    }
}