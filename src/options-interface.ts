export interface Options {
  format: string;
  quality: number;
  scale: number;
  inlineSVGs: boolean;
  zipName: string;
  includeDateZip: boolean;
  includeScaleZip: boolean;
  includeDateImg: boolean;
  includeScaleImg: boolean;
  wrapperSelector: string;
  captureSelector: string;
  corsProxyBaseURL: string;
  loaderEnabled: boolean;
}
