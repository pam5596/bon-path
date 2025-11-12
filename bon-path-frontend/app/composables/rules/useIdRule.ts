import z from "zod";

export default function () {
    return z.coerce.number().int().min(1)
}