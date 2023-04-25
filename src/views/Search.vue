<template>
    <div class="max-w-[500px] p-[30px] pt-[50px] m-t-[40px]">
        <q-input
            v-model="searchTerm"
            type="text"
            label="Search for users"
            debounce="500"
            clearable
        />

        <div class="mt-5">
            <div v-if="users.length">
                <div v-for="(user, index) in users" :key="index">
                    <div class="flex p-2 justify-between items-center">
                        <div>
                            <q-avatar>
                                <img
                                    :src="user.image"
                                    @click="navigateToUserPage(user._id)"
                                    class="cursor-pointer"
                                />
                            </q-avatar>
                            <span
                                @click="navigateToUserPage(user._id)"
                                class="ml-3 text-lg cursor-pointer"
                                >{{ user.account }}</span
                            >
                        </div>
                        <div>
                            <follow-button
                                :user="user"
                                size="12px"
                            ></follow-button>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else>
                <p>No users found.</p>
            </div>
        </div>

        <div class="">
            <div class="mx-auto lg:pl-0 md:pl-[80px] pl-0">
                <post
                    v-for="(post, index) in posts"
                    :key="index"
                    :post="post"
                ></post>
            </div>
        </div>
    </div>
</template>
<script>
import { computed, ref, watchEffect } from 'vue';
import debounce from 'lodash/debounce';

import FollowButton from '../components/FollowButton.vue';
import Post from '../components/Post.vue';
import searchService from '../services/searchService';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
    name: 'Search',
    components: {
        FollowButton,
        Post,
    },
    setup() {
        const router = useRouter();
        const store = useStore();

        const searchTerm = ref('');
        const users = ref([]);
        const posts = computed(() => store.state.post.searchPosts);

        const searchUsers = async () => {
            users.value = await searchService.search(
                store,
                searchTerm.value,
                10
            );
        };

        const debouncedSearchUsers = debounce(searchUsers, 500);

        watchEffect(() => {
            if (searchTerm.value) {
                debouncedSearchUsers();
            } else {
                users.value = [];
            }
        });

        const navigateToUserPage = (userId) => {
            router.push({ name: 'User', params: { id: userId } });
        };

        return {
            users,
            searchTerm,
            searchUsers,
            navigateToUserPage,
            posts,
        };
    },
};
</script>
