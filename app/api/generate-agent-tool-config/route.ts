import { openai } from "@/config/OpenAiModel";
import { NextRequest, NextResponse } from "next/server";
const PROMPT = `from this flow, Generate a agent instruction prompt with all details along with 
tools with all setting info in JSON format. Do not add any extra text just written JSON 
data. make sure to mentioned parameters depends on Get or post request. 
only: { 
  "systemPrompt": "", 
  "primaryAgentName": "", 
  "agents": [ 
    { 
      "id": "agent-id", 
      "name": "", 
      "model": "", 
      "includeHistory": true|false, 
      "output": "", 
      "tools": ["tool-id"], 
      "instruction": "" 
    } 
  ], 
  "tools": [ 
    { 
      "id": "id", 
      "name": "", 
      "description": "", 
      "method": "GET"|"POST", 
      "url": "", 
      "includeApiKey": true, 
      "apiKey": "", 
      "parameters": { "key": "dataType" }, 
      "usage": [ ], 
      "assignedAgent": "" 
    } 
  ] 
}`;
export async function POST(req: NextRequest) {

  const { jsonConfig } = await req.json();
  if (process.env.NODE_ENV === 'development') {
    return Response.json({
      result: {
        mocked: true,
        message: 'Dev mode mock response',
        agentConfig: jsonConfig
      }
    });
  }
  const response = await openai.responses.create({
    model: 'gpt-4.1-mini',
    input: JSON.stringify(jsonConfig) + PROMPT,
  })
  const outputText = response.output_text;
  let parsedJson;
  try {
    parsedJson = JSON.parse(outputText.replace('```json', '').replace('```', ''));

  } catch (error) {
    return NextResponse.json({ error: 'Failed to parse json from AI response', details: error, status: 500 })

  }
  return NextResponse.json(parsedJson);
}