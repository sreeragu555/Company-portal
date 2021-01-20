<template>
        <div>
            <section class="header">
            </section>
            <div>
                <md-card class="md-primary myCard" md-with-hover>
                    <md-ripple >
                        <md-card-header >
                        <div class="md-title">Card with hover effect 1</div>
                        <div class="md-subhead">It also have a ripple</div>
                        </md-card-header>

                        <md-card-content>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
                        </md-card-content>

                        <md-card-actions>
                        <md-button>Action</md-button>
                        <md-button>Action</md-button>
                        </md-card-actions>
                    </md-ripple>
                    </md-card>
                    <md-card class="myCard md-accent" md-with-hover>
                    <md-ripple>
                        <md-card-header>
                        <div class="md-title">Card with hover effect 2</div>
                        <div class="md-subhead">It also have a ripple</div>
                        </md-card-header>

                        <md-card-content>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
                        </md-card-content>

                        <md-card-actions>
                        <md-button>Action</md-button>
                        <md-button>Action</md-button>
                        </md-card-actions>
                    </md-ripple>
                    </md-card>
                    <md-card class="myCard " md-theme="orange-card" md-with-hover>
                    <md-ripple>
                        <md-card-header>
                        <div class="md-title">Card with hover effect 3</div>
                        <div class="md-subhead">It also have a ripple</div>
                        </md-card-header>

                        <md-card-content>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
                        </md-card-content>

                        <md-card-actions>
                        <md-button>Action</md-button>
                        <md-button>Action</md-button>
                        </md-card-actions>
                    </md-ripple>
                    </md-card>
            </div>
        </div>
</template>
<script>
export default {
    name:"Index"
}
</script>
<style scoped>
.header{
    background: url("http://a.top4top.net/p_397znzmu1.png") center center fixed;
    color: #FFF;
    height: 100vh;
    position: relative;
    background-size: cover;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    -msn-background-size: cover;
}
.header .overlay{
    background: rgba(0, 0, 0, 0.58);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0; 
}
.md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
.myCard{
    margin:60px;
    
}
</style>