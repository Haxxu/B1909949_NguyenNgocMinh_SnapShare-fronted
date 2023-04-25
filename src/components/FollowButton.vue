<template>
    <q-btn
        @click="handleFollow"
        :size="size"
        padding="5px 15px"
        color="primary"
        :outline="isFollowing"
    >
        <span class="text-capitalize">
            {{ isFollowing ? 'Unfollow' : 'Follow' }}
        </span>
    </q-btn>
</template>

<script>
import { computed, watch } from 'vue';
import BookMark from 'vue-material-design-icons/BookMark.vue';
import BookMarkOutline from 'vue-material-design-icons/BookMarkOutline.vue';
import { useStore } from 'vuex';
import userService from '../services/userService';

export default {
    name: 'SaveButton',
    props: {
        user: {
            type: Object,
        },
        size: {
            type: String,
            default: '15px',
        },
    },
    components: {
        BookMarkOutline,
        BookMark,
    },
    setup(props) {
        const store = useStore();

        const isFollowing = computed(() => {
            let isTrue = store.state.auth.user.following
                .map((item) => item.user_id)
                .includes(props?.user?._id);

            return isTrue;
        });

        // watch(() => isLiked);

        const handleFollow = async () => {
            if (!isFollowing.value) {
                await userService.followUser(store, props.user);
            } else {
                await userService.unfollowUser(store, props.user);
            }
        };

        return { isFollowing, handleFollow };
    },
};
</script>
