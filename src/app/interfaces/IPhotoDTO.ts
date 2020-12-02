export interface IPhotoDTO {
    id: number;
    name: string;
    photo: string | ArrayBuffer | null;
    date: Date;
}