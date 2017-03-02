<script src="./login.component.ts" lang="ts"></script>

<template>
    <div>
        <div v-if="user">
            <a href="#" @click="logout()">Logout</span></a> 
            <img class="profile" :src="user.photoURL"/>
        </div>
        <a v-else @click="loginGoogle()" href="#">Login</a>
        

    </div>
</template>

<style>
img.profile {
    height: 64px;
    width: 64px;
}
</style>
