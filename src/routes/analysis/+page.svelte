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
            //   console.error('Failed to fetch analysis'); //TODO
            // await new Promise(resolve => setTimeout(resolve, 3000));
            analysisData = { /** Temporary response */
                "skinTone": "#dabea0",
                "season": "Autumn with warm undertones",
                "undertone": "Warm",
                "recommendedColors": {
                    "neutrals": ["#f5f5dc", "#8b7765", "#d2b48c"],
                    "accents": ["#c85a17", "#6b8e23", "#9b111e"]
                },
                "outfits": {
                    "Client meetings": [
                        "Light taupe blazer over a warm-toned, olive green blouse with tailored beige trousers, accessorized with a silver watch.",
                        "Rust-colored dress shirt with charcoal trousers, accessorized with classic leather shoes and a structured tote bag."
                    ],
                    "Office work": [
                        "Classic brown chinos paired with a cream button-up, complemented by a soft olive cardigan.",
                        "Beige trousers and an ivory top, layered with a tan belt and loafers for a polished look."
                    ],
                    "Casual outings": [
                        "Olive green t-shirt with light wash jeans, paired with casual sneakers and a light tan crossbody bag.",
                        "Rust-colored henley top with khaki shorts, accessorized with a gold-toned bracelet and leather sandals."
                    ],
                    "Weekend casual": [
                        "Soft cream tank top with denim shorts and an olive green overshirt, with comfortable slip-on sandals.",
                        "Casual taupe dress with a wide-brim hat, paired with tan sandals for a relaxed weekend look."
                    ]
                }
            }
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
  