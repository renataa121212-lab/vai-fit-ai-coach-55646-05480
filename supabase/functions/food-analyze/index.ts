import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { image } = await req.json();
    
    if (!image) {
      return new Response(
        JSON.stringify({ error: "Image data is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    // Call Lovable AI with Gemini (vision capable)
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `Você é um nutricionista especializado. Analise a imagem da refeição e retorne APENAS um JSON válido (sem markdown, sem comentários) com a seguinte estrutura:
{
  "foods": [
    {
      "name": "Nome do alimento",
      "quantity": "150g",
      "calories": 248,
      "macros": {"protein": 31, "carbs": 0, "fat": 14}
    }
  ],
  "totalCalories": 517,
  "totalMacros": {"protein": 37, "carbs": 30, "fat": 29},
  "healthScore": 85,
  "suggestions": ["Sugestão 1", "Sugestão 2"]
}`
          },
          {
            role: "user",
            content: [
              { type: "text", text: "Analise esta refeição e identifique todos os alimentos visíveis, estimando porções e valores nutricionais." },
              { type: "image_url", image_url: { url: image } }
            ]
          }
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI gateway error:", aiResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: "Failed to analyze image" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiData = await aiResponse.json();
    const content = aiData.choices?.[0]?.message?.content || "{}";
    
    // Parse the JSON from AI response
    let analysis;
    try {
      // Remove markdown code blocks if present
      const cleanContent = content.replace(/```json\s*|\s*```/g, "").trim();
      analysis = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error("Failed to parse AI response:", content);
      return new Response(
        JSON.stringify({ error: "Invalid AI response format" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify(analysis),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("food-analyze error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
