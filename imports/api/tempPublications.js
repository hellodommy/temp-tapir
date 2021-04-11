import { Meteor } from "meteor/meteor";
import { TempCollection } from "../db/TempCollection";

Meteor.publish("temps", function publishTasks() {
  return TempCollection.find();
});
