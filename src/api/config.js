//开发环境
// export const HOST = 'http://192.168.1.24:8180/regulator/'

//生产环境
export const HOST = 'http://api.chinaeid.cn/'

// export let HOST = ''
// if(process.env.NODE_ENV === 'production'){
//   HOST = 'http://192.168.1.24:8180/regulator/'
// }else{
//   HOST = 'http://api.chinaeid.cn/'
// }

//质量热点类
export class NewsInit{
  constructor(){
    this.id = ""                          //编号
    this.title = ""                       //标题
    this.type = ""                        //分类编号
    this.typeName = ""                    //分类名称
    this.platform = ""                    //发布平台
    this.publishTime = ""                 //发布时间
    this.createTime = ""                  //生成时间
    this.thumbnail = ""                   //缩略图
    this.content = ""                     //内容
    this.category = ""                    //流行程度分类
    this.is = 0                           //是否删除
  }
}

//质量曝光类
export class ExposureInit{
  constructor(){
    this.id = 0                           //编号
    this.companyName = ""                 //企业名称
    this.location = ""                    //企业名称
    this.productName = ""                 //产品名称
    this.brand = ""                       //商标
    this.productClass1 = ""               //所属行业编号
    this.productClass1Name = ""           //所属行业名
    this.productClass2 = ""               //细分行业编号
    this.productClass2Name = ""           //细分行业名
    this.model = ""                       //规格型号
    this.batch = ""                       //生产日期/批号
    this.result = ""                      //抽查结果
    this.reason = ""                      //不合格项目
    this.accreditationBody = ""           //承建机构
    this.createTIme = ""                  //生产时间
    this.is = 0                           //是否删除
  }
}

//质量投诉类
export class ComplainInit{
  constructor(){
    this.id = ""                          //编号
    this.title = ""                       //投诉标题
    this.category = ""                    //隶属栏目编号
    this.categoryName = ""                //隶属栏目名
    this.name = ""                        //姓名
    this.sex = 0                          //性别
    this.phone = ""                       //联系电话
    this.idcard = ""                      //身份证
    this.email = ""                       //电子邮箱
    this.address = ""                     //地区
    this.type = ""                        //投诉类型
    this.evidenceImg = []                 //相关证据
    this.productBrand = ""                //产品品牌
    this.productDetail = ""               //投诉品牌
    this.payPrice = ""                    //购买价格
    this.payTime = ""                     //购买时间
    this.company = ""                     //生产厂家
    this.companyPhone = ""                //厂家电话
    this.request = ""                     //投诉内容
    this.expect = ""                      //期望结果
    this.response = ""                    //投诉回复
    this.createTime = ""                  //生成时间
    this.is = 0                           //是否删除
  }
}

//分页对象
export class PageInit{
  constructor(){
    this.current = 1,
    this.size = 10,
    this.sizes = [10, 20, 30, 40],
    this.total = 0
  }
}

//新闻发布平台
export const platforms = [
  {'id': 0, 'name': '全部' },
  {'id': 1, 'name': '信用轻工' },
  {'id': 2, 'name': '轻工追溯' },
  {'id': 3, 'name': '星数追溯' },
]

//新闻推荐
export const newsCategories = [
  {'id': 0, 'name': '全部' },
  {'id': 1, 'name': '推荐' },
  // {'id': 2, 'name': '热文' },
]

//新闻类型
// export const newsTypes = [
//   {'id': 0, "name": '全部'},
//   {'id': 1, "name": '食品'},
//   {'id': 2, "name": '文玩'},
//   {'id': 3, "name": '服饰'},
//   {'id': 4, "name": '日用品'},
//   {'id': 5, "name": '小商品'}
// ]
export const newsTypes = [
  {'id': 0, "name": '全部'},
  {'id': 1, "name": '电器'},
  {'id': 2, "name": '汽车'},
  {'id': 3, "name": '建材'},
  {'id': 4, "name": '数码'},
  {'id': 5, "name": '食品'},
  {'id': 6, "name": '医疗'},
  {'id': 7, "name": '其他'}
]

//新闻tab标签切换内容
// export const newsTabs = [
//   {'id': 0, "name": '推荐'},
//   {'id': 1, "name": '食品'},
//   {'id': 2, "name": '文玩'},
//   {'id': 3, "name": '服饰'},
//   {'id': 4, "name": '日用品'},
//   {'id': 5, "name": '小商品'}
// ]
export const newsTabs = [
  {'id': 0, "name": '推荐'},
  {'id': 1, "name": '电器'},
  {'id': 2, "name": '汽车'},
  {'id': 3, "name": '建材'},
  {'id': 4, "name": '数码'},
  {'id': 5, "name": '食品'},
  {'id': 7, "name": '医疗'},
  {'id': 8, "name": '其他'}
]


//投诉类型
export const complainType = [
  {'id': 1, 'name': '产品质量问题'},
  {'id': 2, 'name': '产品价格问题'},
  {'id': 3, 'name': '售后维修费用'},
  {'id': 4, 'name': '其他投诉类型'}
]

// //搜索新闻推荐
// export const newsRecommend = [
//   {"id": 0, "name": "三星note7爆炸门"},
//   {"id": 1, "name": "苏丹红事件"},
//   {"id": 2, "name": "苹果电池爆炸门"},
//   {"id": 3, "name": "三聚氰胺再度来袭"},
//   {"id": 4, "name": "江南皮革厂"},
// ]
