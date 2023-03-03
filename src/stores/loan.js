import axios from 'axios';
import { defineStore } from 'pinia'
import { useLoadingStore } from './loading'
import { useUserStore } from './user'

export const useLoanStore = defineStore('loan',{
    state: () => ({
        loans: localStorage.getItem('loans') ? JSON.parse(localStorage.getItem('loans')) : [],
        loading: useLoadingStore(),
        user: useUserStore()
    }),
  actions: {
    addToLoan(payload){
        if (!this.user.user ) {
            alert('Can Dang Nhap De Muon Sach')
            return -1
        }
        if (this.loans.length>0) {
            let item = this.loans.find(i => i.id === payload.id);
            if (item) {
                alert('muon duoc 1 cuon moi loai');
                return -1
            }
        }
        if (this.loans.length >= 3) {
            alert('Toi da 3 cuon');
                return -1
        }
        this.loans.push(payload);
        localStorage.setItem('loans', JSON.stringify(this.loans))
    },
    submitLoan(){
        const url = this.loading.apiURL;
        const config = this.loading.config;
        const user = this.user.user;
        let checkStore = JSON.parse(localStorage.getItem('loans'))
        if (!checkStore) {
            alert('Phai co sach moi muon duoc');
            return -1
        }
        checkStore.forEach(async i =>{
            await axios.post(`${url}/api/loan`,{user_id:user.id,book_id:i.id},config).catch(err=>console.log(err))
        })
        this.clearLoans();
        
    },
    clearLoans(){
        this.loans = [];
        localStorage.removeItem('loans')
    },
    removeLoan(id){
        let checkStore = JSON.parse(localStorage.getItem('loans'))

        let item = checkStore.indexOf(id)
        this.loans.splice(item,1)
        if (this.loans.length == 0) {
            localStorage.removeItem('loans')
        }
        localStorage.setItem('loans', JSON.stringify(this.loans))

    }
  }
})
