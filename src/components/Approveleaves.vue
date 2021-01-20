<template>
    <div>

        
            <md-table v-model="leaves" >
                        <md-table-toolbar>
                            <h1 class="md-title">Leave requests</h1>
                        </md-table-toolbar>
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="ID">{{ item.collection_id }}</md-table-cell>
                    <md-table-cell md-label="From Date">{{item.From_Date.getDate()}}/{{item.From_Date.getMonth()+1}}/{{item.From_Date.getFullYear()}}</md-table-cell>
                    <md-table-cell md-label="To Date">{{item.To_Date.getDate()}}/{{item.To_Date.getMonth()+1}}/{{item.To_Date.getFullYear()}}</md-table-cell>
                    <md-table-cell md-label="Type of leave">{{ item.Type_of_leave }}</md-table-cell>
                    <md-table-cell md-label="Status">{{ item.Status }}</md-table-cell>
                    <md-table-cell md-label="Remarks">{{ item.Remarks }}</md-table-cell>
                    <md-table-cell>
                                   <md-button type="submit" class="md-primary" @click="approve(item.collection_id)" ><md-icon>done</md-icon></md-button>
                                   <md-button type="submit" class="md-accent " @click="cancel(item.collection_id)"><md-icon>clear</md-icon></md-button>
                    </md-table-cell>
               </md-table-row>
            </md-table>
    </div>
</template>
<script>
import db from '@/firebase/init'
import firebase from 'firebase'
export default {
    name:'Approveleaves',
    data(){
        return{            
            leaves:[]
        }
        
        loadedData:false
        
    },
    methods:{
        approve(collection_id)
        {
            db.collection("Leave_requests").doc(collection_id).update({
                               
                                Status:"Approved"
                                
                            }).then(()=>{
                             ///Send mail
                            }).catch(error=>{
                      console.log(error.message)
                    })
        },
        cancel(collection_id)
        {
            db.collection("Leave_requests").doc(collection_id).update({
                               
                                Status:"Cancelled"
                                
                            }).then(()=>{
                             ///Send mail
                            }).catch(error=>{
                      console.log(error.message)
                    })
        }
    },
    beforeCreate(){
                firebase.auth().onAuthStateChanged(authUser=> {
                    if (authUser!= null) {
                                //console.log(authUser.uid)
                                
                               let dbref=db.collection("Leave_requests").where("Status","==","Pending")
                                 dbref.get().then(snapshot=>{
                                     
                                    snapshot.forEach(emp => {
                                 var data = emp.data()
                                 data.collection_id=emp.id
                                 data.To_Date =emp.data().To_Date.toDate()
                                 data.From_Date=emp.data().From_Date.toDate()
                                 if(data.Remarks===null)
                                 {
                                    data.Remarks="None"                                     
                                 }
                                 
                                 this.leaves.push(data)
                                 this.loadedData=true
                                //console.log(data.collection_id)
                         });
                     }).catch(err=>{
                        console.log(err.message)
                     })

                     } else {
                                this.user=null,
                                console.log("No users logged in")
                                this.$router.push("/Login")
                            }
                    });
    }
}

</script>
<style scoped>

</style>