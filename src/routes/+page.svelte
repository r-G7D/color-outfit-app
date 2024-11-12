<script lang="ts">
  function navigateToColorPicker() {
    window.location.href = "/color-picker";
  }
</script>

<style>
  .landing-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f9f9f9;
    text-align: center;
    font-family: Poppins, Arial, sans-serif;
    padding: 0 1rem;
  }

  .landing-title {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 1.5rem;
    font-weight: bold;
    text-transform: uppercase;
  }

  .landing-description {
    font-size: 1.25rem;
    color: #555;
    margin-bottom: 2rem;
    line-height: 1.5;
  }

  .start-button {
    padding: 1rem 2rem;
    font-size: 1.5rem;
    color: white;
    background-color: #0070f3;
    border: none;
    border-radius: 0.75rem;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  .start-button:hover {
    background-color: #005bb5;
    transform: translateY(-2px);
  }

  .start-button:active {
    background-color: #004494;
    transform: translateY(0);
  }
</style>

<div class="landing-container">
  <h1 class="landing-title">Welcome to TintTone!</h1>
  <p class="landing-description">
    Your personal color and outfit recommendation tool. Upload a selfie, explore colors, and get personalized outfit suggestions.
  </p>
  <button class="start-button" on:click={navigateToColorPicker}>
    Start
  </button>
</div>
