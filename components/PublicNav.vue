<template>
  <div>
    <nav class="bg-gray-100 border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <!-- Logo and mobile menu button -->
        <div class="flex items-center md:order-1">
          <NuxtLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
            <Icon name="uil:shop" size="30" color="gray" class="text-white" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Gebeya</span>
          </NuxtLink>
        </div>

        <!-- Right side elements (user dropdown and mobile menu button) -->
        <div class="flex items-center space-x-3 md:space-x-0 md:order-3">
          <!-- User dropdown -->
          <div class="relative">
            <button 
              type="button" 
              class="flex items-center justify-center"
              @click="toggleDropdown"
            >
              <span class="sr-only">Open user menu</span>
              <img class="w-20 h-18 rounded-full object-cover" src="../public/avatar.png" alt="user photo">
            </button>

            <!-- Dropdown Menu -->
            <div 
              v-if="isDropdownOpen"
              class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg dark:bg-gray-700 z-50"
            >
              <div class="px-4 py-3">
                <span class="block text-sm text-gray-900 dark:text-white">Hello</span>
                <span class="block text-sm text-gray-500 dark:text-gray-400">Welcome to Gebeya</span>
              </div>
              <ul class="py-2">
                <li>
                  <NuxtLink to="/login" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200">Login</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/register" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200">Register</NuxtLink>
                </li>
              </ul>
            </div>
          </div>

          <!-- Mobile menu button -->
          <button 
            @click="toggleMenu" 
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            aria-controls="mobile-menu"
          >
            <span class="sr-only">Open main menu</span>
            <Icon :name="isMenuOpen ? 'uil:times' : 'uil:bars'" size="24" />
          </button>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center justify-between w-auto md:order-2">
          <ul class="flex space-x-8 rtl:space-x-reverse">
            <li>
              <NuxtLink to="/search" class="py-2 px-3 text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500">
                Search
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/sell" class="py-2 px-3 text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500">
                Sell on Gebeya
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="py-2 px-3 text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500">
                About
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Mobile Menu -->
        <div 
          v-if="isMenuOpen"
          class="md:hidden w-full order-last mt-4"
          id="mobile-menu"
        >
          <ul class="flex flex-col p-4 space-y-2 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <li>
              <NuxtLink 
                to="/search" 
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                @click="isMenuOpen = false"
              >
                Search
              </NuxtLink>
            </li>
            <li>
              <NuxtLink 
                to="/sell" 
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                @click="isMenuOpen = false"
              >
                Sell on Shopiverse
              </NuxtLink>
            </li>
            <li>
              <NuxtLink 
                to="/about" 
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                @click="isMenuOpen = false"
              >
                About
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isDropdownOpen = ref(false);
const isMenuOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>