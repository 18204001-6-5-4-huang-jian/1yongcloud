/**
 * Created by parti on 2018/11/9.
 */

export default {
  methods: {
    //查询table结果
    query(){
      this.$fetch.api_data.batchList(this.searchForm)
        .then(response => {
          this.queryResult = response.result
        })
    }
  }
}
