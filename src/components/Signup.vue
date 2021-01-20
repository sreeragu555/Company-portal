<template>
    <div>
        <form novalidate class="md-layout md-alignment-center-center " md-elevation="4" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100 mycenter">
        <md-card-header class="md-layout md-alignment-center-center">
          <div class="md-title ">Sign Up</div>
        </md-card-header>

        <md-card-content>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('Name')">
                <label for="name">Name</label>
                <md-input name="name" id="name" autocomplete="given-name" v-model="form.name" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.name.required">The name is required</span>
                <span class="md-error" v-else-if="!$v.form.name.minlength">Invalid name</span>
              </md-field>
            </div>

          <md-field :class="getValidationClass('email')">
            <label for="email">Email</label>
            <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
            <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
          </md-field>
        
          <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('phone')">
                <label for="phone">Phone Number</label>
                <md-input name="phone" id="phone" v-model="form.phone" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.phone.required">The phone number is required</span>
              </md-field>
            </div>


            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('Password')">
                <label for="Password">Password</label>
                <md-input name="Password" id="Password" type="password" v-model="form.password" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.password.required">The Password is required</span>
                <span class="md-error" v-else-if="!$v.form.password.minlength">Invalid Password</span>
              </md-field>
            </div>
          

          <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('confPwd')">
                <label for="ConfPassword">Confirm Password</label>
                <md-input name="conf_Password" id="conf_Password" type="password" v-model="form.confPwd" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.confPwd.required">The Password is required</span>
                <span class="md-error" v-else-if="!$v.form.confPwd.sameAs">Password mismatch</span>
              </md-field>
            </div>
          

            </md-card-content>
          

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Create user</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="dispalert">{{message}}</md-snackbar>
    </form>
  </div>
</template>

<script>
import db from '../firebase/init.js'
import firebase from 'firebase'
  import { validationMixin } from 'vuelidate'
  import {
    required,
    email,
    minLength,
    maxLength,
    sameAs
  } from 'vuelidate/lib/validators'

  export default {
    name: 'signup',
    mixins: [validationMixin],
    data: () => ({
      form: {
        name: null,
        Password: null,
        confPwd:null,
        email: null,
        phone:null
      },
      dispalert:false,
      sending: false,
      message: null
    }),
    validations: {
      form: {
        name: {
          required,
          minLength: minLength(3)
        },
        password: {
          required,
          minLength: minLength(3)
        },
        confPwd:{
          sameAsPassword:sameAs('password')
        },
        email: {
          required,
          email
        },
        phone:{
          required
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
        this.form.name = null
        this.form.password = null
        this.form.email = null
        this.form.confPwd=null
        this.form.phone=null
      },
      saveUser () {
        this.sending = true

                    firebase.auth().createUserWithEmailAndPassword(this.form.email, this.form.password)
                    .catch(error=>{
                      this.message=error.message
                    })
                    .then(cred=>{
                    console.log("In AUTH")
                    db.collection("Employees").add({
                        Employees_id:cred.user.uid,
                        Name:this.form.name,
                        Phone_Number:this.form.phone
                    }).then(()=>{
                        console.log("Addeed to firestore")
                        this.message="Account created"
                               
                              db.collection("Leaves").add({
                                Employees_id:cred.user.uid,
                                Casual_Leave:2,
                                Sick_Leave:3,
                                Earned_Leave:3
                            }).then(()=>{
                              console.log("Leaves added")
                              this.$router.push("/Profile")
                            })

                              // Instead of this timeout, here you can call your API
                        window.setTimeout(() => {
                        this.dispalert = true
                        this.sending = false
                        this.clearForm()
                                }, 1500)
                                              
                      // alert("Account created")
                      
                    })
                })
        
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

<style lang="scss" scoped>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }

  .mycenter{
    margin:64px auto;
    width:500px!important; 
  }
</style>