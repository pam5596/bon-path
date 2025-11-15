import z from "zod";

export default function() {
    return z
        .string()
        .url()
}