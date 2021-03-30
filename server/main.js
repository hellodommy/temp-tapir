import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links';
import Papa from "papaparse";

function insertLink({ title, url }) {
  LinksCollection.insert({title, url, createdAt: new Date()});
}

function organiseData(results) {
 let data = {};
 for (const [key, value] of Object.entries(results)) {
   const timestamp = value.timestamp;
   const [date, time] = [timestamp.split("T")[0], timestamp.split("T")[1]];
   const roomId = value.RoomId;
   const temp = value.temperature;
   if (!data.hasOwnProperty(date)) {
     // date not in
     data[date] = {};
     data[date][time] = {};
     data[date][time][roomId] = temp;
   } else {
     // date already inside
     if (!data[date].hasOwnProperty(time)) {
       // time not in
       data[date][time] = {};
       data[date][time][roomId] = temp;
     } else {
       data[date][time][roomId] = temp;
     }
   }
 }
 return data;
}

Meteor.startup(() => {
  const filename = "room-temperatures.csv";
  const csvText = Assets.getText(filename);
  const results = Papa.parse(csvText, { delimiter: ",", header: true }).data;
  const data = organiseData(results);
});


Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (LinksCollection.find().count() === 0) {
    insertLink({
      title: 'Do the Tutorial',
      url: 'https://www.meteor.com/tutorials/react/creating-an-app'
    });

    insertLink({
      title: 'Follow the Guide',
      url: 'http://guide.meteor.com'
    });

    insertLink({
      title: 'Read the Docs',
      url: 'https://docs.meteor.com'
    });

    insertLink({
      title: 'Discussions',
      url: 'https://forums.meteor.com'
    });
  }
});
