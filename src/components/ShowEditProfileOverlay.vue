<template>
    <div
        class="fixed z-50 top-0 left-0 w-full h-screen bg-[#000000] bg-opacity-60 p-3"
    >
        <button class="absolute p-3 right-3" @click="closeOverlay">
            <Close :size="27" fillColor="#FFFFFF" />
        </button>

        <div
            class="max-w-5xl h-[calc(100%-100px)] mx-auto mt-10 bg-white rounded-xl"
        >
            <div
                class="flex items-center justify-between w-full p-3 border-b rounded-t-xl border-b-gray-300"
            >
                <div class="text-lg font-extrabold">Edit Profile</div>

                <button
                    @click="editProfile"
                    class="px-3 text-lg font-extrabold text-blue-500 hover:text-gray-900"
                    :disabled="isLoading"
                >
                    Update
                </button>
            </div>

            <q-linear-progress
                v-if="isLoading"
                indeterminate
                color="primary"
                class=""
            />

            <div
                class="w-full h-[calc(100%-55px)] md:flex rounded-xl overflow-hidden"
            >
                <div
                    class="relative flex items-center w-full h-full bg-black custom-scrollbar"
                >
                    <img
                        v-if="fileDisplay && isValidFile === true"
                        class="min-w-[400px] p-4 mx-auto"
                        :src="fileDisplay"
                    />

                    <div class="flex flex-col items-center mx-auto">
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
                                v-model="form.name"
                                filled
                                label="Name"
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
                </div>
            </div>
        </div>
    </div>
    <div>kf;dlskfsd;l</div>
</template>

<script>
import DotsHorizontal from 'vue-material-design-icons/DotsHorizontal.vue';
import Close from 'vue-material-design-icons/Close.vue';
import { computed, reactive, ref, watchEffect } from 'vue';
import { useStore } from 'vuex';

import { getTimeGap } from '../utils/time';
import postService from '../services/postService';
import storageService from '../services/storageService';
import userService from '../services/userService';

export default {
    name: 'ShowPostOverlay',
    components: {
        DotsHorizontal,
        Close,
    },
    props: {
        user: {
            type: Object,
        },
    },
    setup(props) {
        const store = useStore();

        const form = reactive({
            description: props.user.description,
            name: props.user.name,
            image: props.user.image,
        });

        let file = ref(null);
        let isValidFile = ref(true);
        let fileDisplay = ref(props.user.image);
        let error = ref({
            description: '',
            name: '',
            file: '',
        });
        const isLoading = ref(false);
        watchEffect(isLoading);

        const authUser = computed(() => store.state.auth.user);

        const closeOverlay = () => {
            store.dispatch('removeShowEditProfileOverlay');
        };

        const clearImage = () => {
            file.value = null;
            fileDisplay.value = props.user.image;
        };

        const editProfile = async () => {
            isLoading.value = true;

            const name = form.name;
            if (name.trim() === '') {
                toast.error('Update post failure');
                return;
            }

            let imageUrl = form.image;
            if (file.value !== null) {
                imageUrl = await storageService.uploadFile(file.value);
            }

            await userService.updateUserById(
                store,
                props.user._id,
                form.name,
                form.description,
                imageUrl
            );

            store.dispatch('removeShowEditProfileOverlay');

            // toast.success('Edit post successfully');

            isLoading.value = false;
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

        return {
            authUser,
            form,
            error,
            isLoading,
            file,
            isValidFile,
            fileDisplay,
            getTimeGap,
            closeOverlay,
            editProfile,
            clearImage,
            getUploadedImage,
        };
    },
};
</script>
