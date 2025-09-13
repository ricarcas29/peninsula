<script setup lang="ts">
const columns = [
  // {
  //   label: "Legal",
  //   children: [
  //     {
  //       label: "Términos y Condiciones",
  //       to: "/legal/#terminos-y-condiciones",
  //     },
  //     {
  //       label: "Política de Privacidad",
  //       to: "/legal/#politica-de-privacidad",
  //     },
  //     {
  //       label: "Aviso Legal",
  //       to: "/legal/#aviso-legal",
  //     },
  //     {
  //       label: "Política de Cookies",
  //       to: "/legal/#politica-de-cookies",
  //     },
  //   ],
  // },
  {
    label: "Peninsula",
    children: [
      {
        label: "Propuesta",
        to: "#features",
      },
      {
        label: "Precios",
        to: "#pricing",
      },
      {
        label: "Testimonios",
        to: "#testimonials",
      },
    ],
  },
];

const toast = useToast();

const email = ref("");
const loading = ref(false);

function onSubmit() {
  loading.value = true;

  toast.add({
    title: "Suscrito!",
    description: "Te suscribiste correctamente!",
  });
}
</script>

<template>
  <USeparator icon="i-mdi-dumbbell" class="h-px" />

  <UFooter :ui="{ top: 'border-b border-default' }">
    <template #top>
      <UContainer>
        <UFooterColumns :columns="columns">
          <template #right>
            <form @submit.prevent="onSubmit">
              <UFormField
                name="email"
                label="Suscribete para recibir promociones"
                size="lg"
              >
                <UInput
                  v-model="email"
                  type="email"
                  class="w-full"
                  placeholder="Ingresa tu correo"
                >
                  <template #trailing>
                    <UButton type="submit" size="xs" label="Quiero mi promo" />
                  </template>
                </UInput>
              </UFormField>
            </form>
          </template>
        </UFooterColumns>
      </UContainer>
    </template>

    <template #left>
      <p class="text-sm text-muted">
        Construido por KeyNova Digital • © {{ new Date().getFullYear() }}
      </p>
    </template>

    <template #right>
      <UButton
        to=""
        target="_blank"
        icon="i-simple-icons-whatsapp"
        aria-label="Whatsapp"
        color="neutral"
        variant="ghost"
      />
      <UButton
        to="https://www.instagram.com/peninsulacross_/"
        target="_blank"
        icon="i-simple-icons-instagram"
        aria-label="Instagram crosfitero"
        color="neutral"
        variant="ghost"
      />
      <UButton
        to="https://www.facebook.com/61577717461810"
        target="_blank"
        icon="i-simple-icons-facebook"
        aria-label="Nuestro Facebook"
        color="neutral"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>
