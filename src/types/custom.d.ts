interface decodedType {
	username: string;
	admin: boolean;
}

declare namespace Express {
	export interface Request {
		decoded: decodedType;
	}
}
