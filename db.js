// SQLite database for storing images.
const db = SQLite.openDatabase({ name: 'images.db', location: 'default' });

//  table for storing image data || will reference later
const setupDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY AUTOINCREMENT, uri TEXT, latitude REAL, longitude REAL)',
      [],
      () => console.log('Table created!'),
      (_, error) => console.error('Creating table failed! Error:', error)
    );
  });
};

  // get user location before taking shots || request permission 
  const captureLocation = async () => {
    if (Platform.OS === 'android') {
      // request to save file to location
      await Location.requestPermissionsAsync();
    }
  // set up coordinates
    Location.getCurrentPositionAsync({}).then((location) => {
      const { latitude, longitude } = location.coords;
      console.log('Latitude:', latitude);
      console.log('Longitude:', longitude);
    });
  };
  
