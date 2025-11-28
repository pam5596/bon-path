import { OpenAIEmbeddings } from "@langchain/openai";
import { describe, test } from "vitest";
import { access, constants, writeFile } from 'fs/promises';
import { request } from "./_request";
import { createLoginSession } from "./_createLoginSession";
import { MRR, recallAK, textSimilarity } from "./_calculations";

import receipt_ocr_response from "./data/receipt_ocr_response.json"
import product_search_response from "./data/product_search_response.json"

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
        
        const product_names: string[] = []
        receipt_ocr_response.filter(
            r => r.products
        ).forEach(
            r => r.products!.forEach(p => {if (p.name) product_names.push(p.name)})
        )
        const unique_product_names = Array.from(new Map(product_names.map(p => [p,p])).values()).slice(0,50)

        const res = await Promise.all(
            unique_product_names.map(
                async (p) => ({
                    name: p,
                    vector: (await (await request(
                        `/products/vector-search?keyword=${p}&limit=10`, 
                        {
                            headers: new Headers({
                                'Cookie': loginSessionId
                            })
                        }
                    )).json().catch(() => ({ products: [] }))).products || [],
                    google: (await (await request(
                        `/products/google-search?keyword=${p}&limit=10`, 
                        {
                            headers: new Headers({
                                'Cookie': loginSessionId
                            })
                        }
                    )).json().catch(() => ({ products: [] }))).products || [],
                })
            )
        )

        try {
            await access('./tests/experiment/data/product_search_response.json', constants.F_OK);
        } catch {
            await writeFile(`./tests/experiment/data/product_search_response.json`, JSON.stringify(res, null, 4))
        }
    })

    test.only('評価実験', async () => {
        console.log(product_search_response.length)
        const vector_ranks: number[] = []
        const google_ranks: number[] = []

        const scores = await Promise.all(
            ks.map(
                async (k) => {
                    const presents = await Promise.all(product_search_response.map(
                        async (product) => {
                            let vector_present = false
                            let google_present = false

                            for (const [i, vector_product] of product.vector.slice(0, k).entries()) {
                                const [a, b] = await openAiEmbedding.embedDocuments([product.name, vector_product.name])
                                const vector_score = textSimilarity(a,b)
                                if (vector_score >= match_base_score) {
                                    vector_present = true
                                    if (k == 10) vector_ranks.push(i+1)
                                }
                            }

                            for (const [i, google_product] of product.google.slice(0, k).entries()) {
                                const [a, b] = await openAiEmbedding.embedDocuments([product.name, google_product.name])
                                const google_score = textSimilarity(a,b)
                                if (google_score >= match_base_score) {
                                    google_present = true
                                    if (k == 10) google_ranks.push(i+1)
                                }
                            }

                            return {
                                name: product.name,
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

        await writeFile(`./tests/experiment/data/product_search_scores.json`, JSON.stringify([
            ...scores,
            {
                vector: MRR(vector_ranks),
                google: MRR(google_ranks)
            }
        ], null, 4))
    })
})