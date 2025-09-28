export const ERROR_MESSAGES = {
    valueObjects: {
        _tag: "[CUSTOM]",
        _abstruct: {
            otherError: "バリデーションチェックにて不正な値を検知しました。開発者に問い合わせてください。"
        },
        userName: {
            minError: "ユーザー名は1文字以上で入力してください。",
            maxError: "ユーザー名は30文字以下で入力してください。",
            emptyError: "ユーザー名を空白にすることはできません。"
        },
        userEmail: {
            emailError: "有効なメールアドレスの形式で入力してください。"
        },
        userPassword: {
            minError: "パスワードは6文字以上で入力してください。",
            maxError: "パスワードは32文字以下で入力してください。",
            regexError: "パスワードは半角英数字（大文字・小文字・数字）のみ使用可能です。"
        },
        storeName: {
            minError: "店舗名は1文字以上で入力してください。"
        },
        productName: {
            minError: "商品名は1文字以上で入力してください。"
        },
        purchasePrice: {
            intError: "商品の購入価格は整数値で入力してください。",
            minError: "商品の購入価格は0以上で入力してください。",
        },
        purchaseQuantity: {
            intError: "商品の購入数量は整数値で入力してください。",
            minError: "商品の購入数量は1以上で入力してください。"
        },
    },
    entity: {
        _abstruct: {
            newIdError: {
                detail: "IDを新しく更新することはできません。",
                issue: "Cannot assign to 'id' because it is a read-only property."
            },
            createdError: {
                detail: "登録日時を更新することはできません。",
                issue: "Cannot assign to 'createdAt' because it is a read-only property."
            }
        },
        user: {
            newHashIdError: {
                detail: "ユーザーのハッシュIDを新しく更新することはできません。",
                issue: "Cannot assign to 'hashedId' because it is a read-only property."
            }
        }
    },
    repository: {
        detail: "データベースで予期せぬエラーが発生しました。開発者に問い合わせてください。"
    },
    client: {
        s3: "ストレージで予期せぬエラーが発生しました。開発者に問い合わせてください。",
        argon2: "パスワードの処理で予期せぬエラーが発生しました。開発者に問い合わせてください。",
        googleSearch: "Google検索処理で予期せぬエラーが発生しました。開発者に問い合わせてください。",
        googleMapPlaces: "GoogleMap検索処理で予期せぬエラーが発生しました。開発者に問い合わせてください。"
    },
    service: {
        receiptOcr: "レシートのOCR処理で予期せぬエラーが発生しました。開発者に問い合わせてください。"
    }
}