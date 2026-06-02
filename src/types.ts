export interface University {
  id: string;
  nameEn: string;
  nameKh: string;
  description: string;
  type: 'Public' | 'Private';
  location: string;
  fees: string;
  established: number;
}
