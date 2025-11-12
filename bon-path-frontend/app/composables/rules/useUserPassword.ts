import z from "zod";

export default function() {
    const { t } = useI18n()
    return z
        .string()
        .min(6, { error: t("_errors.valueObjects.userPassword.min") })
        .max(32, { error: t("_errors.valueObjects.userPassword.max") })
        .regex(/^[A-Za-z0-9]+$/, { error: t("_errors.valueObjects.userPassword.regex") })
}