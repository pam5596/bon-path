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