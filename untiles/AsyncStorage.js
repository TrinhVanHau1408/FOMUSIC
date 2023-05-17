import AsyncStorage from '@react-native-async-storage/async-storage';
const saveDataAsyncStorage = async (key, data) => {
  console.log(`Data saved successfully. ${key} + ${JSON.stringify(data)}`);
  try {
    // console.log(`Data saved successfully. ${key} + ${JSON.stringify(data)}`);
    await AsyncStorage.setItem(key, JSON.stringify(data));
    console.log('Data saved successfully.');
  } catch (error) {
    console.log('Error saving data ------:', error);
  }
};

const getDataAsyncStorage = async (key) => {
  try {
    const userDataString = await AsyncStorage.getItem(key);
    const userData = JSON.parse(userDataString)
    console.log('Data:', userData);

    return userData;
  } catch (error) {
    console.log('Error retrieving data:', error);
    return null;
  }
};
export {
  saveDataAsyncStorage,
  getDataAsyncStorage
}