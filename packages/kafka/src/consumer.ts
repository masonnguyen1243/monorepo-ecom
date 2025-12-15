import { Consumer, Kafka } from "kafkajs";

export const createComsumer = (kafka: Kafka, groupId: string) => {
  const consumer: Consumer = kafka.consumer({ groupId });

  const connect = async () => {
    await consumer.connect();
    console.log("Kafka consumer connected" + groupId);
  };

  const subcribe = async (
    topic: string,
    handler: (message: any) => Promise<void>
  ) => {
    await consumer.subscribe({
      topic: topic,
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const value = message.value?.toString();

          if (value) {
            await handler(JSON.parse(value));
          }
        } catch (error) {
          console.log("Error processing message", error);
        }
      },
    });
  };

  const disconnect = async () => {
    await consumer.disconnect();
  };

  return { connect, subcribe, disconnect };
};
