
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request:Request){
    try {
        
        const genAI = new GoogleGenerativeAI(process.env.GEMENI_API_KEY||"");

        const model = genAI.getGenerativeModel({
             model: "gemini-1.5-flash",
             generationConfig: {
                candidateCount: 1,
                stopSequences: ["x"],
                maxOutputTokens: 20,
                temperature: 1.0,
             },
        });
        
        const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";
        
        const result = await model.generateContentStream(prompt);
        return new StreamingTextResponse(result);
        return Response.json({
            success:true,
            data:result.response
        })
        

        // Print text as it comes in.
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          process.stdout.write(chunkText);
        }
    } catch (error) {
        console.log("Error using generating messaging via ai",error)
        throw error;
    }
}

