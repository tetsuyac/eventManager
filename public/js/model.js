(function () {
  "use strict";
  console.log("Model Test");
  // ---
  var Event = Backbone.Model.extend({
    urlRoot:     "http://localhost:3000/event",
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
  var event = new Event();
  console.log("Before save: " + JSON.stringify(event));
  console.log("isNew(): " + event.isNew());
  event.save({content: "Acroquest"}, {
    success: function () {
      console.log("After save(post) event: " + JSON.stringify(event));
      console.log("After save(post) event.isNew(): " + event.isNew());
    }
  }).pipe(function () {
    event.set({content: "Acro"});
    console.log("Befroe fetch event: " + JSON.stringify(event));
    return event.fetch({
      success: function () {
        console.log("After fecth event: " + JSON.stringify(event));
      }
    });
  }).pipe(function () {
    console.log("Befroe save(put) event: " + JSON.stringify(event));
    return event.save({content: "Acroquest Technology"}, {
      success: function () {
        console.log("After save(put) event: " + JSON.stringify(event));
      }
    });
  }).done(function () {
    console.log("Before delete event: " + JSON.stringify(event));
    return event.destroy({
      success: function () {
        console.log("After delete event: " + JSON.stringify(event));
      }
    });
  });
  console.log("After save: " + JSON.stringify(event));
  console.log("isNew(): " + event.isNew());
}());
