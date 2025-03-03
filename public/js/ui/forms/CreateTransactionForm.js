/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const currentUser = User.current();
    const select = this.element.querySelector('.accounts-select');
    let selectAccounts = '';
    if(currentUser) {
      Account.list(currentUser, (err, response) => {
        if(response && response.success) {
          response.data.forEach(e => {
            selectAccounts += `<option value="${e.id}">${e.name}</option>`
          });
          select.innerHTML = selectAccounts;
        }
      })
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    const typeModal = this.element.closest('.modal').dataset.modalId;
    Transaction.create(data, (err, response) => {
      if(response && response.success) {
        App.update();
        this.element.reset();
        App.modals[typeModal].close();
      }
    })
  }
}