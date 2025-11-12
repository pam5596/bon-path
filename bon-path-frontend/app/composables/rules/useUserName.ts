import z from "zod";

export default function() {
    const { t } = useI18n()
    return z.string()
        .min(1, { error: t("_errors.valueObjects.userName.min") })
        .max(30, { error: t("_errors.valueObjects.userName.max") })
        .refine((v) => v.trim().length > 0, { error: t("_errors.valueObjects.userName.empty") });
}