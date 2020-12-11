# winston-firebase-transport

> Use Realtime or Firestore to store logs with winston

[![NPM](https://img.shields.io/npm/v/winston-firebase-transport.svg)](https://www.npmjs.com/package/winston-firebase-transport)

### Example

```typescript
logger = createLogger({
	transports: [
		new FirestoreTransport({
			firebaseConfig: {
				apiKey: process.env.apiKey!,
				authDomain: process.env.authDomain!,
				projectId: process.env.projectId!,
				storageBucket: process.env.storageBucket!,
				messagingSenderId: process.env.messagingSenderId!,
				appId: process.env.appId!,
				databaseURL: process.env.databaseURL!,
				measurementId: process.env.measurementId!,
			},
			logger: {
				level: 'error',
				// any winston configuration goes here
			},
			applicationName: 'test',
			collectionName: 'logs',
			storageType: StorageType.Firestore, // StorageType.Realtime
		}),
	],
});

logger.info('Nice package!');
logger.error('ERROR: package is awesome.');
```
