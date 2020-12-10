import { FirestoreTransport } from '../src/firestore-transport';
import winston, { createLogger } from 'winston';

let logger: winston.Logger;

beforeAll(() => {
	logger = createLogger({
		transports: [
			new FirestoreTransport({
				firebaseConfig: {
					apiKey: 'AIzaSyDsab41CWBpeDDOvMZG0AwHueuj2jUdfgA',
					authDomain: 'test-app-82a3f.firebaseapp.com',
					projectId: 'test-app-82a3f',
					storageBucket: 'test-app-82a3f.appspot.com',
					messagingSenderId: '904101787673',
					appId: '1:904101787673:web:ec04c37ab63417a4725288',
					measurementId: 'G-1DJXVP2BG3',
				},
				transportOptions: {
					level: 'error',
					format: winston.format.combine(winston.format.colorize(), winston.format.json()),
				},
				applicationName: 'Test',
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
		logger.error('Message');
	});
});
