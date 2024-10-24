import { Object3D } from 'three';

export interface ModelFormat {
  type: 'gltf' | 'usdz' | 'obj' | 'fbx';
  url: string;
  fileSize: number;
}

export interface ModelSpecifications {
  polygonCount: number;
  textureResolution: string;
  fileSize: number;
}

export interface AnimationData {
  name: string;
  duration: number;
  description?: string;
}

export interface AnnotationPoint {
  label: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  description?: string;
}

export interface ARFeatures {
  interactions: string[];
  animations: AnimationData[];
  scalingLimits: {
    min: number;
    max: number;
  };
  annotationPoints: AnnotationPoint[];
}

export interface Model3D {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  previewUrl: string;
  formats: ModelFormat[];
  educationalLevel: string[];
  specifications: ModelSpecifications;
  metadata: {
    tags: string[];
    subject: string;
    curriculum: string[];
  };
  arFeatures: ARFeatures;
  object?: Object3D;
}

export interface ARContent {
  modelUrl: string;
  trackingConfiguration: {
    type: 'surface' | 'image' | 'object' | 'face';
    settings: Record<string, unknown>;
  };
  interactionGuides: Array<{
    step: number;
    instruction: string;
    highlightedParts: string[];
  }>;
  educationalContent: {
    title: string;
    description: string;
    learningObjectives: string[];
  };
}

export type ModelCategory = 'physics' | 'chemistry' | 'biology' | 'astronomy' | 'engineering' | 'technology';
export type EducationalLevel = 'elementary' | 'middle_school' | 'high_school' | 'undergraduate' | 'graduate' | 'professional';