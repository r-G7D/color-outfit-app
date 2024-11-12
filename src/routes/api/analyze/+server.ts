import { OPENAI_API_KEY } from '$env/static/private';
import type { RequestHandler } from '@sveltejs/kit';
import type { UserData } from '../../../lib/types';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { color, userData }: { color: string; userData: UserData } = await request.json();

    const outfits: { [key: string]: string[] } = {}; 
    userData.commonOccasions.forEach((occasion) => {
        outfits[occasion] = ["outfit description1", "outfit description2"]; 
    });
    
    
    const messages = [
      {
        role: 'system',
        content: "You are a professional color analyst and personal stylist. Analyze colors and provide fashion recommendations based on physical characteristics and style preferences. Always return responses in the specified JSON format."
      },
      {
        role: "user",
        content: `Analyze this person's coloring and provide style recommendations based on:

            Skin tone hexcode: ${color}

            Physical characteristics:
            - Hair color: ${userData.isHairDyed ? `Currently ${userData.hairColor} (naturally ${userData.naturalHairColor})` : userData.hairColor}
            - Eye color: ${userData.eyeColor}
            - Sun reaction: ${userData.tanningTendency}
            - Visible vein color: ${userData.veinColor}
            - Jewelry preference: ${userData.jewelryPreference}

            Style preferences:
            - Favorite colors: ${userData.favoriteColors}
            - Style goals: ${userData.styleGoals.join(', ')}
            - Disliked colors: ${userData.dislikedColors}

            Lifestyle:
            - Profession/Industry: ${userData.profession}
            - Common ocassions: ${userData.commonOccasions.join(', ')}
            - Local climate: ${userData.climate}

            Analyze their coloring and return a JSON object with the following structure:
            {
            "skinTone": "${color}",
            "season": "Spring/Summer/Autumn/Winter with warm/cool modifier",
            "undertone": "Warm/Cool/Neutral with explanation",
            "recommendedColors": {
                "neutrals": ["hexcolor1", "hexcolor2", "hexcolor3"],
                "accents": ["hexcolor1", "hexcolor2", "hexcolor3"]
            },
            "outfits": {
                ${JSON.stringify(outfits)}
            }
        }`
      }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // use "gpt-4" or "gpt-3.5-turbo" for a more cost-effective option
        messages,
        max_tokens: 100,
        response_format: { type: "json_object" }
      })
    });

    if (response.ok) {
      const data = await response.json();
      const content = data.choices[0].message.content;

      const colorAnalysis = JSON.parse(content);
      return new Response(JSON.stringify(colorAnalysis), { status: 200 });
    } else {
      return new Response('ChatGPT request failed', { status: 500 });
    }
  } catch (error) {
    console.error('Error in /api/analyze', error);
    return new Response('Server error', { status: 500 });
  }
};
