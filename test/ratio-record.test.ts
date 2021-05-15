import * as chai from 'chai';
import RatioRecord from '../src/ratio/ratio-record';

describe('RatioRecord', () => {
  it('stringを値に持つレコードが作成される', async () => {
    const record = new RatioRecord<string>('record', 100);
    chai.expect(record.value).to.equal('record');
    chai.expect(record.ratio).to.equal(100);
  });
  it('numberを値に持つレコードが作成される', async () => {
    const record = new RatioRecord<number>(1, 100);
    chai.expect(record.value).to.equal(1);
    chai.expect(record.ratio).to.equal(100);
  });
  it('booleanを値に持つレコードが作成される', async () => {
    const record = new RatioRecord<boolean>(true, 100);
    chai.expect(record.value).to.equal(true);
    chai.expect(record.ratio).to.equal(100);
  });
  it('{ [key: string]: string }のobjectを持つレコードが作成される', async () => {
    const record = new RatioRecord<{ [key: string]: string }>({ 'key': 'value' }, 100);
    chai.expect(record.value).to.deep.equal({ 'key': 'value' });
    chai.expect(record.ratio).to.equal(100);
  });
});
