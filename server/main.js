import { Meteor } from 'meteor/meteor';
import { TempCollection } from "../imports/db/TempCollection";
import Papa from "papaparse";

Meteor.startup(() => {
  const filename = "room-temperatures.csv";
  const csvText = Assets.getText(filename);
  const results = Papa.parse(csvText, { delimiter: ",", header: true }).data;
  
  for (const [key, value] of Object.entries(results)) {
    const timestamp = value.timestamp;
    const [currDate, currTime] = [
      timestamp.split("T")[0],
      timestamp.split("T")[1],
    ];
    const [currHour, currMin] = [
      currTime.split(":")[0],
      currTime.split(":")[1],
    ];
    const currRoom = value.RoomId;
    const currTemp = value.temperature;
    if (
      TempCollection.find({
        room: currRoom,
        date: currDate,
        "data.hour": currHour,
      }).count() != 0
    ) {
      // hour is found
      TempCollection.update(
        {
          room: currRoom,
          date: currDate,
          "data.hour": currHour,
        },
        {
          $addToSet: {
            "data.$.details": {
              min: currMin,
              temp: currTemp,
            },
          },
        }
      );
    } else if (
      TempCollection.find({ room: currRoom, date: currDate }).count() != 0
    ) {
      // date is found
      TempCollection.update(
        {
          room: currRoom,
          date: currDate,
        },
        {
          $addToSet: {
            data: {
              hour: currHour,
              details: [
                {
                  min: currMin,
                  temp: currTemp,
                },
              ],
            },
          },
        }
      );
    } else {
      TempCollection.insert({
        room: currRoom,
        date: currDate,
        data: [{ hour: currHour, details: [{ min: currMin, temp: currTemp }] }],
      });
    }
  }
});
