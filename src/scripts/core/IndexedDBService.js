import Dexie from 'dexie';
import * as Settings from '../../config/settings';
import * as WalletSchema from '../schema/WalletSchema';

class IndexedDBService {

    constructor () {
        this._db = new Dexie(Settings.database.name);
        this._db.version(Settings.database.version)
            .stores(WalletSchema);
    }

    get instance () {
        return this._db;
    }

}

export default IndexedDBService;
