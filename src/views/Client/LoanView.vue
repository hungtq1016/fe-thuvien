
<template>
    <div class="bg-white">
      <div class="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Mượn Sách</h1>
        <form class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" class="lg:col-span-7">
            <h2 id="cart-heading" class="sr-only">Mượn Sách</h2>
  
            <ul role="list" class="divide-y divide-gray-200 border-t border-b border-gray-200">
              <li v-for="(book,bookIdx) in loans" :key="bookIdx" class="flex py-6 sm:py-10">
                <div class="flex-shrink-0">
                  <img :src="book.image.path" :alt="book.image.name" v-if="book.image"
                  class="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48" />
                </div>
  
                <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                  <div class="relative">
                    <div>
                      <div class="flex justify-between">
                        <h3 class="text-sm">
                          <router-link :to="'/book/'+book.id" class="font-medium text-gray-700 hover:text-gray-800">{{ book.name }}</router-link>
                        </h3>
                      </div>
                        <div class="mt-1 flex text-sm">
                          <p class="text-gray-500">{{ book.desc }}</p>
                        </div>
                    </div>
                    <div class="absolute top-0 right-0">
                      <button type="button" @click="removeLoan(bookIdx)"
                      class="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                        <span class="sr-only">Remove</span>
                        <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </section>
  
          <section aria-labelledby="summary-heading" class="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 id="summary-heading" class="text-lg font-medium text-gray-900">Xác Nhận Mượn</h2>
            <div class="mt-6">
              <button type="button" @click="submitLoan" class="w-full rounded-md border border-transparent bg-sky-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-gray-50" about="Thông tin mượn sách sẽ được gửi tới giáo viên quản lý thư viện bạn vui lòng tới nơi để nhận sách nhé">Gửi thông tin</button>
            </div>
          </section>
        </form>
      </div>
    </div>
  </template>
  <script>
  export default {
    methods: {
      ...mapActions(useLoanStore,['submitLoan','removeLoan'])
    },
    computed: {
      ...mapState(useLoanStore,['loans'])
    },
  }
</script>
  <script setup>
import { XMarkIcon } from '@heroicons/vue/20/solid'
import { mapActions, mapState } from 'pinia';
import { useLoanStore } from '../../stores/loan';

  </script>