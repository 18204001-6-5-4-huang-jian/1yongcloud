/**
 * Created by parti on 2018/11/10.
 */
/**
 * Created by parti on 2018/11/9.
 */

export default {
  methods: {
    //查询table结果
    query(active){
      let _url = ''
      if(active === 1){
        _url =  'resultRow'
      }else if(active === 2){
        _url =  'resultField'
      }else if(active === 3){
        _url =  'resultFile'
      }
      this.$fetch.api_data[_url](this.searchForm)
        .then(response => {
          this.queryResult = response.result
        })
    },
  }
}
