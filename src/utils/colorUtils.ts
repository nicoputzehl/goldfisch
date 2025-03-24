/**
 * Converts a hex color string to an RGBA string
 * @param hexColor The hex color string (with or without '#')
 * @param alpha The alpha value (0-1)
 * @returns RGBA color string
 */
export function hexToRgba(hexColor: string, alpha = 1): string {
  // Remove '#' if present
  const hex = hexColor.replace('#', '');
  
  // Parse hex values
  const r = Number.parseInt(hex.substring(0, 2), 16);
  const g = Number.parseInt(hex.substring(2, 4), 16);
  const b = Number.parseInt(hex.substring(4, 6), 16);
  
  // Return rgba string
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Lightens a hex color by a given percentage
 * @param hexColor The hex color string
 * @param percent The percentage to lighten (0-100)
 * @returns Lightened hex color
 */
export function lightenColor(hexColor: string, percent = 10): string {
  // Remove '#' if present
  const hex = hexColor.replace('#', '');
  
  // Parse hex values
  let r = Number.parseInt(hex.substring(0, 2), 16);
  let g = Number.parseInt(hex.substring(2, 4), 16);
  let b = Number.parseInt(hex.substring(4, 6), 16);
  
  // Lighten each channel
  r = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
  g = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
  b = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));
  
  // Convert back to hex
  const rHex = r.toString(16).padStart(2, '0');
  const gHex = g.toString(16).padStart(2, '0');
  const bHex = b.toString(16).padStart(2, '0');
  
  return `#${rHex}${gHex}${bHex}`;
}

/**
 * Darkens a hex color by a given percentage
 * @param hexColor The hex color string
 * @param percent The percentage to darken (0-100)
 * @returns Darkened hex color
 */
export function darkenColor(hexColor: string, percent = 10): string {
  // Remove '#' if present
  const hex = hexColor.replace('#', '');
  
  // Parse hex values
  let r = Number.parseInt(hex.substring(0, 2), 16);
  let g = Number.parseInt(hex.substring(2, 4), 16);
  let b = Number.parseInt(hex.substring(4, 6), 16);
  
  // Darken each channel
  r = Math.max(0, Math.floor(r * (1 - percent / 100)));
  g = Math.max(0, Math.floor(g * (1 - percent / 100)));
  b = Math.max(0, Math.floor(b * (1 - percent / 100)));
  
  // Convert back to hex
  const rHex = r.toString(16).padStart(2, '0');
  const gHex = g.toString(16).padStart(2, '0');
  const bHex = b.toString(16).padStart(2, '0');
  
  return `#${rHex}${gHex}${bHex}`;
}

/**
 * Generates color variants for a given base color
 * @param baseColor The base color in hex format
 * @returns Object with color variants
 */
export function generateColorVariants(baseColor: string) {
  return {
    light: lightenColor(baseColor, 20),
    main: baseColor,
    dark: darkenColor(baseColor, 20),
    transparent: hexToRgba(baseColor, 0.1),
  };
}

/**
 * Checks if a color is light or dark
 * @param hexColor The hex color string
 * @returns Boolean indicating if the color is light
 */
export function isLightColor(hexColor: string): boolean {
  // Remove '#' if present
  const hex = hexColor.replace('#', '');
  
  // Parse hex values
  const r = Number.parseInt(hex.substring(0, 2), 16);
  const g = Number.parseInt(hex.substring(2, 4), 16);
  const b = Number.parseInt(hex.substring(4, 6), 16);
  
  // Calculate brightness using the formula: (0.299*R + 0.587*G + 0.114*B)
  const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
  
  // Return true if the color is light (brightness > 155)
  return brightness > 155;
}

export default {
  hexToRgba,
  lightenColor,
  darkenColor,
  generateColorVariants,
  isLightColor,
};
