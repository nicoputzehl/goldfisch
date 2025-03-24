// Function to convert hex to rgba
export const hexToRgba = (hex: string, alpha = 1) => {
  if (!hex.startsWith('#')) {
    return hex;
  }
  
  let r = 0, g = 0, b = 0;
  
  // 3 digits
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } 
  // 6 digits
  else if (hex.length === 7) {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  }
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Function to lighten a color
export const lightenColor = (hex: string, amount: number) => {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  
  r = Math.min(255, Math.round(r + (255 - r) * amount));
  g = Math.min(255, Math.round(g + (255 - g) * amount));
  b = Math.min(255, Math.round(b + (255 - b) * amount));
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

// Function to darken a color
export const darkenColor = (hex: string, amount: number) => {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  
  r = Math.max(0, Math.round(r * (1 - amount)));
  g = Math.max(0, Math.round(g * (1 - amount)));
  b = Math.max(0, Math.round(b * (1 - amount)));
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

// Function to generate transparent versions of a color
export const generateAlphaColors = (hex: string) => {
  return {
    alpha5: hexToRgba(hex, 0.05),
    alpha10: hexToRgba(hex, 0.1),
    alpha20: hexToRgba(hex, 0.2),
    alpha30: hexToRgba(hex, 0.3),
    alpha50: hexToRgba(hex, 0.5),
    alpha70: hexToRgba(hex, 0.7),
    alpha90: hexToRgba(hex, 0.9),
  };
};
