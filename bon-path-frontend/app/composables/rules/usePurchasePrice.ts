import z from "zod";

export default function() {
    const { t } = useI18n()
    return z
        .number({ error: t('_errors.valueObjects.usePurchasePrice.number') })
        .int({ error: t('_errors.valueObjects.usePurchasePrice.int') })
        .min(0, { error: t('_errors.valueObjects.usePurchasePrice.min') })
}