export default function() {
    // [ref]: 
    // * receiptImages: ReceiptImage[] - レシート画像
    // * stores: StoreModel[] - 店舗情報
    // * products: ProductModel[] - 商品情報
    
    // [mount]:
    // * [POST] /gpt-ocr - レシートをOCR分析する
    // * [GET] /stores/vector-search - 店舗情報をベクトル検索する
    // * [GET] /products/vector-search - 商品情報をベクトル検索する
    // * [GET] /categories/:id - 商品カテゴリーを取得する

    // [events]:
    // * onStoreGoogleMapSearch: 店舗情報をGoogleMapで検索する
    // * onProductGoogleSearch: 商品情報をGoogleで検索する
    // * onSavePurchases: 登録したレシートを購入履歴として保存する。検索結果を使っていた場合、新規で登録する。
}