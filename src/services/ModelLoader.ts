import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { Model3D, ModelFormat } from '../types/api';

export class ModelLoader {
  private static gltfLoader = new GLTFLoader();
  private static objLoader = new OBJLoader();
  private static fbxLoader = new FBXLoader();

  static async loadModel(model: Model3D): Promise<Model3D> {
    const preferredFormat = this.getPreferredFormat(model.formats);
    if (!preferredFormat) {
      throw new Error('No supported format found for model');
    }

    try {
      const object = await this.loadModelByFormat(preferredFormat);
      return { ...model, object };
    } catch (error) {
      console.error(`Failed to load model ${model.id}:`, error);
      throw error;
    }
  }

  private static getPreferredFormat(formats: ModelFormat[]): ModelFormat | null {
    const preferredOrder = ['gltf', 'obj', 'fbx'];
    for (const formatType of preferredOrder) {
      const format = formats.find(f => f.type === formatType);
      if (format) return format;
    }
    return null;
  }

  private static loadModelByFormat(format: ModelFormat) {
    switch (format.type) {
      case 'gltf':
        return new Promise((resolve, reject) => {
          this.gltfLoader.load(
            format.url,
            (gltf) => resolve(gltf.scene),
            undefined,
            reject
          );
        });

      case 'obj':
        return new Promise((resolve, reject) => {
          this.objLoader.load(
            format.url,
            resolve,
            undefined,
            reject
          );
        });

      case 'fbx':
        return new Promise((resolve, reject) => {
          this.fbxLoader.load(
            format.url,
            resolve,
            undefined,
            reject
          );
        });

      default:
        throw new Error(`Unsupported format: ${format.type}`);
    }
  }
}