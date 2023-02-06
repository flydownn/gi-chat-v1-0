<template>
    <div class="all">
        <div class="main">
            <div class="register-word-div"><h1 class="register-word">Register</h1></div>
            <div class="register-line-div"><div class="register-line"></div></div>
            <div class="errors" v-if="!usernameiswrited||!passwordiswrited||!availableusername||!longpass||!longusername">
                <div class="empty-username-error error" v-if="!usernameiswrited">* Username cannot be empty</div>
                <div class="empty-password-error error" v-if="!passwordiswrited">* Password cannot be empty</div>
                <div class="empty-password-error error" v-if="!availableusername">* Username already use</div>
                <div class="empty-password-error error" v-if="!longpass">* Password must be at least 8 characters</div>
                <div class="empty-password-error error" v-if="!longusername">* Username must be at least 3 characters</div>
            </div>
            <div class="register-container">
                <div class="username-input-div up-input-div"><input type="text" class="username-input up-input" v-model="userData.username" placeholder="Username"><div class="username-icon icon"><i class="fa-solid fa-user"></i></div></div>
                <div class="password-input-div up-input-div">
                    <input :type="type" class="password-input up-input" v-model="userData.password" placeholder="Password">
                    <button class="see-password" @click="type == 'name' ? type = 'password' : type ='name'">
                        <i v-if="type=='password'" class="fa-solid fa-eye"></i>
                        <i v-if="type=='name'" class="fa-solid fa-eye-slash"></i>
                    </button>
                    <div class="password-icon icon">
                        <i class="fa-solid fa-lock"></i>
                    </div>
                </div>
                <div class="register-button-div"><button class="register-button" @click="onSave">Register</button></div>
            </div>
        </div>
    </div>
</template>

<script>
import datas from '@/database/db'
import CryptoJs from 'crypto-js'
export default {
    data(){
        return{
            userData: {
                username: null,
                password: null
            },
            availableusername: true,
            usernameiswrited: true,
            passwordiswrited: true,
            longpass: true,
            longusername: true,
            type: 'password',
        };
    },
    methods:{
        onSave(){
            this.availableusername = true;
            this.usernameiswrited = true;
            this.passwordiswrited = true;
            this.longpass = true;
            this.longusername = true;
            if(this.userData.username == '' || this.userData.username == null){
                this.usernameiswrited = false;
            }
            if(this.userData.password == '' || this.userData.password == null){
                this.passwordiswrited = false;
            }
            if(this.userData.password != null){
                if(this.userData.password.length < 8){
                    this.longpass = false;
                }
            }
            if(this.userData.username != null){
                if(this.userData.username.length < 3){
                    this.longusername = false;
                }
            }
            for(var i = 0; i<datas.users.length;i++){
                var savedusername = datas.users[i].username;
                if(this.userData.username == savedusername){
                    this.availableusername = false
                    break
                }
            }
            if(this.availableusername == true && this.usernameiswrited == true && this.passwordiswrited == true && this.longpass == true && this.longusername == true){
                const password = CryptoJs.HmacSHA1(this.userData.password, this.$store.getters._saltkey).toString();
                this.$appAxios.post("/users", { ... this.userData, password}).then(registered_user_response => {
                    console.log(registered_user_response);
                    this.$router.push({name : 'Login'})
                })
            }else if(this.usernameiswrited == false){
                console.log('kullanici adi girmeniz gerekiyor')
            }else if(this.passwordiswrited == false){
                console.log('sifre girmeniz gerekiyor')
            }else if(this.longpass == false){
                console.log('sifreniz en az 8 karakter olmalidir')
            }else if(this.longusername == false){
                console.log('kullanici en az 3 karakter olmalidir')
            }else if(this.availableusername == false){
                console.log('baska kullanici adi secin')
            }
        }
    }
}
</script>

<style>
.errors{
    background-color: rgb(219, 86, 86);
    padding: 10px;
    margin-bottom: 5px;
    border-radius: 10px;
}
.error{
    margin-bottom: 2px;
    margin-top: 2px;
    color: #fafafa;
}
.all{
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #414141;
}
.main{
    margin-bottom: 100px;
}
.register-word-div, .register-line-div, .register-button-div, .up-input-div{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 7px;
}
.register-word{
    color: #fafafa;
}
.register-line-div{
    margin-top: 10px;
    margin-bottom: 20px;
}
.register-line{
    width: 35%;
    height: 8px;
    border-radius: 10px;
    background-color: aqua;
}
.up-input-div{
    width: 100%;
    height: 30%;
    justify-content: space-between;
    border: 1px solid #fafafa;
}
.up-input{
    font-size: 130%;
    background-color: transparent;
    color: #fafafa;
    border: none;
    padding: 3px;
    padding-left: 7px;
}
.up-input:focus{
    outline: none;
}
.username-input{
    width: 93%;
}
.see-password{
    height: 30px;
    width: 30px;
    background-color: transparent;
    border: none;
    color: #fafafa;
    cursor: pointer;
}
.icon{
    color: #fafafa;
    margin-left: 5px;
    padding-right: 5px;
}
.register-button-div{
    margin-top: 20px;
}
.register-button{
    font-size: 20px;
    padding: 10px;
    background-color: transparent;
    color: aqua;
    border: 2px solid aqua;
    border-radius: 30px;
    cursor: pointer;
    transition: 0.2s;
}
.register-button:hover{
    color: #414141;
    background-color: aqua;
}

</style>