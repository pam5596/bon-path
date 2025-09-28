import { ChatOpenAI } from "@langchain/openai";
import z from "zod";
import { StructuredOutputParser } from "langchain/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";

export class LangChainOpenAiClient extends ChatOpenAI {
    constructor(options: {
        model: 'gpt-4.1' | 'gpt-4o-mini', 
        apiKey: string,
        temperature: 0
    }) {
        super(options)
    }

    static createParserFromZodSchema(zodSchema: z.ZodObject<any>) {
        return StructuredOutputParser.fromZodSchema(zodSchema)
    }

    static createPromptFromMessage(messages: { system: string, human: string }) {
        return ChatPromptTemplate.fromMessages([
            [
                'system',
                messages.system
            ],
            [
                'human',
                messages.human
            ]
        ])
    }
}