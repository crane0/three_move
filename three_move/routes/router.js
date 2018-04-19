var express = require('express');
var router = express.Router();

//三级联动
//注册省级路由
var chinaArea = require('../China_area');
router.get('/getProvinces',function (req,res) {
    //要获取全部省级数据，所以不需要参数做选择
    //因为自己定义的接口文档，传递的必须是json对象的形式。
    var obj = {
        provinces : chinaArea.provinces
    }
    res.send(obj)
})
//注册市级路由
router.get('/getCities',function (req,res) {
    //根据ID获取对应省的所有市
    var provinceId = req.query.provinceId

    var newCites = []
    chinaArea.cities.forEach(function (city,index) {

        //每个城市的 parent和对应的省级的 id是相同的
        //city.id === provinceId说明是直辖市
        if(city.parent === provinceId || city.id === provinceId){
            newCites.push(city)
        }
    })
    //因为自己定义的接口文档，传递的必须是json对象的形式。
    var obj = {
        //newCites中的元素都是对象（每一个市）
        cities : newCites
    }
    res.send(obj)
})

//注册区级路由
router.get('/getCounties',function (req,res) {
    //根据ID获取对应市的所有区
    var cityId = req.query.cityId

    var newCounties = []
    chinaArea.counties.forEach(function (county,index) {
        //每个区的 parent和对应的市级的 id是相同的
        if(county.parent === cityId){
            newCounties.push(county)
        }
    })
    //因为自己定义的接口文档，传递的必须是json对象的形式。
    var obj = {
        counties : newCounties
    }
    res.send(obj)
})

module.exports =router;