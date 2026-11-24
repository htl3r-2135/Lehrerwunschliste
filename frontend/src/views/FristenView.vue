<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { FRIST_ROLLEN, type Frist, type FristRolle } from '@/types/frist'
import { ladeFristen, speichereFristen } from '@/services/fristenService'

const router = useRouter()

const schuljahr = '2026/27'

/** Werte in den Eingabefeldern */
const eingaben = reactive<Record<FristRolle, string>>({
  admin: '',
  lehrer: '',
  fachverantwortliche: '',
  av_direktion: '',
})

/** Zuletzt gespeicherte Werte (werden angezeigt) */
const gespeichert = reactive<Record<FristRolle, string | null>>({
  admin: null,
  lehrer: null,
  fachverantwortliche: null,
  av_direktion: null,
})

const laedt = ref(true)
const speichert = ref(false)
const meldung = ref<{ typ: 'erfolg' | 'fehler'; text: string } | null>(null)

const hatAenderungen = computed(() =>
  FRIST_ROLLEN.some(({ rolle }) => (eingaben[rolle] || null) !== gespeichert[rolle]),
)

function formatiere(iso: string | null): string {
  if (!iso) return '–'
  const [j, m, t] = iso.split('-')
  return `${t}.${m}.${j}`
}

function uebernehme(fristen: Frist[]) {
  for (const { rolle } of FRIST_ROLLEN) {
    const datum = fristen.find((f) => f.rolle === rolle)?.datum ?? null
    gespeichert[rolle] = datum
    eingaben[rolle] = datum ?? ''
  }
}

onMounted(async () => {
  try {
    uebernehme(await ladeFristen())
  } catch {
    meldung.value = { typ: 'fehler', text: 'Die Fristen konnten nicht geladen werden.' }
  } finally {
    laedt.value = false
  }
})

async function speichern() {
  meldung.value = null
  speichert.value = true
  try {
    const payload: Frist[] = FRIST_ROLLEN.map(({ rolle }) => ({
      rolle,
      datum: eingaben[rolle] || null,
    }))
    uebernehme(await speichereFristen(payload))
    meldung.value = { typ: 'erfolg', text: 'Die Fristen wurden gespeichert.' }
  } catch {
    meldung.value = { typ: 'fehler', text: 'Speichern fehlgeschlagen. Bitte erneut versuchen.' }
  } finally {
    speichert.value = false
  }
}

function zurueck() {
  router.push('/admin')
}

function logout() {
  router.push('/anmeldung')
}
</script>

<template>
  <div class="fristen-seite">
    <header>
      <h2>Fristen | Schuljahr {{ schuljahr }}</h2>
      <button type="button" @click="logout">Logout</button>
    </header>

    <main>
      <button type="button" class="zurueck" @click="zurueck">Back</button>

      <form class="karte" @submit.prevent="speichern">
        <h3>Fristen eintragen</h3>

        <p v-if="laedt" class="hinweis">Fristen werden geladen …</p>

        <template v-else>
          <div v-for="({ rolle, label }, i) in FRIST_ROLLEN" :key="rolle" class="frist">
            <div class="frist-text">
              <label :for="`frist-${rolle}`">{{ i + 1 }}. {{ label }}</label>
              <span class="frist-gespeichert">
                Gespeichert: <strong>{{ formatiere(gespeichert[rolle]) }}</strong>
              </span>
            </div>
            <input
              :id="`frist-${rolle}`"
              v-model="eingaben[rolle]"
              type="date"
              :disabled="speichert"
            />
          </div>
        </template>
      </form>

      <div class="aktionen">
        <p
          v-if="meldung"
          class="meldung"
          :class="meldung.typ"
          :role="meldung.typ === 'fehler' ? 'alert' : 'status'"
        >
          {{ meldung.text }}
        </p>
        <button
          id="speichern"
          type="button"
          :disabled="laedt || speichert || !hatAenderungen"
          @click="speichern"
        >
          {{ speichert ? 'Speichert …' : 'Speichern' }}
        </button>
      </div>
    </main>
  </div>
</template>

<style scoped>
@import '@/assets/farben.css';

.fristen-seite {
  min-height: 100vh;
  background: var(--farbe-hintergrund);
  color: var(--farbe-text);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
}

.fristen-seite *,
.fristen-seite *::before,
.fristen-seite *::after {
  box-sizing: border-box;
}

/* TOPBAR */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  min-height: 88px;
  padding: 20px max(28px, calc((100vw - 1100px) / 2));
  background: var(--farbe-karte);
  border-bottom: 1px solid var(--farbe-rahmen);
}

header h2 {
  margin: 0;
  font-size: 21px;
  font-weight: 750;
  letter-spacing: -0.5px;
}

