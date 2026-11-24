<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

const router = useRouter()

const alleAbteilungen = [
  'WEBT',
  'Informationstechnologie',
  'Mechatronik'
]

const name = ref('')
const art = ref('Theorie/Labor')
const abteilungen = ref([])
const stufen = ref([])
const wochenstd = ref(null)
const teiler = ref(null)

const fehler = ref('')

function speichern() {
  fehler.value = ''

  if (!name.value.trim()) {
    fehler.value = 'Bitte einen Fachnamen eingeben.'
    return
  }

  if (!Number.isInteger(wochenstd.value)) {
    fehler.value = 'Bitte gültige Wochenstunden angeben.'
    return
  }

  if (abteilungen.value.length === 0) {
    fehler.value = 'Bitte mindestens eine Abteilung auswählen.'
    return
  }

  if (stufen.value.length === 0) {
    fehler.value = 'Bitte mindestens eine Schulstufe auswählen.'
    return
  }

  const fach = {
    name: name.value.trim(),
    art: art.value,
    abteilungen: [...abteilungen.value],
    stufen: [...stufen.value],
    wochenstd: wochenstd.value,
    teiler: teiler.value === '' ? null : teiler.value
  }
}

function logout() {
  router.push('/anmeldung')
}

function zurueck() {
  router.push('/admin/klassen')
}

function weiter() {
  router.push('/admin/lehrer')
}
</script>

<template>
  <AppHeader titel="Fächer | Schuljahr 2026/27" @logout="logout" />

  <main>
    <div class="karte">
      <h3>Fach erstellen</h3>

      <form class="inhalt" @submit.prevent="speichern">
        <div class="zeile">
          <div class="feld">
            <label for="name">Name</label>
            <input id="name" v-model="name" type="text" placeholder="z. B. MEDT">
          </div>
          <div class="feld schmal">
            <label for="art">Art</label>
            <select id="art" v-model="art">
              <option>Theorie</option>
              <option>Labor</option>
              <option>Theorie/Labor</option>
            </select>
          </div>
        </div>

        <span class="beschriftung">Abteilungen</span>
        <div class="tags">
          <label v-for="a in alleAbteilungen" :key="a">
            <input v-model="abteilungen" type="checkbox" :value="a"> {{ a }}
          </label>
        </div>

        <span class="beschriftung">Schulstufen</span>
        <div class="tags">
          <label v-for="s in [1, 2, 3, 4, 5]" :key="s">
            <input v-model="stufen" type="checkbox" :value="s"> {{ s }}
          </label>
        </div>

        <div class="zeile">
          <div class="feld schmal">
            <label for="wochenstd">Wochenstd.</label>
            <input id="wochenstd" v-model.number="wochenstd" type="number" min="1" max="20" placeholder="z. B. 3">
          </div>
          <div class="feld">
            <label for="teiler">Gruppenteiler (Anz. Schüler/Lehrer) – optional</label>
            <input id="teiler" v-model.number="teiler" type="number" min="1" max="40" placeholder="z. B. 6">
          </div>
        </div>

        <p v-if="fehler" class="fehlermeldung" role="alert">
          {{ fehler }}
        </p>

        <div class="leiste">
          <button class="primaer" type="submit">Speichern</button>
        </div>
      </form>
    </div>
  </main>

  <AppFooter @zurueck="zurueck" @weiter="weiter" />
</template>

<style scoped>
  main {
    max-width: 1100px;
    margin: 0 auto;
    padding: 55px 28px 24px;
  }

  .karte {
    background: #fffefa;
    border: 1px solid #ede9dd;
    border-radius: 15px;
    box-shadow: 0 7px 24px rgb(63 54 27 / 5%);
  }

  .karte h3 {
    margin: 0;
    padding: 27px 32px;
    font-size: 21px;
    border-bottom: 1px solid #ede9dd;
    border-left: 4px solid #e2b444;
  }

  .inhalt {
    padding: 28px 32px 30px;
  }

  .zeile {
    display: flex;
    gap: 22px;
    margin-bottom: 24px;
  }

  .feld {
    flex: 1;
  }

  .feld.schmal {
    flex: 0 0 190px;
  }

  label,
  .beschriftung {
    display: block;
    margin-bottom: 9px;
    font-size: 13px;
    font-weight: 650;
  }

  input[type="text"],
  input[type="number"],
  select {
    width: 100%;
    min-height: 45px;
    padding: 11px 15px;
    border: 1px solid #ede9dd;
    border-radius: 9px;
    box-sizing: border-box;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 24px;
  }

  .tags label {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin: 0;
    padding: 11px 16px;
    background: #fffbeb;
    border: 1px solid #ede9dd;
    border-radius: 9px;
    cursor: pointer;
  }

  .tags label:has(input:checked) {
    background: #fff2c9;
    border-color: #e2b444;
  }

  .leiste {
    display: flex;
    justify-content: flex-end;
  }

  .primaer {
    padding: 11px 22px;
    background: #e2b444;
    border: 1px solid #e2b444;
    border-radius: 9px;
    font-weight: 750;
    cursor: pointer;
  }

  .fehlermeldung {
    color: #b91c1c;
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 9px;
    padding: 11px 15px;
    font-size: 13px;
    margin-bottom: 16px;
  }
</style>
