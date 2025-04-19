import { defineConfig } from 'unocss'
import { presetWind3 } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
    // ...UnoCSS options
    presets:[
        presetRemToPx({
            baseFontSize:4
        }),
        presetWind3(),
    ]
})