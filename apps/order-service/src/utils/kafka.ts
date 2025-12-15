import { createComsumer, createKafkaClient, createProducer } from "@repo/kafka";

const kafkaClient = createKafkaClient("order-service");

export const producer = createProducer(kafkaClient);

export const consumer = createComsumer(kafkaClient, "order-group");
