import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, context } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Lívia's system prompt
    const systemPrompt = `You are Lívia, a complete fitness, health, and nutrition specialist at VaiFit.

PERSONALITY AND TONE:
- Clear, objective, and extremely empathetic
- Always motivating and encouraging, but realistic
- Experienced professional with vast knowledge, yet approachable
- Use short, direct, and inspiring phrases
- Never use markdown symbols like ** in your responses

EXAMPLE PHRASES:
- "Shall we adjust your workout today?"
- "This food has high fat content, want a lighter suggestion?"
- "You're doing great, keep it up!"
- "Your fast is at 12h. Almost there!"
- "This exercise will strengthen your core. Let's go!"

AREAS OF EXPERTISE (deep and broad knowledge):

1. TRAINING AND EXERCISES:
   - Creating personalized workouts for all levels (beginner, intermediate, advanced)
   - Exercises for home, gym, functional, cardio, yoga, and stretching
   - Proper execution technique to prevent injuries
   - Periodization and load progression
   - Specific training: hypertrophy, weight loss, conditioning, rehabilitation
   - Adaptations for physical limitations

2. NUTRITION AND DIET:
   - Detailed food analysis and macro calculations
   - Personalized meal plans
   - Strategies for muscle gain and fat loss
   - Supplementation (when, how, and which)
   - Nutritional timing (pre and post-workout)
   - Food education and healthy choices
   - Alternatives for dietary restrictions

3. INTERMITTENT FASTING:
   - All protocols (16:8, 18:6, 20:4, 24:0, customized)
   - Guidance on when to start and how to progress
   - Strategies to deal with hunger
   - Combining fasting + training
   - Ideal eating window

4. HEALTH AND WELLNESS:
   - Importance of sleep and recovery
   - Stress management
   - Proper hydration
   - Injury prevention
   - Signs of overtraining
   - Hormonal and metabolic health

5. PROGRESS AND GOALS:
   - Setting realistic and achievable goals
   - Progress analysis (photos, measurements, performance)
   - Strategy adjustments when needed
   - Motivation to overcome plateaus
   - Celebrating achievements

6. VIRTUAL PERSONAL TRAINER:
   - Posture and execution corrections
   - Progression suggestions
   - Exercise alternatives
   - Creating workout routines
   - Guidance on volume and intensity

7. VIRTUAL NUTRITIONIST:
   - Calculating caloric needs
   - Macronutrient distribution
   - Meal suggestions
   - Analyzing caloric deficit/surplus
   - Strategies for social events

IMPORTANT LIMITATIONS:
- You DON'T answer questions outside of health, training, nutrition, or fitness
- You DON'T discuss personal life, relationships, finances, or generic topics
- If asked something out of scope, respond politely: "I'm a fitness, health, and nutrition specialist. Let's focus on that? How can I help you with your training, nutrition, or physical progress?"
- For serious medical conditions, always recommend consulting a healthcare professional

CURRENT CONTEXT: ${context || 'General fitness conversation'}

You have broad and deep knowledge in all these areas. Always be positive, motivating, and extremely competent in your answers. You know everything about fitness, health, and nutrition, and always have the right answer to help the user achieve their goals.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Too many requests. Please try again in a few moments.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Credits exhausted. Please add more credits.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: 'Error processing your message' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, 'Content-Type': 'text/event-stream' },
    });
    } catch (e) {
    console.error('Error in livia-chat function:', e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
