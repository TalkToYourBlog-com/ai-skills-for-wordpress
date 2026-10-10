# SVG building blocks for flat header illustrations

Use these as parts, recolour them with the owner's palette and combine two or three into one scene. All use `viewBox="0 0 400 300"`; move or scale a part by wrapping it in `<g transform="translate(x y) scale(s)">`. Keep text out of the SVG.

## Ground shadow (put under any object)

```svg
<ellipse cx="200" cy="262" rx="140" ry="16" fill="#000" opacity=".15"/>
```

## Hills (background)

```svg
<path d="M0 230 C80 170 160 180 230 215 C300 250 360 200 400 190 L400 300 L0 300 Z" fill="#2f7f5f"/>
<path d="M0 260 C90 215 190 240 270 255 C330 265 370 245 400 240 L400 300 L0 300 Z" fill="#256a4f"/>
```

## Sun or moon

```svg
<circle cx="320" cy="70" r="34" fill="#ffd166"/>
```

## Loaf of bread

```svg
<path d="M60 200 C60 110 120 70 200 70 C280 70 340 110 340 200 Z" fill="#e9a23b"/>
<rect x="60" y="196" width="280" height="52" rx="20" fill="#c97b1e"/>
<path d="M120 120 L150 170 M180 100 L210 170 M240 110 L270 170" stroke="#fff3d6" stroke-width="10" stroke-linecap="round"/>
```

## Coin and jar (money, savings)

```svg
<rect x="140" y="90" width="120" height="150" rx="22" fill="#cfe8ef" opacity=".85"/>
<rect x="150" y="70" width="100" height="26" rx="10" fill="#4a6572"/>
<circle cx="200" cy="205" r="22" fill="#ffd166"/><circle cx="170" cy="222" r="18" fill="#f4b942"/><circle cx="232" cy="220" r="19" fill="#f4b942"/>
```

## Laptop (work, tech, writing)

```svg
<rect x="105" y="85" width="190" height="120" rx="12" fill="#2b3a55"/>
<rect x="117" y="97" width="166" height="96" rx="6" fill="#9ad1d4"/>
<path d="M80 212 H320 L300 232 H100 Z" fill="#8d99ae"/>
```

## Plant in a pot

```svg
<path d="M170 200 H230 L222 250 H178 Z" fill="#c8553d"/>
<path d="M200 200 C190 150 150 140 140 110 C175 115 200 150 200 200 Z" fill="#4c9a6a"/>
<path d="M200 200 C210 140 250 130 262 100 C225 108 200 145 200 200 Z" fill="#3b7f57"/>
```

## Cup of coffee or tea

```svg
<path d="M140 120 H260 V180 C260 215 235 235 200 235 C165 235 140 215 140 180 Z" fill="#f2efe9"/>
<path d="M260 140 C300 140 300 190 258 190" fill="none" stroke="#f2efe9" stroke-width="12" stroke-linecap="round"/>
<rect x="140" y="120" width="120" height="14" fill="#6f4e37"/>
```

## Speech bubble (comments, advice)

```svg
<path d="M90 80 H310 a24 24 0 0 1 24 24 V170 a24 24 0 0 1 -24 24 H190 L140 232 V194 H90 a24 24 0 0 1 -24 -24 V104 a24 24 0 0 1 24 -24 Z" fill="#ffffff"/>
```

## Composition tips

- Background layer first (hills, sky), then the main object, then small details.
- Three sizes only: one big subject, one medium helper, a few small accents.
- Reuse the palette: a dark and light version of the same colour gives depth without new colours.
