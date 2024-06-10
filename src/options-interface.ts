export interface Options {
  format: string;
  quality: number;
  scale: any;
  zipLabel: string;
  zipLabelDate: boolean;
  zipLabelScale: boolean;
  imgLabelDate: boolean;
  imgLabelScale: boolean;
  corsProxyBaseUrl: string;
  downloadImages: boolean;
  prefix: string;
  attributes: Attributes;
}

export interface Attributes {
  wrapperSelector: string;
  captureSelector: string;
  triggerSelector: string;
  scale: string;
  quality: string;
  format: string;
  zipLabel: string;
  zipLabelDate: string;
  zipLabelScale: string;
  imgLabelDate: string;
  imgLabelScale: string;
  corsProxyBaseUrl: string;
}

export interface ItemOptions extends Options {
  // Options +
  id: number;
  userSlug: string;
  slug: string;
  fileName: string;
}
