# winston-firebase-transport

> Use Realtime or Firestore to store logs with winston

[![NPM](https://img.shields.io/npm/v/winston-firebase-transport.svg)](https://www.npmjs.com/package/winston-firebase-transport)

### Helpful Notes

- For the firebase console enable either the `Realtime` or `Firestore` database AND make sure that write permissions is enabled.
- If you are using `firestore` you can pass an empty string for `firebaseConfig.databaseURL`.

### Example

```typescript
import { createLogger, Logger } from 'winston';
import { FirebaseTransport } from 'winston-firebase-transport';

logger = createLogger({
	transports: [
		new FirebaseTransport({
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
