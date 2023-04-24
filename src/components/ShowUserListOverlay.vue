<template>
    <div
        class="fixed z-30 top-0 left-0 w-full h-screen bg-[#000000] bg-opacity-60 p-3"
    >
        <button class="absolute p-3 right-3" @click="closeOverlay">
            <Close :size="27" fillColor="#FFFFFF" />
        </button>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import Close from 'vue-material-design-icons/Close.vue';

export default {
    name: 'ShowFollowersOverlay',
    props: {
        type: {
            type: String,
            default: '',
        },
    },
    components: {
        Close,
    },
    setup() {
        const store = useStore();

        const closeOverlay = () => {
            store.dispatch('removeShowUserListOverlay');
        };

        return { closeOverlay };
    },
};
</script>
