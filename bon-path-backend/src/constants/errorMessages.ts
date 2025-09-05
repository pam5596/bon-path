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
            setIdError: {
                detail: "IDを新しく更新することはできません。",
                issue: "Cannot assign to 'id' because it is a read-only property."
            }
        },
        _share: {
            createdAt: "不正な登録日時の型を検知しました。"
        },
        user: {
            hashIdInstanceofError: "不正なユーザーハッシュIDの型を検知しました。",
            nameInstanceofError: "不正なユーザー名の型を検知しました。",
            emailInstanceofError: "不正なメールアドレスの型を検知しました。",
            passwordInstanceofError: "不正なパスワードの型を検出しました。",
        },
        receipt: {
            userIdInstanceofError: "不正なユーザーIDの型を検知しました。",
            isCheckedInstanceofError: "不正なレシートの確認状態の型を検出しました。",
            latitudeInstanceofError: "不正な緯度の型を検出しました。",
            longitudeInstanceofError: "不正な軽度の型を検出しました。",
        },
        receiptImage: {
            receiptIdInstanceofError: "不正なレシートIDの型を検知しました。",
            urlInstanceofError: "不正なレシートURLの型を検知しました。"
        },
        store: {
            nameInstanceofError: "不正な店舗名の型を検知しました。",
            imageInstanceofError: "不正な店舗画像の型を検知しました。",
            latitudeInstanceofError: "不正な緯度の型を検知しました。",
            longitudeInstanceofError: "不正な軽度の型を検出しました。",
            googleMapLinkInstanceofError: "不正なGoogleマップリンクの型を検知しました。"
        },
        category: {
            parentIdInstanceofError: "不正な親カテゴリーIDの型を検知しました。",
            nameInstanceofError: "不正なカテゴリー名の型を検知しました。"
        },
        product: {
            storeIdInstanceofError: "不正な店舗IDの型を検出しました。",
            categoryIdInstanceofError: "不正なカテゴリーIDの型を検出しました。",
            nameInstanceofError: "不正な商品名の型を検知しました。",
            imageInstanceofError: "不正な商品画像の型を検知しました。",
            priceInstanceofError: "不正な商品価格の型を検知しました。"
        },
        purchase: {
            userIdInstanceofError: "不正なユーザーIDの型を検知しました。",
            receiptIdInstanceofError: "不正なレシートIDの型を検知しました。",
            storeIdInstanceofError: "不正な店舗IDの型を検知しました。",
            productIdInstanceofError: "不正な商品IDの型を検知しました。",
            quantityInstanceofError: "不正な購入数量の型を検知しました。",
            priceInstanceofError: "不正な購入価格の型を検知しました。",
        }
    }
}