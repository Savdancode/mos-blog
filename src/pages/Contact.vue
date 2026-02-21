<script setup>
import { computed, ref } from "vue";
import GlassCard from "../components/GlassCard.vue";

const name = ref("");
const email = ref("");
const message = ref("");
const touched = ref(false);
const sent = ref(false);

const emailOk = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()));
const nameOk = computed(() => name.value.trim().length >= 2);
const msgOk = computed(() => message.value.trim().length >= 10);

const valid = computed(() => nameOk.value && emailOk.value && msgOk.value);

function submit() {
  touched.value = true;
  if (!valid.value) return;

  sent.value = true;

  setTimeout(() => {
    name.value = "";
    email.value = "";
    message.value = "";
    touched.value = false;
  }, 400);
}
</script>

<template>
  <section class="container page">
    <h1>Contact</h1>
    <p class="muted">Send a message (demo form with validation).</p>

    <div class="grid">
      <GlassCard class="form">
        <div class="row">
          <label>
            Name
            <input class="input" v-model="name" placeholder="Your name" />
            <span v-if="touched && !nameOk" class="err">Name must be at least 2 characters.</span>
          </label>

          <label>
            Email
            <input class="input" v-model="email" placeholder="you@example.com" />
            <span v-if="touched && !emailOk" class="err">Enter a valid email address.</span>
          </label>
        </div>

        <label>
          Message
          <textarea class="textarea" v-model="message" placeholder="Write at least 10 characters..." />
          <span v-if="touched && !msgOk" class="err">Message must be at least 10 characters.</span>
        </label>

        <div class="actions">
          <button class="btn" @click="submit">Send message</button>
          <span class="hint" :class="{ ok: valid }">
            {{ valid ? "Looks good ✅" : "Fill the form to enable send" }}
          </span>
        </div>

        <div v-if="sent" class="success">
          ✅ Sent (demo). Replace submit() with your real API endpoint.
        </div>
      </GlassCard>

      <GlassCard class="side">
        <h2>📩 Let’s talk</h2>
        <p>
          Put your socials here, or a small “contact card” for your brand.
        </p>
        <div class="info">
          <div class="item">
            <div class="k">Primary</div>
            <div class="v">#0fc3b2</div>
          </div>
          <div class="item">
            <div class="k">Design</div>
            <div class="v">Glass + soft gradients</div>
          </div>
          <div class="item">
            <div class="k">Mobile</div>
            <div class="v">Hamburger menu</div>
          </div>
        </div>
      </GlassCard>
    </div>
  </section>
</template>

<style scoped>
.page { padding: 10px 0; }
h1 { margin: 6px 0 8px; letter-spacing: -0.6px; }
.muted { color: var(--muted); margin: 0; line-height: 1.7; }

.grid {
  margin-top: 14px;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 14px;
  align-items: start;
}

.form { padding: 16px; }
.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 10px;
}

label { display: grid; gap: 8px; font-weight: 900; }
.err { color: rgba(255, 80, 110, 0.95); font-weight: 800; font-size: 12px; }
.actions { display: flex; align-items: center; gap: 10px; margin-top: 12px; flex-wrap: wrap; }
.hint { color: var(--muted); font-weight: 800; }
.hint.ok { color: var(--primary); }

.success {
  margin-top: 12px;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: rgba(15,195,178,0.12);
  padding: 12px;
  font-weight: 900;
}

.side { padding: 16px; }
h2 { margin: 0 0 10px; letter-spacing: -0.4px; }
p { margin: 0; color: var(--muted); line-height: 1.7; }

.info { margin-top: 12px; display: grid; gap: 10px; }
.item {
  border-radius: 14px;
  border: 1px solid var(--border);
  background: var(--card2);
  padding: 12px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
.k { font-weight: 900; }
.v { color: var(--muted); font-weight: 800; margin-top: 4px; }

@media (max-width: 900px) {
  .grid { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .row { grid-template-columns: 1fr; }
}
</style>
