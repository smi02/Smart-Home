import mqtt from 'mqtt';
import { Temp } from '../models/Temp.js';
import { MQTT_BROKER_HOST, MQTT_BROKER_PORT, MQTT_BROKER_PROTOCOL, MQTT_PASSWORD, MQTT_USERNAME } from '../config.js';



const options = {
  host: MQTT_BROKER_HOST,
  port: MQTT_BROKER_PORT,
  protocol: MQTT_BROKER_PROTOCOL,
  username: MQTT_USERNAME,
  password: MQTT_PASSWORD,
};
export const client = mqtt.connect(options);

export const connect = async () => {
  // console.log(topics[1]);
  try {

    client.on("error", function (error) {
      console.log(error);
    });
    // Sự kiện khi kết nối thành công
    client.on("connect", () => {
      console.log("Đã kết nối thành công đến MQTT Broker");
    });
    client.on("close", () => {
      console.log("Kết nối đã đóng");
    });
    client.subscribe('messages');
    client.subscribe('SmartHome/temperature');
    client.subscribe('SmartHome/humidity');
    client.publish('messages', 'Hello, this message was received!');
    client.on("message", async (topicdevice, message) => {

      if (topicdevice == 'SmartHome/temperature') {
        const temp = await Temp.findOne({ topictemp: topicdevice })
        temp.statustemp = message;
        if (message > 0 && message < 10) {
          temp.notificationtemp = "Very cold";
        } else if (message >= 10 && message < 17) {
          temp.notificationtemp = "Cold";
        } else if (message >= 17 && message < 23) {
          temp.notificationtemp = "Cool";
        } else if (message >= 23 && message < 27) {
          temp.notificationtemp = "Pleasant";
        } else if (message >= 27 && message < 31) {
          temp.notificationtemp = "Warm";
        } else if (message >= 31 && message < 35) {
          temp.notificationtemp = "Hot";
        } else if (message >= 35 && message < 40) {
          temp.notificationtemp = "Very hot";
        } else if (message >= 40) {
          temp.notificationtemp = "Extremely hot";
        } else {
          temp.notificationtemp = "Input data is corrupted";
        }
        await temp.save();
        return console.log(`Temp update successfully "${topicdevice}": ${message}`);
      }

      if (topicdevice == 'SmartHome/humidity') {
        const temp = await Temp.findOne({ topichumi: topicdevice })
        temp.statushumi = message;
        if (message > 0 && message < 30) {
          temp.notificationhumi = "Very dry";
        } else if (message >= 30 && message < 41) {
          temp.notificationhumi = "Dry";
        } else if (message >= 41 && message < 51) {
          temp.notificationhumi = "Slightly dry";
        } else if (message >= 51 && message < 61) {
          temp.notificationhumi = "Comfortable";
        } else if (message >= 61 && message < 71) {
          temp.notificationhumi = "Slightly humid";
        } else if (message >= 71 && message < 81) {
          temp.notificationhumi = "Humid";
        } else if (message >= 81) {
          temp.notificationhumi = "Very humid";
        } else {
          temp.notificationhumi = "Input data is corrupted";
        }
        await temp.save();
        return console.log(`Temp update successfully "${topicdevice}": ${message}`);
      }

      if (topicdevice == "messages" || topicdevice == "123") {
        return console.log(`Received message from topic "${topicdevice}": ${message}`);
      }
      // check if user exists
      //   const temp = await Temp.findOne({ topicdevice })
      //   try {
      //     temp.statusdevice = message;
      //     await temp.save();
      //     if (!temp) {
      //         return console.log("error");
      //     }
      //     return console.log(`Device update successfully "${topicdevice}": ${message}`);
      // } catch (error) {
      //     console.log(error.message);
      // }
    });
  } catch (err) {
    console.log(err);
  }
};


