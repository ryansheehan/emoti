<script src="./user-avatar.component.ts" lang="ts"></script>

<template>
    <md-menu md-align-trigger md-direction="bottom left" :md-offset-y="-47" md-size="4" v-show="user">
        <md-avatar md-menu-trigger>
            <img :src="photoUrl" alt="Avatar">
        </md-avatar>

        <md-menu-content>
            <div class="user-card">
                <md-avatar class="md-large">
                    <img :src="photoUrl" alt="Avatar">
                </md-avatar>

                <div class="user-card-info">
                    <span>{{displayName}}</span>
                    <div class="user-card-links">
                        <md-button @click.native="test()">Sign out</md-button>
                    </div>
                </div>
            </div>
        </md-menu-content>
    </md-menu>
</template>

<style scoped>
.user-card {
    padding: 8px 16px;
    display: flex;
    align-items: center;

    .md-avatar {
        margin-right: 16px;
    }

    .user-card-info {
        display: flex;
        flex-flow: column;
        flex: 1;
    }

    span {
        font-size: 16px;
    }

    .user-card-links {
        display: flex;
    }
}
</style>
