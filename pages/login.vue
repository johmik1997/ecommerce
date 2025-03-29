<template>
    <div>
        <form class="max-w-sm mx-auto">
            <div class="mb-5">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input v-model="email" type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@example.com" required />
            </div>
            <div class="mb-5">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input v-model="password" type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <button @click="login" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Log In</button>

            <br><br>

            <button @click="githubLogin" type="button" class="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2">
                Sign in with GitHub
            </button>

            <br><br>

            <button @click="googleLogin" type="button" class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
                Sign in with Google
            </button>

            <!-- Success Message -->
            <div v-if="successMsg">
                <p class="mt-2 text-xs text-green-600 dark:text-green-400"><span class="font-medium">Well done! </span>{{ successMsg }}</p>
            </div>

            <!-- Error Message -->
            <div v-if="errorMsg">
                <p class="mt-2 text-xs text-red-600 dark:text-red-400"><span class="font-medium">Oh, snap! </span>{{ errorMsg }}</p>
            </div>
        </form>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const email = useState(() => '')
const password = useState(() => '')
const successMsg = useState(() => false)
const errorMsg = useState(() => false)

onMounted(() => {
    if (user.value) {
        navigateTo('/')
    }
})

const login = async () => {
    const {data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
    })

    if (error) {
        successMsg.value = false
        errorMsg.value = error.message
        return
    }

    errorMsg.value = false
    successMsg.value = 'Redirecting...'
    setTimeout(() => navigateTo('/'), 2000)
}

const githubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'github' })

    if (error) {
        successMsg.value = false
        errorMsg.value = error.message
        return
    }

    errorMsg.value = false
    successMsg.value = 'Redirecting...'
    setTimeout(() => navigateTo('/'), 2000)
}

const googleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' })

    if (error) {
        successMsg.value = false
        errorMsg.value = error.message
        return
    }

    errorMsg.value = false
    successMsg.value = 'Redirecting...'
    setTimeout(() => navigateTo('/'), 2000)
}
</script>
