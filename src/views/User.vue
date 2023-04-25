<template>
    <div class="w-full p-2">
        <div
            class="max-w-[1200px] min-w-[800px] flex justify-center pt-[30px] p-x-[20px]"
        >
            <div class="flex items-start">
                <img
                    class="rounded-full border object-fit md:w-[150px] w-[100px] md:h-[150px] h-[100px] cursor-pointer"
                    :src="user?.image || ''"
                />
                <div class="flex flex-col ml-[20px] p-2 min-w-[200px]">
                    <div class="flex items-center justify-start">
                        <div class="text-[20px] mr-6">
                            {{ user?.account }}
                        </div>
                        <q-btn
                            v-if="authUser?._id === user?._id"
                            @click="openShowEditProfileOverlay"
                            >Edit Profile</q-btn
                        >
                        <FollowButton v-else :user="user"></FollowButton>
                    </div>
                    <div class="flex items-center justify-between mt-5">
                        <div class="text-[16px]">
                            <span class="font-extrabold">{{
                                posts.length
                            }}</span>
                            posts
                        </div>
                        <div
                            class="text-[16px] cursor-pointer p-2 ml-6"
                            @click="() => openUserListOverlay('followers')"
                        >
                            <span class="font-extrabold">{{
                                followers.length
                            }}</span>
                            followers
                        </div>
                        <div
                            class="text-[16px] cursor-pointer p-2 ml-6"
                            @click="() => openUserListOverlay('following')"
                        >
                            <span class="font-extrabold">{{
                                following.length
                            }}</span>
                            following
                        </div>
                    </div>

                    <div class="text-[16px] font-extrabold mt-4">
                        <span>{{ user?.name }}</span>
                    </div>

                    <div class="text-[14px] mt-1">
                        <span>{{ user?.description }}</span>
                    </div>
                </div>
            </div>

            <div class="mt-5">
                <q-tabs
                    v-model="tab"
                    dense
                    class="text-grey"
                    active-color="primary"
                    indicator-color="primary"
                    align="justify"
                    narrow-indicator
                >
                    <q-tab name="posts" label="POSTS" />
                    <q-tab
                        v-if="authUser?._id === user?._id"
                        name="saved"
                        label="SAVED"
                    />
                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="tab" animated>
                    <q-tab-panel name="posts">
                        <div
                            class="mt-4 grid md:gap-4 gap-1 grid-cols-3 relative"
                        >
                            <div v-for="(post, index) in posts" :key="index">
                                <PostCard :post="post" />
                            </div>
                        </div>
                    </q-tab-panel>

                    <q-tab-panel
                        v-if="authUser?._id === user?._id"
                        name="saved"
                    >
                        <div
                            class="mt-4 grid md:gap-4 gap-1 grid-cols-3 relative"
                        >
                            <div
                                v-for="(post, index) in savedPosts"
                                :key="index"
                            >
                                <PostCard :post="post" />
                            </div>
                        </div>
                    </q-tab-panel>
                </q-tab-panels>
            </div>
        </div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router';
import {
    computed,
    onBeforeMount,
    onMounted,
    onUnmounted,
    ref,
    watch,
} from 'vue';
import { useStore } from 'vuex';
import Cog from 'vue-material-design-icons/Cog.vue';
import Grid from 'vue-material-design-icons/Grid.vue';
import PlayBoxOutline from 'vue-material-design-icons/PlayBoxOutline.vue';
import AccountBoxOutline from 'vue-material-design-icons/AccountBoxOutline.vue';
import BookMarkOutline from 'vue-material-design-icons/BookMarkOutline.vue';

import PostCard from '../components/PostCard.vue';
import FollowButton from '../components/FollowButton.vue';
import userService from '../services/userService';
import postService from '../services/postService';

export default {
    name: 'User',
    components: {
        Cog,
        Grid,
        PlayBoxOutline,
        BookMarkOutline,
        AccountBoxOutline,
        PostCard,
        FollowButton,
    },
    setup() {
        const store = useStore();
        const route = useRoute();

        const user = computed(() => store.state.user.currentUser);
        const tab = ref('posts');

        const authUser = computed(() => store.state.auth.user);

        const posts = computed(() => store.state.post.posts);
        const savedPosts = computed(() => store.state.post.savedPosts);

        const following = computed(() => store.state.user.following);

        const followers = computed(() => store.state.user.followers);

        const fetchData = async () => {
            await postService.fetchPostsByUserId(store, route.params.id);
            await userService.fetchCurrentUserByUserId(store, route.params?.id);
            await userService.fetchFollowersByUserId(store, route.params?.id);
            await userService.fetchFollowingByUserId(store, route.params?.id);
        };

        watch(
            () => route.params.id,
            (newId, oldId) => {
                if (newId) {
                    fetchData();
                }
            }
        );

        onMounted(async () => {
            await fetchData();
        });

        onUnmounted(() => {
            // store.dispatch('setCurrentUser', null);
        });

        const openUserListOverlay = (type) => {
            store.dispatch('setShowUserListOverlay', type);
        };

        const openShowEditProfileOverlay = () => {
            store.dispatch('setShowEditProfileOverlay');
        };

        onUnmounted(() => {
            store.dispatch('setPosts', []);
        });

        return {
            tab,
            authUser,
            user,
            posts,
            savedPosts,
            followers,
            following,
            openUserListOverlay,
            openShowEditProfileOverlay,
        };
    },
};
</script>
