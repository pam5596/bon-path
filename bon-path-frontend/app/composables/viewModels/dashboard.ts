export default function() {
    // [ref]: 
    // * user: UserModel - ユーザー情報
    // * receipts: ReceiptModel[] - チェックできていないレシート一覧
    
    // [mount]:
    // * [GET]/users - ユーザー情報を取得する
    // * [GET]/users/receipts?isChecked=false - チェックできていないレシート一覧を取得する
    
    // [events]:
    // * toReceiptRegisterCheck: ボタン押下で/receipt-register/check/[receiptId]へ遷移する
    // * onDeleteReceipt: ボタン押下でレシートを削除する
}