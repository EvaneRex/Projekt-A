<script setup>
import { ref } from 'vue'
const email = ref('')
const adgangskode = ref('')
const emailFejl = ref('')
const kodeFejl = ref('')

const emailRegex = /\S+@\S+\.\S+/ // tjekker om der er en eller flere ikke-whitespace tegn, og at det skal indeholde @ og et punktum
const kodeRegex = /^(?=.*[a-zæøå])(?=.*[A-ZÆØÅ])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/ // Den første tjekker om der er mindst et lille bogstav, den næste om der er mindst et stort bogstav, den næste mindst et tal, og næste igen mindst et special tegn og tilsidst om det er mindst 8 tegn langt.

function valider() {
  // Nulstiller fejlbeskeder
  emailFejl.value = ''
  kodeFejl.value = ''

  // Tjekker mail og kode
  tjekEmail()
  tjekAdgangskode()

  // console.log('validering kører')
}

// Tjekker om email eller kode er gyldig/stærk nok, via deres regex og hvis de ikke er sendes der en fejlbesked
// test er en metode der returnere en true eller false
function tjekEmail() {
  if (!emailRegex.test(email.value)) {
    emailFejl.value = 'Ikke en gyldig email.'
    email.value = ''
  }
}
function tjekAdgangskode() {
  if (!kodeRegex.test(adgangskode.value)) {
    kodeFejl.value =
      'Adgangskoden skal mindst være 8 tegn lang og indeholde store og små bogstaver, tal og specialtegn.'
    adgangskode.value = ''
  }
}
</script>

<template>
  <h1>Login</h1>
  <form method="post" @submit.prevent="valider">
    <label for="email">Email:</label>
    <input type="text" id="email" v-model="email" required />// v-model gør at det kan opdateres i
    realtid
    <p v-if="emailFejl">{{ emailFejl }}</p>
    <label for="adgangskode">Adgangskode:</label>
    <input type="password" id="adgangskode" v-model="adgangskode" required />
    <p v-if="kodeFejl">{{ kodeFejl }}</p>
    <button type="submit">Login</button>
  </form>
</template>
