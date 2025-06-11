import { Sambal } from "./SambalModel";

export interface History {
  id: string;
  userId: string;
  createdAt: Date;
}

export interface HistorySambal {
  historyId: string;
  sambal: Sambal;
}

export interface HistoryItem {
  sambalId: string;
  sambalName: string;
  imgUrl: string;
}


export interface CreateHistorySambalRequest {
  userId: string;
  sambalName: string;
}

export interface GetSambalHistoryRequest {
  userId: string;
}

export interface GetSambalHistoryResponse {
  history: HistoryItem[] | [];
}
