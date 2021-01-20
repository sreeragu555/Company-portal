<template>
    <div>
        <div v-if="loadedData">
            <md-tabs class="md-primary"  md-elevation="4">
                <md-tab id="tab-Home" md-label="Home" @click="showTab('Home')"></md-tab>
                <md-tab id="tab-Apply" md-label="Apply leave" @click="showTab('ApplyLeave')"></md-tab>
                <md-tab id="tab-showRequests" md-label="My Leave Requests" @click="showTab('leaverequest')"></md-tab>
                <md-tab id="tab-Approve" v-if="employee.Admin" md-label="Approve leaves" @click="showTab('approveleaves')"></md-tab>
        </md-tabs>
        <!--Home section starts-->
        <div v-if="dispHome" class="md-layout md-alignment-center-center mycenter">
            <!-- <span class="md-headline ">{{employee.Name }}</span><br>
            <span class="md-subheading"><md-icon >phone</md-icon>
            <span >{{employee.Phone_Number}}</span></span> -->

            <md-card class="md-layout md-alignment-center-center mycenter">
                    <md-card-media>
                        <img src="https://www.giraffecvs.co.uk/wp-content/uploads/2015/08/Dollarphotoclub_68677358-1024x576.jpg" alt="People">
                    </md-card-media>

                    <md-card-header>
                        <div class="propic md-title"><md-icon class="md-primary md-size-2x">person</md-icon></div>
                        <div class="md-title">{{employee.Name }}</div>
                        <div class="md-subhead"><md-icon >phone</md-icon>{{employee.Phone_Number}}</div>

                    </md-card-header>
                    <md-card-content>
                        Hi Welcome to employee Page
                    </md-card-content>
            </md-card>




        </div>
        <!--Home section ends-->
        <!--Apply leave section starts-->
        <div v-if="dispApply">
            <ApplyLeave/>
        </div>
        <!--Apply leave section ends-->
        <!--Display leave requets section starts-->
        <div v-if="dispLeaves">
            <LeaveRequests/>
        </div>
        <!--Display leave requets section ends-->

        <div v-if="approveleaves">
            <Approveleaves/>
        </div>
    </div>
    <div v-if="!loadedData" class="md-layout md-alignment-center-center mycenter">
        <md-progress-spinner :md-diameter="100" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner>
    </div>
    </div>
</template>
<script>
import ApplyLeave from '@/components/ApplyLeave.vue'
import LeaveRequests from '@/components/LeaveRequests.vue'
import Approveleaves from '@/components/Approveleaves.vue'
import db from '@/firebase/init'
import firebase from 'firebase'
export default {
    name:'profile',
    components:{
    ApplyLeave,
    LeaveRequests,
    Approveleaves
  },
    data(){
        return{
            employee:[],
            dispHome:true,
            dispApply:false,
            dispLeaves:false,
            approveleaves:false,
            loadedData:false
        }
        
    },
    methods:{
        showTab(Tabname)
        {
            if(Tabname=="Home"){
                    this.dispHome=true,
                    this.dispApply=false,
                    this.dispLeaves=false,
                    this.approveleaves=false
            }
            else if(Tabname=="ApplyLeave"){
                    this.dispHome=false,
                    this.dispApply=true,
                    this.dispLeaves=false,
                    this.approveleaves=false
            }
            else if(Tabname=="approveleaves"){
                    this.dispHome=false,
                    this.dispApply=false,
                    this.dispLeaves=false,
                    this.approveleaves=true
            }
            else{
                    this.dispHome=false,
                    this.dispApply=false,
                    this.dispLeaves=true,
                    this.approveleaves=false
            }
        }
    },
    beforeCreate(){
                firebase.auth().onAuthStateChanged(authUser=> {
                    if (authUser!= null) {
                                //console.log(authUser.uid)
                               let dbref=db.collection("Employees").where("Employees_id","==",authUser.uid)
                                 dbref.get().then(snapshot=>{
                                    snapshot.forEach(emp => {
                                 this.employee=emp.data()
                                 this.loadedData=true
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
<style lang="scss">
.propic{
    position: absolute;
    bottom: 38%;
    border-color: black;
    background-color: #ffccbc;
    border-radius: 100%;
   
    
}
.mycenter{
    margin:45px auto; 
    display: table!important;
  }
  .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }

  .md-card-example {
    .md-subhead {
      .md-icon {
        $size: 16px;

        width: $size;
        min-width: $size;
        height: $size;
        font-size: $size !important;
      }

      span {
        vertical-align: middle;
      }
    }
  }
</style>