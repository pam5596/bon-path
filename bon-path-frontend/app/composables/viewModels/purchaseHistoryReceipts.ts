export default function() {
    // [ref]: 
    // * store: StoreModel - 店舗情報
    // * receipts: ReceiptModel[] - レシート情報
    // * receiptImages: ReceiptImage[] - レシート画像
    
    // [mount]:
    // * [GET] /stores/:storeId - 店舗情報を取得する
    // * [GET] /receipts/:receiptId - レシート情報を取得する
    // * [GET] /receipts/:receiptId/images - レシート画像を取得する
    
    // [events]:
    // * toReceipt: ボタン押下で/purchase-history/stores/[storeId]/receiptへ遷移する
    // * onDeleteReceipt: ボタン押下でレシートを削除する
}