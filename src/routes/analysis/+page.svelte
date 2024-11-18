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
              ],
              "Casual": [
                  "Beige chinos paired with a light olive green shirt. Accessorize with leather sandals or casual loafers in warm brown tones.",
                  "Classic blue jeans with an earth-tone t-shirt, like terracotta or muted rust, and add a brown leather belt for a warm, grounded look."
              ],
              "Professional": [
                  "A tailored light brown or camel suit paired with a cream shirt for a polished yet warm look. Finish with dark brown leather shoes and a matching belt.",
                  "For a smart-casual office setting, try a soft beige or taupe shirt under a navy blazer with light khaki pants, adding warm-toned accessories like a brown leather watch strap."
              ],
              "Evening": [
                  "A deep olive green button-down shirt paired with dark charcoal or brown slacks and tan leather shoes for a sophisticated yet season-appropriate ensemble.",
                  "Classic black trousers with a muted burnt orange shirt and brown leather accessories, adding a subtle but warm pop of color for evening events."
              ]     
          };

          // Fallback occasions
          const defaultOccasions = ["Casual", "Professional", "Evening"];

          // Use userData.commonOccasions or fall back to default
          const occasionsToUse = userData?.commonOccasions?.length ? userData.commonOccasions : defaultOccasions;

          // Dynamically filter outfits based on the selected occasions
          const filteredOutfits = occasionsToUse.reduce((acc: Record<string, string[]>, occasion: string) => {
              if (allOutfits[occasion]) {
                  acc[occasion] = allOutfits[occasion];
              }
              return acc;
          }, {});

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
      <div class="loading-container">
        <div class="spinner"></div>
        <p class="loading-text">Loading your personalized color and outfit analysis...</p>
      </div>
    {:else if analysisData}
      <div class="content-wrapper">
        <h2 class="title">Color Analysis Results</h2>
        
        <!-- Primary Analysis Section -->
        <div class="primary-analysis">
          <div class="analysis-box">
            <div class="skin-tone-display">
              <h3 class="box-title">Your Skin Tone</h3>
              <div class="color-display">
                <div 
                  class="large-swatch" 
                  style="background-color: {analysisData.skinTone};"
                ></div>
                <p class="color-code">{analysisData.skinTone}</p>
              </div>
            </div>
          </div>
  
          <div class="analysis-box">
            <h3 class="box-title">Your Color Profile</h3>
            <div class="profile-info">
              <div class="info-item">
                <span class="label">Season</span>
                <span class="value">{analysisData.season}</span>
              </div>
              <div class="info-item">
                <span class="label">Undertone</span>
                <span class="value">{analysisData.undertone}</span>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Color Recommendations Section -->
        <div class="recommendations-section">
          <h3 class="section-title">Your Color Palette</h3>
          
          <div class="color-recommendations">
            <div class="palette-group">
              <h4 class="palette-title">Neutrals</h4>
              <div class="color-swatches">
                {#each analysisData.recommendedColors.neutrals as color}
                  <div class="color-item">
                    <div 
                      class="swatch" 
                      style="background-color: {color};"
                    ></div>
                    <span class="color-name">{color}</span>
                  </div>
                {/each}
              </div>
            </div>
  
            <div class="palette-group">
              <h4 class="palette-title">Accent Colors</h4>
              <div class="color-swatches">
                {#each analysisData.recommendedColors.accents as color}
                  <div class="color-item">
                    <div 
                      class="swatch" 
                      style="background-color: {color};"
                    ></div>
                    <span class="color-name">{color}</span>
                  </div>
                {/each}
              </div>
            </div>
          </div>
        </div>
  
        <!-- Outfit Recommendations Section -->
        <div class="recommendations-section">
          <h3 class="section-title">Outfit Recommendations</h3>
          <div class="outfits-grid">
            {#each Object.entries(analysisData.outfits) as [occasion, outfits]}
              <div class="outfit-card">
                <h4 class="occasion-title">
                  {occasion.charAt(0).toUpperCase() + occasion.slice(1)}
                </h4>
                <ul class="outfit-list">
                  {#each outfits as outfit}
                    <li class="outfit-item">{outfit}</li>
                  {/each}
                </ul>
              </div>
            {/each}
          </div>
        </div>
      </div>
    {:else}
      <div class="error-container">
        <div class="error-message">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12" y2="16"/>
          </svg>
          <p>Failed to retrieve analysis. Please try again.</p>
        </div>
      </div>
    {/if}
  </div>
  
  <style>
    :global(body) {
      margin: 0;
      padding: 0;
      min-height: 100vh;
      background: linear-gradient(135deg, #9ec0ff 0%, rgba(158, 192, 255, 0.2) 100%);
      font-family: Poppins, Arial, sans-serif;
    }

    .analysis-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 2rem;
    }
  
    .content-wrapper {
      max-width: 1000px;
      margin: 0 auto;
      padding: 2.5rem;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 2rem;
      box-shadow: 
        0 8px 32px rgba(31, 38, 135, 0.15),
        0 4px 8px rgba(0, 0, 0, 0.1);
    }
  
    .title {
      font-size: 2.5rem;
      color: #1a365d;
      font-weight: 800;
      text-align: center;
      margin-bottom: 2.5rem;
      letter-spacing: -0.5px;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    }
  
    .primary-analysis {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }
  
    .analysis-box {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 1.5rem;
      padding: 2rem;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }
  
    .box-title {
      font-size: 1.25rem;
      color: #1a365d;
      font-weight: 600;
      margin-bottom: 1.5rem;
      text-align: center;
    }
  
    .skin-tone-display {
      text-align: center;
    }
  
    .large-swatch {
      width: 100px;
      height: 100px;
      border-radius: 1rem;
      margin: 0 auto 1rem;
      border: 3px solid rgba(255, 255, 255, 0.4);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  
    .color-code {
      font-size: 1.1rem;
      color: #2d4a77;
      font-weight: 500;
    }
  
    .profile-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  
    .info-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 0.75rem;
    }
  
    .label {
      color: #2d4a77;
      font-weight: 500;
    }
  
    .value {
      color: #1a365d;
      font-weight: 600;
    }
  
    .recommendations-section {
      margin-top: 3rem;
    }
  
    .section-title {
      font-size: 1.8rem;
      color: #1a365d;
      font-weight: 700;
      margin-bottom: 2rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid rgba(74, 144, 226, 0.3);
    }
  
    .color-recommendations {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }
  
    .palette-group {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 1rem;
      padding: 1.5rem;
    }
  
    .palette-title {
      font-size: 1.2rem;
      color: #1a365d;
      margin-bottom: 1rem;
      text-align: center;
    }
  
    .color-swatches {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
      gap: 1rem;
    }
  
    .color-item {
      text-align: center;
    }
  
    .swatch {
      width: 50px;
      height: 50px;
      border-radius: 0.5rem;
      margin: 0 auto 0.5rem;
      border: 2px solid rgba(255, 255, 255, 0.4);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }
  
    .color-name {
      font-size: 0.8rem;
      color: #2d4a77;
    }
  
    .outfits-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }
  
    .outfit-card {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 1rem;
      padding: 1.5rem;
    }
  
    .occasion-title {
      font-size: 1.2rem;
      color: #1a365d;
      font-weight: 600;
      margin-bottom: 1rem;
      text-align: center;
    }
  
    .outfit-list {
      list-style: none;
      padding: 0;
    }
  
    .outfit-item {
      padding: 0.75rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 0.5rem;
      margin-bottom: 0.5rem;
      color: #2d4a77;
    }
  
    .loading-container {
      text-align: center;
      padding: 2rem;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 1rem;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .spinner {
      border: 4px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top: 4px solid #4a90e2;
      width: 40px;
      height: 40px;
      margin: 0 auto 1rem;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .loading-text {
      color: #1a365d;
      font-size: 1.2rem;
    }
  
    .error-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 60vh;
    }
  
    .error-message {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.5rem;
      background: rgba(255, 74, 74, 0.1);
      border-radius: 1rem;
      color: #e53e3e;
    }
  
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  
    @media (max-width: 768px) {
      .content-wrapper {
        padding: 1.5rem;
      }
  
      .title {
        font-size: 2rem;
      }
  
      .color-swatches {
        grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
      }
  
      .large-swatch {
        width: 80px;
        height: 80px;
      }
    }
  </style>