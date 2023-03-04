<template>
    <main class="grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
      <div class="text-center">
        <p class="text-base font-semibold text-sky-600">404</p>
        <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Không Tìm Thấy Trang</h1>
        <p class="mt-6 text-base leading-7 text-gray-600">Xin lỗi không tìm thấy trang bạn yêu cầu.</p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <router-link :to="{name:'HomePage'}" class="rounded-md bg-sky-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">Về Trang Chính</router-link>
          <router-link :to="{name:'About'}" class="text-sm font-semibold text-gray-900">Thông Tin<span aria-hidden="true">&rarr;</span></router-link>
        </div>
      </div>
    </main>
</template>

<script>
    export default {
        
    }
</script>
