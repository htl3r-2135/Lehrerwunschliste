import type { Frist } from '@/types/frist'

/**
 * Basis-URL des Backends. Kann über VITE_API_URL in der .env gesetzt werden,
 * z. B. VITE_API_URL=http://localhost
 */
const API_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost').replace(/\/$/, '')
const FRISTEN_ENDPOINT = `${API_URL}/api/fristen`

/**
 * Solange das Backend den Endpoint noch nicht hat, werden die Fristen im
 * Browser (localStorage) zwischengespeichert, damit die Seite testbar ist.
 * Sobald /api/fristen existiert, auf false setzen.
 */
const LOKALER_FALLBACK = true
const STORAGE_KEY = 'lwl.fristen'

function ladeLokal(): Frist[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Frist[]) : []
  } catch {
    return []
  }
}

function speichereLokal(fristen: Frist[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fristen))
  } catch {
    /* Speicher nicht verfügbar – ignorieren */
  }
}

/** GET /api/fristen → Frist[] */
export async function ladeFristen(): Promise<Frist[]> {
  try {
    const res = await fetch(FRISTEN_ENDPOINT, {
      headers: { Accept: 'application/json' },
      credentials: 'include',
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return (await res.json()) as Frist[]
  } catch (err) {
    if (LOKALER_FALLBACK) return ladeLokal()
    throw err
  }
}

/** PUT /api/fristen mit Frist[] → gibt die gespeicherten Fristen zurück */
export async function speichereFristen(fristen: Frist[]): Promise<Frist[]> {
  try {
    const res = await fetch(FRISTEN_ENDPOINT, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      credentials: 'include',
      body: JSON.stringify(fristen),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return (await res.json()) as Frist[]
  } catch (err) {
    if (LOKALER_FALLBACK) {
      speichereLokal(fristen)
      return fristen
    }
    throw err
  }
}
