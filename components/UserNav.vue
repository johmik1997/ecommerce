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
        <div class="flex items-center space-x-2 md:space-x-0 md:order-3">
          <!-- User dropdown -->
          <div class="relative">
            <button 
              type="button" 
              class="flex items-center justify-center"
              @click="toggleDropdown"
              @blur="handleBlur"
            >
              <span class="sr-only">Open user menu</span>
              <img class="w-20 h-18 rounded-full object-cover" src="../public/avatar.png" alt="user photo">
            </button>

            <!-- Dropdown Menu -->
            <div
              v-if="isDropdownOpen"
              class="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50 dark:bg-gray-700"
            >
              <div v-if="user" class="px-4 py-3 border-b border-gray-100 dark:border-gray-600">
                <span class="block text-sm text-gray-900 dark:text-white">
                  Hello, {{ user.user_metadata.full_name || 'User' }}
                </span>
                <span class="block text-sm text-gray-500 truncate dark:text-gray-400">
                  Welcome to Shopiverse
                </span>
              </div>
              <ul>
                <li v-if="user">
                  <NuxtLink
                    to="/account"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    My Account
                  </NuxtLink>
                </li>
                <li v-if="user">
                  <NuxtLink
                    to="/logout"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Logout
                  </NuxtLink>
                </li>
        
              </ul>
            </div>
          </div>

          <!-- Mobile menu button -->
          <button 
            @click="toggleMobileMenu" 
            type="button" 
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            :aria-expanded="isMobileMenuOpen"
          >
            <span class="sr-only">Open main menu</span>
            <Icon :name="isMobileMenuOpen ? 'uil:times' : 'uil:bars'" size="24" />
          </button>
        </div>

        <!-- Main navigation - desktop -->
        <div class="hidden md:flex items-center justify-between w-full md:w-auto md:order-2">
          <ul class="flex space-x-8 rtl:space-x-reverse">
            <li>
              <NuxtLink
                to="/search"
                class="py-2 px-3 text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500"
                active-class="text-blue-700 dark:text-blue-500"
              >
                Search
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/sell"
                class="py-2 px-3 text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500"
                active-class="text-blue-700 dark:text-blue-500"
              >
                Sell on Shopiverse
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/about"
                class="py-2 px-3 text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500"
                active-class="text-blue-700 dark:text-blue-500"
              >
                About
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/cart"
                class="flex items-center py-2 px-3 text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500"
                active-class="text-blue-700 dark:text-blue-500"
              >
                <Icon name="uil:shopping-cart" color="green" size="24" />
                <span class="ml-2">Cart</span>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Mobile menu -->
        <div 
          v-if="isMobileMenuOpen"
          class="md:hidden w-full order-last mt-4"
          id="navbar-default"
        >
          <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NuxtLink
                to="/search"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                @click="isMobileMenuOpen = false"
              >
                Search
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/sell"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                @click="isMobileMenuOpen = false"
              >
                Sell on Shopiverse
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/about"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                @click="isMobileMenuOpen = false"
              >
                About
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/cart"
                class="flex items-center py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                @click="isMobileMenuOpen = false"
              >
                <Icon name="uil:shopping-cart" color="green" size="24" />
                <span class="ml-2">Cart</span>
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
const user = useSupabaseUser();
const isDropdownOpen = ref(false);
const isMobileMenuOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const handleBlur = () => {
  setTimeout(() => {
    isDropdownOpen.value = false;
  }, 200);
};
</script>