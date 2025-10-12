import { 
    ProductNameExtractService,
    ReceiptOCRService,
    SearchProductService,
    SearchStorePlaceService,
    UserPasswordHashService,
    UserPasswordVerifyService
} from '@service';
import {
    argon2,
    googleMapPlaces,
    googleSearch,
    langChainOpenAi4_1,
    langChainOpenAi4o
} from "./clients";

export const productNameExtractService = new ProductNameExtractService(langChainOpenAi4_1);
export const receiptOcrService = new ReceiptOCRService(langChainOpenAi4o);
export const searchProductService = new SearchProductService(googleSearch);
export const searchStorePlaceService = new SearchStorePlaceService(googleMapPlaces);
export const userPasswordHashService = new UserPasswordHashService(argon2);
export const userPasswordVerifyService = new UserPasswordVerifyService(argon2)