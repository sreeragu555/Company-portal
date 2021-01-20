<template>
    <div>
        <form novalidate class="md-layout md-alignment-center-center " md-elevation="4" @submit.prevent="validateUser">
                <md-card class="md-layout-item md-size-50 md-xsmall-size-20 mycenter">
                    <md-card-header class="md-layout md-alignment-center-center">
                    <div class="md-title ">Login</div>
                </md-card-header>
                <md-card-content>
                <md-field :class="getValidationClass('email')">
                    <label for="email">Email</label>
                    <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
                    <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
                    <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
                </md-field>
                
                    <md-field :class="getValidationClass('Password')">
                        <label for="Password">Password</label>
                        <md-input name="Password" id="Password" type="password" v-model="form.password" :disabled="sending" />
                        <span class="md-error" v-if="!$v.form.password.required">The Password is required</span>
                        <span class="md-error" v-else-if="!$v.form.password.minlength">Invalid Password</span>
                    </md-field>
               
                </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Login</md-button>
        </md-card-actions>
      </md-card>

        <md-snackbar :md-active.sync="dispalert">{{message}}</md-snackbar>
                
        </form>
    </div>
</template>
<script>
import firebase from 'firebase'
    import { validationMixin } from 'vuelidate'
  import {
    required,
    email,
    minLength,
    maxLength,
  } from 'vuelidate/lib/validators'

  export default {
    name: 'FormValidation',
    mixins: [validationMixin],
    data: () => ({
      form: {
        Password: null,
        email: null,
      },
      dispalert:false,
      sending: false,
      message: null
    }),
    validations: {
      form: {
        password: {
          required,
          minLength: minLength(3)
        },
        email: {
          required,
          email
        }
      }
    },
    methods: {
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset()
       
        this.form.password = null
        this.form.email = null
       
      },
      saveUser () {
        this.sending = true
        firebase.auth().signInWithEmailAndPassword(this.form.email,this.form.password)
            .then(cred=>{
                console.log(cred.user.uid)
                //alert("Login success")
                this.sending = false
                this.$router.push("/Profile")
            })
           .catch((error)=> {
                //var message=error.message
                //alert(message)
                this.message=error.message
                window.setTimeout(() => {
          
                this.dispalert = true
                this.sending = false
                //this.clearForm()
        }, 1500)
           })
        // Instead of this timeout, here you can call your API
        //console.log("Login success")
      },
      validateUser () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.saveUser()
        }
      }
    }
  }
</script>
<style>
.md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
  .mycenter{
    margin:64px auto!important;
    width:500px!important; 
  }
</style>