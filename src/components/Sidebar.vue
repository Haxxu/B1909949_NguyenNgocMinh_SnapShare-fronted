<template>
    <div class="sidebar-container">
        <div class="brand">
            <router-link :to="{ name: 'Home' }">
                <h3>SnapShare</h3>
            </router-link>
        </div>
        <div class="actions">
            <div class="navigation">
                <router-link
                    :to="{ name: 'Home' }"
                    active-class="active"
                    class="link"
                >
                    <font-awesome-icon :icon="['fas', 'house']" />
                    <span>Home</span>
                </router-link>
                <router-link
                    :to="{ name: 'Login' }"
                    active-class="active"
                    class="link"
                >
                    <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                    <span>Search</span>
                </router-link>
                <router-link
                    :to="{ name: 'Login' }"
                    active-class="active"
                    class="link"
                >
                    <font-awesome-icon :icon="['fas', 'square-plus']" />
                    <span>Create</span>
                </router-link>
                <router-link
                    :to="{ name: 'Login' }"
                    active-class="active"
                    class="link"
                >
                    <font-awesome-icon :icon="['fas', 'user']" />
                    <span>Profile</span>
                </router-link>
            </div>
            <div class="link" @click="logout">
                <font-awesome-icon
                    :icon="['fas', 'arrow-right-from-bracket']"
                />
                <span>Logout</span>
            </div>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import authService from '@/services/authService.js';

export default {
    name: 'Sidebar',
    setup() {
        const router = useRouter();
        const store = useStore();

        const logout = async () => {
            await authService.logout(store);
            router.push({ name: 'Login' });
        };

        return { logout };
    },
};
</script>

<style lang="scss" scoped>
.sidebar-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 10px 15px;

    .brand {
        height: 80px;
        width: 100%;
        display: flex;
        align-items: center;
        font-size: 20px;
        color: $text-primary;
        font-family: 'Belleza', 'Roboto', sans-serif;
        margin-bottom: 10px;

        a {
            text-decoration: none;
            color: inherit;
            display: block;
            padding: 25px 0 15px 10px;
        }
    }

    .actions {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: space-between;
    }

    .link {
        display: flex;
        align-items: center;
        font-size: 18px;
        padding: 8px 5px;
        color: $text-primary;
        text-decoration: none;
        cursor: pointer;
        transition: all 0.25s ease;

        // display: -webkit-box;
        // -webkit-box-orient: vertical;
        // -webkit-line-clamp: 1;

        svg,
        img {
            width: 25px;
            height: 25px;
            object-fit: contain;
        }

        span {
            margin-left: 10px;
            font-size: 18px;
            font-weight: 600;

            max-width: 250px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        &:hover,
        &.active {
            color: $primary-color;
        }
    }

    .navigation {
        display: flex;
        flex-direction: column;

        .create-playlist-btn {
            margin-top: 20px;
        }

        .link {
            display: flex;
            justify-items: center;
            span {
                margin-left: 10px;
            }

            padding: 10px;
            margin: 10px 0;
            .icon {
                svg,
                img {
                    width: 17px;
                    height: 17px;
                    object-fit: contain;
                    color: $dark-green;
                }
            }
        }
    }
}
</style>
