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
        googleMapPlaces: "GoogleMap検索処理で予期せぬエラーが発生しました。開発者に問い合わせてください。",
        honoJwt: "トークンが無効です。ログインし直してください。"
    },
    service: {
        receiptOcr: "レシートのOCR処理で予期せぬエラーが発生しました。開発者に問い合わせてください。",
        searchProduct: {
            detail: "商品検索処理で検索結果を取得できませんでした。開発者に問い合わせてください。",
            issue: "property of customsearch_v1.Schema$Search.items not found."
        },
        searchStorePlace: {
            detail: "店舗検索処理で検索結果を取得できませんでした。開発者に問い合わせてください。",
            issue: "property of places_v1.Schema$GoogleMapsPlacesV1SearchTextResponse.places not found."
        },
        productNameExtract: "商品の分析に失敗しまた。開発者に問い合わせてください。",
    },
    usecase: {
        userConflict: {
            detail: '入力されたメールアドレスは既に使用されています。',
            issues: 'UserEmail already registered.'
        },
        userNotFound: {
            detail: "ユーザーが見つかりませんでした。アカウントを登録してください。",
            issues: "User not found."
        },
        emailsNotEqual: {
            detail: "ユーザーのメールアドレス認証に失敗しました。再度アカウントを登録し直してください。",
            issues: "The session payload email and The request body email are not equal."
        },
        receiptNotFound: {
            detail: "レシート情報が見つかりませんでした。",
            issues: "Receipt not found."
        },
        receiptNotAccessible: {
            detail: "このレシート情報へのアクセス権限がありません。",
            issues: "Can't access this receipt."
        },
        receiptIsCheckedNotEqual: {
            detail: "レシート情報が改ざんされています。直ちに削除してください。",
            issues: "The saved receipt isChecked and The request body isChecked are not equal."
        },
        receiptImageNotFound: {
            detail: "レシート画像が見つかりませんでした。",
            issues: "Receipt image not found."
        },
        purchaseNotFound: {
            detail: "購入履歴が見つかりませんでした。",
            issues: "Purchase history not found."
        },
        purchaseNotAccessible: {
            detail: "この購入履歴へのアクセス権限がありません。",
            issues: "Can't access this purchase."
        },
        storeNotFound: {
            detail: "店舗が見つかりませんでした。",
            issues: "Store not found."
        },
        invalidLocationParams: {
            detail: "ユーザーの位置情報取得が無効な形式です。",
            issues: "Invalid params: location, latitude, radius."
        },
        productNotFound: {
            detail: "商品が見つかりませんでした。",
            issues: "Product not found."
        },
        invalidAiResponse: {
            detail: "AIの処理でエラーが発生しました。最初からやりなおしてください。",
            issues: "Google Search results and AI results are different."
        },
        categoryNotFound: {
            detail: "商品カテゴリーが見つかりませんでした。",
            issues: "Category not found."
        },
    },
    route: {
        unknown: "不明なエラーが発生しました。",
        invalidLoginSession: {
            detail: "ログインセッションの有効期限が切れました。ログインし直してください。",
            issue: "LoginSessionId not found in cookie."
        },
        invalidVerifySession: {
            detail: "メールアドレス確認用のセッションの有効期限が切れました。アカウントの登録をやり直してください。",
            issue: "VerifySessionId not found in cookie."
        },
        invalidQuery: {
            detail: 'クエリの形式が不正です。開発者に問い合わせてください。',
            issue: 'Invalid query type.'
        },
        invalidParams: {
            detail: 'クエリの形式が不正です。開発者に問い合わせてください。',
            issue: 'Invalid params type.'
        }
    }
}