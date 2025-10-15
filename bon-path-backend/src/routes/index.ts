import { GetLoginSessionRoute } from "./session/getLoginSession";
export const getLoginSession = new GetLoginSessionRoute()

import { CreateLoginSessionRoute } from "./session/createLoginSession";
export const createLoginSession = new CreateLoginSessionRoute()

import { DeleteLoginSessionRoute } from "./session/deleteLoginSession";
export const deleteLoginSession = new DeleteLoginSessionRoute()

import { GetVerifySessionRoute } from "./session/getVerifySession";
export const getVerifySession = new GetVerifySessionRoute()

import { CreateVerifySessionRoute } from "./session/createVerifySession";
export const createVerifySession = new CreateVerifySessionRoute()

import { CreateUserRoute } from "./users/createUser";
export const createUser = new CreateUserRoute()

import { GetUserRoute } from "./users/getUser";
export const getUser = new GetUserRoute()

import { UpdateUserRoute } from "./users/updateUser";
export const updateUser = new UpdateUserRoute()

import { DeleteUserRoute } from "./users/deleteUser";
export const deleteUser = new DeleteUserRoute()

import { GetUserReceiptsRoute } from "./users/getUserReceipts";
export const getUserReceipts = new GetUserReceiptsRoute()

import { GetUserPurchases } from "./users/getUserPurchases";
export const getUserPurchases = new GetUserPurchases()

import { CreateReceiptRoute } from "./receipts/createReceipt";
export const createReceipt = new CreateReceiptRoute()

import { DeleteReceiptRoute } from "./receipts/deleteReceipt";
export const deleteReceipt = new DeleteReceiptRoute()

import { GetReceiptRoute } from "./receipts/getReceipt";
export const getReceipt = new GetReceiptRoute()

import { UpdateReceiptRoute } from "./receipts/updateReceipt";
export const updateReceipt = new UpdateReceiptRoute()

import { GetReceiptPurchasesRoute } from "./receipts/getReceiptPurchases";
export const getReceiptPurchases = new GetReceiptPurchasesRoute()

import { GetReceiptImagesRoute } from "./receipts/getReceiptImages";
export const getReceiptImages = new GetReceiptImagesRoute()

import { PutReceiptImagesRoute } from "./receiptImages/putReceiptImages";
export const putReceiptImage = new PutReceiptImagesRoute()

import { DeleteReceiptImageRoute } from "./receiptImages/deleteReceiptImage";
export const deleteReceiptImage = new DeleteReceiptImageRoute()

import { CreatePurchasesRoute } from "./purchases/createPurchases";
export const createPurchases = new CreatePurchasesRoute()

import { DeletePurchaseRoute } from "./purchases/deletePurchase";
export const deletePurchase = new DeletePurchaseRoute()

import { GetPurchaseRoute } from "./purchases/getPurchase";
export const getPurchase = new GetPurchaseRoute()

import { CreateStoreRoute } from "./stores/createStore";
export const createStore = new CreateStoreRoute()

import { DeleteStoreRoute } from "./stores/deleteStore";
export const deleteStore = new DeleteStoreRoute()

import { GetStoreRoute } from "./stores/getStore";
export const getStore = new GetStoreRoute()

import { GetStoreProductsRoute } from "./stores/getStoreProducts";
export const getStoreProducts = new GetStoreProductsRoute()

import { GetStoresRoute } from "./stores/getStores";
export const getStores = new GetStoresRoute()

import { GoogleMapSearchStoresRoute } from "./stores/googleMapSearchStores";
export const googleMapSearchStores = new GoogleMapSearchStoresRoute()

import { UpdateStoreRoute } from "./stores/updateStore";
export const updateStore = new UpdateStoreRoute()

import { VectorSearchStoresRoute } from "./stores/vectorSearchStores";
export const vectorSearchStores = new VectorSearchStoresRoute()

import { CreateProductsRoute } from "./products/createProducts";
export const createProducts = new CreateProductsRoute()

import { DeleteProductRoute } from "./products/deleteProduct";
export const deleteProduct = new DeleteProductRoute()

import { GetProductRoute } from "./products/getProduct";
export const getProduct = new GetProductRoute()

import { GetProductsRoute } from "./products/getProducts";
export const getProducts = new GetProductsRoute()

import { GoogleMapSearchProductsRoute } from "./products/googleMapSearchProducts";
export const googleMapSearchProducts = new GoogleMapSearchProductsRoute()

import { UpdateProductRoute } from "./products/updateProduct";
export const updateProduct = new UpdateProductRoute()

import { VectorSearchProductsRoute } from "./products/vectorSearchProducts";
export const vectorSearchProducts = new VectorSearchProductsRoute()