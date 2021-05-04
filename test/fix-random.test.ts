import * as chai from 'chai';
import FixRandom from './fix-random';

describe('FixRandom', () => {
  it('強制乱数が存在しないので例外が発生する', () => {
    const random = new FixRandom([]);
    chai.expect(() => random.lot(0, 1)).to.throw();
  });
  it('強制乱数が2つで3回目の抽選で例外が発生する', () => {
    const random = new FixRandom([-1, 1]);
    chai.expect(random.lot(0, 1)).to.equal(-1);
    chai.expect(random.lot(0, 1)).to.equal(1);
    chai.expect(() => random.lot(0, 1)).to.throw();
  });
});
