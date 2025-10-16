import { RouteConfig } from "@hono/zod-openapi";
import { PathsEnum } from "./enums";

export const loginSessionPaths: {
    path: PathsEnum,
    method: RouteConfig['method']
}[] = [
    {
        path: '/session/login',
        method: 'get'
    },
    {
        path: '/session/login',
        method: 'delete'
    },
    {
        path: '/users',
        method: 'get'
    },
    {
        path: '/users',
        method: 'patch'
    },
    {
        path: '/users',
        method: 'delete'
    },
    {
        path: '/users/receipts',
        method: 'get'
    },
    {
        path: '/users/purchases',
        method: 'get'
    },
    {
        path: '/receipts',
        method: 'post'
    },
    {
        path: '/receipts/:id',
        method: 'get'
    },
    {
        path: '/receipts/:id',
        method: 'patch'
    },
    {
        path: '/receipts/:id',
        method: 'delete'
    },
    {
        path: '/receipts/:receiptId/purchases',
        method: 'get'
    },
    {
        path: '/receipts/:receiptId/images',
        method: 'get'
    },
    {
        path: '/receipt-images',
        method: 'post'
    },
    {
        path: '/receipt-images/:id',
        method: 'delete'
    },
    {
        path: '/purchases',
        method: 'post'
    },
    {
        path: '/purchases/:id',
        method: 'get'
    },
    {
        path: '/purchases/:id',
        method: 'delete'
    },
    {
        path: '/stores',
        method: 'get'
    },
    {
        path: '/stores',
        method: 'post'
    },
    {
        path: '/stores/:id',
        method: 'get'
    },
    {
        path: '/stores/:id',
        method: 'patch'
    },
    {
        path: '/stores/:id',
        method: 'delete'
    },
    {
        path: '/stores/:storeId/products',
        method: 'get'
    },
    {
        path: '/stores/vector-search',
        method: 'get'
    },
    {
        path: '/stores/google-map-search',
        method: 'get'
    },
    {
        path: '/products',
        method: 'get'
    },
    {
        path: '/products',
        method: 'post'
    },
    {
        path: '/products/:id',
        method: 'get'
    },
    {
        path: '/products/:id',
        method: 'patch'
    },
    {
        path: '/products/:id',
        method: 'delete'
    },
    {
        path: '/products/vector-search',
        method: 'get'
    },
    {
        path: '/products/google-search',
        method: 'get'
    },
    {
        path: '/categories',
        method: 'post' 
    },
    {
        path: '/categories/:id',
        method: 'get'
    },
    {
        path: '/categories/:id',
        method: 'delete'
    },
    {
        path: '/categories/:parentId/children',
        method: 'get'
    },
    {
        path: '/categories/:categoryId/products',
        method: 'get'
    },
    {
        path: '/gpt-ocr',
        method: 'post'
    }
]