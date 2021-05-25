import * as chai from 'chai';
import RatioRecord from '../src/frontend/ratio/ratio-record';
import RatioTable from '../src/frontend/ratio/ratio-table';
import FixRandom from './fix-random';

describe('RatioTable', () => {
  const random: FixRandom = new FixRandom([]);
  const table = new RatioTable<string>([
    new RatioRecord<string>('cat', 100),
    new RatioRecord<string>('dog', 100),
    new RatioRecord<string>('pig', 100),
  ]);

  it('抽選値1-100で"cat"が抽選される', () => {
    random.add(1);
    chai.expect(table.lot(random)).to.equal('cat');
    random.add(100);
    chai.expect(table.lot(random)).to.equal('cat');
  });

  it('抽選値101-200で"dog"が抽選される', () => {
    random.add(101);
    chai.expect(table.lot(random)).to.equal('dog');
    random.add(200);
    chai.expect(table.lot(random)).to.equal('dog');
  });

  it('抽選値201-300で"pig"が抽選される', () => {
    random.add(201);
    chai.expect(table.lot(random)).to.equal('pig');
    random.add(300);
    chai.expect(table.lot(random)).to.equal('pig');
  });

  it('抽選値301以上で例外が発生する', () => {
    random.add(301);
    chai.expect(() => table.lot(random)).to.throw();
  });
});
