export interface Options {
  image: ImageOptions;
  zip: ZipOptions;
  attributes: Attributes;
  corsProxyBaseUrl: string;
  downloadImages: boolean;
  inputPrefix: string;
}

export interface Attributes {
  wrapperSelector: string;
  captureSelector: string;
  triggerSelector: string;
  slugSelector: string;
  ignoreSelector: string;
  format: string;
  scale: string;
  quality: string;
  zipLabel: string;
  zipLabelDate: string;
  zipLabelScale: string;
  imgLabelDate: string;
  imgLabelScale: string;
  corsProxyBaseUrl: string;
}

export interface ImageOptions {
  format: "jpg" | "png";
  quality: number;
  scale: any;
  dateInLabel: boolean;
  scaleInLabel: boolean;
}

export interface ZipOptions {
  label: string;
  dateInLabel: boolean;
  scaleInLabel: boolean;
}

export interface ItemOptions extends Options {
  // Options +
  id: number;
  userSlug: string;
  slug: string;
  fileName: string;
}
