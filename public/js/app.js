(function () {
  "use strict";
  console.log("Hello Backbone!");
  // --- Model
  var obj = new Backbone.Model();
  obj.set({name: "Murata"});
  obj.set({age: 20});
  console.log("obj: " + JSON.stringify(obj));
  console.log("obj.name: " + obj.get("name"));
  //
  var obj2 = new Backbone.Model({name: "Kenichiro", age: 30});
  console.log("obj2: " + JSON.stringify(obj2));
  console.log("obj2.name: " + obj2.get("name"));
  //
  var Staff = Backbone.Model.extend({
    defaults:   {
      "name":       "",
      "age":        0,
      "updateTime": new Date()
    },
    initialize: function () {
      console.log("Staff[" + this.cid + "]: " + JSON.stringify(this));
    }
  });
  var tmpStaff = new Staff();
  tmpStaff.set({name: "Murata", age: 15, id: 101});
  console.log("Staff[" + tmpStaff.cid + "]: " + JSON.stringify(tmpStaff));
  var tmpStaff2 = new Staff({name: "Kenichiro", age: 35, id: 102});
  // --- Collection
  var objs = new Backbone.Collection([obj, obj2]);
  console.log("objs: " + JSON.stringify(objs));
  console.log("objs.get(cid): " + JSON.stringify(objs.get("c1")));
  console.log("objs.at(index): " + JSON.stringify(objs.at(0)));
  // add
  objs.add(new Backbone.Model({name: "Acroquest", age: 20}));
  objs.add(new Backbone.Model({name: "Technology", age: 10}));
  // length
  console.log("objs.length: " + objs.length);
  console.log("objs: " + JSON.stringify(objs));
  // sort and comparator
  objs.comparator = function (item) {
    return item.get("age");
  };
  objs.sort();
  console.log("After sort objs: " + JSON.stringify(objs));
  console.log("After sort objs.at(index): " + JSON.stringify(objs.at(0)));
  // each
  objs.each(function (item, index) {
    console.log("each(" + index + "): " + JSON.stringify(item));
  });
  // find
  var tmpObj = objs.find(function (item) {
    return item.get("age") === 20;
  });
  console.log("find result: " + JSON.stringify(tmpObj));
  // filter
  tmpObj = objs.filter(function (item) {
    return item.get("age") === 20;
  });
  console.log("filter result: " + JSON.stringify(tmpObj));
  // where
  tmpObj = objs.where({age: 20});
  console.log("where result: " + JSON.stringify(tmpObj));
  // max
  tmpObj = objs.max(function (item) {
    return item.get("age");
  });
  console.log("max result: " + JSON.stringify(tmpObj));
  // map
  tmpObj = objs.map(function (item) {
    return item.get("age") + 1;
  });
  console.log("map result: " + JSON.stringify(tmpObj));
  // reduce
  tmpObj = objs.reduce(function (event, item) {
    return event + item.get("age");
  }, 0);
  console.log("reduce result: " + JSON.stringify(tmpObj));
  // pluck
  console.log("pluck result: " + JSON.stringify(objs.pluck("name")));
  // remove
  objs.remove(obj2);
  console.log("objs.length: " + objs.length);
  console.log("objs: " + JSON.stringify(objs));
  //
  var Staffs = Backbone.Collection.extend({
    model: Staff
  });
  var staffs = new Staffs([tmpStaff, tmpStaff2]);
  console.log("staffs: " + JSON.stringify(staffs));
  console.log("staffs.get(cid): " + JSON.stringify(staffs.get("c4")));
  console.log("staffs.at(index): " + JSON.stringify(staffs.at(1)));
  console.log("staffs.get(id): " + JSON.stringify(staffs.get(102)));
}());
