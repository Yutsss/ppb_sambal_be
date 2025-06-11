export interface Sambal {
  id: string;
  name: string;
  description: string;
  picture: string;
  alergens: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetSambalByClassRequest {
  class: string;
} 

export interface GetSambalByClassResponse {
  sambalData: Sambal;
  pictures: string[];
}