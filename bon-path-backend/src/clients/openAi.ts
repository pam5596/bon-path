import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import z, { ZodRawShape } from "zod";

export class LangChainOpenAiClient extends ChatOpenAI {
    constructor(options: {
        model: 'gpt-4.1' | 'gpt-4o-mini', 
        apiKey: string,
        temperature: 0
    }) {
        super(options)
    }

    async queryToJsonParser(
        query: string,
        promptMessage: [['system', string], ['human', string]],
        responseSchema: z.ZodObject<ZodRawShape>
    ) {
        const parser = StructuredOutputParser.fromZodSchema(responseSchema);

        const prompt = ChatPromptTemplate.fromMessages(promptMessage)
        const partialedPrompt = await prompt.partial({
            format_instructions: parser.getFormatInstructions(),
        });

        const chain = partialedPrompt.pipe(this).pipe(parser);
        return await chain.invoke({ query })
    }
}