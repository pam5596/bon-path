export default function() {
    // [ref]: 
    // * store: StoreModel - 店舗情報
    // * receipt: ReceiptModel - レシート情報
    // * receiptImages: ReceiptImage[] - レシート画像
    // * purchases: Purchases[] - 購入履歴
    // * products: Products[] - 商品情報
    
    // [mount]:
    // * [GET] /stores/:storeId - 店舗情報を取得する
    // * [GET] /receipts/:receiptId - レシート情報を取得する
    // * [GET] /receipts/:receiptId/images - レシート画像を取得する
    // * [GET] /receipts/:receiptId/purchases - レシートの購入履歴を取得する
    // * [GET] /products/:productId - 商品情報

    // [events]:
    // * onDeleteReceipt: ボタン押下でレシートを削除する
}