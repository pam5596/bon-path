import { OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from "@hono/swagger-ui";
import { logger } from 'hono/logger';
import { corsHandler, errorHandler, loginSessionHandler, verifySessionHandler } from '@lib/middleware';
import { 
    getLoginSession,
    createLoginSession,
    deleteLoginSession,
    getVerifySession,
    createVerifySession,
    deleteVerifySession,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    getUserReceipts,
    getUserPurchases,
    createReceipt,
    deleteReceipt,
    getReceipt,
    updateReceipt,
    getReceiptPurchases,
    getReceiptImages,
    putReceiptImage,
    deleteReceiptImage,
    createPurchases,
    deletePurchase,
    getPurchase,
    createStore,
    deleteStore,
    getStore,
    getStoreProducts,
    getStores,
    googleMapSearchStores,
    updateStore,
    vectorSearchStores,
    createProducts,
    deleteProduct,
    getProduct,
    getProducts,
    googleSearchProducts,
    updateProduct,
    vectorSearchProducts,
    createCategories,
    deleteCategory,
    getCategory,
    getCategoryChildren,
    getCategoryProducts,
    gptOcr
} from '@routes/index';
import { HTTPException } from 'hono/http-exception';
import { ZodError } from 'zod';

const app = new OpenAPIHono({
    defaultHook: (result) => {
        if (!result.success && result.error instanceof ZodError) 
            throw new HTTPException(
                400,
                {
                    message: result.error.issues.map((i) => i.message).join(', '),
                    cause: result.error
                }
            )
    }
})

app.use('*', corsHandler)
app.onError(errorHandler)
app.use('*', loginSessionHandler)
app.use('*', verifySessionHandler)
app.use(logger())

app.openapi(getLoginSession.route, getLoginSession.handler)
app.openapi(createLoginSession.route, createLoginSession.handler)
app.openapi(deleteLoginSession.route, deleteLoginSession.handler)
app.openapi(getVerifySession.route, getVerifySession.handler)
app.openapi(createVerifySession.route, createVerifySession.handler)
app.openapi(deleteVerifySession.route, deleteVerifySession.handler)

app.openapi(createUser.route, createUser.handler)
app.openapi(getUser.route, getUser.handler)
app.openapi(updateUser.route, updateUser.handler)
app.openapi(deleteUser.route, deleteUser.handler)
app.openapi(getUserReceipts.route, getUserReceipts.handler)
app.openapi(getUserPurchases.route, getUserPurchases.handler)

app.openapi(createReceipt.route, createReceipt.handler)
app.openapi(deleteReceipt.route, deleteReceipt.handler)
app.openapi(getReceipt.route, getReceipt.handler)
app.openapi(updateReceipt.route, updateReceipt.handler)
app.openapi(getReceiptPurchases.route, getReceiptPurchases.handler)
app.openapi(getReceiptImages.route, getReceiptImages.handler)

app.openapi(putReceiptImage.route, putReceiptImage.handler)
app.openapi(deleteReceiptImage.route, deleteReceiptImage.handler)

app.openapi(createPurchases.route, createPurchases.handler)
app.openapi(deletePurchase.route, deletePurchase.handler)
app.openapi(getPurchase.route, getPurchase.handler)

app.openapi(vectorSearchStores.route, vectorSearchStores.handler)
app.openapi(googleMapSearchStores.route,googleMapSearchStores.handler)
app.openapi(deleteStore.route, deleteStore.handler),
app.openapi(getStore.route, getStore.handler),
app.openapi(updateStore.route, updateStore.handler)
app.openapi(getStoreProducts.route, getStoreProducts.handler)
app.openapi(createStore.route, createStore.handler)
app.openapi(getStores.route, getStores.handler)

app.openapi(vectorSearchProducts.route, vectorSearchProducts.handler)
app.openapi(googleSearchProducts.route, googleSearchProducts.handler)
app.openapi(deleteProduct.route, deleteProduct.handler)
app.openapi(getProduct.route, getProduct.handler)
app.openapi(updateProduct.route, updateProduct.handler)
app.openapi(createProducts.route, createProducts.handler)
app.openapi(getProducts.route, getProducts.handler)

app.openapi(createCategories.route, createCategories.handler)
app.openapi(deleteCategory.route, deleteCategory.handler)
app.openapi(getCategory.route, getCategory.handler)
app.openapi(getCategoryChildren.route, getCategoryChildren.handler)
app.openapi(getCategoryProducts.route, getCategoryProducts.handler)

app.openapi(gptOcr.route, gptOcr.handler)

if (process.env.NODE_ENV == 'development') {
    app.doc('/doc', {
        openapi: '3.0.0',
        info: {
            version: '1.0.0',
            title: 'BonPathAPI',
        },
    })
    app.get("/docs", swaggerUI({ url: "/doc" }))
} else if (process.env.NODE_ENV == 'test') {
    app.get('/signup', (c) => c.text('Redirect test: /signup'))
    app.get('/signin/email-verify', (c) => c.text('Redirect test: /signin/email-verify'))
    app.get('/login', (c) => c.text('Redirect test: /login'))
}

export default app