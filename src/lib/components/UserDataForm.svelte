<script lang="ts">
    import type { UserData } from '../types';
    import { createEventDispatcher } from 'svelte';
  
    const dispatch = createEventDispatcher<{
      userDataSubmitted: { userData: UserData };
    }>();
  
    let userData: UserData = {
      hairColor: '',
      isHairDyed: false,
      naturalHairColor: '',
      eyeColor: '',
      tanningTendency: '',
      veinColor: '',
      jewelryPreference: '',
      favoriteColors: '',
      styleGoals: [],
      dislikedColors: '',
      profession: '',
      commonOccasions: [],
      climate: ''
    };
  
    const styleGoalOptions = [
      'Professional',
      'Casual',
      'Bold',
      'Subtle',
      'Creative',
      'Classic',
      'Trendy'
    ] as const;
  
    const occasionOptions = [
      'Office work',
      'Client meetings',
      'Casual outings',
      'Formal events',
      'Athletic/Sports',
      'Date nights',
      'Weekend casual'
    ] as const;
  
    function handleSubmit(): void {
      dispatch('userDataSubmitted', { userData });
    }
  </script>
  
  <div class="form-container">
    <form on:submit|preventDefault={handleSubmit}>
      <!-- Physical Characteristics Section -->
      <div class="section">
        <h2 class="section-title">Physical Characteristics</h2>
        
        <div class="form-group">
          <label for="hairColor">Current Hair Color</label>
          <div class="row">
            <input
              type="text"
              id="hairColor"
              bind:value={userData.hairColor}
              placeholder="Hair Color"
              class="hair-color-input"
            />
            
            <label class="checkbox-label">
              <input type="checkbox" bind:checked={userData.isHairDyed} />
              <span class="checkbox-text">Is your hair dyed?</span>
            </label>
          </div>
        </div>
        
        {#if userData.isHairDyed}
          <div class="form-group">
            <label for="naturalHairColor">Natural Hair Color</label>
            <input 
              type="text" 
              id="naturalHairColor"
              bind:value={userData.naturalHairColor}
              placeholder="Natural Hair Color"
            />
          </div>
        {/if}
  
        <div class="form-group">
          <label for="eyeColor">Eye Color</label>
          <input 
            type="text" 
            id="eyeColor" 
            placeholder="Eye Color" 
            bind:value={userData.eyeColor}
          />
        </div>
  
        <div class="form-group">
          <label for="tanningTendency">Sun Reaction</label>
          <select id="tanningTendency" bind:value={userData.tanningTendency}>
            <option value="">Select...</option>
            <option value="burn">Usually burn</option>
            <option value="tan">Usually tan</option>
            <option value="both">Both burn and tan</option>
            <option value="neither">Neither burn nor tan</option>
          </select>
        </div>
  
        <div class="form-group">
          <label for="veinColor">Visible Vein Color</label>
          <select id="veinColor" bind:value={userData.veinColor}>
            <option value="">Select...</option>
            <option value="blue-green">Blue/Green</option>
            <option value="purple-blue">Purple/Blue</option>
            <option value="both">Mix of both</option>
          </select>
        </div>
  
        <div class="form-group">
          <label for="jewelryPreference">Preferred Jewelry Metal</label>
          <select id="jewelryPreference" bind:value={userData.jewelryPreference}>
            <option value="">Select...</option>
            <option value="gold">Gold</option>
            <option value="silver">Silver</option>
            <option value="both">Both look good</option>
          </select>
        </div>
      </div>
  
      <!-- Style Preferences Section -->
      <div class="section">
        <h2 class="section-title">Style Preferences</h2>
        
        <div class="form-group">
          <label for="favoriteColors">Favorite Colors to Wear</label>
          <input 
            type="text" 
            id="favoriteColors" 
            bind:value={userData.favoriteColors} 
            placeholder="e.g., navy, burgundy, forest green" 
          />
        </div>
  
        <div class="form-group">
          <fieldset class="checkbox-group">
            <legend>Style Goals</legend>
            <div class="checkbox-grid">
              {#each styleGoalOptions as goal}
                <label class="checkbox-label">
                  <input type="checkbox" bind:group={userData.styleGoals} value={goal} />
                  <span class="checkbox-text">{goal}</span>
                </label>
              {/each}
            </div>
          </fieldset>
        </div>
  
        <div class="form-group">
          <label for="dislikedColors">Colors You Dislike/Avoid</label>
          <input 
            type="text" 
            id="dislikedColors" 
            bind:value={userData.dislikedColors}
            placeholder="Colors you prefer not to wear"
          />
        </div>
      </div>
  
      <!-- Lifestyle Section -->
      <div class="section">
        <h2 class="section-title">Lifestyle</h2>
        
        <div class="form-group">
          <label for="profession">Profession/Industry</label>
          <input 
            type="text" 
            id="profession" 
            bind:value={userData.profession}
            placeholder="Your profession or industry"
          />
        </div>
  
        <div class="form-group">
          <fieldset class="checkbox-group">
            <legend>Common Occasions</legend>
            <div class="checkbox-grid">
              {#each occasionOptions as occasion}
                <label class="checkbox-label">
                  <input type="checkbox" bind:group={userData.commonOccasions} value={occasion} />
                  <span class="checkbox-text">{occasion}</span>
                </label>
              {/each}
            </div>
          </fieldset>
        </div>
  
        <div class="form-group">
          <label for="climate">Local Climate</label>
          <select id="climate" bind:value={userData.climate}>
            <option value="">Select...</option>
            <option value="tropical">Tropical/Hot</option>
            <option value="temperate">Temperate/Mild</option>
            <option value="cold">Cold</option>
            <option value="varied">Varied Seasons</option>
          </select>
        </div>
        
        <button type="submit" class="submit-button">
          Continue to Analysis
        </button>
      </div>
    </form>
  </div>
  
  <style>
    .form-container {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 1.5rem;
      padding: 2rem;
      box-shadow: 
        0 8px 32px rgba(31, 38, 135, 0.15),
        0 4px 8px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 720px;
      margin: 2rem auto;
    }
  
    .section {
      margin-bottom: 2.5rem;
    }
  
    .section-title {
      font-size: 1.8rem;
      color: #1a365d;
      font-weight: 700;
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid rgba(74, 144, 226, 0.3);
    }
  
    .form-group {
      margin-bottom: 1.5rem;
    }
  
    label {
      display: block;
      color: #2d4a77;
      font-size: 1rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
  
    input[type="text"],
    select {
      width: 100%;
      padding: 0.875rem;
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(74, 144, 226, 0.3);
      border-radius: 0.75rem;
      font-size: 1rem;
      transition: all 0.3s ease;
    }
  
    input[type="text"]:focus,
    select:focus {
      outline: none;
      border-color: #4a90e2;
      box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
    }

    input[type="text"]{
      width: 96%;
    }
  
    .row {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  
    .hair-color-input {
      flex: 1;
    }
  
    .checkbox-group {
      border: none;
      padding: 0;
      margin: 0;
    }
  
    .checkbox-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
      margin-top: 0.5rem;
    }
  
    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 0.5rem;
      transition: background-color 0.3s ease;
    }
  
    .checkbox-label:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  
    .checkbox-text {
      color: #2d4a77;
      font-size: 0.9rem;
    }
  
    input[type="checkbox"] {
      width: 1.125rem;
      height: 1.125rem;
      border-radius: 0.25rem;
      border: 2px solid #4a90e2;
      cursor: pointer;
    }
  
    legend {
      color: #2d4a77;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
  
    .submit-button {
      width: 100%;
      padding: 1rem 2rem;
      font-size: 1.125rem;
      color: white;
      background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
      border: none;
      border-radius: 0.75rem;
      cursor: pointer;
      font-weight: 600;
      margin-top: 2rem;
      transition: all 0.3s ease;
      box-shadow: 
        0 4px 15px rgba(74, 144, 226, 0.3),
        0 2px 4px rgba(0, 0, 0, 0.1);
    }
  
    .submit-button:hover {
      transform: translateY(-2px);
      box-shadow: 
        0 6px 20px rgba(74, 144, 226, 0.4),
        0 4px 8px rgba(0, 0, 0, 0.1);
      background: linear-gradient(135deg, #357abd 0%, #2868a9 100%);
    }
  
    .submit-button:active {
      transform: translateY(-1px);
    }
  
    @media (max-width: 768px) {
      .form-container {
        padding: 1.5rem;
        margin: 1rem;
      }
  
      .section-title {
        font-size: 1.5rem;
      }
  
      .checkbox-grid {
        grid-template-columns: 1fr;
      }
  
      input[type="text"],
      select {
        padding: 0.75rem;
      }
    }
  </style>
  