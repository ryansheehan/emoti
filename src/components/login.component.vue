<script src="./login.component.ts" lang="ts"></script>

<template>
    <div>
        <a v-if="!user" @click="loginGoogle()" href="#">Login</a>
        <div v-if="user">
            <a href="#" @click="logout()">Logout <span>{{user.displayName}}</span></a> 
            
        </div>

    </div>
</template>

<style>
</style>
