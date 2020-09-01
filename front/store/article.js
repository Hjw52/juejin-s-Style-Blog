import{http} from '~/plugins/axios'
const state=()=>({
    _id:'',
    title:'',
    article_html:'',
    author:''
})
 
const mutations={
    SET_ARTICLE(state,artilce={}){
        state._id=artilce._id
        state.title=artilce.title
        state.article_html=artilce.article_html
        state.author = artilce.author
    }
}

const actions={
    info:async({state,commit},data)=>{
        let ret = await http.get('/article/info')
        if(ret.code==0){
          commit('SET_ARTICLE', ret.data)
          return ret
        }
      },
      detail:async({state,commit},data)=>{
        let ret = await http.get('/article/'+data)
        if(ret.code==0){
          commit('SET_ARTICLE', ret.data)
          return ret
        }
      }
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
  }