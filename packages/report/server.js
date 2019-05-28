var objectql = require("@steedos/objectql");
var _ = require('underscore');
const graphqlHTTP = require('express-graphql');
var path = require('path');
var ReportRouter = require('./router');
var getBlankMrt = require('./index').getBlankMrt;

let stimulsoftAssets = path.join(path.dirname(require.resolve("@steedos/stimulsoft-report")), "assets");
let objectsDir = path.resolve('./objects')
let reportsDir = path.resolve('./reports')
objectql.getSteedosSchema().addDataSource('default', {
    driver: 'mongo',
    // url: 'mongodb://192.168.0.77/qhd-beta',
    url: 'mongodb://192.168.0.21/fssh20190329',
    objectFiles: [objectsDir],
    reportFiles: [reportsDir]
});
let express = require('express');
let app = express();
app.use(function (req, res, next) {
    //TODO 处理userId
    next();
})

_.each(objectql.getSteedosSchema().getDataSources(), function (datasource, name) {
    _.forEach(datasource.getReports(),(report) => {
        let mrt = getBlankMrt(report);
        console.log(mrt);
        // TODO:生成mrt文件
    });

    app.use(`/graphql/${name}`, graphqlHTTP({
        schema: datasource.buildGraphQLSchema(),
        graphiql: true
    }));
})
app
    .disable('x-powered-by')
    .use('/assets/stimulsoft-report/', express.static(stimulsoftAssets))
    .use('/api/report', ReportRouter.routes)

process.env.PORT = 3600;
app.listen(process.env.PORT || 3000)


