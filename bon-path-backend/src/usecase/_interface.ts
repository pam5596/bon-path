import { PayloadType } from "@share/payloads"
import BasePayload from "../payloads/_abstruct"
import BaseRepository from "../repository/_abstruct"
import BaseService from "../service/_interface"
import { ProductVectorRepository, StoreVectorRepository } from "@repository"

export default interface BaseUseCase<
    RequestT extends PayloadType, 
    ResponseT extends PayloadType = any
> {
    clients?: Record<string, any>
    services?: Record<string, BaseService>
    repositories?: Record<string, BaseRepository|StoreVectorRepository|ProductVectorRepository>
    request: BasePayload<RequestT>

    execute(): Promise<BasePayload<ResponseT>|void>
}