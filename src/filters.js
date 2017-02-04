export default{
  /**
   * 新闻类型
   * @param  {[number]} type [数字]
   * @return {[string]}      [字符串]
   */
  newsTypeFormat(type){
    let str = ""
    switch (type) {
      case 0:
        str = '全部'
        break;
      case 1:
        str = '电器'
        break;
      case 2:
        str = '汽车'
        break;
      case 3:
        str = '建材'
        break;
      case 4:
        str = '数码'
        break;
      case 5:
        str = '食品'
        break;
      case 6:
        str = '医疗'
        break;
      case 7:
        str = '其他'
        break;
      default:
        str = ''
        break;
    }
    return str
  },
  /**
   * 新闻平台
   * @param  {[number]} platform [数字]
   * @return {[string]}          [字符串]
   */
  newsPlatformFormat(platform){
    let str = ''
    switch (platform) {
      case 0:
        str = '全部'
        break;
      case 1:
        str = '信用轻工'
        break;
      case 2:
        str = '轻工追溯'
        break;
      case 3:
        str = '星数追溯'
        break;
      default:
        str = ''
        break;
    }
    return str
  },
  /**
   * 新闻流行程度
   * @param  {[number]} category [数字]
   * @return {[string]}          [字符串]
   */
  newsCategoryFormat(category){
    let str = ''
    switch (category) {
      case 0:
        str = '全部'
        break;
      case 1:
        str = '推荐'
        break;
      default:
        str =''
        break;
    }
    return str
  },
  /**
   * 性别
   * @param  {[number]} sex [数字]
   * @return {[string]}     [字符串]
   */
  sexFormat(sex){
    let str = ""
    switch (sex) {
      case 0:
        str = '男'
        break;
      case 1:
        str = '女'
        break;
      default:
        str = ''
        break;
    }
    return str
  },
  /**
   * 投诉类型
   * @param  {[number]} type [数字]
   * @return {[string]}      [字符串]
   */
  complainTypeFormat(type){
    let str = ""
    switch (type) {
      case 1:
        str = '产品质量问题'
        break;
      case 2:
        str = '产品价格问题'
        break;
      case 3:
        str = '售后维修费用'
        break;
      default:
        str = '其他投诉类型'
        break;
    }
    return str
  }
}
