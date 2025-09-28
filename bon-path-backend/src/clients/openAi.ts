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
}