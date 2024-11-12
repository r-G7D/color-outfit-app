export interface UserData {
    hairColor: string;
    isHairDyed: boolean;
    naturalHairColor?: string;
    eyeColor: string;
    tanningTendency: 'burn' | 'tan' | 'both' | 'neither' | '';
    veinColor: 'blue-green' | 'purple-blue' | 'both' | '';
    jewelryPreference: 'gold' | 'silver' | 'both' | '';
    favoriteColors: string;
    styleGoals: string[];
    dislikedColors: string;
    profession: string;
    commonOccasions: string[];
    climate: 'tropical' | 'temperate' | 'cold' | 'varied' | '';
  }
  
  export interface ColorAnalysis {
    skinTone: string;
    season: string;
    undertone: string;
    recommendedColors: {
      neutrals: string[];
      accents: string[];
    };
    outfits: { [key: string]: string[] }; 
  }
  