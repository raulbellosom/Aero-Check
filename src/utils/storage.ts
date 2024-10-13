import { Storage } from "@ionic/storage";

const storage = new Storage();
await storage.create();

export const storeData = async (key: string, value: any): Promise<void> => {
  await storage.set(key, JSON.stringify(value));
};

export const getData = async (key: string): Promise<any> => {
  const value = await storage.get(key);
  return value ? JSON.parse(value) : null;
};

export const clearData = async (): Promise<void> => {
  await storage.clear();
};
