<script lang="ts">
    import { onMount } from 'svelte';
    import type { UserData, ColorAnalysis } from '../../lib/types';
  
    let color = '';
    let userData: UserData | null = null;
    let analysisData: ColorAnalysis | null = null; 
    let isLoading = true;
  
    onMount(() => {
      const urlParams = new URLSearchParams(window.location.search);
      color = urlParams.get('color') || '';
      userData = JSON.parse(urlParams.get('userData') || '{}');
      
      fetchColorAnalysis();
    });
  
    async function fetchColorAnalysis() {
      try {
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ color, userData })
        });
        if (response.ok) {
          analysisData = await response.json();
        } else {
          console.error('Failed to fetch analysis');
          // await new Promise(resolve => setTimeout(resolve, 3000));

          const allOutfits: Record<string, string[]> = {
              "Client meetings": [
                  "Light olive chinos paired with a white button-down shirt and a camel blazer; accessorize with brown leather shoes and a matching belt.",
                  "A tailored navy suit with a cream-colored shirt; accessorize with a gold watch and dark brown oxford shoes."
              ],
              "Date nights": [
                  "Dark wash jeans, a rust-colored polo, and a beige bomber jacket; pair with loafers.",
                  "A fitted olive green shirt, tailored black trousers, and leather Chelsea boots."
              ],
              "Office work": [
                  "Khaki trousers with a light blue dress shirt and a charcoal blazer; complement with black oxford shoes.",
                  "A dark olive dress shirt tucked into grey slacks, with brown monk strap shoes."
              ],
              "Casual outings": [
                  "Beige shorts with a sage green linen shirt; pair with white sneakers.",
                  "A mustard crew-neck T-shirt with dark denim jeans and brown leather loafers."
              ],
              "Weekend casual": [
                  "A rust-colored T-shirt, light olive joggers, and white slip-on sneakers.",
                  "A cream linen short-sleeve shirt, khaki shorts, and brown sandals."
              ],
              "Formal events": [
                  "A deep olive tuxedo with a cream pocket square and brown leather loafers.",
                  "A black three-piece suit with a gold tie and cufflinks, paired with black oxford shoes."
              ],
              "Athletic/Sports": [
                  "A mustard athletic shirt with black shorts and white running shoes.",
                  "An olive green tank top, grey sweatpants, and black training shoes."
              ]
          };

          const filteredOutfits = userData?.commonOccasions.reduce((acc, occasion) => {
              if (allOutfits[occasion]) {
                  acc[occasion] = allOutfits[occasion];
              }
              return acc;
          }, {} as Record<string, string[]>) || {};

          // Temporary response
          analysisData = {
              "skinTone": color,
              "season": "Autumn with warm undertones",
              "undertone": "Warm",
              "recommendedColors": {
                  "neutrals": ["#f5f5dc", "#8b7765", "#d2b48c"],
                  "accents": ["#c85a17", "#6b8e23", "#9b111e"]
              },
              "outfits": filteredOutfits
          };
        }
      } catch (error) {
        console.error('Error fetching color analysis:', error);
      } finally {
        isLoading = false;
      }
    }
  </script>
  
  <div class="analysis-container">
    {#if isLoading}
        <div class="loading-text">
            <div class="spinner"></div>
            <p>Loading your personalized color and outfit analysis...</p>
        </div>
    {:else if analysisData}
        <div class="analysis-card">
            <h2 class="text-2xl font-bold mb-4">Color Analysis Results</h2>
        
            <!-- Display the primary color -->
            <div class="color-display">
                <p class="label">Skin Tone:</p>
                <div class="color-swatch" style="background-color: {analysisData.skinTone};"></div>
                <p>{analysisData.skinTone}</p>
            </div>
        
            <!-- Season and Undertone -->
            <div class="section">
                <p class="label">Season:</p>
                <p>{analysisData.season}</p>
            </div>
            <div class="section">
                <p class="label">Undertone:</p>
                <p>{analysisData.undertone}</p>
            </div>
        
            <!-- Recommended Colors -->
            <div class="section">
                <h3 class="subheader">Recommended Colors</h3>
                <div class="color-group">
                <p class="label">Neutrals:</p>
                <div class="color-list">
                    {#each analysisData.recommendedColors.neutrals as color}
                    <div class="color-swatch" style="background-color: {color};"></div>
                    {/each}
                </div>
                </div>
                <div class="color-group">
                <p class="label">Accents:</p>
                <div class="color-list">
                    {#each analysisData.recommendedColors.accents as color}
                    <div class="color-swatch" style="background-color: {color};"></div>
                    {/each}
                </div>
                </div>
            </div>
    
        <!-- Outfit Recommendations -->
            <div class="section">
                <h3 class="subheader">Outfit Recommendations</h3>
                {#each Object.entries(analysisData.outfits) as [occasion, outfits]}
                    <div class="occasion-container">
                        <p class="occasion-title"><strong>{occasion.charAt(0).toUpperCase() + occasion.slice(1)}:</strong></p>
                        <ul class="outfit-list">
                            {#each outfits as outfit}
                                <li>{outfit}</li>
                            {/each}
                        </ul>
                    </div>
                {/each}
            </div>
        </div>
    {:else}
        <div class="error-text">
          <p>Failed to retrieve analysis. Please try again.</p>
        </div>
    {/if}
  </div>
  
  <style>
    .analysis-container {
      display: flex;
      justify-content: center;
      padding: 20px;
      font-family: Arial, sans-serif;
    }
  
    .analysis-card {
      max-width: 600px;
      width: 100%;
      background-color: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    }
  
    .color-display {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
    }
  
    .color-swatch {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 1px solid #ddd;
    }
  
    .section {
      margin-bottom: 20px;
    }
  
    .label {
      font-weight: bold;
      margin-bottom: 4px;
    }
  
    .subheader {
      font-size: 1.25em;
      font-weight: bold;
      margin-bottom: 10px;
    }
  
    .color-group {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 10px;
    }
  
    .color-list {
      display: flex;
      gap: 8px;
    }
  
    p {
      margin: 4px 0;
    }
    
    .loading-text,
    .error-text {
    font-size: 1.25rem;
    text-align: center;
    margin-top: 2rem;
    padding: 1.5rem;
    color: #0070f3;
    background-color: #ededed; 
    border-radius: 0.5rem;
    }

    @keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    }

    .spinner {
    margin: 1.5rem auto;
    border: 4px solid #e5e7eb; 
    border-top: 4px solid #0070f3; 
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    animation: spin 1s linear infinite;
    }

    .occasion-container {
        margin: 0;
        padding: 0;
    }

    .occasion-title {
        margin-bottom: 0;
        font-weight: bold;
    }

    .outfit-list {
        margin-top: 0;
        padding-left: 1.2rem; 
    }

    .outfit-list li {
        margin: 0;
    }
  </style>
  