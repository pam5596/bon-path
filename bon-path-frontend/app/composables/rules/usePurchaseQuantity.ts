import z from "zod";

export default function() {
    const { t } = useI18n()
    return z
        .number({ error: t("_errors.valueObjects.usePurchaseQuantity.number") })
        .int({ error: t("_errors.valueObjects.usePurchaseQuantity.int") })
        .min(1, { error: t("_errors.valueObjects.usePurchaseQuantity.min") })
}