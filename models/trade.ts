export type Side = "BUY" | "SELL";

export interface Trade {
  tradeId: string;     
  symbol: string;      
  quantity: number;    
  price: number;       
  side: Side;         
  timestamp: string;   
  broker: string;      
}


export interface IBrokerAdapter {
  fetchTrades(token: string): Promise<any[]>; 
}
