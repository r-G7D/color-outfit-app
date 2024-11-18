<script lang="ts">
  import UserDataForm from '$lib/components/UserDataForm.svelte';
    import type { UserData } from '../../lib/types';
  
    let selectedImage: File | null = null;
    let imageUrl: string | null = null;
    let selectedColor: string | null = null;
  
    function handleImageUpload(event: Event) {
      const fileInput = event.target as HTMLInputElement;
      const files = fileInput.files;
      if (files && files[0]) {
        selectedImage = files[0];
        imageUrl = URL.createObjectURL(selectedImage);
      }
    }
  
    function pickColor(event: MouseEvent) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (context && imageUrl) {
            const img = new Image();
            img.src = imageUrl;
            img.onload = () => {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            context.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

            const rect = (event.target as HTMLImageElement).getBoundingClientRect();
            const x = Math.round(((event.clientX - rect.left) / rect.width) * img.naturalWidth);
            const y = Math.round(((event.clientY - rect.top) / rect.height) * img.naturalHeight);

            const pixelData = context.getImageData(x, y, 1, 1).data;
            selectedColor = `#${((1 << 24) + (pixelData[0] << 16) + (pixelData[1] << 8) + pixelData[2]).toString(16).slice(1)}`;
            };
        }
    }

  
    function submitForm(event: CustomEvent<{ userData: UserData }>) {
      const url = new URL('/analysis', window.location.origin);
      url.searchParams.append('color', selectedColor || '');
      url.searchParams.append('userData', JSON.stringify(event.detail.userData));
      window.location.href = url.toString();
    }
  </script>
  
  <div class="color-picker-container">
    <div class="content-wrapper">
      <h1 class="title">Select Your Skin Tone</h1>
      {#if !imageUrl}
        <div class="upload-section">
          <label for="file-upload" class="upload-button">
            Upload Selfie
            <span class="upload-icon">📸</span>
          </label>
          <input 
            type="file" 
            id="file-upload" 
            accept="image/*" 
            style="display: none;" 
            on:change={handleImageUpload} 
          />
          <p class="upload-hint">Choose a well-lit photo of your face</p>
        </div>
      {/if}
  
      {#if imageUrl}
        <div class="image-container">
          <img 
            src={imageUrl} 
            alt="Uploaded Selfie" 
            on:click={pickColor} 
            class="image-preview" 
          />
        </div>
        <div class="color-picker">
          <label for="color-picker" class="picker-label">
            Pick the brightest part of your skin
          </label>
          {#if selectedColor}
            <div class="hex-preview">
              <div class="color-swatch" style="background-color: {selectedColor};"></div>
              <span class="hex-code">{selectedColor}</span>
            </div>
          {/if}
        </div>
  
        {#if selectedColor}
          <UserDataForm on:userDataSubmitted={submitForm} />
        {/if}
      {/if}
    </div>
  </div>
  
  <style>
    :global(body) {
      margin: 0;
      padding: 0;
      min-height: 100vh;
      background: linear-gradient(135deg, #9ec0ff 0%, rgba(158, 192, 255, 0.2) 100%);
      font-family: Poppins, Arial, sans-serif;
    }
  
    .color-picker-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 2rem;
      position: relative;
      overflow: hidden;
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
      max-width: 800px;
      width: 90%;
    }
  
    .title {
      font-size: 2.5rem;
      color: #1a365d;
      margin-bottom: 2rem;
      font-weight: 800;
      letter-spacing: -0.5px;
      text-align: center;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    }
  
    .upload-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
    }
  
    .upload-button {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1.2rem 2.5rem;
      font-size: 1.25rem;
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
  
    .upload-button:hover {
      transform: translateY(-3px);
      box-shadow: 
        0 6px 20px rgba(74, 144, 226, 0.4),
        0 4px 8px rgba(0, 0, 0, 0.1);
      background: linear-gradient(135deg, #357abd 0%, #2868a9 100%);
    }
  
    .upload-button:active {
      transform: translateY(-1px);
    }
  
    .upload-hint {
      color: #2d4a77;
      font-size: 1rem;
      text-align: center;
      opacity: 0.8;
    }
  
    .image-container {
      margin: 2rem 0;
      display: flex;
      justify-content: center;
      position: relative;
    }
  
    .image-preview {
      max-width: 100%;
      height: auto;
      border-radius: 1rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      cursor: crosshair;
      transition: transform 0.3s ease;
    }
  
    .image-preview:hover {
      transform: scale(1.02);
    }
  
    .color-picker {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      margin: 2rem 0;
    }
  
    .picker-label {
      font-size: 1.2rem;
      color: #1a365d;
      font-weight: 500;
      text-align: center;
    }
  
    .hex-preview {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.5rem;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(5px);
      border-radius: 1rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  
    .color-swatch {
      width: 48px;
      height: 48px;
      border-radius: 0.75rem;
      border: 2px solid rgba(255, 255, 255, 0.4);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }
  
    .hex-code {
      font-size: 1.1rem;
      font-weight: 600;
      color: #1a365d;
      letter-spacing: 0.5px;
    }
  
    @media (max-width: 768px) {
      .content-wrapper {
        padding: 2rem;
      }
  
      .title {
        font-size: 2rem;
      }
  
      .upload-button {
        padding: 1rem 2rem;
        font-size: 1.1rem;
      }
  
      .image-preview {
        max-width: 100%;
      }
    }
  </style>
  