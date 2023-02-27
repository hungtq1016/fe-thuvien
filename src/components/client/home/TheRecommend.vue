<template>
    <section>
        <div class="max-w-7xl mx-auto py-10">
            <div class="grid grid-cols-1 gap-5 md:gap-10 md:grid-cols-2">
                <div class="border-sky-500 rounded-lg relative border-8 bg-center text-center text-white h-24 md:h-[300px]"
                    style="background-image: url('http://api.tranhung.info/logo/logo.png');">
                    <div class="absolute inset-0 bg-sky-900 bg-opacity-80">
                        <div class="mx-auto mt-4 md:mt-7 w-56 md:w-64 rounded-full border-2 border-white text-sm font-bold md:text-lg">
                            Kho Sách
                        </div>
                        <div class="mt-4 text-base font-bold md:mt-4 md:text-2xl">\\ Tìm Kiếm Sách Tại Đây //</div>
                        <router-link to="/">
                            <div class="flex justify-center py-2">
                                <div class="flex text-3xl items-center gap-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
                                        <path fill-rule="evenodd" d="M17.303 5.197A7.5 7.5 0 006.697 15.803a.75.75 0 01-1.061 1.061A9 9 0 1121 10.5a.75.75 0 01-1.5 0c0-1.92-.732-3.839-2.197-5.303zm-2.121 2.121a4.5 4.5 0 00-6.364 6.364.75.75 0 11-1.06 1.06A6 6 0 1118 10.5a.75.75 0 01-1.5 0c0-1.153-.44-2.303-1.318-3.182zm-3.634 1.314a.75.75 0 01.82.311l5.228 7.917a.75.75 0 01-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 01-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 01-1.247-.606l.569-9.47a.75.75 0 01.554-.68z" clip-rule="evenodd" />
                                    </svg>
                                    <span>
                                        Nhấn vào đây để đi tới kho sách
                                    </span>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
                <div class="border-red-500 rounded-lg relative border-8 bg-center text-center text-white h-24 md:h-[300px]"
                    style="background-image: url('http://api.tranhung.info/logo/logo.png');">
                    <div class="absolute inset-0 bg-red-900 bg-opacity-80">
                        <div class="mx-auto mt-4 md:mt-7 w-56 md:w-64 rounded-full border-2 border-white text-sm font-bold md:text-lg">
                            Tra Cứu
                        </div>
                        <div class="mt-4 text-base font-bold md:mt-4 md:text-2xl">\\ Xem sách đã mượn tại đây //</div>
                        <router-link to="/">
                            <div class="flex justify-center py-2">
                                <div class="flex text-3xl items-center gap-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
                                        <path fill-rule="evenodd" d="M17.303 5.197A7.5 7.5 0 006.697 15.803a.75.75 0 01-1.061 1.061A9 9 0 1121 10.5a.75.75 0 01-1.5 0c0-1.92-.732-3.839-2.197-5.303zm-2.121 2.121a4.5 4.5 0 00-6.364 6.364.75.75 0 11-1.06 1.06A6 6 0 1118 10.5a.75.75 0 01-1.5 0c0-1.153-.44-2.303-1.318-3.182zm-3.634 1.314a.75.75 0 01.82.311l5.228 7.917a.75.75 0 01-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 01-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 01-1.247-.606l.569-9.47a.75.75 0 01.554-.68z" clip-rule="evenodd" />
                                    </svg>
                                    <span>
                                        Nhấn vào đây để tới trang tra cứu
                                    </span>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import HorizontalItem from '../item/HorizontalItem.vue';
export default {
    data() {
        return {
            data: [
                {
                    title: "Boost your conversion rate",
                    slug: "dsfds-123",
                    category: { name: "Article", href: "#" },
                    description:
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.",
                    date: "Mar 16, 2020",
                    comments: "12",
                    imageUrl:
                        "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
                    rating: "4.3",
                    author: {
                        name: "Roel Aufderehar",
                        href: "#",
                        imageUrl:
                            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                    },
                },
                {
                    title: "How to use search engine optimization to drive sales",
                    slug: "asd",
                    category: { name: "Video", href: "#" },
                    description:
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis asperiores porro quaerat doloribus, eveniet dolore. Adipisci tempora aut inventore optio animi., tempore temporibus quo laudantium.",
                    date: "Mar 10, 2020",
                    comments: "32",
                    imageUrl:
                        "https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
                    rating: "4.0",
                    author: {
                        name: "Brenna Goyette",
                        href: "#",
                        imageUrl:
                            "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                    },
                }
            ]
        }
    },
    components: { HorizontalItem }
}
</script>

<style lang="scss" scoped></style>
