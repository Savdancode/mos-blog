<script setup>
import { computed, ref } from "vue";
import GlassCard from "../components/GlassCard.vue";
import { submitContact } from "../services/api"; // ✅ Import your API call

const name = ref("");
const email = ref("");
const message = ref("");
const touched = ref(false);
const sent = ref(false);
const loading = ref(false); // ✅ Added loading state

const emailOk = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()));
const nameOk = computed(() => name.value.trim().length >= 2);
const msgOk = computed(() => message.value.trim().length >= 10);

const valid = computed(() => nameOk.value && emailOk.value && msgOk.value);

// ✅ Updated: Now sends real data to Strapi
async function submit() {
  touched.value = true;
  if (!valid.value || loading.value) return;

  loading.value = true;
  try {
    // Map your local refs to your Strapi field names
    await submitContact({
      fullName: name.value,
      email: email.value,
      subject: "New Message from Portfolio", // Default subject
      description: message.value,
    });

    sent.value = true;

    // Reset form after success
    setTimeout(() => {
      name.value = "";
      email.value = "";
      message.value = "";
      touched.value = false;
      sent.value = false; // Optional: hide success message after a delay
    }, 3000);
  } catch (err) {
    alert("System Error: Could not send email.");
    console.error(err);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <section class="container page">
    <h1>Contact</h1>
    <p class="muted">Send a message and get connected.</p>

    <GlassCard class="form">
      <div class="row">
        <label>
          Name
          <input class="input" v-model="name" placeholder="Your name" />
          <span v-if="touched && !nameOk" class="err"
            >Name must be at least 2 characters.</span
          >
        </label>

        <label>
          Email
          <input class="input" v-model="email" placeholder="you@example.com" />
          <span v-if="touched && !emailOk" class="err">Enter a valid email address.</span>
        </label>
      </div>

      <label>
        Message
        <textarea
          class="textarea"
          v-model="message"
          placeholder="Write at least 10 characters..."
        />
        <span v-if="touched && !msgOk" class="err"
          >Message must be at least 10 characters.</span
        >
      </label>

      <div class="actions">
        <button class="btn" @click="submit" :disabled="loading">
          {{ loading ? "Sending..." : "Send message" }}
        </button>
        <span class="hint" :class="{ ok: valid }">
          {{ valid ? "Looks good ✅" : "Fill the form to enable send" }}
        </span>
      </div>

      <div v-if="sent" class="success">
        ✅ Message received! I will get back to you soon.
      </div>
    </GlassCard>
  </section>
</template>

<style scoped>
/* All your original styles are preserved exactly as provided */
.page {
  padding: 10px 0;
}
h1 {
  margin: 6px 0 8px;
  letter-spacing: -0.6px;
}
.muted {
  color: var(--muted);
  margin: 0;
  margin-bottom: 10px;
  line-height: 1.7;
}

.form {
  padding: 16px;
}
.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 10px;
}

label {
  display: grid;
  gap: 8px;
  font-weight: 900;
}
.err {
  color: rgba(255, 80, 110, 0.95);
  font-weight: 800;
  font-size: 12px;
}
.actions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
  flex-wrap: wrap;
}
.hint {
  color: var(--muted);
  font-weight: 800;
}
.hint.ok {
  color: var(--primary);
}

.success {
  margin-top: 12px;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: rgba(15, 195, 178, 0.12);
  padding: 12px;
  font-weight: 900;
}
/* ... remaining styles omitted for brevity but should be kept in your file ... */
</style>
