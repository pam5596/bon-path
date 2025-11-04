export type PathsEnum = 
    '/session/login' | 
    '/session/verify' | 
    '/users' |
    '/users/receipts' |
    '/users/purchases' |
    '/users/purchases/stores' |
    '/users/purchases/stores/:storeId/receipts' |
    '/receipts' |
    '/receipts/:id' |
    '/receipts/:receiptId/purchases' |
    '/receipts/:receiptId/images' |
    '/receipt-images' |
    '/receipt-images/:id' |
    '/purchases' |
    '/purchases/:id' |
    '/stores' |
    '/stores/:id' |
    '/stores/:storeId/products' |
    '/stores/vector-search' |
    '/stores/google-map-search' |
    '/products' |
    '/products/:id' |
    '/products/vector-search' |
    '/products/google-search' |
    '/categories' |
    '/categories/:id' |
    '/categories/:parentId/children' |
    '/categories/:categoryId/products' |
    '/gpt-ocr';

export type TagsEnum = 
    'ログインセッションをリソースとするルート' |
    'メアド確認用セッションをリソースとするルート' |
    'ユーザー情報をリソースとするルート' |
    'レシート情報をリソースとするルート' |
    'レシート画像をリソースとするルート' |
    '購入履歴をリソースとするルート' |
    '店舗情報をリソースとするルート' |
    '商品情報をリソースとするルート' |
    '商品カテゴリーをリソースとするルート' |
    'ChatGPTのOCR分析ルート'