/* BUTTONS */
button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 43px;
  padding: 11px 22px;
  font-family: inherit;
  font-size: 13px;
  font-weight: 700;
  background: var(--farbe-karte);
  color: var(--farbe-text);
  border: 1px solid var(--farbe-rahmen);
  border-radius: 9px;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}

button:hover:not(:disabled) {
  background: var(--farbe-karte-sanft);
  border-color: var(--farbe-primaer);
}

button:active:not(:disabled) {
  transform: translateY(1px);
}

button:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

button:focus-visible,
input:focus-visible {
  outline: 3px solid var(--farbe-fokus);
  outline-offset: 3px;
}

/* HAUPTBEREICH */
main {
  display: flex;
  flex-direction: column;
  max-width: 1100px;
  margin: 0 auto;
  padding: 55px 28px 90px;
}

.zurueck {
  align-self: flex-start;
  min-width: 90px;
  margin-bottom: 30px;
}

/* KARTE */
.karte {
  background: var(--farbe-karte);
  border: 1px solid var(--farbe-rahmen);
  border-radius: 15px;
  box-shadow: 0 7px 24px var(--farbe-schatten);
  overflow: hidden;
}

.karte h3 {
  position: relative;
  margin: 0;
  padding: 27px 32px;
  font-size: 21px;
  font-weight: 750;
  letter-spacing: -0.5px;
  border-bottom: 1px solid var(--farbe-rahmen);
}

.karte h3::before {
  content: '';
  position: absolute;
  left: 0;
  top: 26px;
  bottom: 26px;
  width: 4px;
  background: var(--farbe-primaer);
  border-radius: 0 3px 3px 0;
}

.hinweis {
  margin: 0;
  padding: 32px;
  color: var(--farbe-text-sekundaer);
}

/* EINZELNE FRISTEN */
.frist {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  min-height: 100px;
  padding: 22px 32px;
  border-bottom: 1px solid var(--farbe-rahmen);
  transition: background-color 0.2s ease;
}

.frist:last-child {
  border-bottom: none;
}

.frist:hover {
  background: var(--farbe-primaer-sehr-hell);
}

.frist-text {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
}

.frist-text label {
  font-size: 15px;
  font-weight: 650;
}

.frist-gespeichert {
  font-size: 13px;
  color: var(--farbe-text-sekundaer);
}

.frist-gespeichert strong {
  color: var(--farbe-primaer-dunkel);
}

/* DATUMSEINGABE */
input[type='date'] {
  width: 190px;
  min-height: 45px;
  flex-shrink: 0;
  padding: 11px 15px;
  background: var(--farbe-weiss);
  color: var(--farbe-text);
  border: 1px solid var(--farbe-rahmen);
  border-radius: 9px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 550;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

input[type='date']:hover,
input[type='date']:focus {
  border-color: var(--farbe-primaer);
}

input[type='date']:focus {
  box-shadow: 0 0 0 3px var(--farbe-primaer-hell);
}

/* AKTIONEN */
.aktionen {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  margin-top: 25px;
}

.meldung {
  margin: 0;
  padding: 10px 16px;
  border-radius: 9px;
  font-weight: 600;
}

.meldung.erfolg {
  background: var(--farbe-status-normal-hintergrund);
  color: var(--farbe-status-normal-text);
}

.meldung.fehler {
  background: var(--farbe-status-voll-hintergrund);
  color: var(--farbe-status-voll-text);
}

#speichern {
  min-width: 135px;
  min-height: 46px;
  padding: 13px 27px;
  background: var(--farbe-primaer);
  border-color: var(--farbe-primaer);
  font-weight: 750;
  box-shadow: 0 4px 12px var(--farbe-schatten);
}

#speichern:hover:not(:disabled) {
  background: var(--farbe-primaer-hover);
  border-color: var(--farbe-primaer-hover);
}

/* TABLET */
@media (max-width: 800px) {
  header {
    padding: 20px 24px;
  }
  main {
    padding: 40px 24px 70px;
  }
  .karte h3,
  .frist {
    padding: 20px 24px;
  }
  input[type='date'] {
    width: 165px;
  }
}

/* SMARTPHONE */
@media (max-width: 600px) {
  header {
    min-height: 74px;
    padding: 16px 18px;
  }
  header h2 {
    font-size: 16px;
  }
  main {
    padding: 32px 18px 60px;
  }
  .karte {
    border-radius: 11px;
  }
  .frist {
    flex-direction: column;
    align-items: stretch;
    gap: 13px;
    min-height: auto;
    padding: 20px;
  }
  input[type='date'] {
    width: 100%;
  }
  .aktionen {
    flex-direction: column-reverse;
    align-items: stretch;
  }
  #speichern {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .fristen-seite * {
    transition: none !important;
  }
}
</style>
