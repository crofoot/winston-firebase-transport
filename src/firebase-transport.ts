import firebase from 'firebase';
import Transport from 'winston-transport';
import 'firebase/firestore';
import { Log, StorageType, FirebaseTransportConstructor } from './types';

export class FirebaseTransport extends Transport {
	private firestoreTransportOptions: FirebaseTransportConstructor;

	constructor(opts: FirebaseTransportConstructor) {
		super(opts.logger);
		this.firestoreTransportOptions = opts;
		firebase.initializeApp(opts.firebaseConfig);

		// Required to use firestore
		if (opts.storageType === StorageType.Firestore) {
			firebase.firestore();
		}
	}

	async log(info: any, callback: Function) {
		setImmediate(() => {
			this.emit('logged', info);
		});

		let log: Log = {
			date: Date.now(),
			level: info.level,
			message: info.message,
		};

		try {
			switch (this.firestoreTransportOptions.storageType) {
				case StorageType.Firestore:
					await firestoreLogger(log, this.firestoreTransportOptions.applicationName, this.firestoreTransportOptions.collectionName);
					break;
				case StorageType.Realtime:
					await realtimeLogger(log, this.firestoreTransportOptions.applicationName, this.firestoreTransportOptions.collectionName);
					break;
				default:
					throw Error('Storage type is undefined');
			}
		} catch (error) {
			console.log(error);
		} finally {
			callback();
		}
	}
}

export const realtimeLogger = async (log: Log, app: string, collection: string): Promise<void> => {
	await firebase.database().ref(`${app}/${collection}/${log.level}`).push(log);
};

export const firestoreLogger = async (log: Log, app: string, collection: string): Promise<void> => {
	await firebase.firestore().collection(app).doc(collection).collection(log.level).add(log);
};
