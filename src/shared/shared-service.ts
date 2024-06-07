import db from '@/adapters/db';
import argon2 from 'argon2';

import { id } from '@/utils/id';
import { logger } from '@/utils/logger';
import { jwt } from '@/utils/jwt';
import { HttpException } from '@/utils/http';

class SharedServiceBase {
    public readonly db: typeof db;
    public readonly id: typeof id;
    public readonly log: typeof logger;
    public readonly jwt: typeof jwt;
    public readonly httpException: typeof HttpException;
    public readonly argon2: typeof argon2;

    constructor() {
        this.db = db;
        this.id = id;
        this.log = logger;
        this.jwt = jwt;
        this.httpException = HttpException;
        this.argon2 = argon2;
    }
}

export default SharedServiceBase;
