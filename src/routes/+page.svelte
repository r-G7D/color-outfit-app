<script lang="ts">
  function navigateToColorPicker() {
    window.location.href = "/color-picker";
  }
</script>

<div class="body">
  <div class="landing-container">
    <div class="content-wrapper">
      <h1 class="landing-title">TintTone</h1>
      <p class="landing-description">
        Your personal color and outfit recommendation tool. Upload a selfie, explore colors, and get personalized outfit suggestions.
      </p>
      <button class="start-button" on:click={navigateToColorPicker}>
        Start
      </button>
    </div>
  </div>
</div>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .body {
    min-height: 100vh;
    background: linear-gradient(135deg, #9ec0ff 0%, rgba(158, 192, 255, 0.2) 100%);
    font-family: Poppins, Arial, sans-serif;
  }

  .landing-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 2rem;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .landing-container::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%);
    pointer-events: none;
    z-index: 1;
  }

  .content-wrapper {
    position: relative;
    z-index: 2;
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.1);
    padding: 3rem;
    border-radius: 2rem;
    box-shadow: 
      0 8px 32px rgba(31, 38, 135, 0.15),
      0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    width: 90%;
  }

  .landing-title {
    font-size: 3.5rem;
    color: #1a365d;
    margin-bottom: 1.5rem;
    font-weight: 800;
    letter-spacing: -0.5px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }

  .landing-description {
    font-size: 1.25rem;
    color: #2d4a77;
    margin-bottom: 2.5rem;
    line-height: 1.6;
  }

  .start-button {
    padding: 1.2rem 3rem;
    font-size: 1.5rem;
    color: white;
    background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
    border: none;
    border-radius: 1rem;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 
      0 4px 15px rgba(74, 144, 226, 0.3),
      0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .start-button:hover {
    transform: translateY(-3px);
    box-shadow: 
      0 6px 20px rgba(74, 144, 226, 0.4),
      0 4px 8px rgba(0, 0, 0, 0.1);
    background: linear-gradient(135deg, #357abd 0%, #2868a9 100%);
  }

  .start-button:active {
    transform: translateY(-1px);
    box-shadow: 
      0 2px 10px rgba(74, 144, 226, 0.3),
      0 1px 2px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    .landing-title {
      font-size: 2.5rem;
    }
    
    .landing-description {
      font-size: 1.1rem;
    }
    
    .start-button {
      padding: 1rem 2.5rem;
      font-size: 1.25rem;
    }
    
    .content-wrapper {
      padding: 2rem;
    }
  }
</style>