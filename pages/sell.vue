<template>
    <div class="p-4">
        <form class="max-w-lg mx-auto" @submit.prevent="createProduct">
            <!-- Product Title -->
            <div class="mb-5">
                <label for="product-title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Title*</label>
                <input v-model="productTitle" type="text" id="product-title" required
                    class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>

            <!-- Product Category -->
            <div class="mb-5">
                <label for="product-category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Category*</label>
                <input v-model="productCategory" type="text" id="product-category" required
                    class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>

            <!-- Product Price -->
            <div class="mb-5">
                <label for="product-price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Price*</label>
                <input v-model="productPrice" type="number" step="0.01" min="0" id="product-price" required
                    class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
            
            <!-- Product Description -->
            <div class="mb-5">
                <label for="product-description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description*</label>
                <textarea v-model="productDescription" id="product-description" rows="4" required
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Describe your product..."></textarea>
            </div>

            <!-- Image Upload -->
            <div class="mb-5">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="product-image">Upload a product image*</label>
                <input @change="handleFileChange" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                    id="product-image" type="file" accept="image/*" required>
                <div class="mt-1 text-sm text-gray-500 dark:text-gray-300">A good product image will help you sell more (Max 5MB)</div>
                
                <!-- Image Preview -->
                <div v-if="imagePreview" class="mt-2">
                    <img :src="imagePreview" class="max-h-40 rounded-lg border" alt="Image preview">
                </div>
            </div>
            
            <!-- Upload Status Messages -->
            <div v-if="imageUploadSuccessMsg" class="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800">
                {{ imageUploadSuccessMsg }}
            </div>
            <div v-if="imageUploadErrorMsg" class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800">
                {{ imageUploadErrorMsg }}
            </div>

            <!-- Upload Button -->
            <button @click="uploadImage" type="button" :disabled="isUploading"
                class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:opacity-50">
                <span v-if="isUploading">Uploading...</span>
                <span v-else>Upload Image</span>
            </button>

            <div class="inline-flex items-center justify-center w-full my-6">
                <hr class="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700">
                <div class="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900">
                    <svg class="w-4 h-4 text-gray-700 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                        <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
                    </svg>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex space-x-4">
                <button type="submit" :disabled="isSubmitting"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-50">
                    <span v-if="isSubmitting">Processing...</span>
                    <span v-else>Submit Product</span>
                </button>

                <button @click="clearEveryThing" type="button"
                    class="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Clear Form
                </button>
            </div>

            <!-- Product Creation Status Messages -->
            <div v-if="productCreationSuccessMsg" class="p-4 mt-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800">
                {{ productCreationSuccessMsg }}
            </div>
            <div v-if="productCreationErrorMsg" class="p-4 mt-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800">
                {{ productCreationErrorMsg }}
            </div>
        </form>
    </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

// Redirect if not logged in
if (!user.value) await navigateTo('/login')

// Form state
const productTitle = ref('')
const productDescription = ref('')
const productPrice = ref('')
const productCategory = ref('')
const productImage = ref(null)
const imageUrl = ref('')
const imagePreview = ref('')

// Status messages
const imageUploadSuccessMsg = ref('')
const imageUploadErrorMsg = ref('')
const productCreationSuccessMsg = ref('')
const productCreationErrorMsg = ref('')

// Loading states
const isUploading = ref(false)
const isSubmitting = ref(false)

// Clear form
const clearEveryThing = () => {
    productTitle.value = ''
    productDescription.value = ''
    productPrice.value = ''
    productCategory.value = ''
    productImage.value = null
    imageUrl.value = ''
    imagePreview.value = ''
    imageUploadSuccessMsg.value = ''
    imageUploadErrorMsg.value = ''
    productCreationErrorMsg.value = ''
    productCreationSuccessMsg.value = ''
}

// Handle file selection
const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (!file) return
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!validTypes.includes(file.type)) {
        imageUploadErrorMsg.value = 'Invalid file type. Please upload an image (JPEG, PNG, GIF, or WEBP).'
        return
    }
    
    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
        imageUploadErrorMsg.value = 'Image is too large. Maximum size is 5MB.'
        return
    }
    
    productImage.value = file
    imageUploadErrorMsg.value = ''
    
    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
        imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
}

// Upload image to Supabase
const uploadImage = async () => {
  if (!productImage.value) {
    imageUploadErrorMsg.value = 'Please select an image to upload';
    return;
  }

  isUploading.value = true;
  imageUploadSuccessMsg.value = '';
  imageUploadErrorMsg.value = '';

  try {
    // Define bucket name
    const bucketName = 'products';

    // Generate a unique file name
    const fileName = `public/${Date.now()}_${productImage.value.name.replace(/\s+/g, '_')}`;

    // Upload the image
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, productImage.value, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;

    // Get the public URL
    const { data: urlData } = supabase.storage.from(bucketName).getPublicUrl(fileName);

    if (urlData) {
      imageUrl.value = urlData.publicUrl;
      imageUploadSuccessMsg.value = 'Image uploaded successfully!';
    } else {
      throw new Error('Failed to retrieve public URL.');
    }
  } catch (err) {
    console.error('Upload error:', err);
    imageUploadErrorMsg.value = err.message || 'Failed to upload image';
  } finally {
    isUploading.value = false;
  }
};


// Create product
const createProduct = async () => {
        const {data: product, error} = await useFetch('/api/products/create-new-product', {
            query: {
                title: productTitle,
                description: productDescription,
                image: imageUrl,
                category: productCategory,
                price: productPrice
            }
        })

        if(error.value) {
            productCreationErrorMsg.value = 'An error happened, try again...'
            return
        }

        productCreationSuccessMsg.value = 'Product created successfully, Redirecting...'
        const productID = product.value.id
        setTimeout(async () => {
            await navigateTo(`/product-${productID}`)
        }, 2000);
    }
</script>