<template>
  <div>
    <div class="write-btn">
      <el-button @click="submit" type="success">发布</el-button>
    </div>
    <el-row>
    <el-col :span="24">
        <el-input class="md-title" v-model="title" placeholder="请输入标题"></el-input>
    </el-col>
</el-row>   
    <el-row>
      <el-col :span="12">
        <!-- markdown编辑器 -->
        <Editor v-model="content"  @change="update"/>
        <!-- <textarea class="md-editor" :value="content"  @input="update"></textarea> -->
      </el-col>
      <el-col :span="12">
        <div class="markdown-body" v-html="compiledHtml">
          <!-- html显示 -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import debounce from 'lodash/debounce'
import marked from 'marked'
import Editor from '../../components/editor'
export default{
   layout:"none",
   components:{Editor},
    data(){
        return{
            title:'',
            content:`# 你的博客将会显示在这里
## 开始吧！
哈哈哈
   `
        }
    },
    methods:{
        update:debounce(function(e){
            this.content=e;
        },100),
        async submit(){
            let ret = await this.$http.post('/article/create',{title:this.title,content:this.content})
            if(ret.code==0){
                this.$notify({
                title:'创建成功',
                type:'success',
                message:`文章《${this.title}》发布成功`
        })
        setTimeout(()=>{
          this.$router.push({path:'/article/'+ret.data.id})
        }, 1000)
      }
    }
    },
    computed:{
    compiledHtml(){
      return marked(this.content)
    }
  }
}
</script>
<style scoped>
.md-title{
    height: 50px ;
    }
.md-editor{
  width:100%;
  height:100vh;
  outline:none;
}
.markdown-body{
  height:100vh;
  overflow-y:scroll;
  margin-left: 10%;
}
.write-btn{
    position: absolute;
    z-index: 2;
    right: 5px;
    top: 0px;
}
</style>