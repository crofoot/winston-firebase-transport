import 'dotenv/config';
import { StorageType } from '../src/types';
import { createLogger, Logger } from 'winston';
import { FirestoreTransport } from '../src/firestore-transport';

let logger: Logger;

beforeAll(() => {
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
					measurementId: process.env.measurementId!,
				},
				logger: {
					level: 'error',
				},
				applicationName: 'Test',
				storageType: StorageType.Firestore,
			}),
		],
	});
});

describe('Initialize Firebase Transport', () => {
	it('Create a winston instanase with FirebaseTransport', () => {
		expect(logger).toBeDefined();
	});

	it('Logger info() function', () => {
		logger.info('Message');
	});

	it('Logger error() function', () => {
		logger.error('Error Message');
	});
});
