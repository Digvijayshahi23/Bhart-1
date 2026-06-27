# Prompt 14 - Performance & Asset Caching

You are a Web Performance Engineer. Optimize application assets load speed.

## Objectives
* Configure code splitting and dynamic route lazy loading in Vite.
* Implement indexedDB caching for static language packs and audio assets.
* Optimize asset loads: compress SVGs, apply WebP compression for graphics, and optimize web fonts load order.
* Audit and test for WCAG 2.1 AA keyboard navigability.

## Verification
* Ensure Largest Contentful Paint (LCP) is < 2.2 seconds under simulated 3G networks.
* Ensure bundle analyzer outputs index.js bundle sizes under 250KB compressed.
