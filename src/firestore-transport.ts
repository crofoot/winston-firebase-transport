import * as admin from 'firebase-admin';
import Transport from 'winston-transport';

export interface FirestoreTransportConstructor {
	firebaseConfig: {
		apiKey: string;
		authDomain: string;
		projectId: string;
		storageBucket: string;
		messagingSenderId: string;
		appId: string;
		measurementId: string;
	};
	applicationName: string;
	transportOptions?: Transport.TransportStreamOptions;
}

export class FirestoreTransport extends Transport {
	constructor(opts: FirestoreTransportConstructor) {
		super(opts.transportOptions);
		admin.initializeApp(opts.firebaseConfig, 'winston');
	}

	log(info: any, callback: Function) {
		setImmediate(() => {
			this.emit('logged', info);
		});

		switch (info.level) {
			case 'warn':
				break;
			case 'info':
				break;
			case 'http':
				break;
			case 'verbose':
				break;
			case 'debug':
				break;
			case 'silly':
				break;
		}
		callback();
	}
}

admin.initializeApp();
