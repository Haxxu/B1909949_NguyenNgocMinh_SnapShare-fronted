<template>
    <div id="create-post" class="w-full h-screen">
        <div
            class="max-w-6xl h-[calc(100%-100px)] mx-auto mt-10 bg-white rounded-xl"
        >
            <div
                class="flex items-center justify-between w-full p-3 border-b rounded-t-xl border-b-gray-300"
            >
                <div class="text-lg font-extrabold">New Post</div>
                <button
                    @click="createPost"
                    class="text-lg font-extrabold text-blue-500 hover:text-gray-900"
                    :disabled="isLoading"
                >
                    Post
                </button>
            </div>

            <q-linear-progress
                v-if="isLoading"
                indeterminate
                color="primary"
                class=""
            />

            <div
                class="w-full md:flex h-[calc(100%-55px)] rounded-xl overflow-auto"
            >
                <div
                    class="relative flex items-center w-full h-full overflow-hidden bg-gray-100"
                >
                    <div
                        v-if="!fileDisplay"
                        class="flex flex-col items-center mx-auto"
                    >
                        <label
                            for="file"
                            class="hover:bg-blue-700 bg-blue-500 rounded-lg p-2.5 text-white font-extrabold cursor-pointer"
                        >
                            Select From Computer
                        </label>
                        <input
                            id="file"
                            class="hidden"
                            type="file"
                            @input="getUploadedImage($event)"
                        />
                        <div
                            v-if="error && error.file"
                            class="p-2 font-extrabold text-center text-red-500"
                        >
                            {{ error.file }}
                        </div>
                        <div
                            v-if="!fileDisplay && isValidFile === false"
                            class="p-2 font-extrabold text-center text-red-500"
                        >
                            File not accepted
                        </div>
                    </div>
                    <img
                        v-if="fileDisplay && isValidFile === true"
                        class="min-w-[400px] p-4 mx-auto"
                        :src="fileDisplay"
                    />
                    <div
                        v-if="fileDisplay && isValidFile === true"
                        class="p-2 absolute-top-right"
                    >
                        <q-btn
                            round
                            color="secondary"
                            icon="close"
                            size="10px"
                            @click="clearImage"
                        />
                    </div>
                </div>

                <div id="TextAreaSection" class="max-w-[720px] w-full relative">
                    <div class="flex items-center justify-between p-3">
                        <div class="flex items-center">
                            <img
                                class="rounded-full w-[38px] h-[38px]"
                                :src="user?.image"
                            />
                            <div class="ml-4 font-extrabold text-[15px]">
                                {{ user?.account }}
                            </div>
                        </div>
                    </div>

                    <div
                        v-if="error && error.text"
                        class="p-2 font-extrabold text-red-500"
                    >
                        {{ error.text }}
                    </div>

                    <div class="w-full p-2 bg-white border-b">
                        <div>
                            <q-input
                                type="textarea"
                                v-model="form.title"
                                filled
                                label="Title"
                                outlined
                                clearable
                            />
                        </div>
                        <div class="mt-3">
                            <q-input
                                type="textarea"
                                v-model="form.description"
                                filled
                                outlined
                                label="Description"
                                clearable
                            />
                        </div>
                    </div>

                    <!-- <div class="p-3 mt-3 text-sm text-gray-500">
                        Your reel will be shared with your followers in their
                        feeds and can be seen on your profile. It may also
                        appear in places such as Reels, where anyone can see it.
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    computed,
    onBeforeMount,
    onMounted,
    reactive,
    ref,
    watch,
    watchEffect,
} from 'vue';
import ArrowLeft from 'vue-material-design-icons/ArrowLeft.vue';
import MapMarkerOutline from 'vue-material-design-icons/MapMarkerOutline.vue';
import ChevronDown from 'vue-material-design-icons/ChevronDown.vue';
import { toast } from 'vue3-toastify';

import storageService from '@/services/storageService';
import postService from '../services/postService';
import useUser from '../composables/useUser';
import { useStore } from 'vuex';

export default {
    name: 'CreatePost',
    components: {
        ArrowLeft,
        MapMarkerOutline,
        ChevronDown,
    },
    setup() {
        const store = useStore();

        const form = reactive({
            description: '',
            image: '',
            title: '',
        });
        let file = ref(null);
        let isLoading = ref(false);
        let isValidFile = ref(null);
        let fileDisplay = ref('');
        let error = ref({
            description: '',
            image: '',
            title: '',
            file: '',
        });

        const user = computed(() => store.state.auth.user);

        const clearForm = () => {
            form.description = '';
            form.title = '';
            form.image = '';
            file.value = null;
            fileDisplay.value = '';
        };

        const clearImage = () => {
            file.value = null;
            fileDisplay.value = '';
        };

        const getUploadedImage = (e) => {
            file.value = e.target.files[0];
            let extention = file.value.name.substring(
                file.value.name.lastIndexOf('.') + 1
            );

            // console.log(extention);

            if (
                extention == 'png' ||
                extention == 'jpg' ||
                extention == 'jpeg'
            ) {
                isValidFile.value = true;
            } else {
                isValidFile.value = false;
                return;
            }

            fileDisplay.value = URL.createObjectURL(e.target.files[0]);
            setTimeout(() => {
                document
                    .getElementById('TextAreaSection')
                    .scrollIntoView({ behavior: 'smooth' });
            }, 300);
        };

        const createPost = async () => {
            isLoading.value = true;
            const title = form.title;
            if (title.trim() === '' || file.value === null) {
                toast.error('Create post failure');
                return;
            }

            const imageUrl = await storageService.uploadFile(file.value);

            await postService.createPost(
                form.title,
                form.description,
                imageUrl
            );

            // toast.success('Create post successfully');

            isLoading.value = false;
            clearForm();
        };

        watchEffect(isLoading);

        const { fetchUser } = useUser();

        // onMounted(() => {
        //     fetchUser();
        // });

        return {
            isValidFile,
            fileDisplay,
            isLoading,
            form,
            file,
            error,
            user,
            clearImage,
            clearForm,
            getUploadedImage,
            createPost,
        };
    },
};
</script>
