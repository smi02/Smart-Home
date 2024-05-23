import dotenv from 'dotenv';
import mqtt from 'mqtt';
import { Temp } from '../models/Temp.js';

dotenv.config();

const MQTT_BROKER_HOST = process.env.MQTT_BROKER_HOST;
const MQTT_BROKER_PORT = process.env.MQTT_BROKER_PORT;
const MQTT_BROKER_PROTOCOL = process.env.MQTT_BROKER_PROTOCOL;
const MQTT_USERNAME = process.env.MQTT_USERNAME;
const MQTT_PASSWORD = process.env.MQTT_PASSWORD;

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
        const temp = await Temp.findOne({ topicdevice })
        temp.statusdevice = message;
        if (message > 0 && message < 10) {
          temp.notificationdevice = "Very cold";
        } else if (message >= 10 && message < 17) {
          temp.notificationdevice = "Cold";
        } else if (message >= 17 && message < 23) {
          temp.notificationdevice = "Cool";
        } else if (message >= 23 && message < 27) {
          temp.notificationdevice = "Pleasant";
        } else if (message >= 27 && message < 31) {
          temp.notificationdevice = "Warm";
        } else if (message >= 31 && message < 35) {
          temp.notificationdevice = "Hot";
        } else if (message >= 35 && message < 40) {
          temp.notificationdevice = "Very hot";
        } else if (message >= 40) {
          temp.notificationdevice = "Extremely hot";
        } else {
          temp.notificationdevice = "Input data is corrupted";
        }
        await temp.save();
        return console.log(`Temp update successfully "${topicdevice}": ${message}`);
      }

      if (topicdevice == 'SmartHome/humidity') {
        const temp = await Temp.findOne({ topicdevice })
        temp.statusdevice = message;
        if (message > 0 && message < 30) {
          temp.notificationdevice = "Very dry";
        } else if (message >= 30 && message < 41) {
          temp.notificationdevice = "Dry";
        } else if (message >= 41 && message < 51) {
          temp.notificationdevice = "Slightly dry";
        } else if (message >= 51 && message < 61) {
          temp.notificationdevice = "Comfortable";
        } else if (message >= 61 && message < 71) {
          temp.notificationdevice = "Slightly humid";
        } else if (message >= 71 && message < 81) {
          temp.notificationdevice = "Humid";
        } else if (message >= 81) {
          temp.notificationdevice = "Very humid";
        } else {
          temp.notificationdevice = "Input data is corrupted";
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


