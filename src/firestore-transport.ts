import * as admin from 'firebase-admin';
import Transport from 'winston-transport';
import 'firebase-admin/lib/firestore';
import { Log, StorageType, FirestoreTransportConstructor } from './types';

export class FirestoreTransport extends Transport {
	private firestoreTransportOptions: FirestoreTransportConstructor;

	constructor(opts: FirestoreTransportConstructor) {
		super(opts.logger);
		this.firestoreTransportOptions = opts;
		admin.initializeApp(opts.firebaseConfig);

		// Required to use firestore
		if (opts.storageType === StorageType.Firestore) {
			admin.firestore();
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
					await firestoreLogger(log);
					break;
				case StorageType.Realtime:
					await realtimeLogger(log);
					break;
				default:
					throw Error('Storage type is undefined');
			}
		} catch {
		} finally {
			callback();
		}
	}
}

export const realtimeLogger = async (log: Log): Promise<void> => {
	console.log(log);
};

export const firestoreLogger = async (log: Log): Promise<void> => {
	console.log(log);
};
