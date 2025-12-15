import { createComsumer, createKafkaClient, createProducer } from "@repo/kafka";

const kafkaClient = createKafkaClient("product-service");

export const producer = createProducer(kafkaClient);

export const consumer = createComsumer(kafkaClient, "product-group");
