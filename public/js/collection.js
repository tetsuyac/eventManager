(function () {
  "use strict";
  console.log("Model & Collection Test");
  // ---
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
  console.log("Initial eventList.length: " + eventList.length);
  /**
   var event = eventList.create({content: "Acro1"}, {
    success: function() {
      console.log("After create eventList: " + JSON.stringify(eventList));
      console.log("After create eventList.length: " + eventList.length);
    }
  });
   */

  var event = new Event({content: "Acro2"}, {collection: eventList});
  event.save(null, {
    success: function () {
      console.log("After save eventList: " + JSON.stringify(eventList));
      console.log("After save eventList.length: " + eventList.length);
    }
  }).pipe(function () {
    return eventList.fetch({
      success: function () {
        console.log("After fetch eventList: " + JSON.stringify(eventList));
        console.log("After fetch eventList.length: " + eventList.length);
      }
    });
  }).pipe(function () {
    var tempMemo = eventList.find(function (item) {
      return item.get("content") === "Acro2";
    });
    return tempMemo.save({content: "Acro3"}, {
      success: function () {
        console.log("After save eventList: " + JSON.stringify(eventList));
        console.log("After save eventList.length: " + eventList.length);
      }
    });
  }).done(function () {
    var tempMemo = eventList.find(function (item) {
      return item.get("content") === "Acro3";
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
