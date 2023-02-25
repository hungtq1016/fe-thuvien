<template>
  <div class="sm:overflow-hidden sm:rounded-md">
    <form @submit.prevent="submitForm" enctype="multipart/form-data">
      <div class="space-y-4 bg-white py-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Tên Sách</label
          >
          <div class="mt-1 flex rounded-lg">
            <span class="inline-flex items-center rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500" > <BookOpenIcon class="w-4 h-5" /> </span>
            <input type="text" id="name" placeholder="Nhập tên sách..." v-model="form.name" autocomplete="book"
            class="block w-full flex-1 rounded-none rounded-r-lg border-gray-300 focus:ring-sky-600 focus:ring-0 sm:text-sm" />
          </div>
        </div>
        <div>
          <label for="country" class="block text-sm font-medium text-gray-700"
            >Quốc Gia</label
          >
          <div class="mt-1 flex rounded-lg">
            <span
              class="inline-flex items-center rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500"
            >
              <GlobeAsiaAustraliaIcon class="w-4 h-5" />
            </span>
            <input
              type="text"
              id="country"
              placeholder="Nhập quốc gia..."
              v-model="form.country"
              class="block w-full flex-1 rounded-none rounded-r-lg border-gray-300 focus:ring-sky-600 focus:ring-0 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label for="release" class="block text-sm font-medium text-gray-700"
            >Ngày Phát Hành</label
          >
          <div class="mt-1 flex rounded-lg">
            <span
              class="inline-flex items-center rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500"
            >
              <ClockIcon class="w-4 h-5" />
            </span>
            <input
              type="date"
              v-model="form.release"
              class="w-full rounded-r-lg border-gray-300"
            />
          </div>
        </div>
        <div>
          <label for="desc" class="block text-sm font-medium text-gray-700"
            >Thông Tin</label
          >
          <div class="mt-1 rounded-lg">
            <textarea
              id="desc"
              placeholder="Nhập thông tin sách..."
              v-model="form.desc"
              rows="4"
              class="block w-full flex-1 rounded-lg border-gray-300 focus:ring-sky-600 focus:ring-0 sm:text-sm resize-none"
            ></textarea>
          </div>
        </div>
        <SelectInput title="Thể Loại" resource="category" 
        @dataChange=" (val) => { this.form.categories = val; } " :propData="propData.categories" />
        <SelectInput title="Nhãn" resource="tag"
         @dataChange=" (val) => { this.form.tags = val; } " :propData="propData.tags"/>
        <SelectInput title="Tác Giả" resource="author" 
        @dataChange=" (val) => { this.form.authors = val; } " :propData="propData.authors" />
        <SelectOnly title="Kệ Sách" resource="bookshelf" 
        @dataChange=" (val) => { this.form.bookshelf_id = val; } " :propData="propData.bookshelf"/>
        <SelectOnly title="Ngành Học" resource="major"
         @dataChange=" (val) => { this.form.major_id = val; } " :propData="propData.major" />
        <SelectOnly title="Nhà Xuất Bản" resource="publisher" 
        @dataChange=" (val) => { this.form.publisher_id = val; } " :propData="propData.publisher"/>
        <SelectOnly title="Ngôn Ngữ" resource="language" 
        @dataChange=" (val) => { this.form.language_id = val; } " :propData="propData.language"/>
        <SelectOnly title="Series" resource="book"
         @dataChange=" (val) => { this.form.series_id = val; } " :propData="propData.series"/>
        <ImageSelectComponent @dataChange=" (val) => { this.form.image_id = val; } " :propImage="propData.image" />
      </div>
      <div class="text-right">
        <button
          type="submit"
          class="inline-flex justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-0 focus:ring-sky-600 focus:ring-offset-2"
        >
          Xác Nhận
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { BookOpenIcon, GlobeAsiaAustraliaIcon, ClockIcon, } from "@heroicons/vue/24/outline";
import { useDataStore } from "@/stores/data";
import { useLoadingStore } from "@/stores/loading";
import { mapActions, mapState } from "pinia";
import ImageSelectComponent from "../Input/ImageSelectComponent.vue";
import SelectInput from "../Input/SelectInputComponent.vue";
import SelectOnly from "../Input/SelectOnlyComponennt.vue";

export default {
  components: { SelectInput, BookOpenIcon, GlobeAsiaAustraliaIcon, ClockIcon, SelectOnly, ImageSelectComponent, },
  data() {
    return {
      form: { name: null, country: null, desc: null, release: null, categories: [], tags: [], authors: [], bookshelf_id: null, publisher_id: null, major_id: null, language_id: null, series_id: null, image_id: null, },
      propData :{ image :null, language :null, major :null, publisher :null, series :null, categories :null, tags :null, authors :null,bookshelf:null }
    };
  },
  methods: {
    submitForm() {
      this.isUpdate ? this.patchItem(this.form) : this.postItem(this.form);
    },
    ...mapActions(useDataStore, ["postItem", "patchItem"]),
  },
  mounted() {
    if (this.isUpdate) {
      this.form = this.itemSelected;
      this.form.image_id = this.itemSelected.image != null ? this.itemSelected.image.id : null;

      this.propData.image = this.itemSelected.image;
      this.propData.language = this.itemSelected.language;
      this.propData.major = this.itemSelected.major;
      this.propData.publisher = this.itemSelected.publisher;
      this.propData.series = this.itemSelected.series;
      this.propData.bookshelf = this.itemSelected.bookshelf

      this.propData.categories = this.itemSelected.categories;
      this.propData.tags = this.itemSelected.tags;
      this.propData.authors = this.itemSelected.authors;
      this.isDeath = this.itemSelected.yod != "null" ? true : false;
    }
  },
  computed: {
    currentDate() {
      const currentDate = new Date();
      let month = currentDate.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      return (
        currentDate.getFullYear() + "-" + month + "-" + currentDate.getDate()
      );
    },
    ...mapState(useLoadingStore, ["isUpdate"]),
    ...mapState(useDataStore, ["itemSelected"]),
  },
};
</script>
