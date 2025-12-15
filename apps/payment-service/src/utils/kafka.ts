import { createComsumer, createKafkaClient, createProducer } from "@repo/kafka";

const kafkaClient = createKafkaClient("payment-service");

export const producer = createProducer(kafkaClient);

export const consumer = createComsumer(kafkaClient, "payment-group");
