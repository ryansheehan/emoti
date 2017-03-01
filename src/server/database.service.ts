import {db} from './firebase.config';

export interface IData {
  data: number;
}

class DataService {
  getDataBlock():Promise<IData[]> {
    return new Promise<IData[]>((resolve, reject)=> {
      db.ref('dataBlocks/').once('value')
        .then(snapshot=>resolve(snapshot.val()))
        .catch(error=>reject(error))
    });
  }
}

export const dataService = new DataService();
