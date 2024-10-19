import { db } from '@/adapters/db';
import argon2 from 'argon2';

import { id } from '@/utils/id';
import { jwt } from '@/utils/jwt';
import { logger } from '@/utils/logger';

class SharedServiceBase {
    public readonly db: typeof db;
    public readonly id: typeof id;
    public readonly log: typeof logger;
    public readonly jwt: typeof jwt;
    public readonly argon2: typeof argon2;

    constructor() {
        this.db = db;
        this.id = id;
        this.log = logger;
        this.argon2 = argon2;
        this.jwt = jwt;
    }
}

export default SharedServiceBase;
