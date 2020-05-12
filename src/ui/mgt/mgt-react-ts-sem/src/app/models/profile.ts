export interface IProfile {
    displayName: string;
    userName: string;
    bio: string;
    image: string;
    images: IImage[]
}

export interface IImage {
    id: string;
    imageUrl: string;
    isMain: boolean;
}