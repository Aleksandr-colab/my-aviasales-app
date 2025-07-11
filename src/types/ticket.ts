export interface Segment {
    origin: string;
    destination: string;
    date: string;
    stops: string[];
    duration: number;
  }
  
  export interface Ticket {
    id?: string;
    price: number;
    carrier: string;
    segments: Segment[];
  }