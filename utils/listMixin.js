export default {
	data(){
		return {
			list:[],
			page:1,
			limit:10,
			total:0
		}
	},
	methods:{
		getList(){
			let data = {
				page:1,
				limit:10,
				...this.listQuery
			}
			
			return new Promise((resolve,reject)=>{
				this.http(data).then(res=>{
					this.list = this.list.concat(res.list)
					this.total = res.total_page
					resolve(res)
				}).catch(err=>{
					reject(err)
				})
			})
		},
		loadMore(){
			if(++this.page>this.total){
				this.$util.showToast('没有更多了！')
			}
			this.getList()
		}
	},
	onReachBottom() {
		if(++this.page>this.total){
			this.$util.showToast('没有更多了！')
		}
		this.getList()
	}
}