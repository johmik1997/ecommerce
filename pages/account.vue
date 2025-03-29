<template>
    <div class="container mx-auto p-4 sm:p-6 max-w-lg bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">User Account</h1>
      
      <!-- User Info Header -->
      <div class="flex flex-col items-center mb-6">
        <img :src="userAvatar" alt="User Avatar" 
             class="w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-4 border-2 border-gray-300 dark:border-gray-600 object-cover">
        <p class="text-lg text-gray-700 dark:text-gray-300">{{ userDisplayName }}</p>
        <p class="text-sm text-gray-500 dark:text-gray-400">{{ user?.email }}</p>
      </div>
  
      <!-- Toggle Buttons -->
      <div class="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button 
          @click="activeTab = 'profile'"
          class="px-4 py-2 font-medium text-sm focus:outline-none"
          :class="{
            'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500': activeTab === 'profile',
            'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300': activeTab !== 'profile'
          }"
          aria-controls="profile-tab"
          :aria-selected="activeTab === 'profile'"
        >
          Edit Profile
        </button>
        <button 
          @click="activeTab = 'products'"
          class="px-4 py-2 font-medium text-sm focus:outline-none"
          :class="{
            'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500': activeTab === 'products',
            'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300': activeTab !== 'products'
          }"
          aria-controls="products-tab"
          :aria-selected="activeTab === 'products'"
        >
          Your Products
        </button>
      </div>
  
      <!-- Edit Profile Section -->
      <div v-if="activeTab === 'profile'" id="profile-tab" class="animate-fade-in" role="tabpanel">
        <form @submit.prevent="updateProfile" class="space-y-4">
          <div>
            <label for="full-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
            <input 
              id="full-name"
              v-model="fullName" 
              type="text"
              required
              class="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
          </div>
          
          <!-- Avatar Upload Section -->
          <div class="mb-5">
            <label for="avatar-image" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Avatar</label>
            <input 
              id="avatar-image"
              @change="handleAvatarChange" 
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
              type="file" 
              accept="image/*"
            >
            <div class="mt-1 text-sm text-gray-500 dark:text-gray-300">Maximum size 5MB. Supported formats: JPG, PNG, WEBP.</div>
  
            <!-- Avatar Image Preview -->
            <div v-if="avatarPreview" class="mt-2">
              <img :src="avatarPreview" class="max-h-40 rounded-lg border" alt="Avatar Preview">
            </div>
          </div>
  
          <!-- Status Messages -->
          <div v-if="statusMessage" class="p-4 mb-4 text-sm rounded-lg" :class="statusMessageClasses">
            {{ statusMessage }}
          </div>
  
          <!-- Action Buttons -->
          <div class="flex space-x-3">
            <button 
              @click="uploadAvatar" 
              type="button" 
              :disabled="isUploading || !selectedAvatarFile"
              class="flex-1 px-4 py-2 bg-gradient-to-br from-pink-500 to-orange-400 text-white rounded-lg hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isUploading">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </span>
              <span v-else>Upload Avatar</span>
            </button>
  
            <button 
              type="submit" 
              :disabled="isUpdating"
              class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isUpdating">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating...
              </span>
              <span v-else>Update Profile</span>
            </button>
          </div>
        </form>
      </div>
  
      <!-- User Selling Products Section -->
      <div v-if="activeTab === 'products'" id="products-tab" class="animate-fade-in" role="tabpanel">
        <div v-if="isLoadingProducts" class="text-center py-8">
          <svg class="animate-spin mx-auto h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="mt-2 text-gray-500 dark:text-gray-400">Loading your products...</p>
        </div>
  
        <div v-else-if="products.length" class="grid gap-4">
          <div v-for="product in products" :key="product.id" 
               class="p-4 border rounded-md dark:border-gray-600 hover:shadow-md transition-shadow">
            <img :src="product.image" 
                 alt="Product Image" 
                 class="w-full h-40 object-cover rounded-md">
            <div class="mt-3">
              <h3 class="text-md font-semibold text-gray-900 dark:text-white">{{ product.title }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{{ product.description }}</p>
              <p class="text-lg font-bold text-gray-800 dark:text-gray-300 mt-2">${{ product.price.toFixed(2) }}</p>
              <div class="mt-3 flex space-x-2">
                <button @click="editProduct(product)" 
                        class="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                  Edit
                </button>
                <button @click="confirmDeleteProduct(product)" 
                        class="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-6">
          <p class="text-gray-500 dark:text-gray-400 mb-4">You have not listed any products for sale.</p>
          <button @click="navigateToSell" 
                  class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Sell Your First Product
          </button>
        </div>
      </div>
  
      <!-- Delete Confirmation Modal -->
      <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Confirm Deletion</h3>
          <p class="text-gray-600 dark:text-gray-300 mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
          <div class="flex justify-end space-x-3">
            <button @click="showDeleteModal = false" class="px-4 py-2 text-gray-700 dark:text-gray-300 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Cancel
            </button>
            <button @click="deleteProduct" class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, computed, watchEffect } from 'vue'
  import { useRouter } from 'vue-router'
  interface Product {
    id: number;
    title: string;
    description: string;
    image: string;
    category: string;
    price: number;
    created_at: Date | null;
  }
  
  let product = ref<Product[]>([]);

