import { OpenAIEmbeddings } from "@langchain/openai";
import { describe, test } from "vitest";
import { writeFile } from 'fs/promises';
import { request } from "./_request";
import { createLoginSession } from "./_createLoginSession";
import { average, F1, precision, recall, textSimilarity } from "./_calculations";

import image_names from "./receipt_images.json"
import annotations from "./annotation.json"
import response from "./data/receipt_ocr_response.json"

describe('レシート解析機能の評価実験', () => {
    const match_base_score = 0.6
    const openAiEmbedding = new OpenAIEmbeddings({
        model: 'text-embedding-3-small',
        apiKey: process.env.OPEN_AI_API_KEY!,
    });

    test('環境変数のチェック', async () => {
        console.log(process.env.AWS_S3_ENDPOINT)
        console.log(process.env.BACKEND_DOMAIN)
    })

    test('特定のディレクトリへレシート画像をダウンロード', async () => {
        const save_path = "./tests/experiment/data"
        let success = 0;
        let error = 0;
        const error_images: string[] = []

        await Promise.all(
            image_names.map(
                async (image) => {
                    try {
                        const res = await fetch(
                            `${process.env.AWS_S3_ENDPOINT}/receipts/${image.name}`
                        )
                        const buffer = await res.arrayBuffer()
                        await writeFile(`${save_path}${image.name}`, Buffer.from(buffer))
                        success++
                    } catch {
                        error++
                        error_images.push(image.name)
                    }
            })
        )

        console.log(`[Saved] success: ${success} / error: ${error}`)
        console.log(`error images: ${error_images.join('\n')}`)
    })
    
    test('OCR解析結果をresponse.jsonへ', async () => {
        const loginSessionId = await createLoginSession({
            email: "pam@example.com",
            password: "pam5596"
        })

        const res = await Promise.all(
            image_names.map(
                async (annotation) => ({
                    image: annotation.name,
                    ...await (await request('/gpt-ocr', {
                        method: 'POST',
                        headers: new Headers({
                            'Cookie': loginSessionId
                        }),
                        body: JSON.stringify({
                            images: [`/receipts/${annotation.name}`]
                        })
                    })).json()
                })
            )
        )
        
        await writeFile(`./tests/experiment/data/receipt_ocr_response.json`, JSON.stringify(res, null, 4))
    })

    test('店舗名抽出の正解率・適合率・再現率・F1スコアの算出', async () => {
        const FN_store = response.filter((r) => !r.store)
        const TP_store = []
        const FP_store = []
        
        await Promise.all(
            response.map(
                async (r, i) => {
                    if (r.store) {
                        const [a, b] = await openAiEmbedding.embedDocuments([r.store.name, annotations[i].store.name])
                        const score = textSimilarity(a, b)
                        if (score >= match_base_score) {
                            TP_store.push(r)
                        } else {
                            FP_store.push(r)
                        }
                    }
                }
            )
        )

        const scores = {
            TP: TP_store.length,
            FP: FP_store.length,
            FN: FN_store.length,
            precision: precision(TP_store.length, FP_store.length),
            recall: recall(TP_store.length, FN_store.length),
            f1: F1(TP_store.length, FP_store.length, FN_store.length)
        }

        await writeFile(`./tests/experiment/data/store_scores.json`, JSON.stringify(scores, null, 4))
    })

    test('商品名抽出の正解率・適合率・再現率・F1スコアの算出', async () => {
        const FN_product: number[] = []
        const TP_product: number[] = []
        const FP_product: number[] = []

        await Promise.all(response.map(
            async (r, i) => {
                const TPs_product = []
                const FPs_product = []
                const FNs_product = []

                if (r.products) {
                    // console.log(r.products.length == annotations[i].products.length)
                    await Promise.all(r.products.map(
                        async (response_p, j) => {
                            if (response_p.name) {
                                const [a, b] = await openAiEmbedding.embedDocuments([annotations[i].products[j].name, response_p.name])
                                const score = textSimilarity(a, b)

                                if (score >= match_base_score) {
                                    TPs_product.push(response_p)
                                } else {
                                    FPs_product.push(response_p)
                                }
                            } else {
                                FNs_product.push(response_p)
                            }
                        }
                    ))
                    TP_product.push(TPs_product.length)
                    FP_product.push(FPs_product.length)
                    FN_product.push(FNs_product.length)
                }
            }
        ))

        const TP = average(TP_product)
        const FP = average(FP_product)
        const FN = average(FN_product)
        const precision_avg = average(TP_product.map((tp, i) => precision(tp, FP_product[i])))
        const recall_avg = average(TP_product.map((tp, i) => precision(tp, FN_product[i])))
        const f1_avg = average(TP_product.map((tp, i) => F1(tp, FP_product[i], FN_product[i])))

        const scores = {
            TP, FP, FN,
            precision_avg,
            recall_avg,
            f1_avg
        }

        await writeFile(`./tests/experiment/data/product_name_scores.json`, JSON.stringify(scores, null, 4))
    })

    test('価格抽出の正解率・適合率・再現率・F1スコアの算出', async () => {
        const FN_product: number[] = []
        const TP_product: number[] = []
        const FP_product: number[] = []

        response.forEach(
            (r, i) => {
                const TPs_product = []
                const FPs_product = []
                const FNs_product = []

                if (r.products) {
                    r.products.forEach(
                        (response_p, j) => {
                            if (response_p.price) {
                                if (response_p.price == annotations[i].products[j].price) {
                                    TPs_product.push(response_p)
                                } else {
                                    FPs_product.push(response_p)
                                }
                            } else {
                                FNs_product.push(response_p)
                            }
                        }
                    )
                    TP_product.push(TPs_product.length)
                    FP_product.push(FPs_product.length)
                    FN_product.push(FNs_product.length)
                }
            }
        )

        const TP = average(TP_product)
        const FP = average(FP_product)
        const FN = average(FN_product)
        const precision_avg = average(TP_product.map((tp, i) => precision(tp, FP_product[i])))
        const recall_avg = average(TP_product.map((tp, i) => precision(tp, FN_product[i])))
        const f1_avg = average(TP_product.map((tp, i) => F1(tp, FP_product[i], FN_product[i])))

        const scores = {
            TP, FP, FN,
            precision_avg,
            recall_avg,
            f1_avg
        }

        await writeFile(`./tests/experiment/data/product_price_scores.json`, JSON.stringify(scores, null, 4))
    })

    test.only('数量抽出の正解率・適合率・再現率・F1スコアの算出', async () => {
        const FN_product: number[] = []
        const TP_product: number[] = []
        const FP_product: number[] = []

        response.forEach(
            (r, i) => {
                const TPs_product = []
                const FPs_product = []
                const FNs_product = []

                if (r.products) {
                    r.products.forEach(
                        (response_p, j) => {
                            if (response_p.quantity) {
                                if (response_p.quantity == annotations[i].products[j].quantity) {
                                    TPs_product.push(response_p)
                                } else {
                                    FPs_product.push(response_p)
                                }
                            } else {
                                FNs_product.push(response_p)
                            }
                        }
                    )
                    TP_product.push(TPs_product.length)
                    FP_product.push(FPs_product.length)
                    FN_product.push(FNs_product.length)
                }
            }
        )

        const TP = average(TP_product)
        const FP = average(FP_product)
        const FN = average(FN_product)
        const precision_avg = average(TP_product.map((tp, i) => precision(tp, FP_product[i])))
        const recall_avg = average(TP_product.map((tp, i) => precision(tp, FN_product[i])))
        const f1_avg = average(TP_product.map((tp, i) => F1(tp, FP_product[i], FN_product[i])))

        const scores = {
            TP, FP, FN,
            precision_avg,
            recall_avg,
            f1_avg
        }

        await writeFile(`./tests/experiment/data/product_quantity_scores.json`, JSON.stringify(scores, null, 4))
    })
})