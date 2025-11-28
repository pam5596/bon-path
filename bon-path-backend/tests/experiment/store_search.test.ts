import { OpenAIEmbeddings } from "@langchain/openai";
import { describe, test } from "vitest";
import { writeFile } from 'fs/promises';
import { request } from "./_request";
import { createLoginSession } from "./_createLoginSession";
import { MRR, recallAK, textSimilarity } from "./_calculations";

import receipt_ocr_response from "./data/receipt_ocr_response.json"
import store_search_response from "./data/store_search_response.json"

describe('店舗検索機能の評価実験', () => {
    const ks = [1,3,5,7,10]
    const match_base_score = 0.7
    const openAiEmbedding = new OpenAIEmbeddings({
        model: 'text-embedding-3-small',
        apiKey: process.env.OPEN_AI_API_KEY!,
    });

    test('検索結果をresponse.jsonへ', async () => {
        const loginSessionId = await createLoginSession({
            email: "pam@example.com",
            password: "pam5596"
        })

        const res = await Promise.all(
            receipt_ocr_response.map(
                async (r) => { 
                    if (r.store) return {
                        name: r.store.name,
                        vector: (await (await request(
                            `/stores/vector-search?keyword=${r.store.name}&limit=10`, 
                            {
                                headers: new Headers({
                                    'Cookie': loginSessionId
                                })
                            }
                        )).json()).stores,
                        google: (await (await request(
                            `/stores/google-map-search?keyword=${r.store.name}&limit=10`, 
                            {
                                headers: new Headers({
                                    'Cookie': loginSessionId
                                })
                            }
                        )).json()).stores,
                    }
                }
            )
        )
        
        await writeFile(`./tests/experiment/data/store_search_response.json`, JSON.stringify(res, null, 4))
    })

    test.only('評価実験', async () => {
        const vector_ranks: number[] = []
        const google_ranks: number[] = []

        const scores = await Promise.all(
            ks.map(
                async (k) => {
                    const presents = await Promise.all(store_search_response.map(
                        async (store) => {
                            let vector_present = false
                            let google_present = false

                            if (store?.name) {
                                for (const [i, vector_store] of store.vector.slice(0, k).entries()) {
                                    const [a, b] = await openAiEmbedding.embedDocuments([store.name, vector_store.name])
                                    const vector_score = textSimilarity(a,b)
                                    if (vector_score >= match_base_score) {
                                        vector_present = true
                                        if (k == 10) vector_ranks.push(i+1)
                                    }
                                }

                                for (const [i, google_store] of store.google.slice(0, k).entries()) {
                                    const [a, b] = await openAiEmbedding.embedDocuments([store.name, google_store.name])
                                    const google_score = textSimilarity(a,b)
                                    if (google_score >= match_base_score) {
                                        google_present = true
                                        if (k == 10) google_ranks.push(i+1)
                                    }
                                }
                            }

                            return {
                                name: store?.name,
                                vector_present,
                                google_present
                            }
                        }
                    ))

                    return {
                        k,
                        vector: recallAK(
                            presents.length,
                            presents.filter((p) => p.vector_present).length
                        ),
                        google: recallAK(
                            presents.length,
                            presents.filter((p) => p.google_present).length
                        ),
                    }
                }
            )
        )

        await writeFile(`./tests/experiment/data/store_search_scores.json`, JSON.stringify([
            ...scores,
            {
                vector: MRR(vector_ranks),
                google: MRR(google_ranks)
            }
        ], null, 4))
    })
})