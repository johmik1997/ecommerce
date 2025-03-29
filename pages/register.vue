<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <form @submit.prevent="handleSubmit" class="w-full max-w-md space-y-6 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <h1 class="text-2xl font-bold text-center text-gray-800 dark:text-white">Create Your Account</h1>
        
        <!-- Email Input -->
        <div class="relative z-0 w-full group">
          <input
            v-model="form.email"
            type="email"
            id="email"
            class="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer dark:text-white dark:border-gray-600 dark:focus:border-blue-500"
            placeholder=" "
            required
            autocomplete="email"
          />
          <label for="email" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Email Address
          </label>
          <p v-if="errors.email" class="mt-1 text-xs text-red-600 dark:text-red-400">{{ errors.email }}</p>
        </div>
  
        <!-- Password Input -->
        <div class="relative z-0 w-full group">
          <div class="relative">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              id="password"
              class="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer dark:text-white dark:border-gray-600 dark:focus:border-blue-500"
              placeholder=" "
              required
              minlength="6"
              autocomplete="new-password"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <Icon :name="showPassword ? 'heroicons:eye-slash' : 'heroicons:eye'" class="w-5 h-5" />
            </button>
          </div>
          <label for="password" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Password (min 6 characters)
          </label>
          <p v-if="errors.password" class="mt-1 text-xs text-red-600 dark:text-red-400">{{ errors.password }}</p>
        </div>
  
        <!-- Full Name Input -->
        <div class="relative z-0 w-full group">
          <input
            v-model="form.fullName"
            type="text"
            id="full_name"
            class="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer dark:text-white dark:border-gray-600 dark:focus:border-blue-500"
            placeholder=" "
            required
            autocomplete="name"
          />
          <label for="full_name" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Full Name
          </label>
          <p v-if="errors.fullName" class="mt-1 text-xs text-red-600 dark:text-red-400">{{ errors.fullName }}</p>
        </div>
  
        <!-- Address Input -->
        <div class="relative z-0 w-full group">
          <input
            v-model="form.address"
            type="text"
            id="address"
            class="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer dark:text-white dark:border-gray-600 dark:focus:border-blue-500"
            placeholder=" "
            required
            autocomplete="street-address"
          />
          <label for="address" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Address
          </label>
          <p v-if="errors.address" class="mt-1 text-xs text-red-600 dark:text-red-400">{{ errors.address }}</p>
        </div>
  
        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full px-5 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-70 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex justify-center items-center gap-2"
          :disabled="isSubmitting"
        >
          <span v-if="!isSubmitting">Sign Up</span>
          <span v-else class="flex items-center gap-2">
            <Icon name="eos-icons:loading" class="w-5 h-5" />
            Processing...
          </span>
        </button>
  
        <!-- Status Messages -->
        <div v-if="successMsg" class="p-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-900 dark:text-green-200">
          <div class="flex items-center gap-2">
            <Icon name="heroicons:check-circle" class="w-5 h-5" />
            <span>{{ successMsg }}</span>
          </div>
        </div>
  
        <div v-if="errorMsg" class="p-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-900 dark:text-red-200">
          <div class="flex items-center gap-2">
            <Icon name="heroicons:exclamation-circle" class="w-5 h-5" />
            <span>{{ errorMsg }}</span>
          </div>
        </div>
  
        <p class="text-sm text-center text-gray-600 dark:text-gray-400">
          Already have an account?
          <NuxtLink to="/login" class="text-blue-600 hover:underline dark:text-blue-500">Log in</NuxtLink>
        </p>
      </form>
    </div>
  </template>
  
  <script setup>
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  
  // Redirect if user is already logged in
  if (user.value) {
    await navigateTo('/')
  }
  
  // Form state
  const form = reactive({
    email: '',
    password: '',
    fullName: '',
    address: ''
  })
  
  // UI state
  const showPassword = ref(false)
  const isSubmitting = ref(false)
  const successMsg = ref('')
  const errorMsg = ref('')
  
  // Form errors
  const errors = reactive({
    email: '',
    password: '',
    fullName: '',
    address: ''
  })
  
  // Form validation
  const validateForm = () => {
    let isValid = true
    
    // Reset errors
    Object.keys(errors).forEach(key => errors[key] = '')
    
    // Email validation
    if (!form.email) {
      errors.email = 'Email is required'
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Please enter a valid email address'
      isValid = false
    }
    
    // Password validation
    if (!form.password) {
      errors.password = 'Password is required'
      isValid = false
    } else if (form.password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
      isValid = false
    }
    
    // Full name validation
    if (!form.fullName.trim()) {
      errors.fullName = 'Full name is required'
      isValid = false
    }
    
    // Address validation
    if (!form.address.trim()) {
      errors.address = 'Address is required'
      isValid = false
    }
    
    return isValid
  }
  
  // Handle form submission
  const handleSubmit = async () => {
    // Reset messages
    successMsg.value = ''
    errorMsg.value = ''
    
    // Validate form
    if (!validateForm()) return
    
    isSubmitting.value = true
    
    try {
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            full_name: form.fullName,
            address: form.address
          },
          emailRedirectTo: `$https://ecommercegebeya.netlify.app/confirm`
        }
      })
  
      if (error) throw error
  
      // Success
      successMsg.value = 'Registration successful! Please check your email to confirm your account.'
      
      // Reset form
      form.email = ''
      form.password = ''
      form.fullName = ''
      form.address = ''
      
      // Redirect to confirmation page after delay
      setTimeout(() => {
        navigateTo('/confirm')
      }, 3000)
    } catch (error) {
      console.error('Signup error:', error)
      errorMsg.value = error.message || 'An error occurred during registration. Please try again.'
    } finally {
      isSubmitting.value = false
    }
  }
  </script>