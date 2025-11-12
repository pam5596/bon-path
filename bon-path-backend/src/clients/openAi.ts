import { ChatOpenAI } from "@langchain/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { InteropZodType } from "@langchain/core/utils/types";

export class LangChainOpenAiClient extends ChatOpenAI {
    constructor(options: {
        model: 'gpt-4.1-mini' | 'gpt-4o-mini', 
        apiKey: string,
        temperature: 0,
        maxRetries: 3
    }) {
        super(options)
    }

    static createParserFromZodSchema(zodSchema: InteropZodType) {
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