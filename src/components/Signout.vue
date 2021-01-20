<template>
</template>
<script>
import firebase from 'firebase'
export default {
    created() {
        
        firebase.auth().signOut().then(()=> {
           this.$router.push("/Login")
           console.log("Logout success")
        }).catch((error)=> {
            console.log("Error in logout")
        });
    }
}
</script>