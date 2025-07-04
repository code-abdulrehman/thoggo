// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    site: 'https://example.com',
    integrations: [
        mdx({
            remarkPlugins: [],
            rehypePlugins: [],
            gfm: true,
            smartypants: true,
        }), 
        sitemap(), 
        react()
    ],
    markdown: {
        shikiConfig: {
            theme: 'houston',  //'andromeeda' | 'aurora-x' | 'ayu-dark' | 'catppuccin-frappe' | 'catppuccin-latte' | 'catppuccin-macchiato' | 'catppuccin-mocha' | 'dark-plus' | 'dracula' | 'dracula-soft' | 'everforest-dark' | 'everforest-light' | 'github-dark' | 'github-dark-default' | 'github-dark-dimmed' | 'github-dark-high-contrast' | 'github-light' | 'github-light-default' | 'github-light-high-contrast' | 'gruvbox-dark-hard' | 'gruvbox-dark-medium' | 'gruvbox-dark-soft' | 'gruvbox-light-hard' | 'gruvbox-light-medium' | 'gruvbox-light-soft' | 'houston' | 'kanagawa-dragon' | 'kanagawa-lotus' | 'kanagawa-wave' | 'laserwave' | 'light-plus' | 'material-theme' | 'material-theme-darker' | 'material-theme-lighter' | 'material-theme-ocean' | 'material-theme-palenight' | 'min-dark' | 'min-light' | 'monokai' | 'night-owl' | 'nord' | 'one-dark-pro' | 'one-light' | 'plastic' | 'poimandres' | 'red' | 'rose-pine' | 'rose-pine-dawn' | 'rose-pine-moon' | 'slack-dark' | 'slack-ochin' | 'snazzy-light' | 'solarized-dark' | 'solarized-light' | 'synthwave-84' | 'tokyo-night' | 'vesper' | 'vitesse-black' | 'vitesse-dark' | 'vitesse-light'
            wrap: true
        }
    }
});