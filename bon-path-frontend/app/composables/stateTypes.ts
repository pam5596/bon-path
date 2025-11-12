import type { VAlert } from 'vuetify/components';

export interface STATE_TYPES {
    ALERT: {
        type: VAlert['type'],
        title: VAlert['title'],
        text: VAlert['text'],
        forDeveloper?: ServerError
    } | null;

    IS_LOADING: boolean;

    RECEIPT_REGISTER_CHECK_FORM: {
        store?: StoreModel,
        purchases: PurchaseModel[]
    }

    RECEIPT_REGISTER_CHECK_COLLECTION: {
        storesSearchResult: StoreModel[],
        productsSearchResult: ProductModel[]
    }
}