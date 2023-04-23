<template>
    <div
        id="EditOverlaySection"
        class="fixed z-50 top-0 left-0 w-full h-screen bg-[#000000] bg-opacity-60 p-3"
    >
        <button class="absolute p-3 right-3" @click="closeOverlay">
            <Close :size="27" fillColor="#FFFFFF" />
        </button>

        <div
            class="max-w-5xl h-[calc(100%-100px)] mx-auto mt-8 bg-white rounded-xl overflow-hidden"
        >
            <div
                class="flex items-center justify-between w-full p-3 border-b rounded-t-xl border-b-gray-300"
            >
                <div class="text-lg font-extrabold">Edit Post</div>

                <button
                    @click="updatePost"
                    class="px-3 text-lg font-extrabold text-blue-500 hover:text-gray-900"
                    :disabled="isLoading"
                >
                    Edit
                </button>
            </div>

            <q-linear-progress
                v-if="isLoading"
                indeterminate
                color="primary"
                class=""
            />

            <div class="w-full h-full md:flex rounded-xl">
                <div
                    class="flex items-center w-full overflow-auto bg-black custom-scrollbar"
                >
                    <img
                        class="rounded-xl min-w-[400px] p-4 mx-auto"
                        :src="post.image"
                    />
                </div>

                <div class="md:max-w-[500px] w-full relative">
                    <div
                        id="TextAreaSection"
                        class="max-w-[720px] w-full relative"
                    >
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
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DotsHorizontal from 'vue-material-design-icons/DotsHorizontal.vue';
import Close from 'vue-material-design-icons/Close.vue';
import { computed, reactive, ref, watchEffect } from 'vue';
import { useStore } from 'vuex';

import { getTimeGap } from '../utils/time';
import postService from '../services/postService';

export default {
    name: 'ShowPostOverlay',
    components: {
        DotsHorizontal,
        Close,
    },
    props: {
        post: {
            type: Object,
        },
    },
    setup(props) {
        const store = useStore();

        const form = reactive({
            description: props.post.description,
            title: props.post.title,
            image: props.post.image,
        });
        let error = ref({
            description: '',
            title: '',
        });
        const isLoading = ref(false);
        watchEffect(isLoading);

        const user = computed(() => store.state.auth.user);

        const closeOverlay = () => {
            store.dispatch('setShowEditCurrentPostOverlay', false);
        };

        const updatePost = async () => {
            isLoading.value = true;
            const title = form.title;
            if (title.trim() === '') {
                toast.error('Update post failure');
                return;
            }

            await postService.updatePost(
                store,
                props.post._id,
                form.title,
                form.description,
                form.image
            );

            // toast.success('Create post successfully');

            isLoading.value = false;
        };

        return {
            user,
            form,
            error,
            isLoading,
            getTimeGap,
            closeOverlay,
            updatePost,
        };
    },
};
</script>
