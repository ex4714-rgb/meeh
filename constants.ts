
import { SheepSkin } from './types';

export const STORIES_PROMPT = "Génère une histoire courte et apaisante pour dormir, en français, sur le thème des moutons ou des rêves. L'histoire doit être douce et poétique.";

export const SHEEP_SKINS: SheepSkin[] = [
  { id: 'classic', name: 'Classique', bodyColor: 'bg-[#e2e2e2]', headColor: 'bg-[#d4c5b0]', woolColor: 'bg-white', accentColor: 'bg-neutral-300' },
  { id: 'black', name: 'Nuit', bodyColor: 'bg-neutral-800', headColor: 'bg-neutral-900', woolColor: 'bg-neutral-700', accentColor: 'bg-black' },
  { id: 'pink', name: 'Bonbon', bodyColor: 'bg-pink-300', headColor: 'bg-pink-200', woolColor: 'bg-pink-100', accentColor: 'bg-pink-400' },
  { id: 'gold', name: 'Lune', bodyColor: 'bg-yellow-200', headColor: 'bg-yellow-600', woolColor: 'bg-yellow-100', accentColor: 'bg-yellow-300' },
  { id: 'blue', name: 'Nuage', bodyColor: 'bg-blue-300', headColor: 'bg-blue-200', woolColor: 'bg-blue-100', accentColor: 'bg-blue-400' },
  { id: 'mint', name: 'Menthe', bodyColor: 'bg-emerald-300', headColor: 'bg-emerald-200', woolColor: 'bg-emerald-100', accentColor: 'bg-emerald-400' },
  { id: 'ender', name: 'Néant', bodyColor: 'bg-purple-900', headColor: 'bg-gray-900', woolColor: 'bg-purple-800', accentColor: 'bg-purple-950' },
];
