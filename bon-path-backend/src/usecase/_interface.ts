import BasePayload from "../payloads/_abstruct"
import BaseRepository from "../repository/_abstruct"
import BaseService from "../service/_interface"

export default interface BaseUseCase {
    clients?: Record<string, any>
    services?: Record<string, BaseService>
    repositories?: Record<string, BaseRepository>
    request: BasePayload<any>

    execute(): Promise<BasePayload<any>>
}