<template>
    <div class="all">
        <div class="main" v-if="!authenticated">
            <router-link class="link" to="/login"><button class="login-button lr-button">Login</button></router-link>
            <router-link class="link" to="/register"><button class="register-button lr-button">Register</button></router-link>
        </div>
        <div class="second-main" v-if="authenticated">
            <div class="header">
                <h1 class="text">GayChat</h1>
                <button class="logoutbtn" @click="logOut"><i class="fa-solid fa-right-from-bracket"></i></button>
            </div>
            <div class="chat-div">
                <div class="chat">
                    <div class="chat-area-div">
                        <div class="chat-area" ref="scrollMenu">
                            <div class="fix">
                                <div class="messages" v-for:="msg in messageList" :key="msg">
                                    <div class="name-and-time-side">
                                        <div class="name-div">
                                            <h3 class="name">{{ msg.username }}</h3>
                                        </div>
                                        <div class="time-div">
                                            <p class="time">{{ msg.time }}</p>
                                        </div>
                                    </div>
                                    <div class="message-side">
                                        <p class="mesage-paragraph">{{ msg.message }}</p>
                                    </div>
                                    <div ref="lastMessage"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="input-area-div">
                    <div class="input-area">
                        <input type="text" class="input" placeholder="Message..." @keydown.enter="sendMsg" v-model="message" ref="input">
                        <button class="send" @click="sendMsg"><i class="fa-solid fa-paper-plane"></i></button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import datas from '@/database/db'
export default {
    props: ['lightMode'],
    data(){
        return{
            authenticated : this.$store.getters._isAuthenticated,
            messageList : datas.messages,
            message: '',
            msgData: {
                username: null,
                message : null,
                time: null,
            },
            sended: 0,
        };
    },
    methods: {
        logOut(){
            this.$store.commit("setUser", null);
            this.authenticated = false;
        },
        sendMsg(){
            this.msgData.username = this.$store.state.user.username;
            this.msgData.message = this.message;
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
                    if(this.sended == 0){
                        this.sended = 1
                    }else if(this.sended == 1){
                        this.sended = 0
                    }
                })
            }
        },
        scrollToEnd(){
            var container = this.$refs.scrollMenu;
            var scrollHeight = container.scrollHeight;
            container.scrollTop = scrollHeight;
        }
    },
    mounted () {
        this.scrollToEnd()
        this.$refs.input.submit()
    },
    watch:{
        sended(){
            this.scrollToEnd()
            this.$refs.input.submit()
        },
    }
}
</script>

<style>
::-webkit-scrollbar{
    width: 7px;
}
::-webkit-scrollbar-track{
    background-color: #424242;
}
::-webkit-scrollbar-thumb{
    background-color: #1f1f1f;
    border-radius: 10px;
}
.chat-area-div{
    justify-content: end;
    display: flex;
    align-items: center;
}
.chat-area{
    overflow-y: scroll;
    width: 99%;
    height: 97%;
    margin-right: 5px;
}
.fix{
    margin-left: 10px;
}
.messages{
    margin-top: 10px;
    display: flex;
    color: #fafafa;
}
.time-div{
    margin-top: 5px;
    color: gray;
}
.message-side{
    margin-left: 15px;
    margin-right: 10px;
    overflow-wrap: normal;
    margin-top: 2px;
    width: 100%;

}
.chat-area-div{
    height: 94%;
    width: 100%;
}
.input-area-div{
    height: 4%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
}
.input-area{
    width: 98%;
    display: flex;
    justify-content: space-between;
    background-color: #414141;
    padding: 3px;
    border-radius: 10px;
}
.input{
    height: 100%;
    width: 100%;
    font-size: 20px;
    padding-left: 10px;
    padding: 5px;
    background-color: transparent;
    border: none;
    color: #fafafa;
    caret-color: #fafafa;
}
.input:focus{
    outline: none;
}
.send{
    font-size: 17px;
    height: 150%;
    background-color: transparent;
    border: none;
    color: aqua;
    padding-bottom: 4px;
    margin-right: 10px;
    cursor: pointer;
    margin-top: 8px;
}
.send:hover{
    color: aquamarine;
}
.chat-div{
    display: flex;
    justify-content: center;
    align-items: center;
}
.chat{
    width: 95%;
    height: 93vh;
    background-color: #353535;
    margin-top: 1vh;
    margin-bottom: 1vh;
    border-radius: 20px;
}
.second-main{
    width: 100%;
    height: 100vh;
}
.header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 5vh;
}
.text{
    color: aqua;
    margin-left: 15px;
}
.logoutbtn{
    font-size: 20px;
    padding: 5px;
    margin-right: 10px;
    background-color: transparent;
    border: 2px solid aqua;
    color: aqua;
    cursor: pointer;
    transition: 0.2s;
    border-radius: 10px;
}
.logoutbtn:hover{
    background-color: aqua;
    color: #414141;
}
.all{
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #414141;
}
.l-all{
    background-color: #fafafa;
}
.main{
    margin-bottom: 150px;
}
.lr-button{
    width: 100px;
    height: 50px;
    margin-left: 20px;
    margin-right: 20px;
    background-color: transparent;
    border: 2px solid aqua;
    border-radius: 10px;
    color: aqua;
    cursor: pointer;
    transition: 0.2s;
}
.l-lr-button{
    border: 2px solid #414141;
    color: #414141;
}
.lr-button:hover{
    background-color: aqua;
    color: #414141;
}
.l-lr-button:hover{
    background-color: #414141;
    color: aqua;
}

</style>