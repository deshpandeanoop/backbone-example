"use strict";
require.config(
  {
      paths:
      {
        underscore:"../libs/underscore-min",
        backbone:"../libs/backbone-min",
        jquery:"../libs/jquery-3.3.1.min",
        note_model:"../model/note_model",
        note_router:"../router/note_router",
        note_index:"../view/note_index",
        note_create:"../view/note_create"
      }
      ,
      shim:
      {
        underscore:
        {exports:"_"
      },
      jquery:
      {
        exports:"$"
      },
      backbone:
      {
        deps:["jquery","underscore"],
        exports:"Backbone"
      }
      }
  }
);

require(
["underscore","backbone","note_router","note_create","jquery"],function()
{
  window.appRouter = new APP.NoteRouter();
}
);

