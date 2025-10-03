import { LoginSchemas } from "./login";
import { VerifySchemas } from "./verify";

export namespace SessionPayloadSchemas {
    export import Login = LoginSchemas;
    export import Verify = VerifySchemas;
}