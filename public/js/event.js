(function () {
  "use strict";
  console.log("Events Test");
  var Event = Backbone.Model.extend({
    idAttribute: "_id",
    defaults:    {
      "content": ""
    },
    validate:    function (attributes) {
      if (attributes.content === "") {
        return "content must be not empty.";
      }
    }
  });
  var EventList = Backbone.Collection.extend({
    model: Event,
    url:   "/event"
  });
  var eventList = new EventList();
  var observer = {
    showArguments: function () {
      console.log("+++observer.showArguments: ");
      _.each(arguments, function (item, index) {
        console.log("  +++arguments[" + index + "]: " + JSON.stringify(item));
      });
    }
  };
  _.extend(observer, Backbone.Events);
  observer.listenTo(eventList, "all", observer.showArguments);
  var event = new Event({content: "Acroquest"});
  console.log("add");
  eventList.add(event);
  console.log("change");
  event.set({content: "Acroquest Technology"});
  console.log("remove");
  eventList.remove(event);
  console.log("reset");
  eventList.add([new Event({content: "Acro1"}), new Event({content: "Acro2"}), new Event({content: "Acro3"})]);
  console.log("Before reset: " + JSON.stringify(eventList));
  eventList.reset([new Event({content: "Acro"}), new Event({content: "Technology"}), new Event({content: "Acroquest"})]);
  console.log("After reset: " + JSON.stringify(eventList));
  console.log("sort");
  eventList.comparator = function (item) {
    return item.get("content");
  };
  eventList.sort();
  console.log("After sort: " + JSON.stringify(eventList));
  observer.stopListening();
  // ----
  eventList = new EventList();
  observer.listenTo(eventList, "all", observer.showArguments);
  console.log("request, sync");
  event = new Event({content: "Murata"}, {collection: eventList});
  console.log("create");
  event.save(null, {
    success: function () {
      console.log("After create eventList: " + JSON.stringify(eventList));
      console.log("After create eventList.length: " + eventList.length);
    }
  }).pipe(function () {
    console.log("fetch");
    return eventList.fetch({
      success: function () {
        console.log("After fetch eventList: " + JSON.stringify(eventList));
        console.log("After fetch eventList.length: " + eventList.length);
      },
      reset:   true
    });
  }).pipe(function () {
    var tempMemo = eventList.find(function (item) {
      return item.get("content") === "Murata";
    });
    console.log("invalid");
    tempMemo.save({content: ""});
    console.log("invalid wait:true");
    tempMemo.save({content: ""}, {wait: true});
    console.log("re-save");
    return tempMemo.save({content: "Kenichiro"}, {
      success: function () {
        console.log("After save eventList: " + JSON.stringify(eventList));
        console.log("After save eventList.length: " + eventList.length);
      }
    });
  }).done(function () {
    console.log("destroy");
    var tempMemo = eventList.find(function (item) {
      return item.get("content") === "Kenichiro";
    });
    return tempMemo.destroy({
      success: function () {
        console.log("After destroy eventList: " + JSON.stringify(eventList));
        console.log("After destroy eventList.length: " + eventList.length);
      }
    });
  });
  eventList.add(event);
  console.log("After add event: " + JSON.stringify(event));
  console.log("After add eventList.length: " + eventList.length);
}());