// Fetch products
const { data } = await useFetch('/api/products');
if (data.value) {
    product.value = data.value.map((item: any) => ({
      ...item,
      created_at: item.created_at ? new Date(item.created_at) : null
    }));
}
  
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const router = useRouter()
  
  // Tab state
  const activeTab = ref<'profile' | 'products'>('profile')
  
  // Profile state
  const fullName = ref('')
  const avatarPreview = ref('')
  const selectedAvatarFile = ref<File | null>(null)
  const avatarUrl = ref('')
  const isUpdating = ref(false)
  const isUploading = ref(false)
  const statusMessage = ref('')
  const statusMessageType = ref<'success' | 'error' | ''>('')
  
  // Products state
  const products = ref<Product[]>([])
  const isLoadingProducts = ref(false)
  const showDeleteModal = ref(false)
  const productToDelete = ref<number | null>(null)
  
  // Computed properties
  const userDisplayName = computed(() => user.value?.user_metadata?.full_name || 'User')
  const userAvatar = computed(() => avatarUrl.value || user.value?.user_metadata?.avatar_url || '/default-avatar.jpg')
  const statusMessageClasses = computed(() => ({
    'text-green-700 bg-green-100 dark:bg-green-200 dark:text-green-800': statusMessageType.value === 'success',
    'text-red-700 bg-red-100 dark:bg-red-200 dark:text-red-800': statusMessageType.value === 'error'
  }))
  
  // Methods
  const setStatusMessage = (message: string, type: 'success' | 'error' | '') => {
    statusMessage.value = message
    statusMessageType.value = type
    if (type) {
      setTimeout(() => {
        statusMessage.value = ''
        statusMessageType.value = ''
      }, 5000)
    }
  }
  
  const handleAvatarChange = (event: Event) => {
    const input = event.target as HTMLInputElement
    if (!input.files?.length) return
  
    const file = input.files[0]
    
    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setStatusMessage('File size exceeds 5MB limit', 'error')
      return
    }
  
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      setStatusMessage('Invalid file type. Please upload JPG, PNG, or WEBP', 'error')
      return
    }
  
    selectedAvatarFile.value = file
    
    const reader = new FileReader()
    reader.onload = () => {
      avatarPreview.value = reader.result as string
    }
    reader.readAsDataURL(file)
  }
  
  const uploadAvatar = async () => {
    if (!selectedAvatarFile.value || !user.value) return
  
    isUploading.value = true
    setStatusMessage('', '')
  
    try {
      const fileExt = selectedAvatarFile.value.name.split('.').pop()
      const fileName = `${user.value.id}-${Date.now()}.${fileExt}`
      const filePath = `avatars/${fileName}`
  
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, selectedAvatarFile.value, {
          cacheControl: '3600',
          upsert: true
        })
  
      if (uploadError) throw uploadError
  
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)
  
      avatarUrl.value = publicUrl
      setStatusMessage('Avatar uploaded successfully!', 'success')
    } catch (error) {
      console.error('Avatar upload error:', error)
      setStatusMessage('Failed to upload avatar. Please try again.', 'error')
    } finally {
      isUploading.value = false
    }
  }
  
  const updateProfile = async () => {
    if (!user.value) return
  
    isUpdating.value = true
    setStatusMessage('', '')
  
    try {
      const updates = {
        data: { 
          full_name: fullName.value.trim(),
          ...(avatarUrl.value && { avatar_url: avatarUrl.value })
        }
      }
  
      const { error } = await supabase.auth.updateUser(updates)
      
      if (error) throw error
  
      // Refresh user data
      await supabase.auth.refreshSession()
      setStatusMessage('Profile updated successfully!', 'success')
    } catch (error) {
      console.error('Error updating profile:', error)
      setStatusMessage('Failed to update profile. Please try again.', 'error')
    } finally {
      isUpdating.value = false
    }
  }
  
  const fetchUserProducts = async () => {
    if (!user.value) return
  
    isLoadingProducts.value = true
    products.value = []
  
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('seller_id', user.value.id)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      products.value = data || []
    } catch (error) {
      console.error('Error fetching products:', error)
      setStatusMessage('Failed to load products. Please refresh the page.', 'error')
    } finally {
      isLoadingProducts.value = false
    }
  }
  
  const confirmDeleteProduct = (product: Product) => {
    productToDelete.value = product.id
    showDeleteModal.value = true
  }
  
  const deleteProduct = async () => {
    if (!productToDelete.value) return
  
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productToDelete.value)
      
      if (error) throw error
  
      // Refresh product list
      await fetchUserProducts()
      setStatusMessage('Product deleted successfully', 'success')
    } catch (error) {
      console.error('Error deleting product:', error)
      setStatusMessage('Failed to delete product', 'error')
    } finally {
      showDeleteModal.value = false
      productToDelete.value = null
    }
  }
  
  const editProduct = (product: Product) => {
    router.push(`/edit-product/${product.id}`)
  }
  
  const navigateToSell = () => {
    router.push('/sell')
  }
  
  // Watch user changes
  watchEffect(() => {
    if (user.value) {
      fullName.value = user.value.user_metadata?.full_name || ''
      avatarUrl.value = user.value.user_metadata?.avatar_url || ''
      fetchUserProducts()
    }
  })
  </script>
  
  <style>
  .animate-fade-in {
    animation: fadeIn 0.3s ease-in-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  </style>