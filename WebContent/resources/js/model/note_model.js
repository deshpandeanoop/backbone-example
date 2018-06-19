"use strict";
define(
["backbone"],function()
{
    var NoteModel = Backbone.Model.extend({
      defaults:
      {
        creationTime:"",
        title:"",
        content:""
      },
      urlRoot:"http://localhost:8080/dailyjournal-services/notes",
    });

    var NoteCollection = Backbone.Collection.extend({
      url:"http://localhost:8080/dailyjournal-services/notes",
      model:NoteModel
    });
    window.APP = window.APP||{};
    APP.NoteModel = NoteModel;
    APP.NoteCollection = NoteCollection;

    return APP;
}
);
