export const ERROR_MESSAGES = {
    valueObjects: {
        id: {
            intError: "Idは整数である必要があります",
            minError: "Idは1以上である必要があります"
        },
        createdAt: {
            dateError: "CreatedAtはタイムスタンプである必要があります"
        },
        userHashId: {
            cuidError: "UserHashIdはcuid形式である必要があります"
        },
        userName: {
            stringError: "UserNameは文字列である必要があります",
            minError: "UserNameは1文字以上である必要があります",
            maxError: "UserNameは30文字以下である必要があります",
            emptyError: "UserNameは空白にすることはできません"
        },
        userEmail: {
            emailError: "UserEmailは有効なメールアドレス形式である必要があります"
        },
        userPassword: {
            stringError: "UserPasswordは文字列である必要があります",
            minError: "UserPasswordは6文字以上である必要があります",
            maxError: "UserPasswordは32文字以下である必要があります",
            regexError: "UserPasswordは半角英数字（大文字・小文字・数字）のみ使用可能です"
        },
        userHashPassword: {
            stringError: "UserPasswordは文字列である必要があります",
            argon2Error: "UserHashPasswordはargon2形式である必要があります"
        },
        storeName: {
            stringError: "StoreNameは文字列である必要があります",
            minError: "StoreNameは1文字以上である必要があります"
        },
        storeImage: {
            urlError: "StoreImageはURL形式である必要があります"
        },
        storeGoogleMapLink: {
            urlError: "StoreGoogleMapLinkはURL形式である必要があります"
        },
        storeLatitude: {
            numberError: "StoreLatitudeは数値である必要があります",
            minError: "StoreLatitudeは -90以上である必要があります",
            maxError: "StoreLatitudeは 90以下である必要があります"
        },
        storeLongitude: {
            numberError: "StoreLongitudeは数値である必要があります",
            minError: "StoreLongitudeは -180以上である必要があります",
            maxError: "StoreLongitudeは 180以下である必要があります"
        },
        receiptLatitude: {
            numberError: "ReceiptLatitudeは数値である必要があります",
            minError: "ReceiptLatitudeは -90以上である必要があります",
            maxError: "ReceiptLatitudeは 90以下である必要があります",
        },
        receiptLongitude: {
            numberError: "ReceiptLongitudeは数値である必要があります",
            minError: "ReceiptLongitudeは -180以上である必要があります",
            maxError: "ReceiptLongitudeは 180以下である必要があります"
        },
        receiptIsChecked: {
            booleanError: "ReceiptIsCheckedは真偽値である必要があります"
        },
        receiptImageUrl: {
            urlError: "ReceiptImageUrlはURL形式である必要があります"
        },
        productName: {
            stringError: "ProductNameは文字列である必要があります",
            minError: "ProductNameは1文字以上である必要があります"
        },
        productImage: {
            urlError: "ProductImageはURL形式である必要があります"
        },
        productPrice: {
            intError: "ProductPriceは整数値である必要があります",
            minError: "ProductPriceは0以上である必要があります"
        },
        purchasePrice: {
            intError: "PurchasePriceは整数値である必要があります",
            minError: "PurchasePriceは0以上である必要があります",
        },
        purchaseQuantity: {
            intError: "PurchaseQuantityは整数値である必要があります",
            minError: "PurchaseQuantityは1以上である必要があります"
        },
        categoryName: {
            stringError: "CategoryNameは文字列である必要があります",
            minError: "CategoryNameは1文字以上である必要があります"
        }
    },
    entity: {
        _abstruct: {
            setIdError: {
                detail: "IDを新しく更新することはできません",
                issue: "Cannot assign to 'id' because it is a read-only property."
            }
        },
        _share: {
            createdAt: "不正な登録日時の型を検知しました"
        },
        user: {
            hashIdInstanceofError: "不正なユーザーハッシュIDの型を検知しました",
            nameInstanceofError: "不正なユーザー名の型を検知しました",
            emailInstanceofError: "不正なメールアドレスの型を検知しました",
            passwordInstanceofError: "不正なパスワードの型を検出しました",
        },
        receipt: {
            userIdInstanceofError: "不正なユーザーIDの型を検知しました",
            isCheckedInstanceofError: "不正なレシートの確認状態の型を検出しました",
            latitudeInstanceofError: "不正な緯度の型を検出しました",
            longitudeInstanceofError: "不正な軽度の型を検出しました",
        },
        receiptImage: {
            receiptIdInstanceofError: "不正なレシートIDの型を検知しましが",
            urlInstanceofError: "不正なレシートURLの型を検知しました"
        },
        store: {
            nameInstanceofError: "不正な店舗名の型を検知しました",
            imageInstanceofError: "不正な店舗画像の型を検知しました",
            latitudeInstanceofError: "不正な緯度の型を検知しました",
            longitudeInstanceofError: "不正な軽度の型を検出しました",
            googleMapLinkInstanceofError: "不正なGoogleマップリンクの型を検知しました"
        },
        category: {
            parentIdInstanceofError: "不正な親カテゴリーIDの型を検知しました",
            nameInstanceofError: "不正なカテゴリー名の型を検知しました"
        },
        product: {
            storeIdInstanceofError: "不正な店舗IDの型を検出しました",
            categoryIdInstanceofError: "不正なカテゴリーIDの型を検出しました",
            nameInstanceofError: "不正な商品名の型を検知しました",
            imageInstanceofError: "不正な商品画像の型を検知しました",
            priceInstanceofError: "不正な商品価格の型を検知しました"
        },
        purchase: {
            userIdInstanceofError: "不正なユーザーIDの型を検知しました",
            receiptIdInstanceofError: "不正なレシートIDの型を検知しました",
            storeIdInstanceofError: "不正な店舗IDの型を検知しました",
            productIdInstanceofError: "不正な商品IDの型を検知しました",
            quantityInstanceofError: "不正な購入数量の型を検知しました",
            priceInstanceofError: "不正な購入価格の型を検知しました",
        }
    }
}