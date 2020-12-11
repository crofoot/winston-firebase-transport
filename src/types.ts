import Transport from 'winston-transport';
import { LoggerOptions } from 'winston';
export enum StorageType {
	Firestore = 'firestore',
	Realtime = 'realtime',
}

export type FirebaseStorageType = StorageType.Firestore | StorageType.Realtime;

export type LogLevel = 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly';

export type Log = {
	level: LogLevel;
	message: any;
	date: number;
};

export interface FirebaseTransportConstructor {
	firebaseConfig: {
		apiKey: string;
		authDomain: string;
		projectId: string;
		storageBucket: string;
		messagingSenderId: string;
		appId: string;
		databaseURL: string;
		measurementId: string;
	};
	storageType: FirebaseStorageType;
	applicationName: string;
	logger?: LoggerOptions;
	collectionName: string;
}
