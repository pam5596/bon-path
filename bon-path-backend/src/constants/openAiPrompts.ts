export const OPEN_AI_PROMPTS = {
    client: {
        queryToJsonParser: {
            system: "Answer the user query. Wrap the output in `json` tags\n{format_instructions}",
            human: "User query: {query}"
        }
    }
}