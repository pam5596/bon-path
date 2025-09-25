import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import z from "zod";

export class LangChainOpenAiClient extends ChatOpenAI {
    constructor(options: {
        model: 'gpt-4.1' | 'gpt-4o-mini', 
        apiKey: string,
        temperature: 0
    }) {
        super(options)
    }

    async ocrToJsonParser(
        queryImageUrls: string[],
        promptMessage: [['system', string], ['human', string]],
        responseSchema: z.ZodObject<any>
    ) {
        const parser = StructuredOutputParser.fromZodSchema(responseSchema);

        const prompt = ChatPromptTemplate.fromMessages(promptMessage)
        const partialedPrompt = await prompt.partial({
            format_instructions: parser.getFormatInstructions(),
        });
        const formattedPrompt = await partialedPrompt.format({});

        const response = await this.invoke([{
            role: 'user',
            content: [
                { type: "text", text: formattedPrompt },
                queryImageUrls.map((url) => ({ 
                    type: "image_url", 
                    image_url: { url } 
                })),
            ],
        }])

        const contentString = Array.isArray(response.content)
            ? response.content.map((c: any) => typeof c === "string" ? c : c.text).join("\n")
            : response.content;
        return await parser.parse(contentString);
    }
}