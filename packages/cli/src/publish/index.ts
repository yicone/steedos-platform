import { Login } from "./login";
const _ = require("underscore");
const path = require("path");
const clone = require("clone");
const rp = require('request-promise');

var objectqlPath = require.resolve('@steedos/objectql', {paths: [process.cwd()]});
var objectql = require(objectqlPath);

export class Publish {
    static async run(username, password, spaceId) {
        //TODO： 支持缓存
        let user = await Login(username, password)
        if(!user){
            console.log('Login failed')
            return
        }

        let publishData = this.getPublishData()

        await this.callPublishAPI(publishData, spaceId, user.authToken)
    }

    static getPublishData(){
        let objects = this.getObjects();
        let listViews = this.getObjectsListViews(objects);
        let data = {
            list_views: listViews
        }
        return data;
    }

    static async callPublishAPI(data, spaceId, token){
        var options = {
            uri: 'http://127.0.0.1:5001/publish',
            json: true,
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'X-Space-Id': spaceId
            },
            body: data
        };
        let result = await rp(options).catch(function(reason){console.log(reason)});
        return result;
    }

    static getObjectsListViews(objects){
        let listViews: Array<any> = []

        _.each(objects,(object, object_name)=>{
            _.each(object.list_views, (listView, viewName)=>{
                let _listView = clone(listView);
                _listView.object_name = object_name
                _listView.name = viewName
                listViews.push(_listView)
            })
        })

        return listViews;
    }

    static getObjects(){
        let objects = {}
       

        let standardObjectsDir = path.dirname(require.resolve('@steedos/standard-objects', {paths: [process.cwd()]}))
        if (standardObjectsDir) {
            objects = _.extend(objects, this.getObjectsFromPath(standardObjectsDir))
        }

        let steedosConfig = objectql.getSteedosConfig() || {}

        let datasourcesConfig = steedosConfig.datasources

        if(!datasourcesConfig){
            return ;
        }

        let defaultPaths = ["./src/**"];

        //如果有多个数据源， 不默认加载src下定义的object，app文件
        if (_.keys(steedosConfig.datasources).length > 1) {
            defaultPaths = []
        }

        if (datasourcesConfig && datasourcesConfig.default) {
            let objectFilesPath = datasourcesConfig.default.objectFiles || defaultPaths
            _.each(objectFilesPath, (objectFilePath) => {
                objects = _.extend(objects, this.getObjectsFromPath(objectFilePath))
            })
        }

        return objects;
    }

    private static getObjectsFromPath(filePath: string) {
        let Objects = {}
        if (!path.isAbsolute(filePath)) {
            filePath = path.resolve(objectql.getBaseDirectory(), filePath);
        }
        let objects = objectql.loadObjectFiles(filePath)
        _.each(objects, (object) => {
            if (object.name != 'core') {
                Objects[object.name] = object
            }
        })
        return Objects;
    }
}