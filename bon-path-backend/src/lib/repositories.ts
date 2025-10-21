import { 
    CategoryRepository,
    ProductRepository,
    ProductVectorRepository,
    PurchaseRepository,
    ReceiptRepository,
    ReceiptImageRepository,
    StoreRepository,
    StoreVectorRepository,
    UserRepository
} from "@repository";
import { prisma, prismaVector } from "./clients";

export const categoryRepository = new CategoryRepository(prisma)
export const productRepository = new ProductRepository(prisma)
export const productVectorRepository = new ProductVectorRepository(prismaVector)
export const purchaseRepository = new PurchaseRepository(prisma)
export const receiptRepository = new ReceiptRepository(prisma)
export const receiptImageRepository = new ReceiptImageRepository(prisma)
export const storeRepository = new StoreRepository(prisma)
export const storeVectorRepository = new StoreVectorRepository(prismaVector)
export const userRepository = new UserRepository(prisma)
