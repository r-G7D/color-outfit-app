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
    <h1 class="title">Select Your Skin Tone</h1>
    {#if !imageUrl}
      <label for="file-upload" class="upload-button">
        Upload Selfie
      </label>
      <input type="file" id="file-upload" accept="image/*" style="display: none;" on:change={handleImageUpload} />
    {/if}
  
    {#if imageUrl}
      <div class="image-container">
        <img src={imageUrl} alt="Uploaded Selfie" on:click={pickColor} class="image-preview" /> <!--  TODO use crosshair instead of tapping -->
      </div>
      <div class="color-picker">
        <label for="color-picker">Pick the brightest part of your skin</label>
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

  <style>
    .color-picker-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 20px;
      background-color: #f5f5f5;
      font-family: Arial, sans-serif;
    }
  
    .title {
      font-size: 1.8rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 1.2rem;
      text-align: center;
    }
  
    .upload-button {
      display: inline-block;
      padding: 15px 30px;
      background-color: #0066ff;
      color: #fff;
      font-size: 1rem;
      font-weight: 500;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.3s;
      margin-bottom: 1.5rem;
      text-align: center;
    }
  
    .upload-button:hover {
      background-color: #0052cc;
    }
  
    .hex-preview {
      display: flex;
      align-items: center;
      gap: 10px;
      background-color: #fff;
      padding: 10px 15px;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      margin-bottom: 1.5rem;
    }
  
    .color-swatch {
      width: 40px;
      height: 40px;
      border-radius: 6px;
      border: 1px solid #ddd;
    }
  
    .hex-code {
      font-size: 1rem;
      font-weight: 500;
      color: #333;
    }

    .image-container {
        margin: 20px 0;
        display: flex;
        justify-content: center;
    }

    .image-preview {
        max-width: 60%;
        height: auto;
        border-radius: 10px;
    }
  </style>
  