import expensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('Should return 0 when no expenses are passed', () => {
    const res = expensesTotal([]);
    expect(res).toBe(0);
});

test('Should return amount when one expense is passed through', () => {
    const res = expensesTotal([expenses[0]]);
    expect(res).toBe(195);
});

test('Should add all expenses and return show total', () => {
    const res = expensesTotal(expenses);
    expect(res).toBe(104790);
})