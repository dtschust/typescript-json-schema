interface Channel {
	id: string;
	optional?: boolean;
}

type MyRecord = Record<string, Channel>
