<template>
    <div class="all">
        <div class="header">
        </div>
        <div class="main">

        </div>
    </div>
    <!-- <div>
        <input type="text" v-model="message">
        <button @click="sendMsg">send</button>
        <ul>
            <div v-for:="msg in messageList" :key="msg">{{ msg.time +' - '+ msg.username + ':  '+ msg.message }}</div>
        </ul>
    </div> -->
</template>

<script>
import datas from '@/database/db'
export default {
    data(){
        return{
            messageList : datas.messages,
            authenticated : this.$store.getters._isAuthenticated,
            message: '',
            msgData: {
                username: this.$store.state.user.username,
                message : null,
                time: null,
            }
        };
    },
    methods:{
        sendMsg(){
            this.msgData.message = this.message
            var time = new Date();
            var hours = time.getHours();
            var minutes = time.getMinutes();
            hours.toString();
            minutes.toString();
            if(minutes == '0'){minutes = '00'}
            else if(minutes == '1'){minutes = '01'}
            else if(minutes == '2'){minutes = '02'}
            else if(minutes == '3'){minutes = '03'}
            else if(minutes == '4'){minutes = '04'}
            else if(minutes == '5'){minutes = '05'}
            else if(minutes == '6'){minutes = '06'}
            else if(minutes == '7'){minutes = '07'}
            else if(minutes == '8'){minutes = '08'}
            else if(minutes == '9'){minutes = '09'}

            if(hours == '0'){hours = '00'}
            else if(hours == '1'){hours = '01'}
            else if(hours == '2'){hours = '02'}
            else if(hours == '3'){hours = '03'}
            else if(hours == '4'){hours = '04'}
            else if(hours == '5'){hours = '05'}
            else if(hours == '6'){hours = '06'}
            else if(hours == '7'){hours = '07'}
            else if(hours == '8'){hours = '08'}
            else if(hours == '9'){hours = '09'}
            
            
            this.msgData.time = hours+':'+minutes

            if(this.msgData.message != '' && this.msgData.message != null){
                this.$appAxios.post("/messages", { ... this.msgData}).then(message_response => {
                    console.log(message_response);
                })
            }
        }
    },
}
</script>

<style scoped>
.all{
    width: 100%;
    height: 100vh;
}
</style>