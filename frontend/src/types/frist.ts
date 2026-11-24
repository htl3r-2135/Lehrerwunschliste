/** Rollen, für die eine Frist festgelegt werden kann. */
export type FristRolle = 'admin' | 'lehrer' | 'fachverantwortliche' | 'av_direktion'

/** Eine Frist, wie sie zwischen Frontend und Backend ausgetauscht wird. */
export interface Frist {
  rolle: FristRolle
  /** ISO-Datum (YYYY-MM-DD) oder null, wenn noch keine Frist gesetzt ist. */
  datum: string | null
}

/** Reihenfolge und Beschriftung der Rollen (wie im Prototyp). */
export const FRIST_ROLLEN: { rolle: FristRolle; label: string }[] = [
  { rolle: 'admin', label: 'Admin-Daten eintragen bis' },
  { rolle: 'lehrer', label: 'Lehrer-Wünsche bis' },
  { rolle: 'fachverantwortliche', label: 'Fachverantwortliche bis' },
  { rolle: 'av_direktion', label: 'AV / Direktion bis' },
]
