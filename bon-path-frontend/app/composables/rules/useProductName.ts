import z from "zod";

export default function() {
    const { t } = useI18n()
    return z
        .string()
        .min(1, { error: t("_errors.valueObjects.useProductName.min") })
}