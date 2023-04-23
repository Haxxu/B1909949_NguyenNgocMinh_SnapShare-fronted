<template>
    <div
        id="OverlaySection"
        class="fixed z-30 top-0 left-0 w-full h-screen bg-[#000000] bg-opacity-60 p-3"
    >
        <button class="absolute p-3 right-3" @click="closeOverlay">
            <Close :size="27" fillColor="#FFFFFF" />
        </button>

        <div
            class="max-w-6xl h-[calc(100%-100px)] mx-auto mt-10 bg-white rounded-xl overflow-hidden"
        >
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
                    <div class="flex items-center justify-between p-3 border-b">
                        <div class="flex items-center">
                            <img
                                class="rounded-full w-[38px] h-[38px]"
                                :src="post.owner?.image"
                            />
                            <div class="ml-4 font-extrabold text-[15px]">
                                {{ post.owner?.account }}
                            </div>
                            <div
                                class="flex items-center text-[15px] text-gray-500"
                            >
                                <span class="-mt-5 ml-2 mr-[5px] text-[35px]"
                                    >.</span
                                >
                                <div>{{ getTimeGap(post.createdAt) }}</div>
                            </div>
                        </div>
                        <button
                            v-if="user._id === post.owner._id"
                            @click="openPostOptionsOverlay"
                        >
                            <DotsHorizontal class="cursor-pointer" :size="27" />
                        </button>
                    </div>

                    <div class="overflow-y-scroll h-[calc(100%-230px)]">
                        <div
                            class="flex items-center justify-between p-3 mt-3 mb-3"
                        >
                            <div class="relative flex items-center">
                                <img
                                    class="absolute -top-1 rounded-full w-[38px] h-[38px]"
                                    :src="post.owner.image"
                                />
                                <div class="ml-14">
                                    <span
                                        class="font-extrabold text-[15px] mr-2"
                                    >
                                        {{ post.owner.account }}
                                    </span>
                                    <span class="text-[15px] text-gray-900">
                                        {{ post.title }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <template v-if="comments.length > 0">
                            <div
                                v-for="(comment, index) in comments"
                                :key="index"
                                class="p-3"
                            >
                                <Comment :comment="comment"></Comment>
                            </div>
                        </template>
                    </div>

                    <div class="px-2 mb-2 border-t">
                        <div class="flex justify-between px-3 mb-2">
                            <like-button :post="post" type="post"></like-button>
                            <save-button :post="post"></save-button>
                        </div>

                        <div class="px-2">
                            <span class="ml-2"
                                >{{ post.likes.length }} likes</span
                            >
                            <span class="ml-2"
                                >{{ comments.length }} comments</span
                            >
                        </div>
                    </div>

                    <div
                        class="p-3 flex flex-nowrap justify-between border bottom-0 w-full max-h-[200px] bg-white overflow-auto"
                    >
                        <textarea
                            v-model="commentInput"
                            placeholder="Add a comment..."
                            rows="2"
                            class="border-0 flex-1 p-1 mt-1 mb-2 text-sm z-50 focus:ring-0 text-gray-600 text-[18px]"
                        ></textarea>
                        <button
                            v-if="commentInput"
                            class="p-2 mx-2 font-extrabold text-blue-600"
                            @click="handleComment"
                            :disabled="isLoading"
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DotsHorizontal from 'vue-material-design-icons/DotsHorizontal.vue';
import CommentOutline from 'vue-material-design-icons/CommentOutline.vue';
import EmoticonHappyOutline from 'vue-material-design-icons/EmoticonHappyOutline.vue';
import Close from 'vue-material-design-icons/Close.vue';
import { computed, onMounted, ref, watchEffect } from 'vue';
import { useStore } from 'vuex';

import { getTimeGap } from '../utils/time';
import Comment from './Comment.vue';
import commentService from '../services/commentService';

import LikeButton from './LikeButton.vue';
import SaveButton from './SaveButton.vue';

export default {
    name: 'ShowPostOverlay',
    components: {
        DotsHorizontal,
        CommentOutline,
        Close,
        EmoticonHappyOutline,
        Comment,
        LikeButton,
        SaveButton,
    },
    props: {
        post: {
            type: Object,
        },
    },
    setup(props) {
        const store = useStore();
        const commentInput = ref('');
        let isLoading = ref(false);
        const user = computed(() => store.state.auth.user);

        const comments = computed(() => store.state.comment.comments);

        const closeOverlay = () => {
            store.dispatch('removeCurrentPost');
            store.dispatch('setShowCurrentPostOverlay', false);
        };

        const openPostOptionsOverlay = () => {
            store.dispatch('setShowCurrentPostOptionsOverlay', true);
        };

        // const textareaInput = (e) => {
        //     textarea.value.style.height = 'auto';
        //     textarea.value.style.height = `${e.target.scrollHeight}px`;
        // };

        const handleComment = async () => {
            isLoading = true;
            await commentService.createComment(
                store,
                props.post._id,
                commentInput.value
            );
            commentInput.value = '';
            isLoading = false;
        };

        onMounted(async () => {
            const comments = await commentService.getCommentByPostId(
                props.post._id
            );

            store.dispatch('fetchComments', comments);
        });

        return {
            user,
            comments,
            isLoading,
            commentInput,
            // textareaInput,
            handleComment,
            getTimeGap,
            closeOverlay,
            openPostOptionsOverlay,
        };
    },
};
</script>
