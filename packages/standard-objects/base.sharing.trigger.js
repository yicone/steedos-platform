module.exports = {

    name: 'baseSharingTrigger',

    listenTo: 'base',

    afterInsert: async function () {
        
        var collection, obj, object_name, psCollection, psRecords, selector;
        object_name = this.object_name;

        var doc = await this.getObject(object_name).findOne(this.id)

        console.log('afterInsert doc', doc)

        obj = Creator.getObject(object_name);
        if (obj.enable_share) {
            collection = Creator.getCollection(object_name);
            psCollection = Creator.getCollection("permission_shares");
            selector = {
                space: doc.space,
                object_name: object_name
            };
            psRecords = psCollection.find(selector, {
                fields: {
                    _id: 1,
                    filters: 1,
                    organizations: 1,
                    users: 1
                }
            });
            return psRecords.forEach(function (ps) {
                var count, filters, push;
                filters = Creator.formatFiltersToMongo(ps.filters, {
                    extend: false
                });
                selector = {
                    space: doc.space,
                    _id: doc._id,
                    $and: filters
                };
                count = collection.find(selector).count();
                if (count) {
                    push = {
                        sharing: {
                            "u": ps.users,
                            "o": ps.organizations,
                            "r": ps._id
                        }
                    };
                    return collection.direct.update({
                        _id: doc._id
                    }, {
                            $push: push
                        });
                }
            });
        }
    },

    afterUpdate: async function () {
        var collection, obj, object_name, psCollection, psRecords, selector;
        object_name = this.object_name;
        var doc = await this.getObject(object_name).findOne(this.id)
        console.log('afterUpdate doc', doc)
        obj = Creator.getObject(object_name);
        if (obj.enable_share) {
            collection = Creator.getCollection(object_name);
            psCollection = Creator.getCollection("permission_shares");
            selector = {
                space: doc.space,
                object_name: object_name
            };
            psRecords = psCollection.find(selector, {
                fields: {
                    _id: 1,
                    filters: 1,
                    organizations: 1,
                    users: 1
                }
            });
            collection.direct.update({
                _id: doc._id
            }, {
                    $unset: {
                        "sharing": 1
                    }
                });
            return psRecords.forEach(function (ps) {
                var count, filters, push;
                filters = Creator.formatFiltersToMongo(ps.filters, {
                    extend: false
                });
                selector = {
                    space: doc.space,
                    _id: doc._id,
                    $and: filters
                };
                count = collection.find(selector).count();
                if (count) {
                    push = {
                        sharing: {
                            "u": ps.users,
                            "o": ps.organizations,
                            "r": ps._id
                        }
                    };
                    return collection.direct.update({
                        _id: doc._id
                    }, {
                            $push: push
                        });
                }
            });
        }
    },

}