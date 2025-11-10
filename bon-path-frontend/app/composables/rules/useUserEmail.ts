import z from "zod";

export default function() {
    const { t } = useI18n()
    return z
        .string()
        .email({ error: t("_errors.valueObjects.userEmail.email") });
}