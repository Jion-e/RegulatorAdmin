import { HOST } from './config'

const basePath = `${HOST}`
console.log(basePath);

export default {
  login({name, password}){
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'GET',
        url: `${HOST}login/admin`,
        data: {
          username: name,
          passwd: password
        }
      }).done(data => {
        resolve(data)
      }).fail(() => {
        reject('登录异常')
      })
    })
  },
  createCode(){
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'GET',
        url: `${HOST}common/verification/image`,
      }).done(data => {
        resolve(data)
      }).fail(() => {
        reject('获取验证码失败')
      })
    })
  },
  /******************** 热点新闻 *****************/
  fetchNews(id){
    return new Promise((resolve, reject) => {
      $.ajax({
          type: 'GET',
          url: `${basePath}focus/get/${id}`,
          dataType:'json'
        }).done(data => {
          resolve(data)
        }).fail(() => {
          reject('获取热点新闻详情失败')
        })
    })
  },
  fetchNewsList(current, size){
    return new Promise((resolve, reject) => {
      $.ajax({
          type: 'GET',
          url: `${basePath}focus/get/type`,
          // url: '/api/focus/get/type',
          data:{
            current: current,
            size: size,
            type: 0
          },
          dataType:'json'
        }).done(data => {
          resolve(data)
        }).fail(() => {
          reject('获取热点新闻列表失败')
        })
    })
  },
  fetchNewsListByKeyword(current, size, keyword){
    return new Promise((resolve, reject) => {
      $.ajax({
          type: 'GET',
          url: `${basePath}focus/get/key`,
          data:{
            current: current,
            size: size,
            keyword: keyword
          },
          dataType:'json'
        }).done(data => {
          resolve(data)
        }).fail(() => {
          reject('获取热点新闻列表失败')
        })
    })
  },
  fetchNewsListByType(current, size, type){
    return new Promise((resolve, reject) => {
      $.ajax({
          type: 'GET',
          url: `${basePath}focus/get/type`,
          data:{
            current: current,
            size: size,
            type: type
          },
          dataType:'json'
        }).done(data => {
          resolve(data)
        }).fail(() => {
          reject('获取热点新闻列表失败')
        })
    })
  },
  fetchNewsListByCategory(current, size, category){
    return new Promise((resolve, reject) => {
      $.ajax({
          type: 'GET',
          url: `${basePath}focus/get/category`,
          data:{
            current: current,
            size: size,
            category: category
          },
          dataType:'json'
        }).done(data => {
          resolve(data)
        }).fail(() => {
          reject('获取热点新闻列表失败')
        })
    })
  },
  saveNews(news){
    return new Promise((resolve, reject) => {
      $.ajax({
          type: 'POST',
          data: JSON.stringify(news),
          headers : {'Content-Type': 'application/json;charset=utf-8'},
          url: `${basePath}focus/save`,
        }).done(data => {
          if(data === 1){
            resolve('保存成功')
          }else{
            resolve('保存失败')
          }
        }).fail(() => {
          reject('操作异常')
        })
    })
  },
  updateNews(news){
    return new Promise((resolve, reject) => {
      $.ajax({
          type: 'PUT',
          data: JSON.stringify(news),
          headers : {'Content-Type': 'application/json;charset=utf-8'},
          url: `${basePath}focus/update`,
        }).done(data => {
          if(data === 1){
            resolve('更新成功')
          }else{
            resolve('更新失败')
          }
        }).fail(() => {
          reject('操作异常')
        })
    })
  },
  deleteNews(id){
    return new Promise((resolve, reject) => {
      $.ajax({
          type: 'DELETE',
          url: `${basePath}focus/delete/${id}`,
        }).done(data => {
          if(data){
            resolve('删除成功')
          }else{
            resolve('删除失败')
          }
        }).fail(() => {
          reject('操作异常')
        })
    })
  },
  /******************** 质量曝光 *****************/
  fetchExposureList(current, size){
    return new Promise((resolve, reject) => {
      $.ajax({
          type: 'GET',
          url: `${basePath}exposure/get/type`,
          data:{
            current: current,
            size: size,
            productClass1: 0,
            productClass2: 0
          },
          dataType:'json'
        }).done(data => {
          resolve(data)
        }).fail(() => {
          reject('获取质量曝光列表失败')
        })
    })
  },
  fetchExposureListByKeyword(current, size, keyword){
    return new Promise((resolve, reject) => {
      $.ajax({
          type: 'GET',
          url: `${basePath}exposure/get/key`,
          data:{
            current: current,
            size: size,
            keyword: keyword
          },
          dataType:'json'
        }).done(data => {
          resolve(data)
        }).fail(() => {
          reject('获取质量曝光列表失败')
        })
    })
  },
  fetchExposureListByProductClass(current, size, productClass1, productClass2){
    return new Promise((resolve, reject) => {
      $.ajax({
          type: 'GET',
          url: `${basePath}exposure/get/type`,
          data:{
            current: current,
            size: size,
            productClass1: productClass1,
            productClass2: productClass2
          },
          dataType:'json'
        }).done(data => {
          resolve(data)
        }).fail(() => {
          reject('获取质量曝光列表失败')
        })
    })
  },
  saveExposure(exposureList){
    return new Promise((resolve, reject) => {
      $.ajax({
          type: 'POST',
          url: `${basePath}exposure/save/excel`,
          headers : {'Content-Type': 'application/json;charset=utf-8'},
          data: JSON.stringify(exposureList)
        }).done(data => {
          if(typeof data === 'number'){
            resolve('保存成功')
          }else{
            resolve('保存失败')
          }
        }).fail(() => {
          reject('操作异常')
        })
    })
  },
  updateExposure(exposure){
    return new Promise((resolve, reject) => {
      $.ajax({
          type: 'PUT',
          url: `${basePath}exposure/update`,
          data: JSON.stringify(exposure),
          headers : {'Content-Type': 'application/json;charset=utf-8'},
        }).done(data => {
          if(data === 1){
            resolve('更新成功')
          }else{
            resolve('更新失败')
          }
        }).fail(() => {
          reject('操作异常')
        })
    })
  },
  deleteExposure(id){
    return new Promise((resolve, reject) => {
      $.ajax({
          type: 'DELETE',
          url: `${basePath}exposure/delete/${id}`,
        }).done(data => {
          if(data === 1){
            resolve('删除成功')
          }else{
            resolve('删除失败')
          }
        }).fail(() => {
          reject('操作异常')
        })
    })
  },
  /******************** 质量投诉 *****************/
  fetchComplainList(current, size){
    return new Promise((resolve, reject) => {
      $.ajax({
          typo: 'POST',
          data: {
            current: current,
            size: size,
            category: 0
          },
          url: `${basePath}complaints/get/category`,
          dataType:'json'
        }).done(data => {
          resolve(data)
        }).fail(err => reject('获取质量投诉列表失败'))
    })
  },
  fetchComplainListByKeyword(current, size, keyword){
    return new Promise((resolve, reject) => {
      $.ajax({
          typo: 'POST',
          data: {
            current: current,
            size: size,
            keyword: keyword
          },
          url: `${basePath}complaints/get/keyword`,
          dataType:'json'
        }).done(data => {
          resolve(data)
        }).fail(err => reject('获取质量投诉列表失败'))
    })
  },
  fetchComplainListByCategory(current, size, category){
    return new Promise((resolve, reject) => {
      $.ajax({
          typo: 'POST',
          data: {
            current: current,
            size: size,
            category: category
          },
          url: `${basePath}complaints/get/category`,
          dataType:'json'
        }).done(data => {
          resolve(data)
        }).fail(err => reject('获取质量投诉列表失败'))
    })
  },
  fetchComplainListByType(current, size, type){
    return new Promise((resolve, reject) => {
      $.ajax({
          typo: 'POST',
          data: {
            current: current,
            size: size,
            type: type
          },
          url: `${basePath}complaints/get/type`,
          dataType:'json'
        }).done(data => {
          resolve(data)
        }).fail(err => reject('获取质量投诉列表失败'))
    })
  },
  updateComplain(complain){
    return new Promise((resolve, reject) => {
      $.ajax({
          type: 'PUT',
          data: JSON.stringify(complain),
          headers : {'Content-Type': 'application/json;charset=utf-8'},
          url: `${basePath}complaints/update`,
        }).done(data => {
          if(data === 1){
            resolve('修改成功')
          }else{
            resolve('修改失败')
          }
        }).fail(() => {
          reject('操作异常')
        })
    })
  },
  deleteComplain(id){
    return new Promise((resolve, reject) => {
      $.ajax({
          type: 'DELETE',
          url: `${basePath}complaints/delete/${id}`,
        }).done(data => {
          if(data === 1){
            resolve('删除成功')
          }else{
            resolve('删除失败')
          }
        }).fail(() => {
          reject('操作异常')
        })
    })
  }
}
