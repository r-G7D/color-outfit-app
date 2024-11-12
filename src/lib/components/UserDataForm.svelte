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
      <h2 class="section-title">Physical Characteristics</h2>
      
      <label for="hairColor">Current Hair Color</label>
      <div class="row">
        <input
          type="text"
          id="hairColor"
          bind:value={userData.hairColor}
          placeholder="Hair Color"
          class="hair-color-input"
        />
        
        <label class="checkbox-container flex items-center">
          <input type="checkbox" bind:checked={userData.isHairDyed} />
          <span>Is your hair dyed?</span>
        </label>
      </div>
      
      {#if userData.isHairDyed}
        <label for="hairColor">Natural Hair Color</label>
        <input type="text" bind:value={userData.naturalHairColor} />
      {/if}
  
      <label for="eyeColor">Eye Color</label>
      <input type="text" id="eyeColor" placeholder="Eye Color" bind:value={userData.eyeColor} />
  
      <label for="tanningTendency">Sun Reaction</label>
      <select id="tanningTendency" bind:value={userData.tanningTendency}>
        <option value="">Select...</option>
        <option value="burn">Usually burn</option>
        <option value="tan">Usually tan</option>
        <option value="both">Both burn and tan</option>
        <option value="neither">Neither burn nor tan</option>
      </select>
  
      <label for="veinColor">Visible Vein Color</label>
      <select id="veinColor" bind:value={userData.veinColor}>
        <option value="">Select...</option>
        <option value="blue-green">Blue/Green</option>
        <option value="purple-blue">Purple/Blue</option>
        <option value="both">Mix of both</option>
      </select>
  
      <label for="jewelryPreference">Preferred Jewelry Metal</label>
      <select id="jewelryPreference" bind:value={userData.jewelryPreference}>
        <option value="">Select...</option>
        <option value="gold">Gold</option>
        <option value="silver">Silver</option>
        <option value="both">Both look good</option>
      </select>
  
      <!-- Style Preferences Section -->
      <h2 class="section-title">Style Preferences</h2>
      
      <label for="favoriteColors">Favorite Colors to Wear</label>
      <input type="text" id="favoriteColors" bind:value={userData.favoriteColors} placeholder="e.g., navy, burgundy, forest green" />
  
      <fieldset class="checkbox-group">
        <legend>Style Goals (select all that apply)</legend>
        {#each styleGoalOptions as goal}
          <label>
            <input type="checkbox" bind:group={userData.styleGoals} value={goal} />
            <span>{goal}</span>
          </label>
        {/each}
      </fieldset>

      <br>
  
      <label for="dislikedColors">Colors You Dislike/Avoid</label>
      <input type="text" id="dislikedColors" bind:value={userData.dislikedColors} />
  
      <!-- Lifestyle Section -->
      <h2 class="section-title">Lifestyle</h2>
      
      <label for="profession">Profession/Industry</label>
      <input type="text" id="profession" bind:value={userData.profession} />
  
      <fieldset class="checkbox-group">
        <legend>Common Occasions (select all that apply)</legend>
        {#each occasionOptions as occasion}
          <label>
            <input type="checkbox" bind:group={userData.commonOccasions} value={occasion} />
            <span>{occasion}</span>
          </label>
        {/each}
      </fieldset>

      <br>
  
      <label for="climate">Local Climate</label>
      <select id="climate" bind:value={userData.climate}>
        <option value="">Select...</option>
        <option value="tropical">Tropical/Hot</option>
        <option value="temperate">Temperate/Mild</option>
        <option value="cold">Cold</option>
        <option value="varied">Varied Seasons</option>
      </select>
      
      <button type="submit" class="submit-button">Continue to Analysis</button>
    </form>
  </div>
  
  

  <style>
    .form-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      font-family: Arial, sans-serif;
    }
  
    .section-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: #333;
      margin-top: 20px;
      margin-bottom: 10px;
    }
  
    input[type="text"],
    select {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 1rem;
      margin-top: 5px;
      margin-bottom: 15px;
      transition: border-color 0.3s;
    }

    input[type="text"]{
      width: 95%;
    }
  
    input[type="text"]:focus,
    select:focus {
      border-color: #0066ff;
    }

    .row {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .hair-color-input {
      flex: 1; 
    }

    .checkbox-container {
      flex-grow: 0.02; 
    }
  
    .checkbox-group {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
  
    .checkbox-group label {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 0.9rem;
      color: #333;
    }
  
    .submit-button {
      width: 100%;
      padding: 12px;
      background-color: #28a745;
      color: #fff;
      font-size: 1rem;
      font-weight: 500;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
  
    .submit-button:hover {
      background-color: #218838;
    }
  </style>
  