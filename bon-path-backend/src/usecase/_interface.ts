import { PayloadType } from "@share/payloads"
import BasePayload from "../payloads/_abstruct"
import BaseRepository from "../repository/_abstruct"
import BaseService from "../service/_interface"

export default interface BaseUseCase<
    RequestT extends PayloadType, 
    ResponseT extends PayloadType
> {
    clients?: Record<string, any>
    services?: Record<string, BaseService>
    repositories?: Record<string, BaseRepository>
    request: BasePayload<RequestT>

    execute(): Promise<BasePayload<ResponseT>>
}