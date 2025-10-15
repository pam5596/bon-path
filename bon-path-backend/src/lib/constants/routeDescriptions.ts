export const ROUTE_DESCRIPTIONS = {
    getLoginSession: 'ログインセッションIDからセッションが有効であるかを確認する。有効であればユーザの情報を返す。',
    createLoginSession: 'ユーザーのメアドとパスワードからログインセッションIDを発行し、ダッシュボード画面へリダイレクトする。',
    deleteLoginSession: 'ユーザーのログインセッションIDを削除し、ログイン画面へ遷移する。',
    getVerifySession: 'メールアドレス認証用セッションIDからセッションが有効であるかを確認する。有効であればユーザーの登録情報を返す。',
    createVerifySession: 'ユーザーの名前、メアド、パスワードからメールアドレス認証用セッションIDを発行し、Eメール確認画面へリダイレクトする。',
    createUser: '新規のユーザーを登録し、ユーザーのハッシュIDを返す。',
    getUser: 'ログインセッションIDからユーザー情報を返す。',
    updateUser: 'ユーザーの名前とメールアドレスを更新する。',
    deleteUser: 'ユーザーを削除する。',
    getUserReceipts: 'ユーザーのレシート一覧を取得する。',
    getUserPurchases: 'ユーザーの購入履歴一覧を取得する。',
    createReceipt: '新規のレシート情報を登録し、IDを返す。',
    getReceipt: 'パスパラメータのIDからレシート情報を返す。',
    updateReceipt: 'パスパラメータのIDからレシート情報を更新する。',
    deleteReceipt: 'パスパラメータのIDからレシート情報を削除する。'
}