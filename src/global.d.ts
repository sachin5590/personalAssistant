declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare class TimestampTrigger {
  constructor(timestamp: number);
}
