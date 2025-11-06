import { describe, expect, it } from 'vitest';
import { UserModel } from '../../../app/models';

describe('UserModelの単体テスト', () => { 
    const values = {
        hashedId: 'hashedId',
        name: 'name',
        email: 'email',
        password: 'password',
        createdAt: new Date()
    }
    const user = new UserModel(values)

    it('getValuesが値を返すこと', async () => {
        expect(user.getValues).toEqual(values)
    })

    it('hashedIdがハッシュIDを返すこと', async() => {
        expect(user.hashedId).toEqual(values.hashedId)
    })

    it('equalsが同じhashIdのモデルに対してtrueを返すこと', async () => {
        expect(user.equals(
            new UserModel(values)
        )).toBe(true)

        expect(user.equals(
            new UserModel({ ...values, hashedId: 'different'})
        )).toBe(false)
    })
})