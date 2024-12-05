import { config } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import { vi } from 'vitest'

// Vuetify instellen voor testen
config.global.plugins = [createVuetify()]

// Mock CSS/SCSS-bestanden
vi.mock('*.css', () => ({}))
vi.mock('*.scss', () => ({}))
vi.mock('vuetify/lib/components/VIcon/VIcon.css', () => ({}))
vi.mock('vuetify/lib/components/VIcon', () => ({
  VIcon: {
    template: '<span><slot /></span>',
  },
}))
