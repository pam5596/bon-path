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
                detail: "Idの更新に失敗しました",
                issue: "Cannot overwrite existing value"
            }
        }
    }
}