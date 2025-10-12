export const ROUTE_DESCRIPTIONS = {
    getLoginSession: 'ログインセッションIDからセッションが有効であるかを確認する。有効であればユーザの情報を返す。',
    createLoginSession: 'ユーザーのメアドとパスワードからログインセッションIDを発行し、ダッシュボード画面へリダイレクトする。',
    deleteLoginSession: 'ユーザーのログインセッションIDを削除し、ログイン画面へ遷移する。',
    getVerifySession: 'メールアドレス認証用セッションIDからセッションが有効であるかを確認する。有効であればユーザーの登録情報を返す。'
}