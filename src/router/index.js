import {createRouter,createWebHistory} from 'vue-router';
import admin from './admin';
import page from './page';
import client from './client'

const routes = [...admin,...page,...client];

const router = createRouter({
    history : createWebHistory(),
    routes
})

export default router
