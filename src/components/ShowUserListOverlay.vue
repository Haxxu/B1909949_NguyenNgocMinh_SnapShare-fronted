<template>
    <div
        class="fixed z-30 top-0 left-0 w-full h-screen bg-[#000000] bg-opacity-60 p-3"
    >
        <button class="absolute p-3 right-3" @click="closeOverlay">
            <Close :size="27" fillColor="#FFFFFF" />
        </button>

        <div
            class="max-w-md h-[calc(100%-200px)] mt-20 mx-auto bg-white rounded-xl overflow-hidden"
        >
            <div
                class="flex items-center justify-center w-full p-3 border-b rounded-t-xl border-b-gray-300"
            >
                <div class="text-lg font-extrabold text-capitalize">
                    {{ type }}
                </div>
            </div>

            <div class="w-full h-full overflow-scroll p-3">
                <div v-for="(user, index) in users" :key="index">
                    <div class="flex p-2 justify-between items-center">
                        <div>
                            <q-avatar>
                                <img
                                    :src="user.image"
                                    @click="navigateToUserPage"
                                    class="cursor-pointer"
                                />
                            </q-avatar>
                            <span
                                @click="() => navigateToUserPage(user._id)"
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
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import Close from 'vue-material-design-icons/Close.vue';
import { ref } from 'vue';

import FollowButton from './FollowButton.vue';
import { useRouter } from 'vue-router';

export default {
    name: 'ShowFollowersOverlay',
    props: {
        type: {
            type: String,
            default: 'following',
        },
    },
    components: {
        Close,
        FollowButton,
    },
    setup(props) {
        const store = useStore();
        const router = useRouter();

        let users = ref([]);

        if (props.type === 'following') {
            users.value = store.state.user.following;
        } else {
            users.value = store.state.user.followers;
        }

        const closeOverlay = () => {
            store.dispatch('removeShowUserListOverlay');
        };

        const navigateToUserPage = (userId) => {
            router.push({ name: 'User', params: { id: userId } });
            store.dispatch('removeShowUserListOverlay');
        };

        return { closeOverlay, users, navigateToUserPage };
    },
};
</script>
