import type { ThemeName } from '../types';

export const themeOptions: Array<{ name: ThemeName; label: string; classes: string }> = [
  { name: 'blue', label: 'Blue', classes: 'from-blue-700 to-blue-500' },
  { name: 'purple', label: 'Purple', classes: 'from-purple-700 to-purple-500' },
  { name: 'green', label: 'Green', classes: 'from-green-700 to-green-500' },
  { name: 'red', label: 'Red', classes: 'from-red-700 to-red-500' }
];
