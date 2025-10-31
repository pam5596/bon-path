export default function() {
    // [ref]: 
    // * store: StoreModel - 店舗情報
    // * receipts: ReceiptModel[] - レシート情報
    // * receiptImages: ReceiptImage[] - レシート画像
    
    // [mount]:
    // * [GET] /stores/:storeId - 店舗情報
    // * [GET] /user/purchases - ユーザーの購入履歴
    // * [GET] /receipts/:receiptId - レシート情報を取得する
    // * [GET] /receipts/:receiptId/images - レシート画像を取得する
    
    // [events]:
    // * toReceipt: ボタン押下で/purchase-history/stores/:storeId/receipt/:receiptIdへ遷移する
    // * onDeleteReceipt: ボタン押下でレシートを削除する
}