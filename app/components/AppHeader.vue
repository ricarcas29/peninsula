<script setup lang="ts">
const nuxtApp = useNuxtApp()
const { activeHeadings, updateHeadings } = useScrollspy()

const items = computed(() => [{
  label: 'Propuesta',
  to: '#features',
  active: activeHeadings.value.includes('features') && !activeHeadings.value.includes('pricing')
}, {
  label: 'Precios',
  to: '#pricing',
  active: activeHeadings.value.includes('pricing')
}, {
  label: 'Testimonios',
  to: '#testimonials',
  active: activeHeadings.value.includes('testimonials') && !activeHeadings.value.includes('pricing')
}])

nuxtApp.hooks.hookOnce('page:finish', () => {
  updateHeadings([
    document.querySelector('#features'),
    document.querySelector('#pricing'),
    document.querySelector('#testimonials')
  ].filter(Boolean) as Element[])
})
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/">
        <NuxtImg
          src="/logo.jpg"
          alt="Peninsula Logo"
          class="w-auto h-auto shrink-0"
          width="300"
          height="100"
        />
      </NuxtLink>

      <!-- <TemplateMenu /> -->
    </template>

    <template #right>
      <UNavigationMenu
        :items="items"
        variant="link"
        class="hidden lg:block"
      />

      <UButton
      to="https://instagram.com/peninsulacross_"
        label="¡Quiero entrenar!"
        variant="subtle"
        class="hidden lg:block"
      />

      <UColorModeButton />
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />
      <UButton
        to="https://instagram.com/peninsulacross_"
        class="mt-4"
        label="¡Quiero entrenar!"
        variant="subtle"
        block
      />
    </template>
  </UHeader>
</template>
